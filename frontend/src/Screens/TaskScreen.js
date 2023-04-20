import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { baseURL } from '../lib';
import '../CSS/ViewScreen.css'
import { Header } from "../Components/Header";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import dateFormat from 'dateformat';




export const TaskScreen = () => {

  
    const navigate = useNavigate();

    const {state} = useContext(Store);
    const {userInfo} = state;

    const params = useParams();
    const {id} = params;


    const [task, setTask] = useState([]);


    useEffect(() => {

        const fetchData = async () => {

            try {
                const {data} = await axios.get(
                    `${baseURL}/api/tasks/${id}`, 
                    {
                        headers: {authorization: `Bearer ${userInfo.token}`}
                    }
                ); 
                setTask(data);
            }

            catch (err) {
                console.log(err);
            }

        };

        fetchData();

    }, [userInfo]);





    return (
        <div className="viewScreen">

        <Header/>
        {
            <div>
            <div className='edit-option'>
                <button onClick={() => {
                navigate(`/edit/${id}`);
            }} className='view-btn'>
            <EditOutlinedIcon/>
            </button>
            </div>
  
            <div className='view-flex'>

            <div className='view-left'>
            <h4>Title</h4>
            <div>{task.title}</div>


            
            <h4>Description</h4>
            <div>{task.description}</div>
            </div>


            <div className='view-middle'>

            <div>
            <h4>Status</h4>
            <div>{task.status}</div>
            </div>
            

            </div>

          
                    
            </div>

            </div>                    
        }
                           
        </div>
    )
}