$(document).ready(function () {
	gameActive = false;

	$("#btnQuitWindow").click(function () {
		$("#quitModal").show();
	});
	$("#btnQuitNo").click(function () {
		$("#quitModal").hide();
		//$("#startScreen").show();
	});
	$("#btnQuitYes").click(function () {
		close();
	});
});