"use strict";
angular.module('jtt_aping').config(['$provide', function ($provide) {

    $provide.value("apingDefaultSettings", {
        apingApiKeys: {
            bandsintown: [{'app_id': 'apiNG'}],
        }
    });

}]);

