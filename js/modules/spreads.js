var SpreadsView = function (store) {    

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');

        /* events */
        this.el.on('click', '.bubble-comment', function (e) {
            e.preventDefault();
            var __this = $(this);
            __this.find(".number").hide();
            __this.addClass("wait");
            $($(this).attr('href')).slideToggle(function () {
                __this.find(".number").show();
                __this.removeClass('wait');
            });
        });
    }

    this.render = function () {
        this.el.html(SpreadsView.template());
        var __this = this;

        // get owner
        store.getOwner(function (owner) {
            showLoader();
            $("#main-title").html("Here's the brochure of " + owner.countryname);
            //console.log(owner);
            var __connector = new connector();
            __connector.getSpreads(owner.id, owner.idcountry, function (response) {
                hideLoader();
                console.log(response.model.spreads);
                $("#spread-list").html('');
                //$("#spread-list").append(response.model.spreads[0].countryName);
                response.model.spreads.forEach(function(country){                    
                    $("#spread-list").append(SpreadsView.litemplate(country));                
                });                
            }, function (response) {
                $("#spread-list").html('error retrieveing spreads');                
            });
        });

        return __this;
    }

    this.initialize();
}

/* Templates */
SpreadsView.template = Handlebars.compile($("#spreads-list-template").html());
SpreadsView.litemplate = Handlebars.compile($("#spread-li-template").html());