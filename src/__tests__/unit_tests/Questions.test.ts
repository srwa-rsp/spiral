import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react';
import { useState } from 'react';
import { jest } from '@jest/globals';

describe('handleOptionClick', () => {
  const useTestHook = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const onSelectionChange = jest.fn(); 

    const handleOptionClick = (option: string) => {
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

    return { selectedOptions, handleOptionClick, onSelectionChange };
  };

  it('should remove an already selected option', () => {
    const { result } = renderHook(() => useTestHook());

    act(() => {
      result.current.handleOptionClick('option1');
    });

    act(() => {
      result.current.handleOptionClick('option1');
    });

    expect(result.current.selectedOptions).toEqual([]);
    expect(result.current.onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should add a new option when less than 3 options are selected', () => {
    const { result } = renderHook(() => useTestHook());

    act(() => {
      result.current.handleOptionClick('option1');
    });

    expect(result.current.selectedOptions).toEqual(['option1']);
    expect(result.current.onSelectionChange).toHaveBeenCalledWith(['option1']);
  });

  it('should not add a new option when 3 options are already selected', () => {
    const { result } = renderHook(() => useTestHook());

    act(() => {
      result.current.handleOptionClick('option1');
      result.current.handleOptionClick('option2');
      result.current.handleOptionClick('option3');
    });

    act(() => {
      result.current.handleOptionClick('option4');
    });

    expect(result.current.selectedOptions).toEqual(['option1', 'option2', 'option3']);
    expect(result.current.onSelectionChange).not.toHaveBeenCalledWith(['option1', 'option2', 'option3', 'option4']);
  });

  it('should call onSelectionChange with the correct arguments', () => {
    const { result } = renderHook(() => useTestHook());

    act(() => {
      result.current.handleOptionClick('option1');
    });

    expect(result.current.onSelectionChange).toHaveBeenCalledWith(['option1']);
  });
});
