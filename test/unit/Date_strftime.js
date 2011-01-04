// =========================
// = Date.strftime() tests =
// =========================
var d = new Date(1982,9,25);
var d2 = new Date(1605, 10, 5);

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