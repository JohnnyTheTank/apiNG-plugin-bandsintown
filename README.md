[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

[![Join the chat at https://gitter.im/JohnnyTheTank/apiNG](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/JohnnyTheTank/apiNG?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/aping-plugin-bandsintown.png)](https://badge.fury.io/js/aping-plugin-bandsintown)
[![Bower version](https://badge.fury.io/bo/apiNG-plugin-bandsintown.png)](https://badge.fury.io/bo/apiNG-plugin-bandsintown)

**_apiNG-plugin-bandsintown_** is a [BandsInTown v2 API](http://bandsintown.com/api/requests) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `event`**
* This plugin supports the [`get-native-data` parameter](https://aping.readme.io/docs/advanced#parameters)
* This plugin needs an [api key](#2-api-key) :warning:
* Used promise library: [angular-bandsintown-api-factory](https://github.com/JohnnyTheTank/angular-bandsintown-api-factory) _(included in distribution files)_

# Documentation
1. [INSTALLATION](#1-installation)
    1. Get file
    2. Include file
    3. Add dependency
    4. Add plugin
2. [API KEY](#2-api-key)
3. [USAGE](#3-usage)
    1. Models
    2. Requests

## 1. INSTALLATION

### I. Get file
Install via either [bower](http://bower.io/), [npm](https://www.npmjs.com/), CDN (jsDelivr) or downloaded files:

* `bower install apiNG-plugin-bandsintown --save`
* `npm install aping-plugin-bandsintown --save`
* use [CDN file](https://www.jsdelivr.com/projects/aping.plugin-bandsintown)
* download [apiNG-plugin-bandsintown.zip](https://github.com/JohnnyTheTank/apiNG-plugin-bandsintown/zipball/master)

### II. Include file
Include `aping-plugin-bandsintown.min.js` in your apiNG application

```html
<!-- when using bower -->
<script src="bower_components/apiNG-plugin-bandsintown/dist/aping-plugin-bandsintown.min.js"></script>

<!-- when using npm -->
<script src="node_modules/aping-plugin-bandsintown/dist/aping-plugin-bandsintown.min.js"></script>

<!-- when using cdn file -->
<script src="//cdn.jsdelivr.net/aping.plugin-bandsintown/latest/aping-plugin-bandsintown.min.js"></script>

<!-- when using downloaded files -->
<script src="aping-plugin-bandsintown.min.js"></script>
```

### III. Add dependency
Add the module `jtt_aping_bandsintown` as a dependency to your app module:
```js
angular.module('app', ['jtt_aping', 'jtt_aping_bandsintown']);
```

### IV. Add plugin
Add the plugin's directive `aping-bandsintown="[]"` to your apiNG directive and [configure your requests](#ii-requests)
```html
<aping
    template-url="templates/event.html"
    model="event"
    items="20"
    aping-bandsintown="[{'artist':'Prinz Pi'}]">
</aping>
```

## 2. API KEY
[Official BandsInTown Authentication Docs:](http://bandsintown.com/api/authentication)
> The application ID can be anything, but should be a word that describes your application or company.

Create and open `js/apiNG/aping-config.js` in your application folder. It should be look like this snippet:
```js
angular.module('jtt_aping').config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            bandsintown: [
                {'app_id':'<YOUR_BANDSINTOWN_APP_ID>'}
            ],
            //...
        }
    });
}]);
```

:warning: Replace `<YOUR_BANDSINTOWN_APP_ID>` with a word that describes your application or company

## 3. USAGE

### I. Models
Supported apiNG models

|  model   | content |
|----------|---------|
| `event` | **concerts, tours, shows** |


### II. Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.

#### Requests by Artist
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`artist`** | `Metallica` |  | Artist name (url escaped*), `mbid_<id>` (MusicBrainz ID), `fbid_<id>` (Facebook Page ID)  | no |
| **`artist_id`** | `mbid_65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab` |  | (fallback) artist id, `mbid_<id>` (MusicBrainz ID), `fbid_<id>` (Facebook Page ID) | yes |
| **`showAvatar`**  | `true` | `false` | Use `true` for show artists image |  yes  |
| **`items`**  | `20` | | Items per request (`0`-`n`) |  yes  |
| **`date`**  | `all` | `upcoming` | valid values: `yyyy-mm-dd`, `upcoming`, `all` |  yes  |
| **`start_date`**  | `2016-01-31` |  | Start date. format: `yyyy-mm-dd`. Needs `end_date` |  yes  |
| **`end_date`**  | `2016-04-15` |  | End date. format: `yyyy-mm-dd`. Needs `start_date` |  yes  |
| **`location`**  | `munich,germany` |  | Location to search `city,state` (US or CA), `city,country` |  yes  |
| **`lat`** | `-13.163333` |  | Latitude of the location. Needs `lng` | yes |
| **`lng`** | `-72.545556` |  | Longitude of the location. Needs `lat` | yes |
| **`distance`** | `10` | `25`  | Number (miles) of radius from location (or coordinates) | yes |
| **`recommended`** | `true` | `false` | Returns recommended events for a single artist matching search criteria | yes |
| **`exclude`** | `true` | `false` | If true, the response will only include matching events for artists similar to the specified artist. if false, the response may also include matching events for the specified artist. | yes |

Sample requests:
* `[{'artist':'Prinz Pi', 'showAvatar':true}]`
* `[{'artist':'Prinz Pi', 'location':'munich,germany', 'date':'all', 'recommended':true}]`


# Licence
MIT

