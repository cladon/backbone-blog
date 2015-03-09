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
