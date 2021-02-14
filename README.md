# moment-period
[![MIT License][license-image]][license-url]
[![Build Status][azure-pipeline-image]][azure-pipeline-url]
[![npm version][npm-image]][npm-url]
[![npm downloads][downloads-image]][npm-url]

[![Buy me a coffee][buy-me-a-coffee-image]][buy-me-a-coffee-url]

Handling periods in moment.js

## Getting Started
moment-period can be included into your app in different ways:

### Node.js
moment-period can be installed with npm and required into a script:
```
npm install --save moment-period
```
```js
var moment = require('moment');
require('moment-period');
```


### Browser
Just include the momentjs script and somewhere after that the moment-period script:
```html
<script src="moment.min.js"></script>
<script src="moment-period.min.js"></script>
```

### Browser with Require.js
```js
define(["moment", "moment-period"], function (moment) {
    // you probably won´t need a reference to moment-period istself, so include it last
});
```

### Bower
```
bower install --save moment-period
```


## Register periods
New periods can be registered with an object or an array of objects
```js
moment.period.add({
    name: '30min',
    count: 30,          // optional (default: 1)
    unit: 'minutes',
    format: 'LT'        // optional
});

moment.period.add([
    {
        name: '1h',     // 1 hour
        unit: 'hour'
    },
    {
        name: '1d',     // 1 day
        unit: 'day'
    }]).add({
        name: 'fy',     // fiscal year
        unit: 'year',
        format: function() {    // yes, you can define an own format-function
            return this.year() + '/' + (this.year() + 1);
        },
        align: function() {     // function to set the current moment to the start of the period
            var year = this.year(),
                month = this.month();

            return this.year(month < 5 ? year - 1 : year)).month(5).startOf('month');
        }
    });

```

## Setting a default period
```js
moment.period.setDefault('30min');
```

## Converting a moment to a period
```js
var period = moment.utc("2013-02-08 09:38:26").period('30min');

period.format();    // "2013-02-08T09:38:26Z"
```

## Working with periods
### Get the current period
```js
period.period(); // "30min"
```

### Set to start of period
```js
period.clone().period(true).format(); // "2013-02-08T09:30:00Z"

period.clone().startOf('period').format(); // "2013-02-08T09:30:00Z"
```

### Set to end of period
```js
period.clone().period(false).format(); // "2013-02-08T09:59:59Z"

period.clone().endOf('period').format(); // "2013-02-08T09:59:59Z"
```

### Get beginn and end of period
```js
var fromTo = period.fromTo();

// same as
var fromTo = {
    from: period.clone().startOf('p'),
    to: period.clone().endOf('p')
};
```
### Adding and subtracting periods
```js
moment().add(3, '30min');   // current moment plus 3 x 30min
period.add(1, 'p'); // next period
period.subtract(1, 'p'); // previous period
```

### Comparing periods
All the comparing functions of moment.js also work with periods if the last parameter is a
valid period-name, "p", "period" oder "periods".
- isAfter(moment, period)
- isBefore(moment, period)
- isSame(moment, period)
- isSameOrBefore(moment, period)
- isSameOrAfter(moment, period)
- isBetween(momentA, momentB, period)
- isBetween(momentA, momentB, period, inclusivity)

### Removing a period
```js
period.period(null).period(); // undefined or default-period
```

### Removing the default period
```js
moment.period.setDefault(null);
```

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[versioneye-image]: https://www.versioneye.com/user/projects/58a0655f940b230032da590e/badge.svg
[versioneye-url]: https://www.versioneye.com/user/projects/58a0655f940b230032da590e

[npm-image]: https://badge.fury.io/smartin85/moment-period.svg
[npm-url]: https://www.npmjs.com/package/moment-period

[downloads-image]: https://img.shields.io/npm/dt/moment-period.svg

[azure-pipeline-image]: https://dev.azure.com/smartin85/moment-period/_apis/build/status/smartin85.moment-period?branchName=master
[azure-pipeline-url]: https://dev.azure.com/smartin85/moment-period/_build/latest?definitionId=1&branchName=master

[buy-me-a-coffee-image]: https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png
[buy-me-a-coffee-url]: https://www.buymeacoffee.com/smartin