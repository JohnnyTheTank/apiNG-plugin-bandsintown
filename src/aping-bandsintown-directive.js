"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-bandsintown
 @licence MIT
 */

var jjtApingBandsintown = angular.module("jtt_aping_bandsintown", ['jtt_bandsintown'])
    .directive('apingBandsintown', ['apingBandsintownHelper', 'apingUtilityHelper', 'bandsintownFactory', function (apingBandsintownHelper, apingUtilityHelper, bandsintownFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingBandsintown, apingBandsintownHelper.getThisPlattformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                        showAvatar : request.showAvatar || false,
                        artist: request.artist || undefined
                    };
                    if(typeof request.items !== "undefined") {
                        helperObject.items = request.items;
                    } else {
                        helperObject.items = appSettings.items;
                    }
                    if(typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        app_id: apingUtilityHelper.getApiCredentials(apingBandsintownHelper.getThisPlattformString(), "app_id") || 'apiNG',
                    };

                    if(typeof request.items !== "undefined") {
                        requestObject.count = request.items;
                    } else {
                        requestObject.count = appSettings.items;
                    }

                    if(requestObject.count == 0) {
                        return false;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if(requestObject.count < 0 || isNaN(requestObject.count)) {
                        requestObject.count = undefined;
                    }

                    if(request.artist) {

                        requestObject.artist = request.artist;

                        if(typeof request.artist_id !== "undefined") {
                            requestObject.artist_id = request.artist_id;
                        }

                        if(typeof request.date !== "undefined") {
                            requestObject.date = request.date;
                        }

                        if(typeof request.start_date !== "undefined" && typeof request.end_date !== "undefined") {
                            requestObject.date = request.start_date+","+request.end_date;
                        }

                        if( typeof request.location !== "undefined"
                            || (typeof request.lat !== "undefined" && typeof request.lng !== "undefined" )
                            || typeof request.ip_address !== "undefined"
                        ) {
                            if(typeof request.location !== "undefined") {
                                requestObject.location = request.location;
                            } else if(typeof request.lat !== "undefined" && typeof request.lng !== "undefined") {
                                requestObject.location = request.lat + ","+request.lng;
                            } else {
                                requestObject.location = request.ip_address;
                            }

                            if(typeof request.distance !== "undefined") {
                                requestObject.radius = request.distance;
                            }

                            if(request.recommended === true || request.recommended === "true") {

                                if(typeof request.exclude !== "undefined") {
                                    requestObject.only_recs = request.exclude;
                                }

                                bandsintownFactory.getRecommendedEventsFromArtistByLocation(requestObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingBandsintownHelper.getObjectByJsonData(_data, helperObject));
                                            return;
                                        }
                                    });
                            } else {
                                bandsintownFactory.getEventsFromArtistByLocation(requestObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingBandsintownHelper.getObjectByJsonData(_data, helperObject));
                                            return;
                                        }
                                    });
                            }
                        } else {
                            bandsintownFactory.getEventsFromArtist(requestObject)
                                .success(function (_data) {
                                    if (_data) {
                                        apingController.concatToResults(apingBandsintownHelper.getObjectByJsonData(_data, helperObject));
                                    }
                                });
                        }
                    }


                });
            }
        }
    }]);