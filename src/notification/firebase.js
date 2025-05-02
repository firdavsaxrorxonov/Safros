// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDogwzF_4GJxHJr1G_vHZZSB-f0HGPQAnQ",
  authDomain: "safros.firebaseapp.com",
  projectId: "safros",
  storageBucket: "safros.firebasestorage.app",
  messagingSenderId: "779305634162",
  appId: "1:779305634162:web:b9605a0026f0fc12e075eb",
  measurementId: "G-97V1C518X5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export async function generateToken() {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BGVnNYOk7jyT5iOEHt0mKlwrD0pszx6ghiAFILxgyiSFcTWhJP58QsQPaHg6tBayXwP4iTdv84giyVU7wkZBQ18",
    });
    console.log(token);
  }
}
