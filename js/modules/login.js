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
            $.validator.unobtrusive.parse("#login-form");
            var __this = $(this);
            console.log(__this.valid())
            if (__this.valid()) {
                showLoader();
                var __connector = new connector();
                __connector.login($("#txtUsername").val(), $("#txtPassword").val(), function (response) {
                    
                    // success callback       
                    hideLoader();
                    if (response.success == true) {
                        // save owner locally
                        store.setOwner(response.user, function () { window.location.hash = '#spreads'; });                        
                    }
                    else
                        __this.find('.message').html(response.message);

                }, function (response) {
                    
                    // error callback
                    hideLoader();
                    __this.find('.message').html(response.message);

                });                
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