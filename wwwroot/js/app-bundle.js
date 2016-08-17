define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('const/gh-urls',["require", "exports"], function (require, exports) {
    "use strict";
    var GhUrls = (function () {
        function GhUrls() {
            this.SingleUser = "/api/github/singleuser?username=";
            this.Followers = "/api/github/followers?username=";
            this.Following = "/api/github/following?username=";
            this.Gists = "/api/github/gists?username=";
        }
        return GhUrls;
    }());
    exports.GhUrls = GhUrls;
});

define('services/http-service',["require", "exports", 'aurelia-http-client', '../const/gh-urls'], function (require, exports, aurelia_http_client_1, gh_urls_1) {
    "use strict";
    var HttpService = (function () {
        function HttpService(http, urls) {
            this.http = http;
            this.urls = urls;
        }
        HttpService.inject = function () { return [aurelia_http_client_1.HttpClient, gh_urls_1.GhUrls]; };
        ;
        HttpService.prototype.getUser = function (username) {
            return this.fetchApiItem(this.urls.SingleUser, username);
        };
        HttpService.prototype.getFollowers = function (username) {
            return this.fetchApiItem(this.urls.Followers, username);
        };
        HttpService.prototype.getFollowing = function (username) {
            return this.fetchApiItem(this.urls.Following, username);
        };
        HttpService.prototype.getGists = function (username) {
            return this.fetchApiItem(this.urls.Gists, username);
        };
        HttpService.prototype.fetchApiItem = function (url, username) {
            return this.http.get(url + username)
                .then(function (res) { return JSON.parse(res.response); });
        };
        return HttpService;
    }());
    exports.HttpService = HttpService;
});

define('gh-search',["require", "exports", "./services/http-service", "aurelia-event-aggregator"], function (require, exports, http_service_1, aurelia_event_aggregator_1) {
    "use strict";
    var GhSearch = (function () {
        function GhSearch(httpService, ea) {
            this.httpService = httpService;
            this.ea = ea;
            this.displayUser = false;
            this.successCount = 0;
            this.failCount = 0;
        }
        GhSearch.inject = function () { return [http_service_1.HttpService, aurelia_event_aggregator_1.EventAggregator]; };
        GhSearch.prototype.ghSearch = function () {
            var _this = this;
            this.ea.publish("gh-search", this.username);
            this.displayUser = false;
            this.httpService.getUser(this.username)
                .then(function (userInfo) {
                _this.user = userInfo;
                _this.displayUser = true;
                _this.successCount++;
            })
                .catch(function (err) {
                _this.failCount++;
                console.error(err);
            });
        };
        return GhSearch;
    }());
    exports.GhSearch = GhSearch;
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('followers/gh-followers',["require", "exports", "../services/http-service", "aurelia-event-aggregator"], function (require, exports, http_service_1, aurelia_event_aggregator_1) {
    "use strict";
    var GhFollowers = (function () {
        function GhFollowers(httpService, ea) {
            var _this = this;
            this.httpService = httpService;
            this.ea = ea;
            this.ea.subscribe("gh-search", function (username) {
                _this.followers = [];
                _this.httpService.getFollowers(username)
                    .then(function (followers) { return _this.followers = followers; });
            });
        }
        GhFollowers.inject = function () { return [http_service_1.HttpService, aurelia_event_aggregator_1.EventAggregator]; };
        return GhFollowers;
    }());
    exports.GhFollowers = GhFollowers;
});

define('following/gh-following',["require", "exports", "../services/http-service", "aurelia-event-aggregator"], function (require, exports, http_service_1, aurelia_event_aggregator_1) {
    "use strict";
    var GhFollowing = (function () {
        function GhFollowing(httpService, ea) {
            var _this = this;
            this.httpService = httpService;
            this.ea = ea;
            this.ea.subscribe("gh-search", function (username) {
                _this.followings = [];
                _this.httpService.getFollowing(username)
                    .then(function (followers) { return _this.followings = followers; });
            });
        }
        GhFollowing.inject = function () { return [http_service_1.HttpService, aurelia_event_aggregator_1.EventAggregator]; };
        return GhFollowing;
    }());
    exports.GhFollowing = GhFollowing;
});

define('gists/gh-gists',["require", "exports", "../services/http-service", "aurelia-event-aggregator"], function (require, exports, http_service_1, aurelia_event_aggregator_1) {
    "use strict";
    var GhGists = (function () {
        function GhGists(httpService, ea) {
            var _this = this;
            this.httpService = httpService;
            this.ea = ea;
            this.ea.subscribe("gh-search", function (username) {
                _this.gists = [];
                _this.httpService.getGists(username)
                    .then(function (gists) {
                    gists.map(function (gist) {
                        gist.fileString = "";
                        for (var key in gist.files) {
                            gist.fileString += key + "; ";
                        }
                        return gist;
                    });
                    _this.gists = gists;
                });
            });
        }
        GhGists.inject = function () { return [http_service_1.HttpService, aurelia_event_aggregator_1.EventAggregator]; };
        return GhGists;
    }());
    exports.GhGists = GhGists;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./gh-search\"></require>\n  <gh-search class=\"gh-search-comp\"></gh-search>\n</template>\n"; });
define('text!gh-search.html', ['module'], function(module) { module.exports = "<template>\n    <div>\n        <require from=\"./followers/gh-followers\"></require>\n        <require from=\"./following/gh-following\"></require>\n        <require from=\"./gists/gh-gists\"></require>\n\n        <h1>Github Search</h1>\n        <form>\n            <input type=\"text\" value.bind=\"username\" />\n            <button click.delegate=\"ghSearch()\">Search</button>\n        </form>\n        <div if.bind=\"displayUser\">\n            <div class=\"gh-user\">\n                <a href.bind=\"user.html_url\" target=\"_blank\">\n                    <img src.bind=\"user.avatar_url\" />\n                </a>\n            </div>\n        </div>\n        <div if.bind=\"!displayUser\">\n            <h3>No User!</h3>\n        </div>\n        <div class=\"gh-stats\">\n            <div class=\"gh-success\">\n                <p>Success: ${successCount}</p>\n            </div>\n            <div class=\"gh-fail\">\n                <p>Error: ${failCount}</p>\n            </div>\n        </div>\n        <div class=\"gh-components\" show.bind=\"displayUser\">\n            <div class=\"gh-followers\">\n                <gh-followers></gh-followers>\n            </div>\n            <div class=\"gh-following\">\n                <gh-following></gh-following>\n            </div>\n            <div class=\"gh-gists\">\n                <gh-gists></gh-gists>\n            </div>\n        <div>\n    </div>\n</template>"; });
define('text!followers/gh-followers.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"followers-component\">\n        <p>Followers</p>\n        <ul class=\"followers-list\">\n            <template repeat.for=\"follower of followers\">\n                <li class=\"follower\">\n                    <a href=\"${follower.html_url}\" target=\"_blank\">\n                        <img src=\"${follower.avatar_url}\" title=\"${follower.login}\"/>\n                    </a>\n                </li>\n            </template>\n        </ul>\n    <div>\n</template>\n"; });
define('text!following/gh-following.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"following-component\">\n        <p>Following</p>\n        <ul class=\"following-list\">\n            <template repeat.for=\"following of followings\">\n                <li class=\"following\">\n                    <a href=\"${following.html_url}\" target=\"_blank\">\n                        <img src=\"${following.avatar_url}\" title=\"${following.login}\"/>\n                    </a>\n                </li>\n            </template>\n        </ul>\n    <div>\n</template>"; });
define('text!gists/gh-gists.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"gists-component\">\n        <p>Gists</p>\n        <ul class=\"gists-list\">\n            <template repeat.for=\"gist of gists\">\n                <li class=\"gist\">\n                    <a href=\"${gist.html_url}\" target=\"_blank\">\n                        ${gist.fileString}\n                    </a>\n                </li>\n            </template>\n        </ul>\n    <div>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map