const haversine_distance2 = require("./script");
const showCountryOnMap2 = require("./script");

describe("Distance Calculation", () => {
    it("check", () => {
        expect(haversine_distance2(12,14,12,14)).toBe(310.4966776718925);
    });
});

describe("Lat Long Value Check", () => {
    it("check", () => {
        expect(haversine_distance2(-91, 0, 0, 0)).toBe(false);
    });
 });

describe("Distance Type Check", () => {
    it("check", () => {
        expect(typeof haversine_distance2(12,14,12,14)).toBe("number");
    });
 });

 describe("Lat Long Type Check", () => {
    it("check", () => {
        expect(haversine_distance2('-91', 0, 0, 0)).toBe(false);
    });
 });

 describe("Country Check", () => {
    it("check", () => {
        expect(showCountryOnMap2(39, 30)).toBe('Turkey');
    });
 });

