var d = new Date(1982,9,25);

// =========================
// = Date.strftime() tests =
// =========================
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