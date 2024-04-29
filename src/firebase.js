import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyD5wx53nt0tewsbH7PEkF0R-UjLyVr890g",
  authDomain: "netflix-clone-d7c9f.firebaseapp.com",
  projectId: "netflix-clone-d7c9f",
  storageBucket: "netflix-clone-d7c9f.appspot.com",
  messagingSenderId: "821215122221",
  appId: "1:821215122221:web:03b7c1cb7fad84b16e79a4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};