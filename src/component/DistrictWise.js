import React, { Component } from "react";
import axios from "axios";
import Loader from 'react-loader-spinner'

class DistrictWise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      districtD: [],
      districtData: [],
      errorMsg: "",
      categoriesKeys: [],
      subcategories:[]
    };
  }

  componentDidMount() {
    // this.timer = setInterval(() => {
    axios
      .get("https://api.covid19india.org/state_district_wise.json")
      .then((response) => {
  
        this.setState({ categories: response.data });
      })
      .catch((error) => {
       
        this.setState({ errorMsg: "Error retriving data" });
      });

    //}, 5000);
  }


  subComponent() {
    let { categories } = this.state
    if(Object.keys(categories).length > 0){
        this.categoriesKeys = Object.keys(categories).map((keyo,index) => {
            if(keyo !=="State Unassigned"){
              var keyoid = keyo.replace(/ +/g, "");
           for (var i = 0; i < index; i++) {
               let Ddata = categories[keyo].districtData;
              
               this.categoriesdistrictData = Object.keys(Ddata).map((keyi,index) => {
               
                var Ddatai = Ddata[keyi];
                var keyiid = keyi.replace(/ +/g, "");
                if(Object.keys(Ddata).length > 0){
                    this.categoriesdistrictinnerData =  Object.keys(Ddatai).map((key,index) => {   
                    // return console.log(key);
                    for (var innerj = 0; innerj < 4; innerj++) {
                        let inner = Ddatai[key]
                        if(key !=="delta" && key !== "notes"){
                            if(key !=="deceased" ){
                            return <p key={index}><strong>{key} :</strong>  {inner} </p>;
                            }else{ return <p key={index}><strong>death :</strong>  {inner} </p>;}
                                //return console.log("key");
                            }else{ return ""}
                    }
                });
            }
                return <ul className="panel-default"><li className="districtName"  data-toggle="collapse" href={'#'+keyiid}><span className="left_move">District :- </span> {keyi}</li>  
                <ul className="districtData panel-collapse collapse" id={keyiid}><li>{this.categoriesdistrictinnerData}</li></ul> 
                </ul>;                 
            });   
           }
           return <div>
           <ul className="district panel-default">
                <li className="stateName" data-toggle="collapse" href={'#'+keyoid}><span className="left_move">State :- </span> {keyo} </li>
                <ul className="district_data panel-collapse collapse" id={keyoid}>
                <div> {this.categoriesdistrictData}</div>
                </ul>
           </ul>      
           </div>;
        }else{ return ""}
       });    
       return <div><span>{this.categoriesKeys}</span></div> ;
         }
       else{ return null}
  }



  render() {
    const { errorMsg } = this.state
    return(<div> 
           <h1 className="global_heading"><span>India Live Update Districtwise</span></h1>
    
    <Loader type="ThreeDots" color="#2c3e50" height={100} width={100}timeout={1500} /> 
     {this.subComponent()} {errorMsg ? <div>{errorMsg}</div> : null} </div>);
  }
}
export default DistrictWise;
