import { Store } from "../Store";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import '../CSS/Header.css'
import reverse_logo from '../Images/reverse_logo.png';


export const Header = () => {

    const navigate = useNavigate();

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;

    const signoutHandler = () => {

        ctxDispatch({type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        navigate('/signin');

    }



    return (
        <div className='header'>
      
        <div className='header-left'>
            <Link to ='/'>
            <img src = {reverse_logo}/>
            </Link>
            <h2>Welcome {userInfo.name}</h2>
        </div>
        
        <div className='header-right'>
        <Link to ='/signin' className='home-link'>
        <h5 onClick={signoutHandler}>Sign Out</h5>
        </Link>
        </div>

        </div>
    )
}