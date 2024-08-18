export interface QuestionData {
  id: number;
  question: string;
  options: [string, string, string, string, string, string, string];
}

export interface Answer {
    option: string;
    weight: number;
  }
  
  export interface FinalAnswers {
    question: string;
    answers: Answer[];
  }

  export interface QuestionProps {
    question: string; 
    options: string[]; 
    onSelectionChange: (selectedOption: string[]) => void;
  }