# extending-what3words-api [![Build Status](https://travis-ci.org/tsamaya/extending-what3words-api.svg?branch=master)](https://travis-ci.org/tsamaya/extending-what3words-api)

This repo is a sample how to extend [what3words API](https://docs.what3words.com/api/v2).

In my opinion, on a web application, using asynchronous request directly towards what3words API is a better solution. At least, this repos shows the bare code to achieve it.

# Build

## prerequisites
- node
- gulp

## Setup environnement
clone the repository
`$ cd extending-what3words-api`
`$ npm install`

## Test
`$ gulp test`

## W3W_API_KEY
Two options, what3words API key :
- is send as a query parameter at each request
- is set as an environment variable
`$ export W3W_API_KEY=YOUR-API-KEY`

## Run
`$ npm start`

It runs by default `$ node server.js`

# API

## reverse-ext

Based on https://docs.what3words.com/api/v2/#reverse, this API method returns 3 word address in various supported language by what3words using `geojson` format.

| Parameter | Type   | Description                                              |
| :--- | :---:  | :--- |
| coords    | String | Coordinates as a comma separated string of latitude and longitude |
| key       | String | A valid API key; if not supplied as a parameter, a key must be supplied as an environnement varaible W3W_API_KEY |
| langs     | Arrays | A list of supported 3 word address language as an [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 2 letter code.|

### Example request
`$ curl "http://localhost:3000/api/reverse-ext?coords=51.521251,-0.203586&langs=en,de,fr,it"`

### Example response
```javascript
{
  "crs": {
    "type": "link",
    "properties": {
      "href": "http://spatialreference.org/ref/epsg/4326/ogcwkt/",
      "type": "ogcwkt"
    }
  },
  "bbox": [
    -0.203607,
    51.521238,
    -0.203564,
    51.521265
  ],
  "geometry": {
    "coordinates": [
      -0.203586,
      51.521251
    ],
    "type": "Point"
  },
  "type": "Feature",
  "properties": {
    "words_en": "index.home.raft",
    "words_de": "welche.tischtennis.bekannte",
    "words_fr": "mitiger.tarir.prolonger",
    "words_it": "attuare.deliziato.ripensa",
    "status": {
      "status": 200,
      "reason": "OK"
    },
    "thanks": "Thanks from all of us at index.home.raft for using a what3words API"
  }
}
```

# Logs
logging uses winston
application logs and access log are store in logs folder.

## Application
`api.log` is the application log file

default log level is `info`
`$ export LOG_LEVEL=debug`

## Access
apache log format
access.log

# Demo
- runs the built-in server
  - `$ npm start`
- open your browser on [demo/index.html](demo/index.html)

Flag icons comes from [iconarchive.con](http://www.iconarchive.com/show/flat-europe-flag-icons-by-custom-icon-design.html)

# Issues
Find a bug or want to request a new feature?  Please let me know by submitting an issue.

# Licensing
Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.
