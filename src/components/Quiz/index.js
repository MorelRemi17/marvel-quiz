import React, { Component } from "react";
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import {QuizMarvel} from '../quizMarvel';

class Quiz extends Component {
  // ! 20/22
  // * On va ici définir notre state.
  state = {
    levelNames : ["debutant", "confirmer", "expert"],
    quizLevel : 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null, 
    options: [],
    idQuestion : 0,
    btnDisabled: true,
    userAnswer: null
  };

  // * Cette méthode là va chercher les questions dans quizMarvel. newArray vas avoir pour fonction de prendre les questions sans importer les reponses pour eviter toute triche. this.setState vas mettre a jour le state dans notre composant de type class ( Quiz )
  loadQuestions = quizz => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      const newArray = fetchedArrayQuiz.map( ({answer, ...keepRest }) => keepRest );

      this.setState({
        storedQuestions: newArray
      })
    } else {

    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
    }
  }

  submitAnswer = selectdAnswer => {
    this.setState ({
      userAnswer: selectdAnswer,
      btnDisabled: false
    })
  }
  render() {
    const { pseudo } = this.props.userData;
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p key={index} className={`answerOptions ${this.state.userAnswer === option ? "selected": null}`} onClick={() => this.submitAnswer(option)}>{option}</p>
      )
    })
    return (
      <div>
        <h2>Bienvenu  : {pseudo} </h2>
        <Levels />
        <ProgressBar />
        <h2 className="">{this.state.question}</h2>
        {displayOptions}
        <button disabled ={this.state.btnDisabled} className="btnSubmit">Suivant</button>
      </div>
    );
  }
}

export default Quiz;
