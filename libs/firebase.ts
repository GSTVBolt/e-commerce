import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCOhoKwC6dFQsdotTxPbvLjTXOdmQLd7rA",
  authDomain: "e-shop-421818.firebaseapp.com",
  projectId: "e-shop-421818",
  storageBucket: "e-shop-421818.appspot.com",
  messagingSenderId: "712411496295",
  appId: "1:712411496295:web:144c1572605b64816fb9c2"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp
