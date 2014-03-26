var app = {    

    /* ROUTING */
    renderLogin: function () {        
        $('#main-wrapper').html(this.loginTemplate());
    },

    /* FEEDBACK */
    showAlert: function (message, title) {
        if (navigator.notification)
            navigator.notification.alert(message, null, title, 'OK');
        else
            alert(title ? (title + ': ' + message) : message);
    },

    /* INIT */
    initialize: function() {
        var self = this;
        //self.showAlert('Application initialized successfully', 'Royal Caribbean')
        this.loginTemplate = Handlebars.compile($("#login-template").html());
        self.renderLogin();        
    }
};

app.initialize();

/* Click Handlers */
$(document).on('click', '#btn-login', function (e) {
    e.preventDefault();
    showLoader();
});

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