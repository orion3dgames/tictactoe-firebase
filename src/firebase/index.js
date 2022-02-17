import { initializeApp } from "firebase/app"
import {getAuth, signInAnonymously, updateProfile} from "firebase/auth"
import {getDatabase, ref, set} from "firebase/database"
import usernameGen from "username-gen";

var firebaseConfig = require("../../config/firebase.json");

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const database = getDatabase(app)

signInAnonymously(auth)
    .then(() => {

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
    });

export { auth, database }