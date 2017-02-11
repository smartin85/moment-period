'use strict';

describe("The period of a moment", function(){

    moment.period
        .add({name: 'periodTest15Minutes', count: 15, unit: 'minute'})
        .add({name: 'periodTest1Month', unit: 'month'});

    beforeEach(function() {
        moment.period.setDefault();
    });


    it("should return the current period if called with no parameters", function(){
        expect(moment().period()).toBeUndefined();
        expect(moment().period('periodTest15Minutes').period()).toBe('periodTest15Minutes');
        expect(moment().period('periodTest1Month').period()).toBe('periodTest1Month');
    });

    it("should set a new period if called with a valid period name", function(){
        var period = moment().period('periodTest15Minutes');
        expect(period.period('periodTest1Month').period()).toBe('periodTest1Month');
    });

    it("should log a warning if called with an invalid period name", function(){
        spyOn(console, 'warn');
        moment().period('invalidPeriod');
        expect(console.warn).toHaveBeenCalled();
    });

     it("should remove the current period if called with null", function(){
        var period = moment().period('periodTest15Minutes');
        expect(period.period(null).period()).toBeUndefined();
    });

    it("should set the moment to the start of period if called with true", function(){
        var period = moment().minutes(20).period('periodTest15Minutes');
        expect(period.period(true).minutes()).toBe(15);
    });

    it("should set the moment to the end of period if called with false", function(){
        var period = moment().minutes(20).period('periodTest15Minutes');
        expect(period.period(false).minutes()).toBe(29);
    });
});