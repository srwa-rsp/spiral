import { useEffect, useState } from "react";
import Question from "@/components/Question/Question";
import { Button } from "@nextui-org/react";
import { useGetQuestions, usePostUserResults } from "@/utils/services";
import { Progress } from "@nextui-org/progress";

const index = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(questions?.length).fill([]));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await useGetQuestions();
        setQuestions(response);
      } catch (error) {
        console.log("Error getting Questions", error);
      }
    };
    getQuestions();
  }, []);

  const handleSelectionChange = (questionIndex: number, selection: string[]) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selection;
    setAnswers(newAnswers);
    console.log("newAnswers:", newAnswers);
  };

  const handleNextQuestion = () => {
    console.log("answers",answers)
    console.log("currentQuestionIndex",currentQuestionIndex)
    const currentSelections = answers[currentQuestionIndex] || [];
    if (currentSelections.length !== 3) {
      alert("Please select 3 options before proceeding.");
      return;
    }

    const weights = currentSelections.map((option, index) => {
      return { option, weight: 3 - index };
    });

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      question: currentQuestion.question,
      answers: weights,
    };

    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit(updatedAnswers);
    }
  };
  const handleSubmit = async (finalAnswers) => {
try {
  const result = await usePostUserResults(finalAnswers);
  console.log(result)
} catch (error) {
  console.log(error)
}

  };

 

  if (questions.length == 0) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      <Progress  label="progress" value={progress} className="py-10 max-w-96" />
      <Question
        question={currentQuestion?.question}
        options={currentQuestion?.options}
        onSelectionChange={(selection: string) =>
          handleSelectionChange(currentQuestionIndex, selection)
        }
      />

      {currentQuestionIndex == 4 && (
        <Button onClick={handleNextQuestion}>Submit</Button>
      )}
      {currentQuestionIndex != 4 && (
        <Button onClick={handleNextQuestion}>Next</Button>
      )}
    </div>
  );
};

export default index;
