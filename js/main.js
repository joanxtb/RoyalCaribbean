var app = {    
    
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

        /* routes */
        this.spreadsURL = /^#spreads/;
        
        /* events */
        this.registerEvents();
        
        /* Local Storage */
        this.store = new Storage(function () {
            self.route(self.store);
        });        
    },

    /* REGISTER EVENTS */
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

        /* Main routing trigger */
        $(window).on('hashchange', $.proxy(this.route, this));

    },

    route: function () {
        var hash = window.location.hash;
        console.log(window.location.hash);
        if (!hash) {
            $('#main-wrapper').html(new LoginView(this.store).render().el);
            return;
        }

        // spreads
        if (hash.match(app.spreadsURL)) {
            //this.store.findById(Number(match[1]), function (employee) {
                $('#main-wrapper').html(new SpreadsView(this.store).render().el);
            //});
        }
    }
};

app.initialize();

/* ADDITIONAL FUNCTIONS */
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