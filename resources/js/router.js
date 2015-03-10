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
