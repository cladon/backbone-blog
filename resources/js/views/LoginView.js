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
