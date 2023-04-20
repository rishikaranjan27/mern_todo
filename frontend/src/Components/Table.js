import '../CSS/Table.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate, Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import { baseURL } from '../lib';
import { Store } from "../Store";
import axios from 'axios';
import { TableSmall } from './TableSmall';

import dateFormat from 'dateformat';



export const Table = ({sortData}) => {

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
        <div className = 'table'>
        
        <table className = "table-header">
            
            <tr>
                <th className='head'>Title</th>
                <th className='head'>Desc</th>
                <th className='head'>Status</th>
 
            </tr>
            {
            sortData?.map((task) => (
                <tr className='table-row'>
                <td className = "table-title">{task.title}</td>
                <td className = "table-desc">{task.description}</td>

                <td>
                    <button className={task.status == 'Not started' ? 'priorityHigh-btn' : task.status == 'In progress' ? 'priorityLow-btn' : 'priorityMedium-btn'}>
                    {task.status}
                    </button>
                </td>


                <td>
                <PageviewOutlinedIcon className="icon" onClick={() => {
                navigate(`/${task._id}`);
                }}/>
                </td>

                <td>
                <EditOutlinedIcon className="icon" onClick={() => {
                navigate(`/edit/${task._id}`);
                }}/>
                </td>

                <td>
                <DeleteOutlineOutlinedIcon className="icon" onClick={() => {
                deleteHandler(task._id);
                }}/>
                </td>

                </tr>

            ))
            }
        </table>


        <div className='table-small'>
            <TableSmall sortData = {sortData}/>
        </div>

        </div>
    )
}