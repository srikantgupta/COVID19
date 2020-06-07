import React, { Component } from 'react'
import axios from 'axios';
import Loader from 'react-loader-spinner'
 class ZoneWise extends Component {
     constructor(props){
        super(props)
        
        this.state = {
            posts: [],
            errorMsg : '',
            arryLength :0,
            globals: '',
            LastUpdatedTime: '',
            CountryList: []
        }
       

        
     }
     
componentDidMount(){
    axios.get('https://api.covid19india.org/zones.json')
    .then(response => {
         this.setState({posts: response.data.zones})
         this.setState({globals: response.data.zones[0]})
    })
    .catch(error => {
        this.setState({errorMsg: 'Error retriving data'})
    })

//}, 5000);  
    
}
    render(props) {
        const { posts } = this.state
        const { errorMsg } = this.state
        const { globals } = this.state
        return (
          <div>
                <h1><span>Full list of Red, Orange, Green Zone districts for Lockdown 3.0</span></h1>
                <Loader type="ThreeDots"color="#2c3e50" height={100} width={100} timeout={1500}  />
                {globals ? <div>           
                <p className="state">Last Update :- {globals.lastupdated}</p>
                <ul className="listitem mng zone">
                        <li>S. NO.</li>
                            <li> state</li>
                            <li> district</li>
                            <li> zone</li>
                        </ul>          
                    </div> : null}
                {
                   
                     posts.length ?
                    posts.map((post, index) => 
                    <div key={post.districtcode}>
                        <ul className={post.zone} id="listitem">
                        <li className="state">{index+1}.</li>
                            <li className="state" > {post.state}</li>
                            <li className="state" > {post.district}</li>
                            <li className={post.zone} > {post.zone}</li>
                        </ul>
                    </div>)
                    :null
                }
                {errorMsg ? <div>{errorMsg}</div> : null}
            </div>
        )
    }
}
export default ZoneWise;