import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDSfuyS6vsR48ih7UUiU8U851P-oZj4S-A",
  authDomain: "newjournal-9d545.firebaseapp.com",
  projectId: "newjournal-9d545",
  storageBucket: "newjournal-9d545.appspot.com",
  messagingSenderId: "631597965378",
  appId: "1:631597965378:web:7eb48beed66a74740dcddb",
  measurementId: "G-FL9EY1QRMG"
};

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app)
  export const googleProvider = new GoogleAuthProvider()