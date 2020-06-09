import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
class Global extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: "",
      arryLength: 0,
      globals: "",
      date: "",
      CountryList: [],
    };
  
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      axios
        .get("https://api.covid19api.com/summary")
        .then((response) => {
          this.setState({ arryLength: response.data.Countries.length });
          this.setState({ posts: response.data.Countries });
          this.setState({ CountryList: response.data.Countries[76] });
          this.setState({ globals: response.data.Global });
          this.setState({ date: response.data });
        })
        .catch((error) => {
          this.setState({ errorMsg: "Error retriving data" });
        });
    }, 2000);
  }

  render(props) {
    console.log(this.props.name);
    const { posts } = this.state;
    const { errorMsg } = this.state;
    const { globals } = this.state;
    var { date } = this.state;
    const { CountryList } = this.state;
    console.log(CountryList);
    return (
      <div className="container">
        <h1 className="global_heading">
          <span>GLOBAL UPDATE COVID19 CASES</span>
        </h1>
        {globals ? (
          <div className="global_case">
            <ul className="listitem mng">
              <li>Global</li>
              <li> Total Confirmed</li>
              <li> Total Deaths</li>
              <li className="recover"> Total Recovered</li>
            </ul>
            <Loader
              type="ThreeDots"
              color="#2c3e50"
              height={100}
              width={100}
              timeout={1500}
            />
            <ul className="listitem">
              <li>Global</li>
              <li> {globals.TotalConfirmed}</li>
              <li> {globals.TotalDeaths}</li>
              <li className="recover"> {globals.TotalRecovered}</li>
            </ul>
          </div>
        ) : null}

        {
          <div>
            <ul className="listitem">
              <li>S. NO.</li>
              <li>Country</li>
              <li>Confirmed</li>
              <li>Deaths</li>
              <li className="recover">Recovered</li>
            </ul>
          </div>
        }

        {posts.length
          ? posts.map((post, index) => (
              <div key={post.Country}>
                <ul className="listitem">
                  <li> {index + 1}.</li>
                  <li> {post.Country}</li>
                  <li> {post.TotalConfirmed}</li>
                  <li> {post.TotalDeaths}</li>
                  <li className="recover"> {post.TotalRecovered}</li>
                </ul>
              </div>
            ))
          : null}
        {date
          ? (date = (
              <div className="global_case">
                <ul className="listitem date">
                  <li>Last Update:- {date.Date}</li>
                </ul>
              </div>
            ))
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
      </div>
    );
  }
}
export default Global;
