import React, { useContext, useEffect, useReducer, useState } from "react";
import { Store } from "../Store";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { baseURL } from '../lib';
import '../CSS/CreateScreen.css'
import {Header} from '../Components/Header'



export const AddTaskFormScreen = () => {

    const navigate = useNavigate();


    const {state} = useContext(Store);
    const {userInfo} = state;




    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Not started');



    const createHandler = async () => {

        try {


            const {data} = await axios.post(
                `${baseURL}/api/tasks/create`,

                {
                    title: title,
                    description: description,
                    status: status,
                },
 
                {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                },

               
            );


            

        }

        catch(err) {
            alert('Could not add task');
            console.log(err);
        }

    };



    return (
        <div className="createScreen">

        <Header/>

        <form>
            <h4>Title</h4>
            <input type='text' placeholder="Title" required
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            />

            <div className='create-flex'>

            <div className='create-left'>
                <h4>Description</h4>
                <input type='text' placeholder="Description" required
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
                />

            </div>

            </div>
            

            


            <button className='create-btn' onClick={() => {
                createHandler();
                navigate('/');
                
            }}>Create</button>

        </form>

        </div>
    )
}