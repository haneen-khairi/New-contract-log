import React from "react";
import Datetime from "react-datetime";
import { Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import "react-datetime/css/react-datetime.css";

interface DateInputProps {
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  currentVal: string;
}

// WORK IN PROGRESS
const DateInput: React.FC<DateInputProps> = ({
  placeholder,
  name,
  register,
  currentVal,
}) => {
  const {
    onChange: formOnChange,
    onBlur: formOnBlur,
    name: formName,
    ref: formRef,
  } = register(name);

  const handleChange = (value: any) => {

    formOnChange({ target: { value: value } });
  };

  const renderInput = (
    props: any,
    openCalendar: () => void,
    closeCalendar: () => void
  ) => {
    const clear = () => {
      props.onChange({ target: { value: "" } });
      formOnChange({ target: { value: "" } });
    };

    return (
      <div>
        <InputGroup size="md">
          <Input
            readOnly
            onClick={openCalendar}
            placeholder={placeholder}
            pr="4.5rem"
            // ref={formRef}
            // name={formName}
            // onBlur={formOnBlur}
            // {...props}
            value={props.value}
            {...register(name)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={clear}>
              Clear
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
    );
  };

  return (
    <Datetime
      closeOnSelect
      timeFormat={false}
      dateFormat="YYYY-MM-DD"
      renderInput={(props, openCalendar, closeCalendar) =>
        renderInput(
          props,
          openCalendar as () => void,
          closeCalendar as () => void
        )
      }
      initialValue={currentVal}
      onChange={(val)=> handleChange(val)}
    />
  );
};

export default DateInput;
