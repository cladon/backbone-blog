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
