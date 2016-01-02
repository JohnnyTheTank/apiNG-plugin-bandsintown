"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {
        bandsintown: [{'app_id':'apiNG'}],
    });

    $provide.constant("apingDefaultSettings", {
        templateUrl : "aping_design_blanko.html",
        items : 100, //items per request
        maxItems: 100, //max items per aping
        orderBy : "start_timestamp",
        orderReverse : "true",
        model: "event",
        getNativeData: false,
        removeDoubles: false,
    });

}]);