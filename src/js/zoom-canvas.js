import $ from "jquery";

const displayEl = $("#display-artifacts");

$("#zoom-button").on('click', () => {
  var zoom = displayEl.data("zoom") || 100;
  $("#zoom-label").text(zoom + "%");
  
  $("#zoom-slider").slider({
      min: 10,
      max: 500,
      value: zoom,
      step: 0.01,
      slide: function(_, ui) {
        const zoom = ui.value;
        displayEl.css({
          transform: "scale(" + zoom / 100 + ")",
          "transform-origin": "0px 0px"
        });
        displayEl.data("zoom", zoom);
        $("#zoom-label").text(zoom + "%");
      }
  });
});