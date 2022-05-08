import React from "react";
import styled from "styled-components";
import "./index.css"
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { collection, doc, getDocs, setDoc,updateDoc} from "firebase/firestore";
import db from "./Firebase";
const userRef = collection(db,"users");
const Home = () => {
  const navigate = useNavigate();
  const name = useSelector(state => state.user.name);
  const email = useSelector(state => state.user.email); 
  const bookEvent = async () => {
    console.log(name);
    const userSnap = await getDocs(userRef);
    userSnap.forEach((user) => {
      const exe = async () => {
        const newFields = {booked: "yes"};
        const userDoc = doc(db,"users",user.id);
        await updateDoc(userDoc,newFields);
        alert("Booked Successfully");
      }
      if(user.data().email === email.trim()){
        console.log(name);
        if(user.data().booked === "yes"){
          alert("Already booked");
          return ;
        }
        else{
        exe();
        return ;
        }
      }
    });
  }
  return(
    <Main>
      <Left>
        <h1>Hi , {name}</h1>
        <h1>Performed by:- Marshmello , an American DJ who is known for his marshmello head and his bonechilling EDM music.</h1>
        <h1>Venue:-Sunburn ,Goa</h1>
        <h1>Timmings:- 7:00 P.M to 9:00 P.M</h1>
        <h1>Sponsors:- Zee Music</h1>
        <button onClick = {bookEvent}>Book Now</button>
      </Left>
      <Right>
        <div><a onClick = {() => {navigate('/home')}}>Home</a> | <a onClick = {() => {navigate('/contact')}}>Contact Us</a></div>
        <img id="marshmello" src = "https://as2.ftcdn.net/v2/jpg/04/35/65/15/1000_F_435651544_q597n19zj9onOkU2Znqgd9V1UDMYvSsc.jpg"></img>
      </Right>
    </Main>
  );
}
const Main = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  flex-direction:row;
`;
const Left = styled.div`
 width:45vw;
 height:100vh;
 font-family:'Monaco';
 text-transform:uppercase;
 font-size:xx-small;
 background:#07252d;
 display:flex;
 color:#0e3742;
 flex-direction:column;
 line-spacing:20px;
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
 button{
   width:20%;
   margin-left:50px;
   margin-top:50px;
   height:30px;
   border-radius:5px;
   color:white;
   background-color:lightgreen;
   border:2px solid green;
 }
`;
const Right = styled.div`
  width:55vw;
  img{
    z-index:-1;
    /* transform:translateY(-20px); */
    height:100vh;
    width:55vw;
  }
  a{
    cursor:pointer;
  }
  div{
    position:fixed;
    z-index:12;
    margin-left:25%;
    color:white;
  }
  height:100vh;
  justify-self:flex-end;
`;
export default Home;