'use strict';

describe("Calling the isSameOrBefore-function on a moment", function(){
    var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 });
    moment.period
        .add({name: 'isSameOrBeforeTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'isSameOrBeforeTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit or undefined", function(){
        expect(testMoment.isSameOrBefore(testMoment.clone())).toBe(true);
        expect(testMoment.isSameOrBefore(testMoment.clone().subtract(1, 'hour'))).toBe(false);
        expect(testMoment.isSameOrBefore(testMoment.clone().add(1, 'hour'))).toBe(true);
        expect(testMoment.isSameOrBefore(testMoment.clone().add(1, 'isSameOrBeforeTest15Minutes'))).toBe(true);
        expect(testMoment.isSameOrBefore(testMoment.clone().subtract(1, 'isSameOrBeforeTest15Minutes'))).toBe(false);
        expect(testMoment.isSameOrBefore(testMoment.clone().endOf('year'), 'year')).toBe(true);
        expect(testMoment.isSameOrBefore(testMoment.clone().endOf('year'), 'month')).toBe(true);
    });

    it("should compare the periods if called with 'p' or 'period'", function() {
        expect(testMoment.clone().period('isSameOrBeforeTest15Minutes').isSameOrBefore(testMoment.clone(), 'p')).toBe(true);
        expect(testMoment.clone().period('isSameOrBeforeTest15Minutes').isSameOrBefore(testMoment.clone(), 'period')).toBe(true);
        expect(testMoment.clone().period('isSameOrBeforeTest1Month').isSameOrBefore(testMoment.clone().period('isSameOrBeforeTest15Minutes'), 'period')).toBe(true);
        expect(testMoment.clone().period('isSameOrBeforeTest15Minutes').isSameOrBefore(testMoment.clone().period('isSameOrBeforeTest1Month'), 'period')).toBe(false);

        expect(testMoment.clone().period('isSameOrBeforeTest15Minutes').isSameOrBefore(testMoment.clone().add(1, 'minute'), 'p')).toBe(true);
        expect(testMoment.clone().period('isSameOrBeforeTest15Minutes').isSameOrBefore(testMoment.clone().add(2, 'minutes'), 'p')).toBe(true);
        expect(testMoment.clone().period('isSameOrBeforeTest15Minutes').isSameOrBefore(testMoment.clone().subtract(28, 'minutes'), 'period')).toBe(false);
        expect(testMoment.clone().period('isSameOrBeforeTest15Minutes').subtract(29, 'minutes').isSameOrBefore(testMoment.clone(), 'period')).toBe(true);
    });

    it("should compare two moments with a given period", function() {
        expect(testMoment.clone().subtract(28, 'minutes').isSameOrBefore(testMoment.clone(), 'isSameOrBeforeTest15Minutes')).toBe(true);
        expect(testMoment.clone().subtract(28, 'minutes').isSameOrBefore(testMoment.clone(), 'isSameOrBeforeTest1Month')).toBe(true);
    });
});