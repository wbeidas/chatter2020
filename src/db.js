import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])

    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyBhNhwo966MbDAQwtcB2_epCqhZ_C8-l2U",
    authDomain: "chatter-550dd.firebaseapp.com",
    databaseURL: "https://chatter-550dd.firebaseio.com",
    projectId: "chatter-550dd",
    storageBucket: "chatter-550dd.appspot.com",
    messagingSenderId: "464531314065",
    appId: "1:464531314065:web:c79a879dfe1423709cf630",
    measurementId: "G-KLL0Q533XF"
  };


firebase.initializeApp(firebaseConfig)
store = firebase.firestore()