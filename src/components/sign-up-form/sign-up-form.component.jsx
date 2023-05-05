import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //make user documents
  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent default behaviour from the form

    //make sure 'password' matches 'confirmPassword'
    if(password !== confirmPassword) {
      alert('Passwords do not match');
      return; 
    }

    //create user
    try{
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();


    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email is already in use.');
      } else {
        console.log('The user could not be created', error);
      }   
    }
  }

  //handle update of the form fields
  const handleChange = (event) => {
    const { name, value } = event.target; //get all fields from input

    setFormFields({ ...formFields, [name]: value });
  }

  return(
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up With Your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;