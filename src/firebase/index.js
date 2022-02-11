import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase, ref, set, onValue, push, remove } from "firebase/database"

var firebaseConfig = require("../../config/firebase.json");

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const database = getDatabase(app)

export { auth, database, ref, set, onValue, push, remove }