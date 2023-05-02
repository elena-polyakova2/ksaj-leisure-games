import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

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
    <div>
      <h1>Sign Up With Your Email and Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <label>Email</label>
        <input type="email" required onChange={handleChange} name="email" value={email} />

        <label>Password</label>
        <input type="password" required onChange={handleChange} name="password" value={password} />

        <label>Confirm Password</label>
        <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;