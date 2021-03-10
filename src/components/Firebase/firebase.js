import app from 'firebase/app';
import 'firebase/auth';
/* 
* Je vais ici copié coller dans une constante la configuration de mon Firebase.
* Je vais ensuite créer une classe Firebase qui vas faire appel a un constructeur et initialiser mon app avec comme paramétre la constante config de Firebase pour avoir accès a ces différents settings. Je vais ensuite importer et initialiser authentification ( fournis par Firebase ). Je vais ensuite definir mes 3 méthodes qui vont me permettre de gérer l'inscription, la connexion et la deconnexion.
*/


const config = {
  apiKey: "AIzaSyAs-T0XLo9NqBi2sVP6TRuHJ2NynL6zq4Y",
  authDomain: "marvel-quiz-4e044.firebaseapp.com",
  projectId: "marvel-quiz-4e044",
  storageBucket: "marvel-quiz-4e044.appspot.com",
  messagingSenderId: "1092810594055",
  appId: "1:1092810594055:web:454ee4d4a3bd2fd34817a2"
};

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth();
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
};

export default Firebase;