// ===========================
// = Date.isLeapYear() tests =
// ===========================
module("Date.isLeapYear()");
test("Testing the year 1600 (leap year)", function() {
	equals(new Date(1600, 0, 1).isLeapYear(), true, "");
});

test("Testing the year 1700 (non leap year)", function() {
	equals(new Date(1700, 0, 1).isLeapYear(), false, "");
});

test("Testing the year 1984 (leap year)", function() {
	equals(new Date(1984, 0, 1).isLeapYear(), true, "");
});

test("Testing the year 2011 (non leap year)", function() {
	equals(new Date(2011, 0, 1).isLeapYear(), false, "");
});