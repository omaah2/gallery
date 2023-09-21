import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQ8bSZITWxkijhmFJ0HN17SoAIk5Zhj0I",
  authDomain: "gallery-c9a1d.firebaseapp.com",
  projectId: "gallery-c9a1d",
  storageBucket: "gallery-c9a1d.appspot.com",
  messagingSenderId: "160650431543",
  appId: "1:160650431543:web:fbcc5f915a23bf7db183b2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
