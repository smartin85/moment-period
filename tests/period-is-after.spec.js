'use strict';

describe("Calling the isAfter-function on a moment", function(){
    var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 });
    moment.period
        .add({name: 'isAfterTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'isAfterTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });

    it("should work as expected in momentjs when the string is a valid moment-unit or undefined", function(){
        expect(testMoment.isAfter(testMoment.clone())).toBe(false);
        expect(testMoment.isAfter(testMoment.clone().add(1, 'hour'))).toBe(false);
        expect(testMoment.isAfter(testMoment.clone().subtract(1, 'hour'))).toBe(true);
        expect(testMoment.isAfter(testMoment.clone().subtract(1, 'isAfterTest15Minutes'))).toBe(true);
        expect(testMoment.isAfter(testMoment.clone().add(1, 'isAfterTest15Minutes'))).toBe(false);
        expect(testMoment.isAfter(testMoment.clone().startOf('year'), 'year')).toBe(false);
        expect(testMoment.isAfter(testMoment.clone().startOf('year'), 'month')).toBe(true);
    });

    it("should compare the periods if called with 'p' or 'period'", function() {
        expect(testMoment.clone().period('isAfterTest15Minutes').isAfter(testMoment.clone(), 'p')).toBe(false);
        expect(testMoment.clone().period('isAfterTest15Minutes').isAfter(testMoment.clone(), 'period')).toBe(false);
        expect(testMoment.clone().period('isAfterTest1Month').isAfter(testMoment.clone().period('isAfterTest15Minutes'), 'period')).toBe(false);
        expect(testMoment.clone().period('isAfterTest15Minutes').isAfter(testMoment.clone().period('isAfterTest1Month'), 'period')).toBe(false);

        expect(testMoment.clone().period('isAfterTest15Minutes').isAfter(testMoment.clone().subtract(1, 'minute'), 'p')).toBe(false);
        expect(testMoment.clone().period('isAfterTest15Minutes').isAfter(testMoment.clone().subtract(2, 'minutes'), 'p')).toBe(false);
        expect(testMoment.clone().period('isAfterTest15Minutes').isAfter(testMoment.clone().add(28, 'minutes'), 'period')).toBe(false);
        expect(testMoment.clone().period('isAfterTest15Minutes').add(29, 'minutes').isAfter(testMoment.clone(), 'period')).toBe(true);
    });

    it("should compare two moments with a given period", function() {
        expect(testMoment.clone().subtract(28, 'minutes').isAfter(testMoment.clone(), 'isAfterTest15Minutes')).toBe(false);
        expect(testMoment.clone().subtract(28, 'minutes').isAfter(testMoment.clone(), 'isAfterTest1Month')).toBe(false);
    });
});