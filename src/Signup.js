import React from "react";
import styled from "styled-components";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {useDispatch,useSelector} from 'react-redux';
import {setLoginUserDetails} from './UserSlice.js';
import db from "./Firebase";
const userRef = collection(db,"users");
const Signup = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkUser = async () => {
    const userSnap = await getDocs(userRef);
    userSnap.forEach((user) => {
      if(user.data().email === email.trim() && user.data().password === password.trim()){
        console.log('Home');
        dispatch(setLoginUserDetails({name:user.data().name,email:email}));
        navigate('/home');
        return ;
      }
    });
    setError("login_error");
  }
  return (
    <Outer>
      <InnerLeft>
      {(error === "login_error")?<div className="error-msg">*The entered email or password doesn't exist</div>:<></>}
        <h1>SignIn</h1>
        <input id="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}></input>
        <input id="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}></input>
        <button onClick={checkUser}>SignIn</button>
        <p>
          Account not created? <a onClick = {() => {
            navigate('/register');
          }}>Register</a>
        </p>
      </InnerLeft>
      <InnerRight>
        <img id="logo" src="https://cdn-icons-png.flaticon.com/512/1913/1913288.png"></img>
      </InnerRight>
    </Outer>
  );
};
const Outer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* position: absolute; */
  flex-direction: row;
  `;
const InnerLeft = styled.div`
  .error-msg{
  color:red;
  }
  a{
    &:hover{
      cursor:pointer;
    }
  }
  width: 50%;
  height: 100%;
  align-self:center;
  margin-bottom:10%;
  display: flex;
  flex-direction: column;
  h1 ,p,div{
    align-self:center;
    a{
      color:blue;
      text-decoration:underline; 
    }
  }
  #email,
  #password {
    width: 60%;
    height: 25px;
    margin-top: 20px;
    align-self: center;
  }
  button {
    width: 20%;
    margin-top: 20px;
    align-self: center;
    height: 30px;
    border-radius: 7px;
    background: #8bfabe;
    &:hover {
      background: green;
    }
  }
      @media (max-width:500px){
        font-size:xx-small;
        button{
          width:70px;
        }
      }
  justify-self: flex-start;
`;
const InnerRight = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  #logo {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    border-radius: 40px;
    height:30%;
  }
  background: linear-gradient(
    254.59deg,
    rgba(10, 255, 49, 0.4263) 21.27%,
    rgba(15, 207, 250, 0.47125) 82.6%,
    rgba(63, 200, 208, 0.270448) 102.78%,
    rgba(6, 1, 18, 0) 107.66%
  );
`;
export default Signup;
