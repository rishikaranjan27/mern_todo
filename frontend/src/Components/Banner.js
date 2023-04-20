import '../CSS/Banner.css';
import { Helmet } from "react-helmet-async"
import React, { useState, useContext, useEffect } from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import {Store} from '../Store';
import { baseURL } from '../lib';
import logo from '../Images/logo.jpg';
import { SigninScreen } from '../Screens/SigninScreen';




export const Banner = () => {

  const navigate = useNavigate();

    

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;




      useEffect(() => {

        if(userInfo) {
            navigate('/');
        }

      }, [navigate, userInfo]);



    return (
        <div className='banner'> 

       

        <div className='signinDesktop'>
          <SigninScreen/>
        </div>

        

        <div className='bannerContainerMobile'>
          <h1>Productive Todo List</h1>
          <h3>Achieve more everyday</h3>

          <div className='mobile-btns'>
            <button className='mobile-active-btn' onClick={() => {
              navigate('/signin');
            }}>Log In</button>
            <button className='mobile-inactive-btn' onClick={() => {
              navigate('/signup');
            }}>Sign Up</button>

          </div>
        </div>



        </div>
    )
}