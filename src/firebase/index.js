import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = require("./config.json");
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const database = getDatabase(app)

signInAnonymously(auth)
    .then(() => {
        console.log('LOGGED IN', auth.currentUser);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
    });

export { auth, database }