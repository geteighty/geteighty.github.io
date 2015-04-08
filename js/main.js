(function() {

	var $scrollContainer, $videoContainer, $videoTag, $conceptVideoWrapper, conceptVideo, isPlayingVideo = false, currentVideoName = "", mouseMoveTimer;

	$(document).ready(function() {

		$scrollContainer = $(".main");
		$videoContainer = $("div.video-container");
		$videoTag = $videoContainer.find("video");
		$conceptVideoWrapper = $("div.concept-video-wrapper");
		conceptVideo = $("#conceptVideo").get(0);

		$("#intro").on("click", "a[href=#play-video]", onVideoLink_Clicked);
		$conceptVideoWrapper.on("click", "svg.play", onPlayButton_Clicked);
		$conceptVideoWrapper.on("click", "svg.pause", onPauseButton_Clicked);
		$conceptVideoWrapper.on("click", "div.concept-video-close", onCloseButton_Clicked);
		$conceptVideoWrapper.on("click", "div.concept-video-seeker", seekConceptVideo);
		$conceptVideoWrapper.on("mousemove", onMouseMoveVideo);
		$("#conceptVideo").on("timeupdate", updateVideoProgress);

		$(".main").onepage_scroll({
		   sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
		   easing: "ease", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		   animationTime: 900, // AnimationTime let you define how long each section takes to animate
		   pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
		   loop: false,
		   updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
		   afterMove: onPageScrolled
		});

		window.setTimeout(function() {
			$("section#intro .center-content-block").addClass("moveTextUp");
		}, 2500)

	});

	function onPageScrolled(pageIndex) {
		console.log("scrolled %f", pageIndex);
	}

	function onVideoLink_Clicked(event) {
		event.preventDefault();

		$conceptVideoWrapper.addClass("visible");
		$conceptVideoWrapper.toggleClass("playing", true);

		conceptVideo.play();
	}

	function onPlayButton_Clicked(event) {
		$conceptVideoWrapper.toggleClass("playing", true);
		conceptVideo.play();
	}

	function onPauseButton_Clicked(event) {
		$conceptVideoWrapper.toggleClass("playing", false);
		conceptVideo.pause();
	}

	function onCloseButton_Clicked(event) {
		$conceptVideoWrapper.toggleClass("playing visible", false);

		conceptVideo.pause();
		conceptVideo.currentTime = 0;
	}

	function updateVideoProgress() {
		var e = 100 / conceptVideo.duration * conceptVideo.currentTime;

		$("div.concept-video-current").width(e + "%");
	}

	function seekConceptVideo(event) {
		var e, n, i, o;

    o = $("div.concept-video-seeker").width();
    n = event.offsetX;
    i = n / o;
    e = conceptVideo.duration * i;

    conceptVideo.currentTime = e;
	}

	function onMouseMoveVideo() {
		$conceptVideoWrapper.toggleClass("mouse-over", true);

		if (mouseMoveTimer) {
			clearTimeout(mouseMoveTimer)
		}

		mouseMoveTimer = setTimeout(function() {
			mouseMoveTimer = null;

			$conceptVideoWrapper.toggleClass("mouse-over", false);
		}, 3000);
	}

})();
