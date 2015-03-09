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
