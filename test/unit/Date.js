// =========================
// = Date.strftime() tests =
// =========================

// NOTE: Javascript date constructors use 0 based months... silly!
var d = new Date(1982, 8, 25);      // September 25th, 1982
var d2 = new Date(1605, 10, 5);      // November 5th, 1605
var d3 = new Date(2011, 0, 4);      // January 4th, 2011 (tuesday)

module("Date");			
test("Tests for Date.strftime()", function() {
    expect(11);
	equals(d.strftime('The year was %Y, it was sweet!'), 
		    'The year was 1982, it was sweet!', "4 digit year");
	equals(d.strftime("The year was '%y, it was sweet!"), 
			"The year was '82, it was sweet!", "2 digit year");
	equals(d.strftime("The 2 digit version of %Y is '%y!"),
			"The 2 digit version of 1982 is '82!", "Multiple directives");
	equals(d.strftime("Give it 110%%!"), "Give it 110%!", "Escaped % sign");
    equals(d2.strftime("Remember, remember the 5th of %b."), 
            "Remember, remember the 5th of Nov.", "Short month name");
    equals(d2.strftime("Remember, remember the 5th of %B."),
            "Remember, remember the 5th of November.", "Full month name");
    equals(d2.strftime("Remember, remember the %dth of November."),
            "Remember, remember the 5th of November.", "Day of month");
    equals(d2.strftime("Remember, remember the 5th of the %mth month."), 
            "Remember, remember the 5th of the 10th month.", "Month number");
    equals(d3.strftime("1/4/2011 is the %wnd day of the week."),
            "1/4/2011 is the 2nd day of the week.", "Day of week as number");
    equals(d3.strftime("1/4/2011 falls on a %a."), 
            "1/4/2011 falls on a Tue.", "Abbreviated day of week");
    equals(d3.strftime("1/4/2011 falls on a %A."),
            "1/4/2011 falls on a Tuesday.", "Full day of week");
});

test("Tests for Date.isLeapYear()", function() {
    expect(4);
	equals(new Date(1600, 0, 1).isLeapYear(), true, "1600 (leap year)");
	equals(new Date(1700, 0, 1).isLeapYear(), false, "1700 (non leap year)");
	equals(new Date(1984, 0, 1).isLeapYear(), true, "1984 (leap year)");
	equals(new Date(2011, 0, 1).isLeapYear(), false, "2011 (non leap year)");
});