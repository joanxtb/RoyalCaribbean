var connector = function(SuccessCallback, ErrorCallback){

    var apiUrl = 'http://joanxtb.asuscomm.com:16412/';
    
    /* Login */
    this.login = function (username, password, successCallback, errorCallback) {
        var __url = apiUrl + "mobile/login";
        var __data = { username: username, password: password };
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: __url,            
            data: __data,            
            crossDomain: true,
            success: function (response) {                
                successCallback(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {                
                errorCallback({ message: errorThrown });
            }
        });        
    };

    /* Spreads for Owner */
    this.getSpreads = function (id, idcountry, successCallback, errorCallback) {
        var __url = apiUrl + "mobile/spreads";
        var __data = { id: id, idcountry: idcountry };
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: __url,
            data: __data,
            crossDomain: true,
            success: function (response) {
                successCallback(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback({ message: errorThrown });
            }
        });
    }
};