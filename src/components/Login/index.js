import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const Login = () => {

  // ! Commenter le code 13 a 6min. 

  const [ email , setEmail ] = useState('');
  const [ password , setPassword ] = useState('');
  const [ btn, setBtn] = useState(false);

  // * Le tableau vide à la fin de la fonction est équivalent au composentDidMount ce qui aura comme effet que cette fonction fléché ne vas s'enclancher qu'une seule fois 
  useEffect(() => {

  }, []) 
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
      <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <h2>Connexion</h2>
            <form>
              <div className="inputBox">
                <input
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">Pas de compte ? Inscrivez vous ! </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
