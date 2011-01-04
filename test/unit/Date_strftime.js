// =========================
// = Date.strftime() tests =
// =========================

// NOTE: Javascript date constructors use 0 based months... silly!
var d = new Date(1982, 8, 25);      // September 25th, 1982
var d2 = new Date(1605, 10, 5);      // November 5th, 1605
var d3 = new Date(2011, 0, 4);      // January 4th, 2011 (tuesday)

module("Date.strftime()");			
test("Test 4 digit year", function() {
	equals(d.strftime('The year was %Y, it was sweet!'), 
		    'The year was 1982, it was sweet!', "");
});

test("Test 2 digit year", function() {
	equals(d.strftime("The year was '%y, it was sweet!"), 
			"The year was '82, it was sweet!", "");
});

test("Multiple directives", function() {
	equals(d.strftime("The 2 digit version of %Y is '%y!"),
			"The 2 digit version of 1982 is '82!", "");
});

test("Escaped percent sign", function() {
	equals(d.strftime("Give it 110%%!"), "Give it 110%!", "");
});

test("Short month name", function() {
    equals(d2.strftime("Remember, remember the 5th of %b."), 
            "Remember, remember the 5th of Nov.", "");
});

test("Full month name", function() {
   equals(d2.strftime("Remember, remember the 5th of %B."),
            "Remember, remember the 5th of November.", ""); 
});

test("Day of month", function() {
    equals(d2.strftime("Remember, remember the %dth of November."),
            "Remember, remember the 5th of November.", "");
});

test("Month number", function() {
   equals(d2.strftime("Remember, remember the 5th of the %mth month."), 
            "Remember, remember the 5th of the 10th month.", ""); 
});

test("Day of week as number", function() {
   equals(d3.strftime("1/4/2011 is the %wnd day of the week."),
            "1/4/2011 is the 2nd day of the week.", "");
});

test("Abbreviated day of week", function() {
   equals(d3.strftime("1/4/2011 falls on a %a."), 
            "1/4/2011 falls on a Tue.", ""); 
});