import $ from "jquery";

const displayEl = $("#display-artifacts");

function waitForEl(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

$(document).on("change", displayEl, function () {
  waitForEl(".img").then(() => {

    dragImg();

    const imgEl = $(".img");
    imgEl.on("click", (e) => {
      
      $(".highlight").removeClass('highlight');
      $(e.target).parent().toggleClass('highlight');
      rotateImgSlider(e);
      zoomImgSlider(e);
    });
  });
});

const dragImg = () => {
  $(".draggable").draggable({
    drag: () => {
      $("#rotation-slider").hide();
      $('#rotation-label').hide();
      $("#zoom-slider").hide();
      $("#zoom-label").hide();
      $(".highlight").removeClass('highlight');
    }
  });
}

const rotateImgSlider = (e) => {
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

const zoomImgSlider = (e) => {
  $("#zoom-slider").show();
  $("#zoom-label").show();
  const current_zoom = $(e.target).data("zoom") || 100;
  $("#zoom-label").text(current_zoom + "%");

  $("#zoom-slider").slider({
    min: 10,
    max: 500,
    value: current_zoom,
    slide: function (_, ui) {
      const zoom = ui.value;
      $(e.target).css({
        transform: "scale(" + zoom / 100 + ")",
      });
      $(e.target).data("zoom", zoom);
      $("#zoom-label").text(zoom + "%");
    },
  });
};
