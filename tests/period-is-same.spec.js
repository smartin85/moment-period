'use strict';

describe("Calling the isSame-function on a moment", function(){
    var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 });
    moment.period
        .add({name: 'isSameTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'isSameTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit or undefined", function(){
        expect(testMoment.isSame(testMoment.clone())).toBe(true);
        expect(testMoment.isSame(testMoment.clone().subtract(1, 'hour'))).toBe(false);
        expect(testMoment.isSame(testMoment.clone().period('isSameTest15Minutes'))).toBe(true);
        expect(testMoment.isSame(testMoment.clone().subtract(1, 'isSameTest15Minutes'))).toBe(false);
        expect(testMoment.isSame(testMoment.clone().endOf('year'), 'year')).toBe(true);
        expect(testMoment.isSame(testMoment.clone().endOf('year'), 'month')).toBe(false);
    });

    it("should compare the periods if called with 'p' or 'period'", function() {
        expect(testMoment.clone().period('isSameTest15Minutes').isSame(testMoment.clone(), 'p')).toBe(true);
        expect(testMoment.clone().period('isSameTest15Minutes').isSame(testMoment.clone(), 'period')).toBe(true);
        expect(testMoment.clone().period('isSameTest15Minutes').isSame(testMoment.clone().period('isSameTest15Minutes'), 'period')).toBe(true);
        expect(testMoment.clone().period('isSameTest15Minutes').isSame(testMoment.clone().period('isSameTest1Month'), 'period')).toBe(false);
        expect(testMoment.clone().period('isSameTest1Month').isSame(testMoment.clone().period('isSameTest15Minutes'), 'period')).toBe(true);
    });

    it("should compare two moments with a given period", function() {
        expect(testMoment.clone().subtract(8, 'minutes').isSame(testMoment.clone(), 'isSameTest15Minutes')).toBe(true);
        expect(testMoment.clone().subtract(20, 'minutes').isSame(testMoment.clone(), 'isSameTest15Minutes')).toBe(false);
        expect(testMoment.clone().subtract(29, 'minutes').isSame(testMoment.clone(), 'isSameTest1Month')).toBe(true);
    });
});