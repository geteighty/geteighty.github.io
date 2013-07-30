(function() {

	$(document.body).on("click", "a[href=#about]", function (event) {
		event.preventDefault();

		$("div.turn-anim-target").addClass("in");
	});

	$(document.body).on("click", "a[href=#close]", function (event) {
		event.preventDefault();

		$("div.turn-anim-target").removeClass("in");
	});

})();