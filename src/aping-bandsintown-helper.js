"use strict";

angular.module("jtt_aping_bandsintown")
    .service('apingBandsintownHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
        this.getThisPlattformString = function () {
            return "bandsintown";
        };

        this.getThisPlatformLink = function () {
            return "http://bandsintown.com/";
        };

        this.compareStrings = function (_string1, _string2) {
            return _string1.toLowerCase().trim().replace(/ /g, "") === _string2.toLowerCase().trim().replace(/ /g, "");

        };

        this.getArtistFromArray = function (_array, _artistName) {
            var returnObject = {
                artist_name: undefined,
                artist_id: undefined,
                artist_link: undefined,
                img_url: undefined,
            };
            var found = false;
            if (_array.length > 0) {
                var _this = this;
                angular.forEach(_array, function (value, key) {
                    if (typeof value.name !== "undefined" && !found) {
                        if (_this.compareStrings(value.name, _artistName)) {
                            returnObject = {
                                artist_name: value.name,
                                artist_id: value.mbid || undefined,
                                artist_link: value.website || value.facebook_tour_dates_url || undefined,
                                img_url: value.image_url || value.thumb_url || undefined,
                            };
                            found = true;
                        }
                    }
                });
                if (!found) {
                    returnObject = {
                        artist_name: _array[0].name,
                        artist_id: _array[0].mbid || undefined,
                        artist_link: _array[0].website || _array[0].facebook_tour_dates_url || undefined,
                        img_url: _array[0].image_url || _array[0].thumb_url || undefined,
                    };
                }
            }
            return returnObject;
        };

        this.getObjectByJsonData = function (_data, _helperObject) {
            var requestResults = [];
            if (_data) {
                var _this = this;

                angular.forEach(_data.data, function (value, key) {

                    if (typeof _helperObject.items === "undefined" || (_helperObject.items > 0 && requestResults.length < _helperObject.items)) {
                        var tempResult;
                        if (_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                            tempResult = value;
                        } else {
                            tempResult = _this.getItemByJsonData(value, _helperObject);
                        }
                        if (tempResult) {
                            requestResults.push(tempResult);
                        }
                    }
                });


            }
            return requestResults;
        };

        this.getItemByJsonData = function (_item, _helperObject) {
            var returnObject = {};
            if (_item && _helperObject.model) {
                switch (_helperObject.model) {
                    case "event":
                        returnObject = this.getEventItemByJsonData(_item, _helperObject);
                        break;

                    default:
                        return false;
                }
            }
            return returnObject;
        };

        this.getEventItemByJsonData = function (_item, _helperObject) {
            var eventObject = apingModels.getNew("event", this.getThisPlattformString());

            angular.extend(eventObject, {
                start_timestamp: _item.datetime ? new Date(_item.datetime).getTime() : undefined,
                start_date_time: _item.datetime ? new Date(_item.datetime) : undefined,
                event_url: _item.facebook_rsvp_url || undefined, //URL to the event
                ticket_url: _item.ticket_url || undefined, //URL to the ticket
                intern_id: _item.id || undefined, // INTERN ID of event
                caption: _item.title || undefined,
                source: _item.artists || undefined,
                sold_out: _item.ticket_status ? _item.ticket_status === "unavailable" : undefined,
            });

            if (_item.artists && _item.artists.length > 0) {
                var artistTempObject = this.getArtistFromArray(_item.artists, _helperObject.artist);

                if (typeof artistTempObject.artist_name !== "undefined") {
                    eventObject.artist_name = artistTempObject.artist_name;
                }
                if (typeof artistTempObject.artist_id !== "undefined") {
                    eventObject.artist_id = artistTempObject.artist_id;
                }
                if (typeof artistTempObject.artist_link !== "undefined") {
                    eventObject.artist_link = artistTempObject.artist_link;
                }
                if (typeof artistTempObject.img_url !== "undefined" && _helperObject.showAvatar) {
                    eventObject.img_url = artistTempObject.img_url;
                }
            }

            if (typeof _item.venue !== "undefined") {
                eventObject.place_name = _item.venue.name || undefined;
                eventObject.city = _item.venue.city || undefined;
                eventObject.country = _item.venue.country || undefined;
                eventObject.latitude = _item.venue.latitude || undefined;
                eventObject.longitude = _item.venue.longitude || undefined;
            }

            return eventObject;
        };
    }]);