'use strict';

describe("Calling the startOf-function on a moment", function(){
    moment.period
        .add({name: 'startOfTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'startOfTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit", function(){
        var testObj =           { years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            testMoment = moment.utc(testObj),
            startOfYear =       { years: 2010, months: 0, date: 1,  hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
            startOfMonth =      { years: 2010, months: 5, date: 1,  hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
            startOfQuarter =    { years: 2010, months: 3, date: 1,  hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
            startOfWeek =       { years: 2010, months: 4, date: 30, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
            startOfIsoWeek =    { years: 2010, months: 4, date: 31,  hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
            startOfDay =        { years: 2010, months: 5, date: 5,  hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
            startOfDate =       { years: 2010, months: 5, date: 5,  hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
            startOfHour =       { years: 2010, months: 5, date: 5,  hours: 5, minutes: 0, seconds: 0, milliseconds: 0 },
            startOfMinute =     { years: 2010, months: 5, date: 5,  hours: 5, minutes: 8, seconds: 0, milliseconds: 0 },
            startOfSecond =     { years: 2010, months: 5, date: 5,  hours: 5, minutes: 8, seconds: 3, milliseconds: 0 };

        expect(testMoment.clone().startOf('year').toObject()).toEqual(startOfYear);
        expect(testMoment.clone().startOf('month').toObject()).toEqual(startOfMonth);
        expect(testMoment.clone().startOf('quarter').toObject()).toEqual(startOfQuarter);
        expect(testMoment.clone().startOf('week').toObject()).toEqual(startOfWeek);
        expect(testMoment.clone().startOf('isoWeek').toObject()).toEqual(startOfIsoWeek);
        expect(testMoment.clone().startOf('day').toObject()).toEqual(startOfDay);
        expect(testMoment.clone().startOf('date').toObject()).toEqual(startOfDate);
        expect(testMoment.clone().startOf('hour').toObject()).toEqual(startOfHour);
        expect(testMoment.clone().startOf('minute').toObject()).toEqual(startOfMinute);
        expect(testMoment.clone().startOf('second').toObject()).toEqual(startOfSecond);
        expect(testMoment.clone().startOf('test').toObject()).toEqual(testObj);
    });

    it("should set the moment to the start of it´s period if called with 'p' or 'period'", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :28, seconds :3, millisecond : 9 }),
            startOf15Minutes =  { years: 2010, months: 5, date: 5,  hours: 5, minutes: 15, seconds: 0, milliseconds: 0 },
            startOf1Month =     { years: 2010, months: 5, date: 1,  hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };

        expect(testMoment.clone().period('startOfTest15Minutes').startOf('p').toObject()).toEqual(startOf15Minutes);
        expect(testMoment.clone().period('startOfTest15Minutes').startOf('period').toObject()).toEqual(startOf15Minutes);
        expect(testMoment.clone().period('startOfTest1Month').startOf('p').toObject()).toEqual(startOf1Month);
        expect(testMoment.clone().period('startOfTest1Month').startOf('period').toObject()).toEqual(startOf1Month);
    });

    it("should set the moment to the start of a period if called with period name", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :28, seconds :3, millisecond : 9 }),
            startOf15Minutes =  { years: 2010, months: 5, date: 5,  hours: 5, minutes: 15, seconds: 0, milliseconds: 0 },
            startOf1Month =     { years: 2010, months: 5, date: 1,  hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };

        expect(testMoment.clone().startOf('startOfTest15Minutes').toObject()).toEqual(startOf15Minutes);
        expect(testMoment.clone().startOf('startOfTest1Month').toObject()).toEqual(startOf1Month);
    });
});