import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import firebaseContext from '../Firebase/context';

/*
* useState vas nous permettre d'avoir une variable d'état avec son setter data seras ma valeur initial pour recuperer les elements dont j'ai besoin dans mon formulaire.
*/

const Signup = ( props ) => {

  // * Quand le plus proche <firebase.Provider> au-dessus du composant est mis à jour, ce Hook va déclencher un rafraîchissement avec la value la plus récente passée au fournisseur firebaseContext.
	const firebase = useContext(firebaseContext);

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
	
  const [loginData, setLoginData] = useState(data);
	const [ error, setError ]= useState ('')

  /* 
  * handleChange est un event qui vas nous permettre de mettre a jour les informations dans data, on pourras les target grâce a leurs ID et leurs value. 
  * Ici je prend les infos qui sont actuelement dans mon state grâce au spread operator.
  * [e.target.id] vas me permettre de cibler les id des differents inputs
  * e.target.value vas nous permettre de mettre a jour les informations qui sont dans l'input 
  */
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  /*
  * On evite l'auto rafraichissement de la page avec le e.preventDefault(); 
  * Destructuring 
  * J'apelle ensuite mon objet firebase avec la methode singupUser avec les param email et password.
  * props.history.push('/welcome') nous redirige vers welcome si la connexion c'est bien fait.
  * Quand l'inscription c'est bien passé le setLoginData({...data}) nous permet de vider les values pour recommencer, je vais ensuite gérer les erreurs grâce au .catch
  */ 
	const handleSubmit = e => {
		e.preventDefault();
		const { email, password } = loginData;
		firebase.signupUser(email, password)
		.then(user => {
			setLoginData({...data})
      props.history.push('/welcome')
		})
		.catch(error => {
			setError(error)
			setLoginData({...data});
		})
	};

  // * cette variable nous sert a destructurer nos value dans nos input, sans cela nous devrions mettre : value={loginDatapseudo} ... 
  const { pseudo, email, password, confirmPassword } = loginData;

  //* Si le bouton est vide ou l'adresse email ect on afficheras un boutton désactivé
  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );
	
	// * Gestion des erreurs
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
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">Déjà inscrit ? connectez vous !</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
