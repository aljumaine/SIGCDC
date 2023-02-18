import $ from "jquery";

export const rotateImgSlider = (e) => {
  $("#rotation-slider").show();
  $("#rotation-label").show();
  const current_degree = $(e.target).data("degree") || 0;
  $("#rotation-label").text(current_degree + "°");

  $("#rotation-slider").slider({
    min: 0,
    max: 360,
    value: current_degree,
    slide: function (_, ui) {
      const degree = ui.value;
      $(e.target).css({
        transform: "rotate(" + degree + "deg)",
      });
      $(e.target).data("degree", degree);
      $("#rotation-label").text(degree + "°");
    },
  });
};

export const zoomImgSlider = (e) => {
  $("#zoom-slider").show();
  $("#zoom-label").show();
  const $draggableSelector = $(e.target).hasClass("img")
    ? $(e.target).parent()
    : $(e.target);
  const current_zoom = $draggableSelector.data("zoom") || 100;
  $("#zoom-label").text(current_zoom + "%");

  $("#zoom-slider").slider({
    min: 10,
    max: 500,
    value: current_zoom,
    slide: function (_, ui) {
      const zoom = ui.value;
      $draggableSelector.css({
        transform: "scale(" + zoom / 100 + ")",
      });
      $draggableSelector.data("zoom", zoom);
      $("#zoom-label").text(zoom + "%");
    },
  });
};

export const dragImg = () => {
  $(".draggable").draggable({
    drag: () => {
      $("#rotation-slider").hide();
      $("#rotation-label").hide();
      $("#zoom-slider").hide();
      $("#zoom-label").hide();
      $(".highlight").removeClass("highlight");
    },
    stop: (e, _) => {
      $(e.target).addClass("highlight");
      rotateImgSlider(e);
      zoomImgSlider(e);
    },
  });
};
