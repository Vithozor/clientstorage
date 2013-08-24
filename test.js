test( "saves data in localStorage", function() {
  var expected = "{\"value\":\"somevalue\"}", actual;
  	clientStorage.set("somekey","somevalue");
	actual = window.localStorage.getItem("somekey");
	deepEqual(actual, expected);
});

test( "saves data in cookie if users needs", function() {
	var expected = "somevalue";
	clientStorage.inCookie().set("somekey","somevalue");
	ok(document.cookie.indexOf(expected) !== -1);
});

test( "gets data from localStorage", function() {
	var expected = "somevalue", actual;
  	actual = clientStorage.get("somekey");
	deepEqual(actual, expected);
});

test( "gets data from cookie if users needs", function() {
	var expected = "somevalue", actual;
	actual = clientStorage.inCookie().get("somekey");
	deepEqual(actual, expected);
});

test( "removes data from localStorage", function() {
	var expected = null;
	clientStorage.remove("somekey");
	deepEqual(window.localStorage.getItem("somekey"),expected);
});

//TODO: test expirations
//		test remove cookie
