import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import axios from "axios";
import Loader from "../Loader";
import Modal from "../Modal";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  const [asked, setAsked] = useState([]);

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = "959462d7eee55e467df6789a9c6d300e";

  // * On va ici créer un useState pour s'occuper de l'ouverture de notre modal.
  const [openModal, setOpenModal] = useState(false);
  const [characterInfos, setCharacterInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  // * id ici correspond au héro que nous avons invoqué dans la question. On va aussi faire nos appel a l'api ici via axios.
  const showModal = (id) => {
    setOpenModal(true);
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
      )
      .then((response) => {
        setCharacterInfos(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  const averageGrade = maxQuestions / 2;

  // * Pour obliger la personne a recommencer le niveau si il n'a pas la moyenne.
  if (score < averageGrade) {
    setTimeout(() => {
      loadLevelQuestions(quizLevel);
    }, 3000);
  }

  const decision =
    score >= averageGrade ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">
                <GiTrophyCup size="50px" />
                Bravo, passez au niveau suivant !
              </p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau suivant{" "}
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">Bravo !</p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Accueil{" "}
              </button>
            </Fragment>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite {percent} % </div>
          <div className="progressPercent">
            {" "}
            Note {score}/{maxQuestions} !{" "}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="successMsg">Fail!</p>
        </div>

        <div className="percentage">
          <div className="progressPercent">Réussite {percent} % </div>
          <div className="progressPercent">
            {" "}
            Note {score}/{maxQuestions} !{" "}
          </div>
        </div>
      </Fragment>
    );
  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button
                className="btnInfo"
                onClick={() => showModal(question.heroId)}
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={"pas de réponses ! "}
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );

  const resultInModal = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{characterInfos.data.results[0].name}</h2>
      </div>
      <div className="modalBody"></div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>
          Fermer{" "}
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="modalHeader">
        <h2>Réponse de Marvel... </h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </Fragment>
  );
  return (
    <Fragment>
      {decision}
      <hr />
      <p> Les réponses aux questions posées :</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
      <Modal showModal={openModal} hideModal={hideModal}>
        {resultInModal}
      </Modal>
    </Fragment>
  );
});

export default React.memo(QuizOver);
