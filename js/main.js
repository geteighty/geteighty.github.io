(function() {

	$(document.body).on("click", "a[href=#about]", function (event) {
		event.preventDefault();

		$("div.turn-anim-target").toggleClass("in");
	});

	$(document.body).on("click", "a[href=#close]", function (event) {
		event.preventDefault();

		$("div.turn-anim-target").removeClass("in");
	});

	/iPhone/i.test(navigator.userAgent) && !location.hash && setTimeout(function() {
	  window.scrollTo(0, 1);
	}, 1000);​	

})();