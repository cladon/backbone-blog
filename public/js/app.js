var PostModel = Backbone.Model.extend({
    urlRoot: 'posts'
});

var SessionModel = Backbone.Model.extend({
    defaults: {
        logged_in: false,
        user: null
    },

    initialize: function() {
        _.bindAll(this);

        this.user = new UserModel({});
    },

    url: '/auth/',

    updateSessionUser: function(userData) {
        this.user.set(_.pick(userData, _.keys(this.user.defaults)));
    },

    checkAuth: function(callback, args) {
        var that = this;

        $.ajax({
            url: that.url + 'login',
            type: 'GET',
            dataType: 'json',

            success: function(res) {

            },

            error: function() {

            }
        });
    },

    postAuth: function(method, data) {
        var self = this;

        $.ajax({
            url: self.url + method,
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(data),
            success: function(res) {
                console.log(res);
            }
        });
    }
});

var UserModel = Backbone.Model.extend({

    defaults: {
        id: '',
        username: '',
        email: ''
    }

});

var PostCollection = Backbone.Collection.extend({
    url: '/posts'
});

var LoginView = Backbone.View.extend({
    el: '#page',
    render: function() {
        var that = this;
        that.$el.html(that.template());
    },
    template: function(objData) {
        return _.template($("#post-list-template"))(objData);
    }
});

var PostEditView = Backbone.View.extend({
    el: '#page',

    events: {
        'submit #post-form': 'handleFormSubmit',
        'click #cancel-form': 'cancelView'
    },

    cancelView: function(e) {
        e.preventDefault();

        $('.form-action-trigger').prop("disabled", true);
        Backbone.history.navigate('', true);
    },

    handleFormSubmit: function(e) {
        e.preventDefault();
        $('.form-action-trigger').prop("disabled", true);
        var post = new PostModel();
        post.save(this.getFormData('post-form'), {
            success: function(model) {
                Backbone.App.showMessage('<p>The post has been created</p>', 'info');
                Backbone.history.navigate('post/' + model.get('id'), true);
            },

            error: function(model, response) {
                if (response.status == 401) {
                    Backbone.App.showMessage('<p>You are not logged in.</p>', 'danger');
                    Backbone.history.navigate('', true);
                }
            }
        });
    },

    getFormData: function(id) {
        var data = {};

        var inputs = $("#" + id).serializeArray();
        $.each(inputs, function(i, input) {
            data[input.name] = input.value;
        });

        return data;
    },

    render: function(id) {
        var that = this;
        if (id == undefined) {
            that.$el.html(that.template());
        } else {
            var posts = new PostCollection();
            var post = posts.get(id);

            if (post == undefined) {
                Backbone.history.navigate('', true);
            } else {
                that.$el.html(that.template(post));
            }
        }
    },

    template: function(data) {
        return _.template($("#post-edit-template").html())(data);
    }
});

var PostListView = Backbone.View.extend({
    el: '#page',

    render: function() {
        var that = this;
        var posts = new PostModel();
        posts.fetch({
            success: function(posts) {
                that.$el.html(that.template({posts: posts.models}));
            },
            error: function() {
                that.$el.html(that.template([]));
            }
        })
    },
    template: function(data) {
        return _.template($("#post-list-template").html())(data);
    }
});

var BlogRouter = Backbone.Router.extend({
    routes: {
        '': 'listPosts',
        'post/new': 'editPost',
        'post/:id': 'showPost',
        'post/:id/edit': 'editPost',

        'login': 'login'
    },

    authRoutes: ['editPost'],

    views: {},

    initialize: function() {
         // this.handleRouteAuth();
    },

    handleRouteAuth: function() {
        var that = this;
        that.on("route", function(route) {
            console.log(route);
            if (that.isProtected(route))
                that.navigate('', true);
        });
    },

    isProtected: function(route) {
        for (var i = 0; i < this.authRoutes.length; i++)
            if (this.authRoutes[i] == route)
                return true;

        return false;
    },

    listPosts: function() {
        if (this.views.listPostView == undefined)
            this.views.listPostView = new PostListView();

        this.views.listPostView.render();
    },

    showPost: function() {
        console.log("show post");
    },

    editPost: function(id) {
        if (this.views.editPostView == undefined)
            this.views.editPostView = new PostEditView();

        this.views.editPostView.render(id);
    }
});

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
var app = new App();

//# sourceMappingURL=app.js.map