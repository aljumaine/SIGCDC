import $ from "jquery";

const selectFolderEl = $("#artifacts");
const displayEl = $("#display-artifacts");

function loadFileNames(dir) {
  return new Promise((resolve, reject) => {
    try {
      var fileNames = new Array();
      $.ajax({
        url: dir,
        success: function (data) {
          for (var i = 1; i < $(data).find("li span.name").length; i++) {
            var elem = $(data).find("li span.name")[i];
            fileNames.push(elem.innerHTML);
          }
          return resolve(fileNames);
        },
      });
    } catch (ex) {
      return reject(new Error(ex));
    }
  });
}

// Load folder names
loadFileNames("images/content")
  .then((data) => {
    $(data).each((_, folder) => {
      selectFolderEl.append($("<option>").attr("value", folder).text(folder));
    });
  })
  .catch((error) => {
    alert("Files could not be loaded. please check console for details");
    console.error(error);
  });

// Load images on select
selectFolderEl.on("change", (e) => {
  const folderDir = `images/content/${e.target.value}`;
  displayEl.html('');

  loadFileNames(folderDir)
    .then((data) => {
      $(data).each((_, img) => {
        const imgContainer = $("<div class='draggable'></div>");
        const imgInContainer = imgContainer.append(
          $("<img>", { class: "img", src: `${folderDir}/${img}` })
        );
        displayEl.append(imgInContainer);
        $(".draggable").draggable({
          drag: () => {
            $("#rotation-slider").hide();
            $('#rotation-label').hide();
            $("#zoom-slider").hide();
            $("#zoom-label").hide();
          }
        });
      });
    })
    .catch((error) => {
      alert("Files could not be loaded. please check console for details");
      console.error(error);
    });
});