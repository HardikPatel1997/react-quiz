import { useState, useEffect } from "react";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isScore, setScore] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3002/quiz-master/get-quizmaster", { method: "get" })
      .then((response) => response.json())
      .then((res) => {
        const quizResponse = res;
        setQuestions(quizResponse.quiz);
        setIsHidden(true);
        setIsSubmit(false);
      });
  }, []);

  const onNext = () => {
    const onNextQuestion = currentQuestion + 1;
    if (onNextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(onNextQuestion);
      }, 200);
      setIsHidden(false);
      if (onNextQuestion === questions.length - 1) {
        setIsSubmit(true);
      }
    } else {
      setScore(true);
    }
  };

  const onPrevious = () => {
    const onPreviousQuestion = currentQuestion;
    if (onPreviousQuestion) {
      setCurrentQuestion(onPreviousQuestion - 1);
    }
    if (onPreviousQuestion === 1) {
      setIsHidden(true);
    }
  };

  const onQuizplayAgain = () => {
    setScore(false);
    setCurrentQuestion(0);
    setQuizScore(0);
    setIsHidden(true);
    setIsSubmit(false);
  };

  if (isScore === true) {
    const userId = sessionStorage.getItem("id");
    const correctScore = quizScore;
    const totalScore = questions.length;
    const quizScoreCount = {
      userId: userId,
      correctScore: correctScore,
      totalScore: totalScore,
    };
    setTimeout(() => {
      fetch("http://localhost:3002/quiz-master/submit-score", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizScoreCount),
      })
        .then((response) => {
          try {
            return response.text();
          } catch (error) {
            return null;
          }
        })
        .then((quizScoreResponse) => {
          return quizScoreResponse;
        })
        .catch((error) => {
          return error;
        });
    }, 1000);
  }

  const onCheckAnswer = (isCheck) => {
     if (isCheck === true) {
      setQuizScore(quizScore + 1);
      setTimeout(() => {
        // questions.map((res) => {
        //     let button1 = document.getElementById(`button1_${res && res.answers && res.answers.option_1_iscorrect}`);
        //     let button2 = document.getElementById(`button2_${res && res.answers && res.answers.option_2_iscorrect}`);
        //     let button3 = document.getElementById(`button3_${res && res.answers && res.answers.option_3_iscorrect}`);
        //     let button4 = document.getElementById(`button4_${res && res.answers && res.answers.option_4_iscorrect}`);
        //     if(button1 && button1.id && button1.id.split('_')[1] === isCheck.toString()){
        //         button1.style.backgroundColor = '#9FD705';
        //         button1.style.color = '#020202';
        //     }else if(button2 && button2.id && button2.id.split('_')[1] === isCheck.toString()){
        //         button2.style.backgroundColor = '#9FD705';
        //         button2.style.color = '#020202';
        //     }else if(button3 && button3.id && button3.id.split('_')[1] === isCheck.toString()){
        //         button3.style.backgroundColor = '#9FD705';
        //         button3.style.color = '#020202';
        //     }else if(button4 && button4.id && button4.id.split('_')[1] === isCheck.toString()){
        //         button4.style.backgroundColor = '#9FD705';
        //         button4.style.color = '#020202';
        //     }
        // })
        onNext();
      }, 100);
    }
    setTimeout(() => {
      onNext();
    }, 100);
  };

  return (
    <div>
      <section className="mt-n5">
        <div className="container-home ml-3 mr-3">
          <div className="container-home-content">
            <div className="text-center">
              <h3>Quiz</h3>
            </div>
            <center>
              <div
                className="card ml-5 mr-5 mt-5 my-5 pt-5"
                style={{ width: "550px", borderRadius: "20px" }}
              >
                <div className="card-body">
                  {isScore ? (
                    <div className="my-3 py-5 mt-n3">
                      <div>
                        <h6>
                          Your Score is <strong>{quizScore}</strong> out of{" "}
                          <span>
                            <strong>{questions.length}</strong>
                          </span>
                        </h6>
                        <button
                          className="mt-2 form-submit"
                          style={{ border: "none" }}
                          type="button"
                          name="signin"
                          onClick={onQuizplayAgain}
                        >
                          Play Again
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="clearfix mt-n5">
                        <div className="float-left">
                          <span style={{ fontSize: "15px" }}>
                            <strong>Question {currentQuestion + 1} </strong>
                          </span>{" "}
                          / <small>{questions.length}</small>
                        </div>
                      </div>
                      <div className="mt-3 mb-5">
                        <strong>
                          {questions[currentQuestion] &&
                            questions[currentQuestion].question}
                        </strong>
                        <br />
                        <div className="row">
                          <div className="col-md-6">
                            <button
                              type="button"
                              name="signin"
                              id={`button1_${
                                questions[currentQuestion] &&
                                questions[currentQuestion].answers &&
                                questions[currentQuestion].answers
                                  .option_1_iscorrect
                              }`}
                              className="quiz-submit"
                              onClick={() =>
                                onCheckAnswer(
                                  questions[currentQuestion] &&
                                    questions[currentQuestion].answers &&
                                    questions[currentQuestion].answers
                                      .option_1_iscorrect
                                )
                              }
                            >
                              {questions[currentQuestion] &&
                                questions[currentQuestion].answers &&
                                questions[currentQuestion].answers.option_1}
                            </button>
                            <br />
                            <button
                              type="button"
                              name="signin"
                              id={`button2_${
                                questions[currentQuestion] &&
                                questions[currentQuestion].answers &&
                                questions[currentQuestion].answers
                                  .option_2_iscorrect
                              }`}
                              className="quiz-submit"
                              onClick={() =>
                                onCheckAnswer(
                                  questions[currentQuestion] &&
                                    questions[currentQuestion].answers &&
                                    questions[currentQuestion].answers
                                      .option_2_iscorrect
                                )
                              }
                            >
                              {questions[currentQuestion] &&
                                questions[currentQuestion].answers &&
                                questions[currentQuestion].answers.option_2}
                            </button>
                            <br />
                          </div>
                          <div className="col-md-6">
                            <button
                              type="button"
                              name="signin"
                              id={`button3_${
                                questions[currentQuestion] &&
                                questions[currentQuestion].answers &&
                                questions[currentQuestion].answers
                                  .option_3_iscorrect
                              }`}
                              className="quiz-submit"
                              onClick={() =>
                                onCheckAnswer(
                                  questions[currentQuestion] &&
                                    questions[currentQuestion].answers &&
                                    questions[currentQuestion].answers
                                      .option_3_iscorrect
                                )
                              }
                            >
                              {questions[currentQuestion] &&
                                questions[currentQuestion].answers &&
                                questions[currentQuestion].answers.option_3}
                            </button>
                            <br />
                            <button
                              type="button"
                              name="signin"
                              id={`button4_${
                                questions[currentQuestion] &&
                                questions[currentQuestion].answers &&
                                questions[currentQuestion].answers
                                  .option_4_iscorrect
                              }`}
                              className="quiz-submit"
                              onClick={() =>
                                onCheckAnswer(
                                  questions[currentQuestion] &&
                                    questions[currentQuestion].answers &&
                                    questions[currentQuestion].answers
                                      .option_4_iscorrect
                                )
                              }
                            >
                              {questions[currentQuestion] &&
                                questions[currentQuestion].answers &&
                                questions[currentQuestion].answers.option_4}
                            </button>
                          </div>
                        </div>
                        <div className="mt-5 clearfix">
                          <button
                            style={{ border: "none" }}
                            type="button"
                            name="signin"
                            id="next"
                            className="form-submit float-left"
                            onClick={onPrevious}
                            hidden={isHidden}
                          >
                            Previous
                          </button>
                          {isSubmit ? (
                            <button
                              style={{ border: "none" }}
                              type="button"
                              name="signin"
                              id="previous"
                              className="form-submit float-right"
                              onClick={onNext}
                            >
                              Submit
                            </button>
                          ) : (
                            <button
                              style={{ border: "none" }}
                              type="button"
                              name="signin"
                              id="previous"
                              className="form-submit float-right"
                              onClick={onNext}
                            >
                              Next
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </center>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
