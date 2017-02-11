'use strict';

describe("Calling the subtract-function on a moment", function(){
    moment.period
        .add({name: 'subtractTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'subtractTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit", function(){
        var testObj =         { years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            testMoment = moment.utc(testObj),
            subtractYear =       { years :2009, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            subtractMonth =      { years :2010, months :4, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            subtractQuarter =    { years :2010, months :2, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            subtractWeek =       { years :2010, months :4, date :29, hours :5, minutes :8, seconds :3, milliseconds : 9 },
            subtractIsoWeek =    testObj,
            subtractDay =        { years :2010, months :5, date :4,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            subtractDate =       testObj,
            subtractHour =       { years :2010, months :5, date :5,  hours :4, minutes :8, seconds :3, milliseconds : 9 },
            subtractMinute =     { years :2010, months :5, date :5,  hours :5, minutes :7, seconds :3, milliseconds : 9 },
            subtractSecond =     { years :2010, months :5, date :5,  hours :5, minutes :8, seconds :2, milliseconds : 9 };

        expect(testMoment.clone().subtract(1, 'year').toObject()).toEqual(subtractYear);
        expect(testMoment.clone().subtract(1, 'month').toObject()).toEqual(subtractMonth);
        expect(testMoment.clone().subtract(1, 'quarter').toObject()).toEqual(subtractQuarter);
        expect(testMoment.clone().subtract(1, 'week').toObject()).toEqual(subtractWeek);
        expect(testMoment.clone().subtract(1, 'isoWeek').toObject()).toEqual(subtractIsoWeek);
        expect(testMoment.clone().subtract(1, 'day').toObject()).toEqual(subtractDay);
        expect(testMoment.clone().subtract(1, 'date').toObject()).toEqual(subtractDate);
        expect(testMoment.clone().subtract(1, 'hour').toObject()).toEqual(subtractHour);
        expect(testMoment.clone().subtract(1, 'minute').toObject()).toEqual(subtractMinute);
        expect(testMoment.clone().subtract(1, 'second').toObject()).toEqual(subtractSecond);
        expect(testMoment.clone().subtract(1, 'subtractTest').toObject()).toEqual(testObj);
    });

    it("should subtract an amount of it´s period-duration if called with 'p' or 'period'", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 }),
            subtract15Minutes =  { years :2010, months :5, date :5,  hours :5, minutes :13, seconds :3, milliseconds : 9 },
            subtract1Month =     { years :2010, months :4, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 },
            subtract2x15Minutes =  { years :2010, months :5, date :5,  hours :4, minutes :58, seconds :3, milliseconds : 9 },
            subtract2x1Month =     { years :2010, months :3, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 };

        expect(testMoment.clone().period('subtractTest15Minutes').subtract(1, 'p').toObject()).toEqual(subtract15Minutes);
        expect(testMoment.clone().period('subtractTest15Minutes').subtract(1, 'period').toObject()).toEqual(subtract15Minutes);
        expect(testMoment.clone().period('subtractTest1Month').subtract(1, 'p').toObject()).toEqual(subtract1Month);
        expect(testMoment.clone().period('subtractTest1Month').subtract(1, 'period').toObject()).toEqual(subtract1Month);

        expect(testMoment.clone().period('subtractTest15Minutes').subtract(2, 'p').toObject()).toEqual(subtract2x15Minutes);
        expect(testMoment.clone().period('subtractTest15Minutes').subtract(2, 'periods').toObject()).toEqual(subtract2x15Minutes);
        expect(testMoment.clone().period('subtractTest1Month').subtract(2, 'p').toObject()).toEqual(subtract2x1Month);
        expect(testMoment.clone().period('subtractTest1Month').subtract(2, 'periods').toObject()).toEqual(subtract2x1Month);
    });

    it("should subtract an amount of another period if called with period name", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :28, seconds :3, millisecond : 9 }),
            subtract15Minutes =  { years :2010, months :5, date :5,  hours :5, minutes :13, seconds :3, milliseconds : 9 },
            subtract1Month =     { years :2010, months :4, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 },
            subtract2x15Minutes =  { years :2010, months :5, date :5,  hours :4, minutes :58, seconds :3, milliseconds : 9 },
            subtract2x1Month =     { years :2010, months :3, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 };

        expect(testMoment.clone().subtract(1, 'subtractTest15Minutes').toObject()).toEqual(subtract15Minutes);
        expect(testMoment.clone().subtract(1, 'subtractTest1Month').toObject()).toEqual(subtract1Month);
        expect(testMoment.clone().subtract(2, 'subtractTest15Minutes').toObject()).toEqual(subtract2x15Minutes);
        expect(testMoment.clone().subtract(2, 'subtractTest1Month').toObject()).toEqual(subtract2x1Month);
    });
});