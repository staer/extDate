// ===========================
// = Date.isLeapYear() tests =
// ===========================
module("Date.isLeapYear()");
test("Testing the year 1600 (leap year)", function() {
	equals(true, new Date(1600, 1, 1).isLeapYear(), "");
});

test("Testing the year 1700 (non leap year)", function() {
	equals(false, new Date(1700, 1, 1).isLeapYear(), "");
});

test("Testing the year 1984 (leap year)", function() {
	equals(true, new Date(1984, 1, 1).isLeapYear(), "");
});

test("Testing the year 2011 (non leap year)", function() {
	equals(false, new Date(2011, 1, 1).isLeapYear(), "");
});