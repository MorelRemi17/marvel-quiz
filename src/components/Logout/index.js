import React, { useEffect, useState, useContext }from "react";
import firebaseContext from '../Firebase/context';

const Logout = () => {

  // * grâce a mon useContext j'ai ici accés a mes fonctions qui sont dans le fichier Firebase et donc a ma fonction signoutUser
  const firebase = useContext(firebaseContext);

  const [checked, setChecked ] = useState(false);

  // * on va verifier ici si la personne est connécté ou déconnécté 
  useEffect(()=> {
    if (checked === true ) {
      firebase.signoutUser();
    }
  }, [checked, firebase]);

  // * Notre handleChange ici nous sert à changer la valeur de checked 
  const handleChange = event => {
    setChecked(event.target.checked)
  }

  return (
    <div className="logoutContainer">
      <label htmlFor="" className="switch">
        <input 
        onChange={handleChange}
        type="checkbox" 
        checked= {checked}
        />
        <label htmlFor="" className="slider round"></label>
      </label>
    </div>
  );
};

export default Logout;
