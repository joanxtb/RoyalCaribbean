var SILLY = (function (module) {
    
    module.DoIt = function(container) {
        container.prepend(Date() + '<br/>');
    };

    return module;
}(SILLY || {}));