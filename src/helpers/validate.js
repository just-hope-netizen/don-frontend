import { toast } from 'react-toastify';


export const validateUsername = (input) => {
  if (input.length >= 4) {
    return true;
  } else {
    toast.error('You have entered an invalid username, username must be more than 3 characters!');
    return false;
  }
}


export const validateEmail = (input) => {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (input.match(mailformat)) {
    return true;
  } else {
      toast.error('You have entered an invalid email, check and try again!');
    return false;
  }
}

export function checkPassword(input) {
  const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  const password = input;
  if (( password.length >= 7 && password.length <= 15 ) && password.match(passwordFormat) ) {
    return true;
  } else {
      toast.error('You have entered an invalid password, check and try again!');
    return false;
  }
}  

