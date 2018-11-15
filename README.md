# d2l-save-status
[![Build Status](https://travis-ci.org/Brightspace/d2l-save-status.svg?branch=master)](https://travis-ci.org/Brightspace/d2l-save-status)

Polymer based web-component to display save status


## Usage
Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import `d2l-save-status.html`:

##### Display a save status:
```html
<head>
	<link rel="import" href="../d2l-save-status/d2l-save-status.html">
</head>
<body>
	<d2l-save-status id="save-status"></d2l-save-status>
</body>
```
##### Change save status display:
```javascript

// Show Saving
this.$['save-status'].start();

// Show Saved
this.$['save-status'].end();

// Force immediate end with no time delay
this.$['save-status'].forceEnd();

// Hide Saving when there is an error when saving
this.$['save-status'].error();

```

## Viewing Your Element

```
$ polymer serve
```

The demo can be viewed at http://127.0.0.1:8081/components/d2l-save-status/demo/d2l-save-status-demo.html

## Running Tests

```
$ npm run test:wct:local
```

