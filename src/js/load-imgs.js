import $ from "jquery";
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

import { dragImg, rotateImgSlider, zoomImgSlider } from "./utils/imgs-interaction";

const selectFolderEl = $("#artifacts");
const displayEl = $("#display-artifacts");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const listRef = ref(storage, "sets");

listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      selectFolderEl.append(
        $("<option>").attr("value", folderRef.name).text(folderRef.name)
      );
    });
  })
  .catch((error) => {
    // Uh-oh, an error occurred!
  });

// Load images on select
selectFolderEl.on("change", (e) => {
  const folderName = e.target.value;
  displayEl.html("");

  const folderRef = ref(storage, `sets/${folderName}/images`);

  listAll(folderRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        const imgRef = ref(storage, itemRef.fullPath);
        getDownloadURL(imgRef)
          .then((url) => {
            const imgContainer = $("<div class='draggable'></div>");
            const imgInContainer = imgContainer.append(
              $("<img>", { class: "img", src: url })
            );
            displayEl.append(imgInContainer);
          })
          .then(() => {
            dragImg();

            $(".img").on("click", (e) => {
              $(".highlight").removeClass("highlight");
              $(e.target).parent().toggleClass("highlight");
              rotateImgSlider(e);
              zoomImgSlider(e);
            });
          })
          .catch((error) => {
            // Handle any errors
          });
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
});
