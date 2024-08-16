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
    if (selectedOptions.includes(option)) {
      const newSelection = selectedOptions.filter((opt) => opt !== option);
      setSelectedOptions(newSelection);
      onSelectionChange(newSelection);
    } else if (selectedOptions.length < 3) {
      const newSelection = [...selectedOptions, option];
      setSelectedOptions(newSelection);
      onSelectionChange(newSelection);
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
              selectedOptions.includes(option) ? " bg-[#F7EFE5]" : "default"
            } outline-none rounded`}
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
