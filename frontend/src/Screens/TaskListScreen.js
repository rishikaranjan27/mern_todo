import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { baseURL } from '../lib';
import '../CSS/HomeScreen.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Header } from "../Components/Header";
import { Table } from "../Components/Table";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



export const TaskListScreen = () => {


    const navigate = useNavigate();

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;

    const [tasks, setTasks] = useState([]);
    const [sortType, setSortType] = useState('None');

 

    const sortData = [...tasks].sort((a, b) => {

        switch(sortType) {


            case 'Status':
                return a.status > b.status ? 1 : -1;
                break;


            case 'None':
                return a.updatedAt < b.updatedAt ? 1 : -1;
                break;
        }
    });



    



    const fetchData = async () => {

        try {
            const {data} = await axios.get(
                `${baseURL}/api/tasks/`, 
                {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                }
            ); 
            setTasks(data);
        }

        catch (err) {
            console.log(err);
        }

    };



    useEffect(() => {

            fetchData();

            //window.location.reload(true);

    }, [userInfo]);


    const [clicked3, setClicked3] = useState(false);


    return (
        <div className="homeScreen">

        <Header/>

        <div className="sortBar">

         
            <div className='sortBar-left'>

            <button className="static-btn">
                Sort by
                <div className="small-downBtn"><KeyboardArrowDownIcon/></div>
            </button>

            <div class="sortBar-content">

            <button className={clicked3 ? 'active-btn' : 'home-btn'} onClick={() => {
                setSortType('Status');
                setClicked3(true);
            }}>Status</button>
            </div>

            </div>

            <div>

            <button className="add-btn" onClick={() => {
                navigate('/create');
            }}>
                <AddOutlinedIcon className="icon-add"/>
                <p>Add Task</p>
            </button>

            </div>

        </div>
     



        <div className ='main'>

        <h1>Tasks</h1>
        {
        userInfo && (tasks.length != 0) &&
        (
            <div>
            <Table sortData={sortData}/>
            </div>


        )
        }

        {
        userInfo && (tasks.length == 0) &&
        (
            <div className="createTask">
                <p>No tasks</p>
                <p>Start organising your day</p>
                <button onClick={() => {
                navigate('/create');
            }}>Create Task</button>
                
            </div>
        )
        }

        </div>
 


      

       



        </div>
    )
}