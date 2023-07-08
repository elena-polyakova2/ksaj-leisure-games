import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: '',
  password: '',
  };

const SignInForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
    navigate('/');
  };

  //make user documents
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //prevent default behaviour from the form
    
    //create user
    try{
      dispatch(emailSignInStart(email, password));
      navigate('/');
      resetFormFields();
      
    } catch(error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert('You entered incorrect password for the email');
          break;
        case AuthErrorCodes.USER_DELETED:
          alert('There is no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  }

  //handle update of the form fields
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; //get all fields from input

    setFormFields({ ...formFields, [name]: value });
  };

  return(
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign In With Your Email and Password</span>
      <form onSubmit={(e) => handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;