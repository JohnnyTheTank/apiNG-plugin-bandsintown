"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.value("apingDefaultSettings", {
        apingApiKeys: {
            bandsintown: [{'app_id': 'apiNG'}],
        }
    });

}]);

