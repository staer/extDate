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
    expect(37);
    
    // Tests for %Y directive
    deepEqual(Date.strptime("It's 2010!", "It's %Y!"), 
                new Date(2010, extDate.JANUARY, 1, 0, 0, 0, 0), 
                "Parse 4-digit year");
                
    // Tests for %% directive
    deepEqual(Date.strptime("Escaped percent '%' sign!", "Escaped percent '%%' sign!"), 
                new Date(1900, 0, 1, 0, 0, 0, 0), 
                "Escaped % sign");
    
    // Tests for %m directive
    deepEqual(Date.strptime("12/2001", "%m/%Y"),
                new Date(2001, extDate.DECEMBER, 1, 0, 0, 0, 0), 
                "Parse month number");            
    deepEqual(Date.strptime("9/2001", "%m/%Y"),
                new Date(2001, extDate.SEPTEMBER, 1, 0, 0, 0, 0), 
                "Parse month number");
    deepEqual(Date.strptime("09/2001", "%m/%Y"),
                new Date(2001, extDate.SEPTEMBER, 1, 0, 0, 0, 0), 
                "Parse month number");
              
    // Tests for %d directive  
    deepEqual(Date.strptime("12/25/2001", "%m/%d/%Y"),
                new Date(2001, extDate.DECEMBER, 25, 0, 0, 0, 0),
                "Parse day of month number");
    deepEqual(Date.strptime("12/30/2001", "%m/%d/%Y"),
                new Date(2001, extDate.DECEMBER, 30, 0, 0, 0, 0),
                "Parse day of month number");
    deepEqual(Date.strptime("12/1/2001", "%m/%d/%Y"),
                new Date(2001, extDate.DECEMBER, 1, 0, 0, 0, 0),
                "Parse day of month number");
    deepEqual(Date.strptime("12/01/2001", "%m/%d/%Y"),
                new Date(2001, extDate.DECEMBER, 1, 0, 0, 0, 0),
                "Parse day of month number");
    deepEqual(Date.strptime("12/ 1/2001", "%m/%d/%Y"),
                new Date(2001, extDate.DECEMBER, 1, 0, 0, 0, 0),
                "Parse day of month number");
                
    // Tests for %H directive
    deepEqual(Date.strptime("12/25/2001 22:00:00", "%m/%d/%Y %H:00:00"),
                new Date(2001, extDate.DECEMBER, 25, 22, 0, 0, 0),
                "Parse Hours (24 hour clock)");                
    deepEqual(Date.strptime("12/25/2001 11:00:00", "%m/%d/%Y %H:00:00"),
                new Date(2001, extDate.DECEMBER, 25, 11, 0, 0, 0),
                "Parse Hours (24 hour clock)");
    deepEqual(Date.strptime("12/25/2001 9:00:00", "%m/%d/%Y %H:00:00"),
                new Date(2001, extDate.DECEMBER, 25, 9, 0, 0, 0),
                "Parse Hours (24 hour clock)");
    
    // Tests for %M directive
    deepEqual(Date.strptime("12/25/2001 9:30:00", "%m/%d/%Y %H:%M:00"),
                new Date(2001, extDate.DECEMBER, 25, 9, 30, 0, 0),
                "Parse minutes");
    
    // Tests for %S directive
    deepEqual(Date.strptime("12/25/2001 9:30:15", "%m/%d/%Y %H:%M:%S"),
                new Date(2001, extDate.DECEMBER, 25, 9, 30, 15, 0),
                "Parse seconds");
                
    // Tests for %y directive
    deepEqual(Date.strptime("12/25/10", "%m/%d/%y"),
                new Date(2010, extDate.DECEMBER, 25, 0, 0, 0, 0),
                "Parse 2 digit year smallers then 68");
    deepEqual(Date.strptime("12/25/89", "%m/%d/%y"),
                new Date(1989, extDate.DECEMBER, 25, 0, 0, 0, 0),
                "Parse 2 digit year greater than 68");
                
    // Tests for %B (full month) directive
    deepEqual(Date.strptime("November 25, 1990", "%B %d, %Y"),
                new Date(1990, extDate.NOVEMBER, 25, 0, 0, 0, 0),
                "Parse full month name");
                
    // Tests for %b (abbr. month) directive
    deepEqual(Date.strptime("Nov 25, 1990", "%b %d, %Y"),
                new Date(1990, extDate.NOVEMBER, 25, 0, 0, 0, 0),
                "Parse abbreviated month name");
                
    // Tests for %I w/ %p (12 hour clock w/ AM/PM)
    deepEqual(Date.strptime("12/25/2010 1PM", "%m/%d/%Y %I%p"),
                new Date(2010, extDate.DECEMBER, 25, 13, 0, 0, 0),
                "Parsed 12 hour clock in PM w/ PM specified");                
    deepEqual(Date.strptime("12/25/2010 1AM", "%m/%d/%Y %I%p"),
                new Date(2010, extDate.DECEMBER, 25, 1, 0, 0, 0),
                "Parsed 12 hour clock in AM w/ PM specified");
    deepEqual(Date.strptime("12/25/2010 @ 5", "%m/%d/%Y @ %I"),
                new Date(2010, extDate.DECEMBER, 25, 5, 0, 0, 0),
                "Parsed 12 hour clock w/o AM/PM specified");
                
    // Tests for %j (day of year)
    deepEqual(Date.strptime("Today is day 274 of 2011.", "Today is day %j of %Y."),
                new Date(2011, extDate.OCTOBER, 1, 0, 0, 0, 0),
                "Parse day of year");
                
    // Test localized formats (%x, %X, %c)
    deepEqual(Date.strptime("It is now 12/25/01!", "It is now %x!"),
                new Date(2001, extDate.DECEMBER, 25, 0, 0, 0, 0),
                "Parse localized date string (%x)");
    deepEqual(Date.strptime("It is now 12/25/2001 10:15:30!", "It is now %m/%d/%Y %X!"),
                new Date(2001, extDate.DECEMBER, 25, 10, 15, 30, 0),
                "Parse localized time string (%X)");
    // TODO: Localized date time string
    
    
    // Test Week of year + day of week
    // %W + %A/%a/%w
    deepEqual(Date.strptime("Sunday week 37 of year 2010", "%A week %W of year %Y"),
                new Date(2010, extDate.SEPTEMBER, 19, 0, 0, 0, 0),
                "Parsed week of year (%W) and day of week (%A)");
    deepEqual(Date.strptime("Day 0 of week 37 of year 2010", "Day %w of week %W of year %Y"),
                new Date(2010, extDate.SEPTEMBER, 19, 0, 0, 0, 0),
                "Parsed week of year (%W) and day of week (%w)");
    deepEqual(Date.strptime("Sun of week 37 of year 2010", "%a of week %W of year %Y"),
                new Date(2010, extDate.SEPTEMBER, 19, 0, 0, 0, 0),
                "Parsed week of year (%W) and day of week (%a)");
    // %U + %A/%a/%w
    deepEqual(Date.strptime("Sunday week 37 of year 2010", "%A week %U of year %Y"),
                new Date(2010, extDate.SEPTEMBER, 12, 0, 0, 0, 0),
                "Parsed week of year (%U) and day of week (%A)");
    deepEqual(Date.strptime("Day 0 of week 37 of year 2010", "Day %w of week %U of year %Y"),
                new Date(2010, extDate.SEPTEMBER, 12, 0, 0, 0, 0),
                "Parsed week of year (%U) and day of week (%w)");
    deepEqual(Date.strptime("Sun of week 37 of year 2010", "%a of week %U of year %Y"),
                new Date(2010, extDate.SEPTEMBER, 12, 0, 0, 0, 0),
                "Parsed week of year (%U) and day of week (%a)");
    deepEqual(Date.strptime("Sunday week 37 of year 1984", "%A week %U of year %Y"),
                new Date(1984, extDate.SEPTEMBER, 9, 0, 0, 0, 0),
                "Parsed week of year (%U) and day of week (%A) on a leap year"); 
                
    // Test week 0 parsing
    deepEqual(Date.strptime("Saturday week 0 of 2010", "%A week %U of %Y"),
                new Date(2010, extDate.JANUARY, 2, 0, 0, 0, 0),
                "Parse 0th week of year and day of week when it lands in the current year");
    deepEqual(Date.strptime("Tuesday week 0 of 2010", "%A week %W of %Y"),
                new Date(2009, extDate.DECEMBER, 29, 0, 0, 0, 0),
                "Parse 0th week of year and day of week when it lands in the previous year");
                
    deepEqual(Date.strptime("Fri Aug 13 10:15:30 2010", "%c"),
                new Date(2010, extDate.AUGUST, 13, 10, 15, 30, 0),
                "Parse localized date/time string");
    
    
                    
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