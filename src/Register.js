import React from "react";
import styled from "styled-components";
import { collection, doc, getDocs, setDoc,addDoc} from "firebase/firestore";
import {useNavigate} from 'react-router-dom';
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux';
import {setLoginUserDetails} from './UserSlice.js';
import db from "./Firebase";
const userRef = collection(db,"users");
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  useEffect(() => {
    if(error === "Can"){
      setError("");
      console.log('er => ',error,name,password,email);
      addDoc(userRef, {
        booked:"no",
        name:name,
        email:email,
        password:password
      }).then(() => {dispatch(setLoginUserDetails({name:name,email:email})); navigate('/home')}).catch(err => console.log('Error'));
    }
  });
  let i = 0;
  const checkUser = async () => {
    const userSnap = await getDocs(userRef);
    console.log(userSnap.size);
    userSnap.forEach((user) => {
      i++;
      if(user.data().email === email.trim()){
        setError("*User Already Exists");
        return ;
      }
      else if(i === userSnap.size-1){
        console.log('er => ',error,name,password,email);
        addDoc(userRef, {
        booked:"no",
        name:name,
        email:email,
        password:password
      }).then(() => {navigate('/home')}).catch(err => console.log('Error'));
      }
    });
  }
  return (
    <Outer>
      <InnerLeft>
        <h1>Register</h1>
        {(error !== '')?<div className="error-msg">{error}</div>:<></>}
        <input id="name" placeholder="Name" onInput ={(event) => {setName(event.target.value)}}></input>
        <input id="email" placeholder="Email" onInput = {(event) => {setEmail(event.target.value)}}></input>
        <input id="password" placeholder="Password" onInput={(event) => {setPassword(event.target.value)}}></input>
        <button onClick={checkUser}>Register</button>
        <p>
          Account already created? <a onClick = {() => {navigate('/')}}>Signin</a>
        </p>
      </InnerLeft>
      <InnerRight>
        <img
          id="logo"
          src="https://cdn-icons-png.flaticon.com/512/1913/1913288.png"
        ></img>
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
  width: 50%;
  .error-msg{
    color:red;
  }
  height: 100%;
  align-self: center;
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
  h1 ,p,div{
    align-self:center;
    a{
      color:blue;
      cursor:pointer;
      text-decoration:underline;
    }
  }
  #name,
  #email,
  #password {
    width: 70%;
    height: 25px;
    margin-top: 20px;
    align-self: center;
  }
  button {
    width: 25%;
    margin-top: 20px;
    align-self: center;
    height: 30px;
    border-radius: 7px;
    background: #8bfabe;
    &:hover {
      background: green;
    }
  }
  @media (max-width: 500px) {
    font-size: xx-small;
    button {
      width: 70px;
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
    height: 30%;
  }
  background: linear-gradient(
    254.59deg,
    rgba(10, 255, 49, 0.4263) 21.27%,
    rgba(15, 207, 250, 0.47125) 82.6%,
    rgba(63, 200, 208, 0.270448) 102.78%,
    rgba(6, 1, 18, 0) 107.66%
  );
`;
export default Register;
