import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

toast.configure();

class Quiz extends Component {
  // ! 20/22
  // * On va ici définir notre state.
  state = {
    levelNames: ["debutant", "confirmer", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false
  };

  // * ici on va enregister les questions et les réponses .
  storedDataRef = React.createRef();

  // * Cette méthode là va chercher les questions dans quizMarvel. newArray vas avoir pour fonction de prendre les questions sans importer les reponses pour eviter toute triche. this.setState vas mettre a jour le state dans notre composant de type class ( Quiz )
  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );

      this.setState({
        storedQuestions: newArray,
      });
    } else {
    }
  };

  showWelcomeMsg = pseudo => {
    if (!this.state.showWelcomeMsg) {
      this.setState({
        showWelcomeMsg: true
      })
          toast.warn(`🦄 Welcome ${pseudo}! `, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      });
    }

  }
  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion,
      }));
    }
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null, 
        btnDisabled: true
      });
    }

    if (this.props.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo)
    }
  }

  submitAnswer = (selectdAnswer) => {
    this.setState({
      userAnswer: selectdAnswer,
      btnDisabled: false,
    });
  };
  render() {
    // const { pseudo } = this.props.userData;
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
          {option}
        </p>
      );
    });
    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2 className="">{this.state.question}</h2>
        {displayOptions}
        <button
          disabled={this.state.btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          Suivant
        </button>
      </div>
    );
  }
}

export default Quiz;
