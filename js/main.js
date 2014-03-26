var app = {        

    /* ROUTING */
    renderLogin: function () {
        var __html = 
            '<div class="main-wrapper">' + 
                '<div class="header">Royal Caribbean Logo</div>' + 
                '<div class="login-wrapper">' + 
                    '<form id="login-form">' + 
                        '<div class="editor-label">Username</div>' +
                        '<div class="editor-field"><input type="text" name="username" /></div>' + 
                        '<div class="editor-label">Password</div>' +
                        '<div class="editor-field"><input type="password" name="username" /></div>' +
                        '<div class="editor-field"><input type="submit" value="Log in" /></div>' +
                    '</form>' +
                '</div>' +
            '</div>'

        $('body').html(__html);
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
        self.renderLogin();        
    }
};

app.initialize();