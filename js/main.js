var app = {    

    /* ROUTING */
    renderLogin: function () {        
        
    },

    /* FEEDBACK */
    showAlert: function (message, title) {
        if (navigator.notification)
            navigator.notification.alert(message, null, title, 'OK');
        else
            alert(title ? (title + ': ' + message) : message);
    },

    /* INIT */
    initialize: function () {        
        var self = this;
        this.registerEvents();
        $('#main-wrapper').html(new LoginView().render().el);
        //self.showAlert('Application initialized successfully', 'Royal Caribbean')
        //this.loginTemplate = Handlebars.compile($("#login-template").html());
        //self.renderLogin();        
    },

    registerEvents: function () {
        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        }
    }
};

app.initialize();



function showLoader() {
    $.blockUI({
        message: $('#loading'),
        css: { border: 'none' },
        baseZ: 99999
    });
}
function hideLoader() {
    $.unblockUI();
}