import '../CSS/SigninScreen.css';
import { Helmet } from "react-helmet-async"
import React, { useState, useContext, useEffect } from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import {Store} from '../Store';
import { baseURL } from '../lib';
import logo from '../Images/logo.jpg';
import { Banner } from '../Components/Banner';





export const SigninScreen = () => {

    const navigate = useNavigate();

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;


    const signinHandler = async (e) => {

        e.preventDefault();

        try 
        {

          const { data } = await axios.post(
            `${baseURL}/api/users/signin`, 
          {
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

        <div className="signinScreen">

        <Helmet> Log In </Helmet>

        <div className='bannerContainer'>
  
          <h3>Productive Todo List</h3>
          <h5>Achieve more everyday</h5>
        </div>




        <div className="signinContainer">

          <div className='header-logo'>
            <img src = {logo}/>
            <h3>ToDo-List</h3>
          </div>

          <h2>Welcome Back</h2>

          <div className='input'>
            <label>Email Address</label>

            <input type="text" placeholder="Email" 
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


          <button className="btn" onClick={signinHandler}>Log In</button>


          <div>Don't have an account?{' '}
            <Link to= '/signup' className='link'>Sign up</Link>
          </div>

        </div>

        </div>
    )
}