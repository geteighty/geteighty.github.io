(function() {

	var $scrollContainer, $videoContainer, videoPlayer, $conceptVideoWrapper, conceptVideo, isPlayingVideo = false, currentVideoName = "", mouseMoveTimer, currentPageIndex, currentVideoUrl;

	$(document).ready(function() {

		$scrollContainer = $(".main");
		$videoContainer = $("div.video-container");
		videoPlayer = $videoContainer.find("video").get(0);
		$conceptVideoWrapper = $("div.concept-video-wrapper");
		conceptVideo = $("#conceptVideo").get(0);
		currentVideoUrl = $(videoPlayer).data("defaultVideo");

		$("article").on("click", "a[href=#play-video]", onArticleVideoLink_Clicked);
		$("#intro").on("click", "a[href=#play-video]", onPromoVideoLink_Clicked);
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
		if (currentPageIndex != pageIndex) {
			var $section = $("section[data-index=" + pageIndex + "]"),
				$videoLink = $section.find("a.video-button:first");

			changePreviewVideo($videoLink);

			currentPageIndex = pageIndex;
			console.log("scrolled %f", pageIndex);
		}
	}

	function onArticleVideoLink_Clicked(event) {
		event.preventDefault();

		changePreviewVideo($(event.currentTarget));
	}

	function changePreviewVideo($link) {
		var $li = $link.parent(),
			$ul = $li.parent(),
			videoUrl = $link.data("video") || "/video/record_trip_1.mp4",
			$replacementVideoTag = $("<video />").addClass("preview-video animated fadeIn").append($("<source />").attr("src", videoUrl).attr("type", "video/mp4"));

		if (currentVideoUrl == videoUrl) {
			return;
		};

		currentVideoUrl = videoUrl;

		$ul.find("li.active").removeClass("active");
		$li.addClass("active");

		$(videoPlayer).addClass("animated fadeOut").on("animationend oAnimationEnd animationend webkitAnimationEnd", function() {
			setTimeout(function() {
				$videoContainer.append($replacementVideoTag);
			}, 200);

			$(this).remove();
		});

		videoPlayer = $replacementVideoTag.get(0);

		videoPlayer.load();
		videoPlayer.play();
	}

	function onPromoVideoLink_Clicked(event) {
		event.preventDefault();

		$(document.body).toggleClass("concept-video-playing", true);
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
		$(document.body).toggleClass("concept-video-playing", false);
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
