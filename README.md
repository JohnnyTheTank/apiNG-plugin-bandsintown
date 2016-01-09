[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

**_apiNG-plugin-bandsintown_** is a [BandsInTown v2 API](http://bandsintown.com/api/requests) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `event`**
* Used promise library: [angular-bandsintown-api-factory](https://github.com/JohnnyTheTank/angular-bandsintown-api-factory) _(included in minified distribution file)_

# Documentation
    I.   INSTALLATION
    II.  API KEY
    III. USAGE

## I. INSTALLATION
    a) Get file
    b) Include file
    c) Add dependencies
    d) Add the plugin

### a) Get file
You can choose your preferred method of installation:

1. Install via either [bower](http://bower.io/), [npm](https://www.npmjs.com/) or downloaded files:
    1. `bower install apiNG-plugin-bandsintown --save`
    2. `npm install aping-plugin-bandsintown --save`
    3. download [apiNG-plugin-bandsintown.zip](https://github.com/JohnnyTheTank/apiNG-plugin-bandsintown/zipball/master)

### b) Include file
Include `aping-plugin-bandsintown.min.js` in your apiNG application

```html
<!-- when using bower -->
<script src="bower_components/apiNG-plugin-bandsintown/dist/aping-plugin-bandsintown.min.js"></script>

<!-- when using npm -->
<script src="node_modules/aping-plugin-bandsintown/dist/aping-plugin-bandsintown.min.js"></script>

<!-- when using downloaded files -->
<script src="aping-plugin-bandsintown.min.js"></script>
```

### c) Add dependencies
Add the module `jtt_aping_bandsintown` as a dependency to your app module:
```js
var app = angular.module('app', ['jtt_aping', 'jtt_aping_bandsintown']);
```

### d) Add the plugin
Add the plugin's directive `aping-bandsintown="[]"` to your apiNG directive and configure your requests (_**III. USAGE**_)
```html
<aping
    template-url="templates/event.html"
    model="event"
    items="20"
    aping-bandsintown="[{'artist':'Prinz Pi'}]">
</aping>
```

## II. API KEY
[Official BandsInTown Authentication Docs:](http://bandsintown.com/api/authentication)
> The application ID can be anything, but should be a word that describes your application or company.

Open `js/apiNG/aping-config.js` in your application folder. It should be look like this snippet:
```js
apingApp.config(['$provide', function ($provide) {
    $provide.constant("apingApiKeys", {
        //...
        bandsintown: [
            {'app_id':'<YOUR_BANDSINTOWN_APP_ID>'}
        ],
        //...
    });

    $provide.constant("apingDefaultSettings", {
        //...
    });
}]);
```

:warning: Replace `<YOUR_BANDSINTOWN_APP_ID>` with a word that describes your application or company

## III. USAGE
    a) Models
    b) Requests

### a) Models
Supported apiNG models

|  model   | content |
|----------|---------|
| `event` | **concerts, tours, shows** |


### b) Requests
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

