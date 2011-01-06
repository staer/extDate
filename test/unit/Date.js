// =========================
// = Date.strftime() tests =
// =========================

// NOTE: Javascript date constructors use 0 based months... silly!
var d = new Date(1982, extDate.SEPTEMBER, 25);                  // September 25th, 1982
var d2 = new Date(1605, extDate.NOVEMBER, 5);                 // November 5th, 1605
var d3 = new Date(2011, extDate.JANUARY, 4, 10, 10, 10);      // January 4th, 2011 (tuesday) @ 10:10:10am
var d4 = new Date(2011, extDate.OCTOBER, 1, 13, 15, 30);      // Oct 1st, 2011 @ 1:15:30pm
var d5 = new Date(1984, extDate.MARCH, 15);                 // March 15th, 1984 (leap year)
var d6 = new Date(2010, extDate.NOVEMBER, 14);              // Sunday - 11/14/2010
var d7 = new Date(2011, extDate.JANUARY, 1);                // Jan 1st

module("Date");			
test("Tests for Date.strftime()", function() {
    expect(26);
	
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
            "Remember, remember the 5th of the 11th month.", "Month number");
    
    equals(d3.strftime("1/4/2011 is the %wnd day of the week."),
            "1/4/2011 is the 2nd day of the week.", "Day of week as number");
    
    equals(d3.strftime("1/4/2011 falls on a %a."), 
            "1/4/2011 falls on a Tue.", "Abbreviated day of week");
    
    equals(d3.strftime("1/4/2011 falls on a %A."),
            "1/4/2011 falls on a Tuesday.", "Full day of week");
            
    equals(d4.strftime("It's %H o' clock!"),
            "It's 13 o' clock!", "Hour on a 24 hour clock");
            
    equals(d4.strftime("It's %I o' clock!"),
            "It's 1 o' clock!", "Hour after noon on a 12 hour clock");
            
    equals(d3.strftime("It's %I o' clock!"),
            "It's 10 o' clock!", "Hour before noon on a 12 hour clcok");
            
    equals(d4.strftime("About %M minutes have elapsed since the hour."),
            "About 15 minutes have elapsed since the hour.", "Minutes past the hour");
    
    equals(d4.strftime("About %S seconds have elapsed since the minute."),
            "About 30 seconds have elapsed since the minute.", "Seconds past the minute");
            
    equals(d2.strftime("Guy Fawkes Night started on %x!"),
            "Guy Fawkes Night started on 11/5/05!", "Localized date string");
            
    equals(d4.strftime("The time is %X!"),
            "The time is 13:15:30!", "Localized time string");
            
    equals(d4.strftime("%c"),
            "Sat Oct 1 13:15:30 2011", "Localized datetime string");
            
    equals(d4.strftime("10/1/2011 is the %jth day of the year."),
            "10/1/2011 is the 274th day of the year.", "Day of the year");
            
    equals(d5.strftime("3/15/1984 is the %jth day of the year."),
            "3/15/1984 is the 75th day of the year.", "Day of the year (leap year)");
    
    equals(d3.strftime("%H:%M:%S is in the %p."),
            "10:10:10 is in the AM.", "AM test");
    
    equals(d4.strftime("%H:%M:%S is in the %p."),
            "13:15:30 is in the PM.", "PM test");
            
    equals(d6.strftime("The week number is: %U!"),
            "The week number is: 46!", "Week of year (starting on sundays)");
            
    equals(d7.strftime("The week number is: %U!"),
            "The week number is: 0!", "Week of year before the first sunday");
            
    equals(d6.strftime("The week number is: %W!"),
            "The week number is: 45!", "Week of year (starting on mondays)");
});

test("Tests for Date.isLeapYear()", function() {
    expect(4);
	
	equals(new Date(1600, extDate.JANUARY, 1).isLeapYear(), true, "1600 (leap year)");
	
	equals(new Date(1700, extDate.JANUARY, 1).isLeapYear(), false, "1700 (non leap year)");
	
	equals(new Date(1984, extDate.JANUARY, 1).isLeapYear(), true, "1984 (leap year)");
	
	equals(new Date(2011, extDate.JANUARY, 1).isLeapYear(), false, "2011 (non leap year)");
});

test("Tests for Date.strptime()", function() {   
    expect(4);
    
    deepEqual(Date.strptime("It's 2010!", "It's %Y!"), 
                new Date(2010, 0, 1, 0, 0, 0, 0), "Parse 4-digit year");
                
    deepEqual(Date.strptime("Escaped percent '%' sign!", "Escaped percent '%%' sign!"), new Date(1900, 0, 1, 0, 0, 0, 0), "Escaped % sign");
    
    // For some reason QUnit's "raises" test doesn't appear to work properly
    try {
        Date.strptime("THIS WILL NOT PARSE", "It's %Y!");
        ok(false, "Un-parsable string should raise an exception");
    } catch(e) {
        ok(true, "Un-parsable string raises exception: " + e.message);
    }
    
    try {
        Date.strptime("%Q is an invalid directive", "%Q is an invalid directive");
        ok(false, "Invalid format directive should raise an exception");
    } catch(e) {
        ok(true, "Invalid format directive: " + e.message);
    }
});