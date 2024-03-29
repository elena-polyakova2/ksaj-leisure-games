import { useState, FormEvent, ChangeEvent } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { SignUpContainer } from './sign-up-form.styles';
import { signUpStart } from '../../store/user/user.action';


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //make user documents
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //prevent default behaviour from the form

    //make sure 'password' matches 'confirmPassword'
    if(password !== confirmPassword) {
      alert('Passwords do not match');
      return; 
    }

    //create user
    try{
      dispatch(signUpStart(email, password, displayName));
      
      resetFormFields();
    } catch(error) {
      if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create user, email is already in use.');
      } else {
        console.log('The user could not be created', error);
      }   
    }
  }

  //handle update of the form fields
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; //get all fields from input

    setFormFields({ ...formFields, [name]: value });
  }

  return(
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign Up With Your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;