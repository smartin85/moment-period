'use strict';

describe("Calling the fromTo-function of a moment", function(){
    moment.period
        .add({name: 'fromTo15Minutes', count: 15, unit: 'minute'})
        .add({name: 'fromTo1Month', count: 1, unit: 'month'});

    it("should create an object with properties for from and to", function(){
        expect(moment().fromTo().from).toBeDefined();
        expect(moment().fromTo().to).toBeDefined();
    });

    it("should return a fromTo where from and to are same as moment if no period is defined", function(){
        var testMoment = moment();

        expect(testMoment.isSame(testMoment.fromTo().from)).toBe(true);
        expect(testMoment.isSame(testMoment.fromTo().to)).toBe(true);
    });

    it("should return the start and the end of the period of a moment", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 }).period('fromTo15Minutes');

        expect(testMoment.clone().period(true).isSame(testMoment.fromTo().from)).toBe(true);
        expect(testMoment.clone().period(false).isSame(testMoment.fromTo().to)).toBe(true);
    });

    it("should return the start and the end of a named period for a moment", function() {
        var testMoment = moment.utc({ years :2010, months :5, date :5,  hours :5, minutes :8, seconds :3, milliseconds : 9 }).period('fromTo15Minutes');

        expect(testMoment.clone().period('fromTo1Month').period(true).isSame(testMoment.fromTo('fromTo1Month').from)).toBe(true);
        expect(testMoment.clone().period('fromTo1Month').period(false).isSame(testMoment.fromTo('fromTo1Month').to)).toBe(true);
    });
});