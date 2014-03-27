var app = {    
    
    store: null,

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
        this.logoutURL = /^#exit/;
        
        /* events */
        this.registerEvents();
        
        /* Local Storage */
        this.store = new Storage(function () {
            self.route(self.store);
        });

        Handlebars.registerHelper("isEquals", function (conditional, options) {
            console.log(options.hash.desired + " = " + options.hash.type);
            if (options.hash.desired === options.hash.type) {                
                return options.fn(this);
            } else {                
                return options.inverse(this);
            }
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

    /* ROUTING */
    route: function () {
        var hash = window.location.hash;
        
        /* Login */
        if (!hash) {
            // look for local storage:
            var __store = this.store;
            __store.getOwner(function (owner) {
                if (owner != null) 
                    $('#main-wrapper').html(new SpreadsView(__store).render().el); // spreads view
                else
                    $('#main-wrapper').html(new LoginView(__store).render().el); // login page    
            });            
        }

        /* Spreads */
        if (hash.match(app.spreadsURL)) {
            $('#main-wrapper').html(new SpreadsView(this.store).render().el);            
        }

        /* Exit */
        if (hash.match(app.logoutURL)) {
            this.store.clearOwner(function () {
                $("#menu").animate({ left: '-166px' }, 0, function () { menuStatus = false; });
                window.location.hash = '';
            });            
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

var menuStatus = false;

/* Events */
$(document).on('click', '#btnMainMenu', function (e) {
    e.preventDefault();
    if (menuStatus == false) {
        // closed -> open it
        $("#menu").animate({ left: '0px' }, 300, function () { menuStatus = true; });
    } else {
        // opened -> close it
        $("#menu").animate({ left: '-166px' }, 300, function () { menuStatus = false; });
    }
});

$(document).on('click', '#btnExit', function (e) {
    e.preventDefault();
    window.location.hash = '#exit';
});

$(document).on('swipeleft', '.post-header-content', function () {
    if (menuStatus) {
        // opened -> close it
        $("#menu").animate({ left: '-166px' }, 300, function () { menuStatus = false; });
    }
});

$(document).on('swiperight', '.post-header-content', function () {
    if (!menuStatus) {
        // closed -> open it
        $("#menu").animate({ left: '0px' }, 300, function () { menuStatus = true; });
    }
});