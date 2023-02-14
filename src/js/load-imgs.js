import $ from "jquery";

const selectFolderEl = $("#artifacts");

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
  loadFileNames(`images/content/${e.target.value}`)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      alert("Files could not be loaded. please check console for details");
      console.error(error);
    });
});
