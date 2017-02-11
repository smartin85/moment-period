'use strict';

describe("Calling the isSameOrAfter-function on a moment", function(){
    var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :28, seconds :3, milliseconds : 9 });

    moment.period
        .add({name: 'isSameOrAfterTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'isSameOrAfterTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit or undefined", function(){
        expect(testMoment.isSameOrAfter(testMoment.clone())).toBe(true);
        expect(testMoment.isSameOrAfter(testMoment.clone().add(1, 'hour'))).toBe(false);
        expect(testMoment.isSameOrAfter(testMoment.clone().subtract(1, 'hour'))).toBe(true);
        expect(testMoment.isSameOrAfter(testMoment.clone().subtract(1, 'isSameOrAfterTest15Minutes'))).toBe(true);
        expect(testMoment.isSameOrAfter(testMoment.clone().add(1, 'isSameOrAfterTest15Minutes'))).toBe(false);
        expect(testMoment.isSameOrAfter(testMoment.clone().endOf('year'), 'year')).toBe(true);
        expect(testMoment.isSameOrAfter(testMoment.clone().endOf('year'), 'month')).toBe(false);
    });

    it("should compare the periods if called with 'p' or 'period'", function() {
        expect(testMoment.clone().period('isSameOrAfterTest15Minutes').isSameOrAfter(testMoment.clone(), 'p')).toBe(true);
        expect(testMoment.clone().period('isSameOrAfterTest15Minutes').isSameOrAfter(testMoment.clone(), 'period')).toBe(true);
        expect(testMoment.clone().period('isSameOrAfterTest1Month').isSameOrAfter(testMoment.clone().period('isSameOrAfterTest15Minutes'), 'period')).toBe(true);
        expect(testMoment.clone().period('isSameOrAfterTest15Minutes').isSameOrAfter(testMoment.clone().period('isSameOrAfterTest1Month'), 'period')).toBe(false);

        expect(testMoment.clone().period('isSameOrAfterTest15Minutes').isSameOrAfter(testMoment.clone().add(1, 'minute'), 'p')).toBe(true);
        expect(testMoment.clone().period('isSameOrAfterTest15Minutes').isSameOrAfter(testMoment.clone().subtract(29, 'minutes'), 'p')).toBe(true);
        expect(testMoment.clone().period('isSameOrAfterTest15Minutes').isSameOrAfter(testMoment.clone().add(2, 'minutes'), 'period')).toBe(false);
        expect(testMoment.clone().period('isSameOrAfterTest15Minutes').add(2, 'minutes').isSameOrAfter(testMoment.clone(), 'period')).toBe(true);
    });

    it("should compare two moments with a given period", function() {
        expect(testMoment.clone().add(2, 'minutes').isSameOrAfter(testMoment.clone(), 'isSameOrAfterTest15Minutes')).toBe(true);
        expect(testMoment.clone().subtract(28, 'minutes').isSameOrAfter(testMoment.clone(), 'isSameOrAfterTest1Month')).toBe(true);
    });
});