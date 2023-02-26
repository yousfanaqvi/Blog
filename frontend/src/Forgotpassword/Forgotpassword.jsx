import React ,{useState}from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import "../Login/Login.css"
import "./Forgotpassword.css"
function Forgotpassword() {
  
  const { state } = useLocation();
  const username=state.username;
  const [data,setData]= useState({
    password:"",
    cPassword:""
  });
  console.log(state.answer)
  const [passMatch, setPassmatch]=useState("true");
  
  React.useEffect(() => {
    validatePassword();
  }, [data]);
  
  const validatePassword = () => {
    data.password === data.cPassword
      ? setPassmatch(true)
      : setPassmatch(false);
  };
  
  const [ans,setAns]= useState('');

  const checkAnswer = (e)=>{
    e.preventDefault();
    if(state.answer === e.target.answer.value)
    setAns(true);
    else
    setAns(false);
  }
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };
  const sendData = (e) => {
    e.preventDefault();
    validatePassword();
    if (passMatch && data.password.length>=8){
      const bodyFormData = new FormData(e.target)
      bodyFormData.append("username",username);
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return axios.post('/setpassword', bodyFormData, config)
    .then((res) => {
      console.log(res)
  
    });
  }
}
  return (
    <div className='FP-container'>
    <h1>Trouble Sigining in?</h1>
    <p>Please answer your security question to set new password for your account</p>
    {!ans?
    <div className='question-container'>
        <h3>{state.question}</h3>
        <form onSubmit={checkAnswer}>
        <TextField fullWidth id="standard-basic" name="answer" label="Answer" type="text" variant="standard" required />
        <button name='submit' type='submit' className='siginin-btn'>Check</button>
        </form>
    </div>
   :
    <form onSubmit={sendData} className="FP-form">
      <TextField id="password" name="password" label="password" type="password" variant="standard" 
          value={data.password}
          onChange={handleChange}
          required />
        <TextField id="cPassword" name="cp" label="confirm password" type="password" variant="standard" 
          value={data.cPassword}
          onChange={handleChange}
          required />
        <div className="input-error">
          {data.password !== data.cPassword ? "" : ""}
        </div>
        <div className="input-error">
          {passMatch ? "" : "Error: Passwords do not match"}<br></br>
          {data.password.length<=7 &&data.password.length >0 ? "Error: Password must be more than 7 characters long":null}

        </div>
        <button type='submit' name="submit" className='siginin-btn'>Reset</button>
      </form>}
      {ans===false?<h4 className="input-error">Incorrect answer</h4>:null}

    </div>
  )
}

export default Forgotpassword