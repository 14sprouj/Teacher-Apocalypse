var playerHealth = 100;

function displayNewHealth(health) {
	var healthPoints = health.toFixed(2);
	$("#playerHealthNumber").html(parseFloat(healthPoints) + "%");
	$("#playerHealthBarFill").css("width", health + "%");
}

function deductPlayerHealth(points) {
	if (playerHealth > 0) {
		playerHealth -= points;
		displayNewHealth(playerHealth);
	}
	if (playerHealth < 0) {
		playerHealth = 0;
		displayNewHealth(playerHealth);
	}
}

setInterval(function () {
	if (playerHealth < 100) {
		playerHealth += 0.1;
		displayNewHealth(playerHealth);
    }
}, 500)