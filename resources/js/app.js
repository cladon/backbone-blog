var App = (function ($) {
    function BlogApp() {
        this.router = new BlogRouter();
        this.session = null;

        this.initialize();

        Backbone.history.start();
    }

    BlogApp.prototype = {
        apiRoot: '/api/v1/',

        router: null,

        session: null,

        message: null,

        initialize: function () {
            var that = this;

            $.ajaxSetup({cache: false});

            $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
                options.url = that.apiRoot + options.url;

                jqXHR.setRequestHeader('X-CSRF-TOKEN', $('meta[name="csrf"]').attr('content'));
            });

            this.message = $("#alert-msg");

            Backbone.App = this;
        },

        showMessage: function(message, status) {
            var that = this;
            that.message.removeClass();

            that.message.addClass('alert');
            that.message.addClass('alert-' + status);
            that.message.html(message);
            that.message.show();

            setTimeout(function() {
                that.message.hide();
            }, 10000)
        }
    };

    return BlogApp;
})(jQuery);