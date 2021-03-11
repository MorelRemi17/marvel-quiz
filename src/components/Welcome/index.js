import React, { Fragment, useState, useContext, useEffect } from "react";
import firebaseContext from '../Firebase/context';
import Logout from "../Logout";
import Quiz from '../Quiz'

const Welcome = props => {

  // * grâce a mon useContext j'ai ici accés a mes fonctions qui sont dans le fichier Firebase et donc a ma fonction signoutUser
  const firebase = useContext(firebaseContext);

  // * Cette fonction va afficher ou non le composant welcome au personne qui veulent y accéder .
  const [userSession, setUserSession] = useState(null);

  const [userData, setUserData] = useState({});


  // * onAuthStateChanged va nous servir a verifier si la personne c'est connécté ou déconnécté. Si  nous avons un user ici nous allons apellé setUserSession afin d'enregister la valeur sinon on le redirige vers la page d'accueil . le return ici va servir a demonter le composant .
  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/");
    });

    if (!!userSession) {
      firebase
        .user(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      listener();
    };
  }, [userSession, firebase, props.history]);

  // * Si notre userSession est null dans ce cas là on va faire patienter la personne avec un loader si ça n'est pas le cas je return ma div avec mes composants.
  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Loading...</p>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData}/>
      </div>
    </div>
  );
};

export default Welcome;
