# moment-period
[![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]  

Handling periods in moment.js

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
                month = this.month(),
                date = this.date();

            return this.year(month < 5 || (month === 5 && date < 1 ? year - 1 : year)).month(5).startOf('month');
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

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[travis-url]: http://travis-ci.org/smartin85/moment-period
[travis-image]: https://travis-ci.org/smartin85/moment-period.svg?branch=master