import React from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
const Contact = () => {
    const navigate = useNavigate();
    return(
        <Outer>
        <h1>Name: Aryan Nitin Mankame</h1>
        <h1>Email: aryan672002@gmail.com</h1>
        <h1>Mobile: 7387159818</h1>
        <h1>Thanks for visiting the website!!</h1>
        <a onClick = {() => {navigate('/')}}>Return to home page</a>
        </Outer>
    )
}
const Outer = styled.div`
height:100vh;
width:100vw;
display:flex;
color:#0e3742;
flex-direction:column;
line-spacing:20px;
align-items:center;
background:#07252d;
-webkit-box-reflect: below 1px linear-gradient(transparent,#0004);
h1{
  margin-top:30px;
  outline:none;
  animation:animate 5s linear infinite;
}
@keyframes animate{
  0%,18%,20%,50.1%,60%,65.1%,80%,90.1%,92%{
    color:#0e3742;
    text-shadow:none;
   }
   18.1%,20.1%,30%,50%,60.1%,65%,80.1%,90%,92.1%,100%{
     color:white;
     text-shadow:0 0 10px #03bcf4,0 0 20px #03bcf4,0 0 40px #03bcf4,0 0 80px #03bcf4,0 0 100px #03bcf4;

   }
}
a{
    color:white;
    cursor:pointer;
    text-decoration:underline;
}
`;
export default Contact;