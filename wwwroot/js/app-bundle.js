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

define('services/http-service',["require", "exports", 'aurelia-http-client'], function (require, exports, aurelia_http_client_1) {
    "use strict";
    var HttpService = (function () {
        function HttpService(http) {
            this.http = http;
        }
        HttpService.inject = function () { return [aurelia_http_client_1.HttpClient]; };
        ;
        HttpService.prototype.getUser = function (username) {
            return this.http.get("/api/github/" + username)
                .then(function (res) { return JSON.parse(res.response); });
        };
        HttpService.prototype.getFollowers = function (url) {
            return this.http.get(url).then(function (res) { return JSON.parse(res.response); });
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
        }
        GhSearch.inject = function () { return [http_service_1.HttpService, aurelia_event_aggregator_1.EventAggregator]; };
        GhSearch.prototype.ghSearch = function () {
            var _this = this;
            this.httpService.getUser(this.username)
                .then(function (userInfo) {
                _this.profileImg = userInfo.avatar_url;
                _this.displayUser = true;
                _this.ea.publish("gh-search", userInfo);
            })
                .catch(function (err) {
                _this.displayUser = false;
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
            this.ea.subscribe("gh-search", function (user) {
                _this.followers = [];
                _this.httpService.getFollowers(user.followers_url)
                    .then(function (followers) { return _this.followers = followers; });
            });
        }
        GhFollowers.inject = function () { return [http_service_1.HttpService, aurelia_event_aggregator_1.EventAggregator]; };
        return GhFollowers;
    }());
    exports.GhFollowers = GhFollowers;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./gh-search\"></require>\r\n  <gh-search class=\"gh-search-comp\"></gh-search>\r\n</template>\r\n"; });
define('text!gh-search.html', ['module'], function(module) { module.exports = "<template>\r\n    <div>\r\n        <require from=\"./followers/gh-followers\"></require>\r\n\r\n        <h1>Github Search</h1>\r\n        <form>\r\n            <input type=\"text\" value.bind=\"username\" />\r\n            <button click.delegate=\"ghSearch()\">Search</button>\r\n        </form>\r\n        <div show.bind=\"displayUser\">\r\n            <div class=\"gh-user\">\r\n                <img src.bind=\"profileImg\" />\r\n            </div>\r\n            <div class=\"gh-followers\">\r\n                <gh-followers></gh-followers>\r\n            </div>\r\n        </div>\r\n        <div show.bind=\"!displayUser\">\r\n            <h3>No User!</h3>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!followers/gh-followers.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"followers-component\">\n        <p>Followers</p>\n        <ul class=\"followers-list\">\n            <template repeat.for=\"follower of followers\">\n                <li class=\"follower\">\n                    <a href=\"${follower.html_url}\" target=\"_blank\">\n                        <img src=\"${follower.avatar_url}\" title=\"${follower.}\"/>\n                    </a>\n                </li>\n            </template>\n        </ul>\n    <div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map