import { Helmet } from "react-helmet-async"
import React, { useState, useContext, useEffect } from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import {Store} from '../Store';
import { baseURL } from '../lib';
import '../CSS/SignupScreen.css';
import logo from '../Images/logo.jpg';



export const SignupScreen = () => {

    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;



    const signupHandler = async (e) => {

        e.preventDefault();

        if(password !== confirmPassword) {
          alert('Password does not match'); 
          return;
        }

        try 
        {

          const { data } = await axios.post(
            `${baseURL}/api/users/signup`, 
          {
            name,
            email,
            password,

          });

          ctxDispatch({type: 'USER_SIGNIN', payload: data});
          localStorage.setItem('userInfo', JSON.stringify(data));
          navigate('/');

        } 
        
        catch (err) 
        {
            console.log(err);
        }

      };




      useEffect(() => {

        if(userInfo) {
            navigate('/');
        }

      }, [navigate, userInfo]);



      

    return (

        <div className="signupScreen">

            <Helmet> Sign Up </Helmet>

            <div className='bannerContainer'>
            <h3>Productive Todo List</h3>
            <h5>Achieve more everyday</h5>
            </div>

            <div className="signupContainer">

            <div className='header-logo'>
              <img src = {logo}/>
              <h3>ToDo-List</h3>
            </div>

            <h2>Sign Up</h2>

            <div className='input'>
              <label>Name</label>

              <input type="text" placeholder="Name" 
              onChange = {(event) => {
                setName(event.target.value);
              }}/>
            </div>


            <div className='input'>
              <label>Email Address</label>

              <input type="email" placeholder="Email" 
              onChange = {(event) => {
                setEmail(event.target.value);
              }}/>
            </div>


            <div className='input'>
              <label>Password</label>

              <input type="password" placeholder="Password"
              onChange = {(event) => {
                setPassword(event.target.value);
              }}/>
            </div>


            <div className='input'>
              <label>Confirm Password</label>

              <input type="password" placeholder="Confirm Password"
              onChange = {(event) => {
                setConfirmPassword(event.target.value);
              }}/>
            </div>


            <button className="btn" onClick={signupHandler}>Sign Up</button>


            <div>Have an account?{' '}
              <Link to= '/signin' className='link'>Login</Link>
            </div>

            </div>

        </div>
    )
}