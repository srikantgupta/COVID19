import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import HomeComponent from './component/home'
import DistrictWise from './component/DistrictWise'
import ZoneWise from './component/zoneWise'
import StateWise from './component/StateWise'
import Global from './component/Global'
import banner from './banner.jpg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
    
        <Router>
      <div>
      <img src={banner} className="banner-logo" alt="banner" />
      <h1 className="covid19">Covid-19 Update <span>.<span className="live_text">LIVE UPDATE</span></span></h1>
        <ul className="navigation">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/districtwise">DistrictWise Update</Link>
          </li>
           <li>
            <Link to="/zonewise">ZoneWise Update</Link>
          </li>
           <li>
            <Link to="/statewise">StateWise Update</Link>
          </li>
          <li>
            <Link to="/global">Global Update</Link>
          </li>
        </ul>

       
        <Switch>
          <Route exact path="/">
          <HomeComponent/>
          </Route>
          <Route path="/districtwise">
          <DistrictWise  name= {"srikant"}/>
          </Route>
          <Route path="/zonewise">
          <ZoneWise  name= {"srikant"}/>
          </Route>
          <Route path="/statewise">
          <StateWise  name= {"srikant"}/>
          </Route>
           <Route path="/global">
          <Global  name= {"srikant"}/>
          </Route>
        </Switch>
      </div>
    </Router>
      {/* <HomeComponent/>
      <DistrictWise  name= {"srikant"}/> */}
    </div>
  );
}
export default App;
