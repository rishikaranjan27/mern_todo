import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import {Store} from './Store'
import { useContext } from "react";

import { TaskListScreen } from './Screens/TaskListScreen';
import { SigninScreen } from "./Screens/SigninScreen";
import { SignupScreen } from "./Screens/SignupScreen";
import { AddTaskFormScreen } from "./Screens/AddTaskFormScreen";
import { TaskScreen } from "./Screens/TaskScreen";
import { EditScreen } from "./Screens/EditScreen";
import { HomeBanner } from "./Screens/SigninScreen";
import { Banner } from "./Components/Banner";


function App() {

  const {state} = useContext(Store);
    const {userInfo} = state;


  return (
    <div className="app">

    <Router>
     
        <Routes>
        
          <Route  path = "/" element= { userInfo ? <TaskListScreen/> : <Banner/>}/>
          <Route  path = "/signin" element= {<SigninScreen/>}/>
          <Route  path = "/signup" element= {<SignupScreen/>}/>
          <Route  path = "/create" element= {<AddTaskFormScreen/>}/>
          <Route path = "/:id" element= {<TaskScreen/>}/>
          <Route path = "/edit/:id" element= {<EditScreen/>}/>

        </Routes>
      </Router>
      
     
    </div>
  );
}

export default App;
