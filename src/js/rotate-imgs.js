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
    const imgEl = $(".img");
    imgEl.on("click", (e) => {
      $("#rotation-slider").show();
      $("#degree-label").show();
      var current_degree = $(e.target).data("degree") || 0;
      $("#degree-label").text(current_degree + "°");

      $("#rotation-slider").slider({
        min: 0,
        max: 360,
        value: current_degree,
        slide: function (_, ui) {
          var degree = ui.value;
          $(e.target).css({
            transform: "rotate(" + degree + "deg)",
          });
          $(e.target).data("degree", degree);
          localStorage.setItem("degree_" + $(e.target).attr("id"), degree);
          $("#degree-label").text(degree + "°");
        },
      });
    });
  });
});
