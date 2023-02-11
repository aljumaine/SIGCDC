    var screenshotCanvas = document.getElementById("screenshot-canvas");
    var screenshotContext = screenshotCanvas.getContext("2d");
    var screenshotLink = document.createElement("a");
    screenshotLink.download = "screenshot.png";
    screenshotLink.href = screenshotCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    $("#screenshot-button").click(function() {
        screenshotContext.drawImage(document.body, 0, 0);
        screenshotLink.href = screenshotCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        screenshotLink.click();
    });