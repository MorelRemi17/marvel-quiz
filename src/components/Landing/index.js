import React, { useEffect, useRef, useState, Fragment }from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {

    const [btn, setBtn] = useState(false);
    const refWolverine = useRef(null);

    /*
    * Ici j'ajoute avec mon useEffect la className startingImg pour faire sortir les griffes et je les retires avec setTimeout au bout d'une seconde. 
    * Je passe aussi mon btn a true pour les faire apparaitres les boutons d'inscription & de connexion. 
    */
    useEffect(() =>{
        refWolverine.current.classList.add("startingImg");
        setTimeout(() =>{
            refWolverine.current.classList.remove("startingImg");
            setBtn(true)
        }, 1000);
    }, []);
    /* 
    * Ici je vais ajouter la className "leftImg" || "rightImg" grâce au useRef avec les "setter" ce qui vas me permettre de de sortir les griffes de wolverines quand je passe ma souris sur le bouton de droite ou de gauche (onMouseOver).
    * Je vais ensuite grâce a "clearImg" faire une condition qui vas verifier sir ma classList contien ou non la className "leftImg" || "rightImg" & si c'est le cas retirer cette classe lorsque la souris (onMouseOut) quitte le bouton.
    */
    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg")
    };
    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg")
    };
    const clearImg = () => {
        if (refWolverine.current.classList.contains("leftImg")) {
            refWolverine.current.classList.remove("leftImg")
        }
        else if (refWolverine.current.classList.contains("rightImg")){
            refWolverine.current.classList.remove("rightImg")
        }
    };

    /* 
    * Fragment ici me permet de regrouper une liste d'éléments enfants sans ajouter de noeuds supplémentaires au DOM.
    */

    const displayBtn = btn && (
      <Fragment>
        <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
          <Link className="btn-welcome" to="/signup"> Inscription </Link>
        </div>
        <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
          <Link className="btn-welcome" to="/login"> connexion </Link>
        </div>
      </Fragment>
    );

    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    );
};

export default Landing;