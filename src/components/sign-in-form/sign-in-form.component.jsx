import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
  };

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  //make user documents
  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent default behaviour from the form
    
    //create user
    try{
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch(error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('You entered incorrect password for the email');
          break;
        case 'auth/user-not-found':
          alert('There is no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  }

  //handle update of the form fields
  const handleChange = (event) => {
    const { name, value } = event.target; //get all fields from input

    setFormFields({ ...formFields, [name]: value });
  };

  return(
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign In With Your Email and Password</span>
      <form onSubmit={handleSubmit}>
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