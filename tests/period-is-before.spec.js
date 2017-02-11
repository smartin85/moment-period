'use strict';

describe("Calling the isBefore-function on a moment", function(){
    var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 });
    moment.period
        .add({name: 'isBeforeTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'isBeforeTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit or undefined", function(){
        expect(testMoment.isBefore(testMoment.clone())).toBe(false);
        expect(testMoment.isBefore(testMoment.clone().subtract(1, 'hour'))).toBe(false);
        expect(testMoment.isBefore(testMoment.clone().add(1, 'hour'))).toBe(true);
        expect(testMoment.isBefore(testMoment.clone().add(1, 'isBeforeTest15Minutes'))).toBe(true);
        expect(testMoment.isBefore(testMoment.clone().subtract(1, 'isBeforeTest15Minutes'))).toBe(false);
        expect(testMoment.isBefore(testMoment.clone().endOf('year'), 'year')).toBe(false);
        expect(testMoment.isBefore(testMoment.clone().endOf('year'), 'month')).toBe(true);
    });

    it("should compare the periods if called with 'p' or 'period'", function() {
        expect(testMoment.clone().period('isBeforeTest15Minutes').isBefore(testMoment.clone(), 'p')).toBe(false);
        expect(testMoment.clone().period('isBeforeTest15Minutes').isBefore(testMoment.clone(), 'period')).toBe(false);
        expect(testMoment.clone().period('isBeforeTest1Month').isBefore(testMoment.clone().period('isBeforeTest15Minutes'), 'period')).toBe(false);
        expect(testMoment.clone().period('isBeforeTest15Minutes').isBefore(testMoment.clone().period('isBeforeTest1Month'), 'period')).toBe(false);

        expect(testMoment.clone().period('isBeforeTest15Minutes').isBefore(testMoment.clone().add(1, 'minute'), 'p')).toBe(false);
        expect(testMoment.clone().period('isBeforeTest15Minutes').isBefore(testMoment.clone().add(2, 'minutes'), 'p')).toBe(false);
        expect(testMoment.clone().period('isBeforeTest15Minutes').isBefore(testMoment.clone().subtract(28, 'minutes'), 'period')).toBe(false);
        expect(testMoment.clone().period('isBeforeTest15Minutes').subtract(29, 'minutes').isBefore(testMoment.clone(), 'period')).toBe(true);
    });

    it("should compare two moments with a given period", function() {
        expect(testMoment.clone().subtract(28, 'minutes').isBefore(testMoment.clone(), 'isBeforeTest15Minutes')).toBe(true);
        expect(testMoment.clone().subtract(28, 'minutes').isBefore(testMoment.clone(), 'isBeforeTest1Month')).toBe(false);
    });
});