import React from 'react';

/*
* Je vais ici créer mon context. 
* FirebaseContext contient un Provider et un Consumer, on donneras une value au Provider ( dans src/index.js ) le Consumer lui recupére cette value et on pourras instancier une seule fois instancier la class Firebase et elle seras disponnible a tout les composants enfants de app 
*/

const FirebaseContext = React.createContext(null);

export default FirebaseContext;