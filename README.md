# Alma Utils
A Javascript library to abstract Ex Libris Alma API functionality into easy to use Javascript functions.

#### A note before you start...
The Alma API requires an API key, which this library uses to make calls against the API. It's recommended that you **use this library on the server-side only** so that your API key is not exposed to any public-facing client applications.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Getting started](#getting-started)
    - [The `config` object](#the-config-object)
- [API](#api)
    - [`async fetchReport( String: endpoint, String: path, String?: format ): Array<String|Object>`](#async-fetchreport-string-endpoint-string-path-string-format--arraystringobject)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install
```
npm install --save alma-utils
```

## Getting started
The AlmaUtils library has a single entry point, `initAlmaUtils`, which returns an object with all of the functions available.
```js
import { initAlmaUtils } from 'alma-utils';
// or with ES5 syntax:
// var initAlmaUtils = require( 'alma-utils' ).default;

const config = {
  host: 'https://api-na.hosted.exlibrisgroup.com',
  apiKey: 'YOUR API KEY HERE',
  maxRequestsPerSecond: 25
};

const AlmaUtils = initAlmaUtils( config );
```
#### The `config` object
| Property | Type | Description |
| - | - | - |
| host | String | The Ex Libris server URL where the Alma API is hosted. |
| apiKey | String | The API key provisioned for your organization. |
| maxRequestsPerSecond | Number | Maximum concurrent requests per second. The maximum value for this as of writing is 25. |

## API

#### `async fetchReport( String: endpoint, String: path, String?: format ): Array<String|Object>`
Fetches the results of a report.

Returns `Array<String|Object>` or `Promise` if not using async/await.

Because the Alma Reports API sets a limit of 1000 items per request, this function fetches the entire dataset by making multiple requests, then returns an array of the *raw* responses, in either XML (as Strings) or JSON (parsed from the XML) format.

```js
const reportsEndpoint = '/almaws/v1/analytics/reports';

// Raw XML
const xmlResponse = await AlmaUtils.fetchReport( reportsEndpoint, 'YOUR REPORTS PATH', 'xml' );

// Raw JSON
const jsonResponse = await AlmaUtils.fetchReport( reportsEndpoint, 'YOUR REPORTS PATH', 'json' );
```
See [the Alma Documentation](https://developers.exlibrisgroup.com/alma/apis/docs/analytics/R0VUIC9hbG1hd3MvdjEvYW5hbHl0aWNzL3JlcG9ydHM=/) for more details about the Alma REST API.

| Argument | Type | Description |
| - | - | - |
| endpoint | String | The API endpoint to call. Most likely to be `/almaws/v1/analytics/reports` barring extraordinary circumstances. |
| path | String | Full path to the report. **Must be URL encoded**. Taken from the Analytics UI URL. |
| format | String **(optional)** | Possible values: `'xml', 'json'`. Determines whether to return an array of XML strings, or JSON objects parsed from the XML, respectively. |
