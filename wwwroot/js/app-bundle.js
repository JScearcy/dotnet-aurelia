define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.message = 'Github Search';
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
            return this.http.get("https://api.github.com/users/" + username);
        };
        return HttpService;
    }());
    exports.HttpService = HttpService;
});

define('gh-search',["require", "exports", "./services/http-service"], function (require, exports, http_service_1) {
    "use strict";
    var GhSearch = (function () {
        function GhSearch(httpService) {
            this.httpService = httpService;
            this.displayUser = false;
        }
        GhSearch.inject = function () { return [http_service_1.HttpService]; };
        GhSearch.prototype.ghSearch = function () {
            var _this = this;
            this.httpService.getUser(this.username)
                .then(function (res) {
                var userInfo = JSON.parse(res.response);
                _this.profileImg = userInfo.avatar_url;
                _this.displayUser = true;
            })
                .catch(function (err) {
                _this.displayUser = false;
                console.error(err);
                console.log(_this.displayUser);
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

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./gh-search\"></require>\n  <h1>${message}</h1>\n  <gh-search></gh-search>\n</template>\n"; });
define('text!gh-search.html', ['module'], function(module) { module.exports = "<template>\n    <form>\n        <input type=\"text\" value.bind=\"username\" />\n        <button click.delegate=\"ghSearch()\">Search</button>\n    </form>\n    <div>\n        <img src.bind=\"profileImg\" />\n    </div>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map