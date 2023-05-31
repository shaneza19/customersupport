import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCyaYC2u-9vJNObiJtAqzHwtBATsZx_DPU",
    authDomain: "helpdesk-support-ticket.firebaseapp.com",
    databaseURL: "https://helpdesk-support-ticket-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "helpdesk-support-ticket",
    storageBucket: "helpdesk-support-ticket.appspot.com",
    messagingSenderId: "33009534071",
    appId: "1:33009534071:web:dd6d305c8593ca4665f272"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);
const storage=firebase.storage()
export default storage    