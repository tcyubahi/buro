import React, { Component } from 'react';
//import './Styles/bootstrap.css';
import './Styles/home.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom";
import logo from './img/logo.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Footer from './components/Footer';

const profile = {
  companyName: 'companyName',
  companyEmail: 'companyEmail',
  phone: 'companyPhone',
  address: 'companyAddress'
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usercreds: ''
    };
  }
  
  logout = () => {
    console.log("Logout");
  }

  async componentDidMount () {
    await this.checkLogin();
  }

  async checkLogin (){
    var logins = this.props.history.location.state;
    console.log(logins);
    if (logins && logins.usercreds && logins.usercreds.username && logins.usercreds.email && logins.usercreds.buroID) {
      this.setState({
        usercreds: logins.usercreds
      }, () => {
        console.log(this.state.usercreds);
      });
      console.log('logged in');
    } else {
      this.props.history.push('/');
    }
  }

  async isLoggedIn () {
    await fetch("http://localhost:8000/isloggedin")
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result);
      if (result.success) {

      } else if (result.error) {

      }
    },
    (error) => {
      console.log(error);
    }
    )
  }

  render() {
    const buroID = this.state.usercreds.buroID;
    return (
      <div className="App container">
        <div className="top custom-card-only-top">
          <div>
            <img src={logo} className="App-logo"/>
          </div>
          <div className="companyName">
            <p>{buroID}</p>
          </div>
        </div>

        <Tabs selectedTabClassName="selectedTab" defaultIndex={0}> 
          <Grid className="custom-card topTabs">
            <Row className="show-grid">
              <Col md={9}>
              <TabList className="noMargin">
              <Tab>DASHBOARD</Tab>
                <Tab>SCHEDULE</Tab>
                <Tab>PROFILE</Tab>
              </TabList>
              </Col>
              <Col md={3} className="">
                <Button className="btn pull-right logout" onClick={this.logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </Button>
              </Col>
            </Row>
          </Grid>
                  <TabPanel className="tabPanel">
                    <Dashboard />
                  </TabPanel>
                  <TabPanel>
                    <Settings usercreds={this.state.usercreds}/>
                  </TabPanel>
                  <TabPanel>
                    <Profile profile={profile} usercreds={this.state.usercreds}/>
                  </TabPanel>
                </Tabs>
        <Footer />
      </div>
      );
    }
  }

  export default Home;
