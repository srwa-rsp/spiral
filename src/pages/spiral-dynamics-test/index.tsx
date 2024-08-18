import { useEffect, useState } from "react";
import Question from "@/components/Question/Question";
import { Button } from "@nextui-org/react";
import { useGetQuestions, usePostUserResults } from "@/utils/services";
import { Progress } from "@nextui-org/progress";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  QuestionData,
  FinalAnswers,
  Answer,
} from "@/types/interfaces/QuestionsInterface";
import Spinner from "@/components/spinner/Spinner";

const index = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [answers, setAnswers] = useState(Array(questions?.length).fill([]));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion: QuestionData = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const router = useRouter();

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

  const handleSelectionChange = (
    questionIndex: number,
    selection: string[]
  ) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selection;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    const currentSelections = answers[currentQuestionIndex] || [];
    if (currentSelections.length !== 3) {
      alert("Please select 3 options before proceeding.");
      return;
    }

    const weights = currentSelections.map(
      (option: string, index: number): Answer => {
        return { option, weight: 3 - index };
      }
    );

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
  const handleSubmit = async (finalAnswers: FinalAnswers[]) => {
    setIsLoading(true);
    try {
      const response = await usePostUserResults(finalAnswers);
      toast.success(response.message);
      setIsLoading(false);
      setTimeout(() => {
        router.push("/user/profile");
      }, 2000);
    } catch (error:any) {
      toast.error(error);
    }
  };

  if (questions.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 gap-10">
      <Progress
        label={`${currentQuestionIndex + 1} /  5`}
        value={progress}
        className="py-10 max-w-96"
        color="primary"
      />
      <Question
        question={currentQuestion?.question}
        options={currentQuestion?.options}
        onSelectionChange={(selection: string[]) =>
          handleSelectionChange(currentQuestionIndex, selection)
        }
      />

      {currentQuestionIndex == 4 && (
        <Button
          color="primary"
          onClick={handleNextQuestion}
          isLoading={isLoading}
        >
          Submit
        </Button>
      )}
      {currentQuestionIndex != 4 && (
        <Button color="primary" onClick={handleNextQuestion}>
          Next
        </Button>
      )}
    </div>
  );
};

export default index;
