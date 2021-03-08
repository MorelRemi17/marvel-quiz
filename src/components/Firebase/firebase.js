import app from 'firebase/app';

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
  };
};

export default Firebase;