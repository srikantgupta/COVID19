import React, { Component } from 'react'
import axios from 'axios';

 class StateWise extends Component {
     constructor(props){
        super(props)
        
        this.state = {
            categories: [],
            districtD:[],
            districtData:[],
            errorMsg : '',
            categoriesKeys:[]
        }
       

        
     }
     
componentDidMount(){

   // this.timer = setInterval(() => {

    axios.get('https://api.covid19india.org/state_district_wise.json')
    .then(response => {
        console.log(response.data)
         this.setState({categories : response.data})
    })
    .catch(error => {
        
        console.log(error)
        this.setState({errorMsg: 'Error retriving data'})
    })

//}, 5000);  
    
}
    render(props) {
        let { categories } = this.state
       
        console.log("categories")
        console.log(categories)
        console.log("categories")
//stateData start
            
       if(Object.keys(categories).length > 0){
         this.categoriesKeys = Object.keys(categories).map((key,index) => {
            console.log(categories[key].districtData);
            let menuItems = [];
            for (var i = 0; i < Object.keys(categories).length; i++) {
                this.categoriesdistrictData = Object.keys(categories[key].districtData).map((key,index) => {
                    console.log(key); 
                    menuItems.push(key);
                    return <p >{menuItems}</p>;
                });   
            }
            console.log(categories[index]);   
            return <p >{key}<br/><span>{menuItems}</span></p>;
        });

//stateData end



      // districtData start

    // if(Object.keys(categories).length>0){
    //     Object.keys(categories).map((key,index) => {
    //         console.log(categories[key].districtData);
    //         this.categoriesdistrictData = Object.keys(categories[key].districtData).map((key,index) => {
    //             console.log(key);
    //             return <p >{key}<span>{index}</span></p>;
    //         });
    //         console.log(categories[index]);
            
    //         return <p >{key}<span>{index}</span></p>;
    //     });
      
       
      // districtData end
      
          return <div><span>{this.categoriesKeys}</span><span>{this.categoriesdistrictData}</span></div> ;
        }
        else{ return null}
    }
}
export default StateWise;