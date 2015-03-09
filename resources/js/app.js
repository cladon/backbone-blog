var App = (function ($) {
    function BlogApp(router, session) {
        this.router = router;
        this.session = session;

        this.initialize();

        Backbone.history.start();
    }

    BlogApp.prototype = {
        apiRoot: '/api/v1/',

        router: null,

        session: null,

        initialize: function () {
            var that = this;

            $.ajaxSetup({cache: false});

            $.ajaxPrefilter(function(options) {
                options.url = that.apiRoot + options.url;
            });
        }
    };

    return BlogApp;
})(jQuery);