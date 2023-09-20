import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDcklitY6CNlTf82OsTd52sNvJPBtXS-tY",
  authDomain: "image-gallery-ed237.firebaseapp.com",
  projectId: "image-gallery-ed237",
  storageBucket: "image-gallery-ed237.appspot.com",
  messagingSenderId: "1062340147252",
  appId: "1:1062340147252:web:6534e64d0d981760fb3261",
  measurementId: "G-M0LPN6PMM1",
};



const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);


export { auth, projectStorage, projectFirestore };





