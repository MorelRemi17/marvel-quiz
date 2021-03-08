import React, { useState, useContext } from "react";
import firebaseContext from '../Firebase/context';

// ! 11 Penser a tout commenter 

const Signup = () => {

	const firebase = useContext(firebaseContext);

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
	
  const [loginData, setLoginData] = useState(data);
	const [ error, setError ]= useState ('')

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

	const handleSubmit = e => {
		e.preventDefault();
		const { email, password } = loginData;
		firebase.signupUser(email, password)
		.then(user => {
			setLoginData({...data})
		})
		.catch(error => {
			setError(error)
			setLoginData({...data});
		})
	};

  const { pseudo, email, password, confirmPassword } = loginData;

  /*
   * Si le bouton est vide ou l'adresse email ect on afficheras un boutton désactivé
   */

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );
	
	// Gestion des erreurs
	const errorMsg = error !=='' && <span>{error.message}</span>

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
						{errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  autoComplete="off"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="text"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
