/* Core */
var LoginView = function (store) {
    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');

        /* Login button */
        this.el.on('click', '#btn-login', function (e) {
            e.preventDefault();
            $("#login-form").submit();
        });

        /* Login form */
        this.el.on('submit', '#login-form', function (e) {
            e.preventDefault();
            var __this = $(this);
            if (__this.valid()) {
                showLoader();
            }
        });
    };

    this.render = function () {
        this.el.html(LoginView.template());
        return this;
    };

    this.initialize();
}

/* Templates */
LoginView.template = Handlebars.compile($("#login-template").html());