import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
/* 
* Je vais ici copié coller dans une constante la configuration de mon Firebase.
* Je vais ensuite créer une classe Firebase qui vas faire appel a un constructeur et initialiser mon app avec comme paramétre la constante config de Firebase pour avoir accès a ces différents settings. Je vais ensuite importer et initialiser authentification ( fournis par Firebase ). Je vais ensuite definir mes 3 méthodes qui vont me permettre de gérer l'inscription, la connexion et la deconnexion.
*/


const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// this.db = app.firestore(); j'invoque ici ma base de donnée via firestore
class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth();
    this.db = app.firestore();
  };
  // Inscription avec en paramétre : email & password 
  signupUser = ( email, password ) => 
  this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion avec en paramétre : email & password 
  loginUser = ( email, password ) => 
  this.auth.signInWithEmailAndPassword( email, password ); 

  // Deconnexion 
  signoutUser = () => this.auth.signOut();

  // récupérer le mot de passe 
  passwordReset = email => this.auth.sendPasswordResetEmail(email); 

  user = uid => this.db.doc(`users/${uid}`);
};

export default Firebase;