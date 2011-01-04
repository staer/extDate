// =========================
// = Date.strftime() tests =
// =========================

// NOTE: Javascript date constructors use 0 based months... silly!
var d = new Date(1982, 8, 25);      // September 25th, 1982
var d2 = new Date(1605, 10, 5);      // November 5th, 1605
var d3 = new Date(2011, 0, 4);      // January 4th, 2011 (tuesday)

module("Date.strftime()");			
test("Test 4 digit year", function() {
	equals('The year was 1982, it was sweet!', 
			d.strftime('The year was %Y, it was sweet!'), "");
});

test("Test 2 digit year", function() {
	equals("The year was '82, it was sweet!", 
			d.strftime("The year was '%y, it was sweet!"), "");
});

test("Multiple directives", function() {
	equals("The 2 digit version of 1982 is '82!",
			d.strftime("The 2 digit version of %Y is '%y!"), "");
});

test("Escaped percent sign", function() {
	equals("Give it 110%!", d.strftime("Give it 110%%!"), "");
});

test("Short month name", function() {
    equals("Remember, remember the 5th of Nov.", 
            d2.strftime("Remember, remember the 5th of %b."), "");
});

test("Full month name", function() {
   equals("Remember, remember the 5th of November.",
            d2.strftime("Remember, remember the 5th of %B."), ""); 
});

test("Day of month", function() {
    equals("Remember, remember the 5th of November.",
            d2.strftime("Remember, remember the %dth of November."), "");
});

test("Month number", function() {
   equals("Remember, remember the 5th of the 10th month.", 
            d2.strftime("Remember, remember the 5th of the %mth month."), ""); 
});

test("Day of week as number", function() {
   equals(d3.strftime("1/4/2011 is the %wnd day of the week."),
            "1/4/2011 is the 2nd day of the week.", "");
});