var PostModel = Backbone.Model.extend({
    urlRoot: '/posts'
});

var SessionModel = Backbone.Model.extend({
    defaults: {
        logged_in: false,
        user_id: ''
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
        var self = this;
        self.fetch({
            success: function(user) {

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
            beforeSend: function(xhr) {
                var token = $('meta[name="csrf-token"]').attr('content');
                if (token)
                    xhr.setRequestHeader('X-CSRF-TOKEN', token);
            },
            data: JSON.stringify(data),
            success: function(res) {
                console.log(res);
            }
        });
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
                that.$el.html(that.template(posts.models));
            },
            error: function() {
                that.$el.html(that.template([]));
            }
        })
    },
    template: function(data) {
        return _.template($("#post-list-template").html())({posts: data});
    }
});

var BlogRouter = Backbone.Router.extend({
    routes: {
        '': 'listPosts',
        'post/:id': 'showPost',
        'post/new': 'editPost',
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

    editPost: function(id) {
        if (this.views.editPostView == undefined)
            this.views.editPostView = new PostEditView();

        this.views.editPostView.render(id);
    }
});

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
var app = new App(new BlogRouter());

//# sourceMappingURL=app.js.map