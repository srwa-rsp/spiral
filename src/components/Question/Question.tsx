import { useEffect, useState } from "react";
// import { Button} from '@nextui-org/react';
import Button from "../Button/Button";

const Question = ({ question, options, onSelectionChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const optionsArray = Object.values(options);
  useEffect(() => {
    setSelectedOptions([]);
  }, [question]);
  
  const handleOptionClick = (option) => {
    console.log("selectedOptions",selectedOptions)
    console.log(option)
    if (selectedOptions.includes(option)) {
      const newSelection = selectedOptions.filter((opt) => opt !== option);
      setSelectedOptions(newSelection);
      onSelectionChange(newSelection);
      console.log("includes:",selectedOptions)
    } else if (selectedOptions.length < 3) {
        console.log("NOTincludes:",selectedOptions)
      const newSelection = [...selectedOptions, option];
      setSelectedOptions(newSelection);
      onSelectionChange(newSelection);
      console.log("newSelection",newSelection)
    }

  };

  return (
    <div className="flex flex-col gap-10">
      <h3>{question}</h3>
      <div className="flex flex-col gap-2">
        {optionsArray?.map((option, index) => (
          <Button
            key={index}
            className={`${
              selectedOptions.includes(option) ? "bg-green-400" : "default"
            } outline-none`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
