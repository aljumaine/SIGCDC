import $ from "jquery";

const displayEl = $("#display-artifacts");
const calculateWidth = (zoom) => {
  if (zoom < 40) {
    return ` calc(100% + ${zoom * 2}%)`;
  } else if (zoom < 100) {
    return `calc(100% + ${zoom}%)`;
  }
  return "100%";
};
var zoom = displayEl.data("zoom") || 100;
$(".global-zoom-label").text(zoom + "%");
$(".global-zoom-slider").slider({
  min: 10,
  max: 500,
  value: zoom,
  step: 0.01,
  slide: function (_, ui) {
    const zoom = ui.value;
    displayEl.css({
      transform: "scale(" + zoom / 100 + ")",
      "transform-origin": "0px 0px",
      width: calculateWidth(zoom),
    });
    displayEl.data("zoom", zoom);
    $(".global-zoom-label").text(zoom + "%");
  },
});
