import firebase from 'firebase';

export default firebase.initializeApp(getFirebaseConfig());

export function getFirebaseConfig() {
  return {
    apiKey: "AIzaSyBq9QaZ3klNG9C7dgmD3iWrlazhRWZkx38",
    authDomain: "reactriot2017-chainreaction.firebaseapp.com",
    databaseURL: "https://reactriot2017-chainreaction.firebaseio.com",
    projectId: "reactriot2017-chainreaction",
    storageBucket: "reactriot2017-chainreaction.appspot.com"
  };
}