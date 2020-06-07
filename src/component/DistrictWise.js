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
        console.log(response.data);
        this.setState({ categories: response.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retriving data" });
      });

    //}, 5000);
  }


  subComponent() {
    let { categories } = this.state
    if(Object.keys(categories).length > 0){
        this.categoriesKeys = Object.keys(categories).map((keyo,index) => {
            if(keyo !=="State Unassigned"){
           for (var i = 0; i < index; i++) {
               let Ddata = categories[keyo].districtData;
               console.log(Ddata);
               this.categoriesdistrictData = Object.keys(Ddata).map((keyi,index) => {
                console.log(Ddata);
                var Ddatai = Ddata[keyi];
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
                return <div><strong className="districtName">District :- {keyi}</strong>  <ul className="districtData"><li>{this.categoriesdistrictinnerData}</li></ul> </div>;                 
            });   
           }
           return <div>
           <ul className="district">
                <li className="stateName">State :- {keyo} </li>
                <ul><li> {this.categoriesdistrictData}</li>
                </ul>
           </ul>      
           </div>;
        }else{ return ""}
       });    
       return <div><span>{this.categoriesKeys}</span><span>{this.categoriesdistrictData}</span></div> ;
         }
       else{ return null}
  }



  render() {
    const { errorMsg } = this.state
    return(<div> 
    <h2 className="Districtwise_heading">India Live Update Districtwise</h2>
    <Loader type="ThreeDots" color="#2c3e50" height={100} width={100}timeout={1500} /> 
     {this.subComponent()} {errorMsg ? <div>{errorMsg}</div> : null} </div>);
  }
}
export default DistrictWise;
