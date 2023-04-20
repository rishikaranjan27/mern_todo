import React, { useContext, useState, useEffect } from "react";
import { Store } from "../Store";
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { baseURL } from '../lib';
import '../CSS/EditScreen.css'
import { Header } from "../Components/Header";





export const EditScreen = () => {

    const navigate = useNavigate();

    const {state} = useContext(Store);
    const {userInfo} = state;

    const params = useParams();
    const {id} = params;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Not started');

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

  

    const editHandler = async () => {

        try {
            const {data} = await axios.put(
                `${baseURL}/api/tasks/${id}`,
                {
                    title: title,
                    description: description,
                    status: status,
                },
 
                {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                },
            );


            navigate('/');


        }

        catch(err) {
            console.log(err);
        }

    };

    

    useEffect(() => {

        const fetchData = async () => {

            try {
                const {data} = await axios.get(
                    `${baseURL}/api/tasks/${id}`, 
                    {
                        headers: {authorization: `Bearer ${userInfo.token}`}
                    }
                ); 
                
                console.log(data);

                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
            }

            catch (err) {
                console.log(err);
            }

        };

        fetchData();

    }, [userInfo]);





    return (

        <div className="editScreen">

            <Header/>

           

                <div>
                <h4>Title</h4>
                <input className = 'title' type='text' placeholder="Title" required defaultValue={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                />
                </div>
                
                <div className='flex'>
                <div className='left'>
                <h4>Description</h4>
                <input className='description' type='text' placeholder="Description" required defaultValue={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
                />
                </div>
                
         

                <div className='right'>
             
                <div className='select-dropdown'>
                
                <div className='status'>
                <h4>Status</h4>
                <select  name='option' onChange={handleStatusChange} required defaultValue={status}>
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                </select>
                </div>
                
                </div>

                </div>
                </div>

            
                <button className='update-btn' onClick={() => {
                    editHandler();
                    
                }}>Update</button>

         

          
        </div>
    )
}