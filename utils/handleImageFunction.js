import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export const openImages = async () => {
  // ask users permission to open camera
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  if (status !== "granted") {
    alert("Sorry, we need access to library to display an image");
    return false;
  } else {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    });
    // if the user does not select an image

    return !result.cancelled ? result : false;
  }
};

export const openCamera = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
    Permissions.CAMERA
  );
  if (status !== "granted") {
    alert("Sorry, we need access to Camera to take a photo");
    return false;
  } else {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
      base64: true,
      allowsEditing: Platform.OS == "ios" ? false : true,
      aspect: [4, 3]
    });
    return !result.cancelled ? reuslt : false;
  }
};

// export const prepareBlob = async imageUri => {
//   const blob = await new Promise((resolve, reject) => {
//     // request
//     const xml = new XMLHttpRequest();
//     // if success, resolve it
//     xml.onload = function() {
//       resolve(xml.response);
//     };

//     //if error, throw new error
//     xml.onerror = function() {
//       //console.log(e);
//       reject(new TypeError("Image Upload Failed"));
//     };

//     // set the response type
//     xml.responseTpye = "blob";
//     xml.open("GET", imageUri, true);
//     // the request is sent
//     xml.send();
//   });

//   return blob;
// };

export const prepareBlob = async uri => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };

    xhr.onerror = function() {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send();
  });
  return blob;
};
