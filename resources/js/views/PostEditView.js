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
