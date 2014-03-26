﻿var Storage = function(successCallback, errorCallback) {

    // owner
    this.setOwner = function (user, callback) {
        window.localStorage.setItem("owner", JSON.stringify(user));
        callback();
    };

    this.getOwner = function (callback) {
        var __owner = JSON.parse(window.localStorage.getItem("owner"));
        callLater(callback, __owner);
    };

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function (callback, data) {
        if (callback) {
            setTimeout(function () {
                callback(data);
            });
        }
    };

    callLater(successCallback);
};