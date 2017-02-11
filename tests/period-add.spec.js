'use strict';

describe("Calling the add-function on a moment", function(){
    moment.period
        .add({name: 'addTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'addTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit", function(){
        var testObj =         { years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            testMoment = moment.utc(testObj),
            addYear =       { years :2011, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            addMonth =      { years :2010, months :6, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            addQuarter =    { years :2010, months :8, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            addWeek =       { years :2010, months :5, date :12, hours :5, minutes :8, seconds :3, milliseconds : 9 },
            addIsoWeek =    testObj,
            addDay =        { years :2010, months :5, date :6,  hours :5, minutes :8, seconds :3, milliseconds : 9 },
            addDate =       testObj,
            addHour =       { years :2010, months :5, date :5,  hours :6, minutes :8, seconds :3, milliseconds : 9 },
            addMinute =     { years :2010, months :5, date :5,  hours :5, minutes :9, seconds :3, milliseconds : 9 },
            addSecond =     { years :2010, months :5, date :5,  hours :5, minutes :8, seconds :4, milliseconds : 9 };

        expect(testMoment.clone().add(1, 'year').toObject()).toEqual(addYear);
        expect(testMoment.clone().add(1, 'month').toObject()).toEqual(addMonth);
        expect(testMoment.clone().add(1, 'quarter').toObject()).toEqual(addQuarter);
        expect(testMoment.clone().add(1, 'week').toObject()).toEqual(addWeek);
        expect(testMoment.clone().add(1, 'isoWeek').toObject()).toEqual(addIsoWeek);
        expect(testMoment.clone().add(1, 'day').toObject()).toEqual(addDay);
        expect(testMoment.clone().add(1, 'date').toObject()).toEqual(addDate);
        expect(testMoment.clone().add(1, 'hour').toObject()).toEqual(addHour);
        expect(testMoment.clone().add(1, 'minute').toObject()).toEqual(addMinute);
        expect(testMoment.clone().add(1, 'second').toObject()).toEqual(addSecond);
        expect(testMoment.clone().add(1, 'addTest').toObject()).toEqual(testObj);
    });

    it("should add an amount of it´s period-duration if called with 'p' or 'period'", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 }),
            add15Minutes =  { years :2010, months :5, date :5,  hours :5, minutes :43, seconds :3, milliseconds : 9 },
            add1Month =     { years :2010, months :6, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 },
            add2x15Minutes =  { years :2010, months :5, date :5,  hours :5, minutes :58, seconds :3, milliseconds : 9 },
            add2x1Month =     { years :2010, months :7, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 };

        expect(testMoment.clone().period('addTest15Minutes').add(1, 'p').toObject()).toEqual(add15Minutes);
        expect(testMoment.clone().period('addTest15Minutes').add(1, 'period').toObject()).toEqual(add15Minutes);
        expect(testMoment.clone().period('addTest1Month').add(1, 'p').toObject()).toEqual(add1Month);
        expect(testMoment.clone().period('addTest1Month').add(1, 'period').toObject()).toEqual(add1Month);

        expect(testMoment.clone().period('addTest15Minutes').add(2, 'p').toObject()).toEqual(add2x15Minutes);
        expect(testMoment.clone().period('addTest15Minutes').add(2, 'periods').toObject()).toEqual(add2x15Minutes);
        expect(testMoment.clone().period('addTest1Month').add(2, 'p').toObject()).toEqual(add2x1Month);
        expect(testMoment.clone().period('addTest1Month').add(2, 'periods').toObject()).toEqual(add2x1Month);
    });

    it("should add an amount of another period if called with period name", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :28, seconds :3, millisecond : 9 }),
            add15Minutes =  { years :2010, months :5, date :5,  hours :5, minutes :43, seconds :3, milliseconds : 9 },
            add1Month =     { years :2010, months :6, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 },
            add2x15Minutes =  { years :2010, months :5, date :5,  hours :5, minutes :58, seconds :3, milliseconds : 9 },
            add2x1Month =     { years :2010, months :7, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 };

        expect(testMoment.clone().add(1, 'addTest15Minutes').toObject()).toEqual(add15Minutes);
        expect(testMoment.clone().add(1, 'addTest1Month').toObject()).toEqual(add1Month);
        expect(testMoment.clone().add(2, 'addTest15Minutes').toObject()).toEqual(add2x15Minutes);
        expect(testMoment.clone().add(2, 'addTest1Month').toObject()).toEqual(add2x1Month);
    });
});