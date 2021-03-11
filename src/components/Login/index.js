import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebaseContext from '../Firebase/context';

const Login = ( props ) => {
  // ! Commenter le code 13 a 6min.

  // * Cela va nous permettre d'avoir accés au méthodes présente dans firebase . 
  const firebase = useContext(firebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');

  /*
   * Nous allons ici faire une petite securité pour verifier que le mots de passe fait plus de 6 caractéres et si email est différents d'une chaine de caractére vide.
   * Le else if ici vas nous permettre de disabled le btn de nouveau si après avoir mis 6 caractéres on en enléves. 
   * Le tableau vide à la fin de la fonction est équivalent au composentDidMount ce qui aura comme effet que cette fonction fléché ne vas s'enclancher qu'une seule fois, on ajoute email et password pour verifier leurs changement.
   */
  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn) {
        setBtn(false);
    }
  }, [password, email, btn]);

  /*
  * Je vais gérer la soumission de mon fomulaire ici. 
  * firebase.loginUser(email, password) nous sert a verifier que les logins sont bon et loginUser necessite 2 paramétres ( email password ). 
  * En cas de succés ( .then ) on vide les setEmail et setPassword et on nous redirige vers la page welcome
  * 
  */
  const handleSubmit = e => {
    e.preventDefault();
    firebase.loginUser(email, password) 
    .then(user => {
      setEmail('');
      setPassword('');
      props.history.push('/welcome')
    })
    .catch(error => {
      setError(error);
      setEmail('');
      setPassword('');
    })
  }

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            { error !== '' && <span>{error.message}</span>}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              {btn ? <button>Connexion</button> : <button disabled> Connexion</button>}

            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Pas de compte ? Inscrivez vous !{" "}
              </Link>
              <br />
              <Link className="simpleLink" to="/forgetpassword">
                Mot de passe oublié ? Récupérez-le ici . 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
