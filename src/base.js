import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAywIYxBnU_jiqKs11lfdKYjTkHWu09bCo",
    authDomain: "chat-app-1ca23.firebaseapp.com",
    databaseURL: "https://chat-app-1ca23.firebaseio.com"
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base 