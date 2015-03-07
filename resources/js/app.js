$.ajaxPrefilter(function(options, originalOptions, jqXHR)
{
    options.url = '/api/v1' + options.url;
});

// Collections
var Posts = Backbone.Collection.extend({
    url: '/posts'
});

// Models
var Post = Backbone.Model.extend({
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
    }

    url: '/auth/',

    updateSessionUser: function(userData) {
        this.user.set(_.pick(userData, _.keys(this.user.defaults)));
    },

    checkAuth: function(callback, args) {
        var self = this;
        self.fetch({
            success: function(user) {

                if ('success' in callback)
                    callback.success(mod, res);
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

var UserModel = Backbone.Model.extend({

});

var PostListView = Backbone.View.extend({
    el: '#page',
    render: function() {
        var that = this;
        var posts = new Posts();
        posts.fetch({
            success: function(posts) {
                //console.log(that.template()({posts: posts.models}));
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

var postListView = new PostListView();

var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'new': 'edit',
        'edit/:id': 'edit',
        'login': 'login'
    }
});

var router = new Router();
router.on('route:home', function()
{
    postListView.render();
});

router.on('route:edit', function(id)
{

});

router.on('route:login', function()
{

});

Backbone.history.start();