import { InputHTMLAttributes, FC } from 'react';
import { FormInputLabel, Input, Group } from './form-input.styles';

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return(
    <Group>
      <Input {...otherProps} />
      {label && (
        /*make shure shrink always receive boolean; check if otherProps.value exists, then check if it's a string, and if it is as well, check it's length 
        */
        <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;