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
