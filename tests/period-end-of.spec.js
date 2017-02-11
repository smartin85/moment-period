'use strict';

describe("Calling the endOf-function on a moment", function(){
    moment.period
        .add({name: 'endOfTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'endOfTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit", function(){
        var testObj =         { years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            testMoment = moment.utc(testObj),
            endOfYear =       { years: 2010, months: 11,date: 31, hours:23, minutes:59, seconds:59, milliseconds:999 },
            endOfMonth =      { years: 2010, months: 5, date: 30, hours:23, minutes:59, seconds:59, milliseconds:999 },
            endOfQuarter =    { years: 2010, months: 5, date: 30, hours:23, minutes:59, seconds:59, milliseconds:999 },
            endOfWeek =       { years: 2010, months: 5, date: 5,  hours:23, minutes:59, seconds:59, milliseconds:999 },
            endOfIsoWeek =    { years: 2010, months: 5, date: 6,  hours:23, minutes:59, seconds:59, milliseconds:999 },
            endOfDay =        { years: 2010, months: 5, date: 5,  hours:23, minutes:59, seconds:59, milliseconds:999 },
            endOfDate =       { years: 2010, months: 5, date: 5,  hours:23, minutes:59, seconds:59, milliseconds:999 },
            endOfHour =       { years: 2010, months: 5, date: 5,  hours: 5, minutes:59, seconds:59, milliseconds:999 },
            endOfMinute =     { years: 2010, months: 5, date: 5,  hours: 5, minutes: 8, seconds:59, milliseconds:999 },
            endOfSecond =     { years: 2010, months: 5, date: 5,  hours: 5, minutes: 8, seconds: 3, milliseconds:999 };

        expect(testMoment.clone().endOf('year').toObject()).toEqual(endOfYear);
        expect(testMoment.clone().endOf('month').toObject()).toEqual(endOfMonth);
        expect(testMoment.clone().endOf('quarter').toObject()).toEqual(endOfQuarter);
        expect(testMoment.clone().endOf('week').toObject()).toEqual(endOfWeek);
        expect(testMoment.clone().endOf('isoWeek').toObject()).toEqual(endOfIsoWeek);
        expect(testMoment.clone().endOf('day').toObject()).toEqual(endOfDay);
        expect(testMoment.clone().endOf('date').toObject()).toEqual(endOfDate);
        expect(testMoment.clone().endOf('hour').toObject()).toEqual(endOfHour);
        expect(testMoment.clone().endOf('minute').toObject()).toEqual(endOfMinute);
        expect(testMoment.clone().endOf('second').toObject()).toEqual(endOfSecond);
        expect(testMoment.clone().endOf('endOfTest').toObject()).toEqual(testObj);
    });

    it("should set the moment to the end of it´s period if called with 'p' or 'period'", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :28, seconds :3, millisecond : 9 }),
            endOf15Minutes =  { years: 2010, months: 5, date: 5,  hours: 5, minutes: 29, seconds: 59, milliseconds: 999 },
            endOf1Month =     { years: 2010, months: 5, date: 30, hours:23, minutes:59, seconds:59, milliseconds:999 };

        expect(testMoment.clone().period('endOfTest15Minutes').endOf('p').toObject()).toEqual(endOf15Minutes);
        expect(testMoment.clone().period('endOfTest15Minutes').endOf('period').toObject()).toEqual(endOf15Minutes);
        expect(testMoment.clone().period('endOfTest1Month').endOf('p').toObject()).toEqual(endOf1Month);
        expect(testMoment.clone().period('endOfTest1Month').endOf('period').toObject()).toEqual(endOf1Month);
    });

    it("should set the moment to the end of a period if called with period name", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :28, seconds :3, millisecond : 9 }),
            endOf15Minutes =  { years: 2010, months: 5, date: 5,  hours: 5, minutes: 29, seconds: 59, milliseconds: 999 },
            endOf1Month =     { years: 2010, months: 5, date: 30, hours:23, minutes:59, seconds:59, milliseconds:999 };

        expect(testMoment.clone().endOf('endOfTest15Minutes').toObject()).toEqual(endOf15Minutes);
        expect(testMoment.clone().endOf('endOfTest1Month').toObject()).toEqual(endOf1Month);
    });
});