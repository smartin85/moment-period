'use strict';

describe("moment-period", function(){

    it("should be defined", function(){
        expect(moment.period).toBeDefined();
    });

    it("should have the same version as the package", function(){
        expect(moment.period.version).toBe(window.globals.packageVersion);
    });

    it("should have a setDefault function", function(){
        expect(typeof moment.period.setDefault).toBe("function");
    });

    it("should have an add function", function(){
        expect(typeof moment.period.add).toBe("function");
    });

    it("should have a fromTo function", function(){
        expect(typeof moment.period.fromTo).toBe("function");
    });

    it("should extend the moment prototype with a period function", function(){
        expect(typeof moment.fn.period).toBe("function");
    });

    it("should extend the moment prototype with a fromTo function", function(){
        expect(typeof moment.fn.fromTo).toBe("function");
    });
});