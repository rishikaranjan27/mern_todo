import '../CSS/TableSmall.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate, Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import { baseURL } from '../lib';
import { Store } from "../Store";
import axios from 'axios';
import dateFormat from 'dateformat';



export const TableSmall = ({sortData}) => {

    const navigate = useNavigate();


    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;


   

    const deleteHandler = async (id) => {
        try {

            await axios.delete(
                `${baseURL}/api/tasks/${id}`,
                {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                }
            );
         
            window.location.reload();
        }

        catch(err) {
            console.log(err);
        }
    };


    return (
        <div className = 'tableSmall'>
        {
            sortData?.map((task) => (

            <div className='tableSmall_data'> 

                <div className='tableSmall_modification'>
        
                <PageviewOutlinedIcon className="tableSmall_icon" onClick={() => {
                navigate(`/${task._id}`);
                }}/>
                    
                <EditOutlinedIcon className="tableSmall_icon" onClick={() => {
                navigate(`/edit/${task._id}`);
                }}/>
                    
                <DeleteOutlineOutlinedIcon className="tableSmall_icon" onClick={() => {
                deleteHandler(task._id);
                }}/>
                    
                </div>


                <div className='tableSmall_text'>
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                </div>

                <div className='tableSmall_btns'>
               
                <button className={task.status == 'Not started' ? 'small-red-btn' : task.status == 'In progress' ? 'small-blue-btn' : 'small-green-btn'}>
                {'Status: '}{task.status}
                </button>
               
                </div>

            </div>  
               
            ))
        }


        

        </div>
    )
}