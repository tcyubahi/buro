import React, { Component } from 'react';
import './Styles/auth.css';
//import './Styles/bootstrap.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Grid, Row, Col, Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import Footer from './components/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpConfirmPassword: ''
    }
    this.usernameEdit = this.usernameEdit.bind(this);
    this.passwordEdit = this.passwordEdit.bind(this);
    this.signUpUsernameEdit = this.signUpUsernameEdit.bind(this);
    this.signUpEmailEdit = this.signUpEmailEdit.bind(this);
    this.signUpPasswordEdit = this.signUpPasswordEdit.bind(this);
    this.signUpConfirmPasswordEdit = this.signUpConfirmPasswordEdit.bind(this);
  }

  async componentWillMount () {
    await this.checkLogin();
  }

  async checkLogin (){
    var logins = this.props.history.location.state;
    console.log(logins);
    if (logins && logins.usercreds && logins.usercreds.username && logins.usercreds.email && logins.usercreds.buroID) {
      this.props.history.push('/home', {'usercreds': logins.usercreds});
      console.log('logged in');
    } 
  }

  usernameEdit (event) {
    this.setState({username: event.target.value});
  }

  passwordEdit (event) {
    this.setState({password: event.target.value});
  }

  signUpUsernameEdit (event) {
    this.setState({signUpUsername: event.target.value});
  }

  signUpEmailEdit (event) {
    this.setState({signUpEmail: event.target.value});
  }

  signUpPasswordEdit (event) {
    this.setState({signUpPassword: event.target.value});
  }

  signUpConfirmPasswordEdit (event) {
    this.setState({signUpConfirmPassword: event.target.value});
  }

  login = () => {
    const { username, password} = this.state;

    if (username !== '' || password !== '') {
      this.authenticateUser(username, password);
    } else {

    }
  }

  signUp = () => {
    const { signUpUsername, signUpEmail, signUpPassword, signUpConfirmPassword } = this.state;

    if (signUpPassword !== '' || signUpConfirmPassword !== '' || signUpEmail !== '' || signUpUsername !== '') {
      if (signUpPassword === signUpConfirmPassword) {
        this.signUserUp(signUpUsername, signUpEmail, signUpPassword);
      } else {
        toast.error("Passwords do not match", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } else {
      toast.error("All fields are required", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  async authenticateUser (username, password) {
    await fetch("http://localhost:8000/login",
    {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'username': username, 'password': password})
    })
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result);
      if (result.success) {
        this.props.history.push('/home', {'usercreds': result.usercreds});
      } else if (result.error) {
        toast.error(result.error, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    },
    (error) => {
      console.log(error);
      if (error.error) {
        toast.error(""+error.error, {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        toast.error(""+error, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
    )
  }

  async signUserUp (username, email, password) {
    await fetch("http://localhost:8000/signup",
    {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'username': username, 'email': email, 'password': password})
    })
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result);
      if (result.success) {
        toast.success("Account created. Loggin in...", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.props.history.push('/home', {'usercreds': result.usercreds});
      } else if (result.error) {
        toast.error(result.error, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    },
    (error) => {
      console.log(error);
      toast.error(""+error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    )
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <header className="App-header custom-card-only-top">
          <div className="logoContainer">
          </div>
          { false && <div className="AppName">
            <p>Buro</p>
          </div> }
        </header>
          <Grid className="loginBox">
            <Row className="show-grid">
              <Col xsHidden md={3}></Col>
              <Col xs={12} md={6} className="login custom-card-only-top">
                <Tabs selectedTabClassName="selectedTab"> 
                  <TabList>
                    <Tab>Login</Tab>
                    <Tab>SignUp</Tab>
                  </TabList>
                  <TabPanel>
                    <Form inline className="authForms">
                      <Grid>
                        <Col xs={12} md={5}>
                        <FormGroup>
                          <FormControl type="email" placeholder="Username/Email" className="fullWidthInput" value={this.state.username} onChange={this.usernameEdit}/>
                        </FormGroup>
                        </Col>
                        <Col xs={12} md={5}>
                        <FormGroup>
                          <FormControl type="password" placeholder="password" value={this.state.password} onChange={this.passwordEdit}/>
                        </FormGroup>
                        </Col>
                        <Col xs={12} md={2}>
                        <Button className="pull-right" onClick={()=> this.login()}>Login</Button>
                        </Col>
                      </Grid>
                    </Form>
                  </TabPanel>
                  <TabPanel>
                    <Form inline className="authForms">
                      <Grid>
                        <Col xs={12} md={5}>
                        <FormGroup>
                          <FormControl type="email" placeholder="Email" className="fullWidthInput" value={this.state.signUpEmail} onChange={this.signUpEmailEdit}/>
                        </FormGroup>
                        </Col>
                        <Col xs={12} md={5}>
                        <FormGroup>
                          <FormControl type="text" placeholder="Username" value={this.state.signUpUsername} onChange={this.signUpUsernameEdit}/>
                        </FormGroup>
                        </Col>
                        <Col xs={12} md={2}>
                         
                        </Col>
                      </Grid>
                      <Grid style={{marginTop: 20}}>
                        <Col xs={12} md={5}>
                        <FormGroup>
                          <FormControl type="password" placeholder="Password" className="fullWidthInput" value={this.state.signUpPassword} onChange={this.signUpPasswordEdit}/>
                        </FormGroup>
                        </Col>
                        <Col xs={12} md={5}>
                        <FormGroup>
                          <FormControl type="password" placeholder="Confirm Password" value={this.state.signUpConfirmPassword} onChange={this.signUpConfirmPasswordEdit}/>
                        </FormGroup>
                        </Col>
                        <Col xs={12} md={2}>
                          <Button className="pull-right" onClick={() => this.signUp()}>Get Started</Button>
                        </Col>
                      </Grid>
                    </Form>
                  </TabPanel>
                </Tabs>
              </Col>
              <Col xsHidden md={3}></Col>
            </Row>
          </Grid>
        <Footer />
      </div>
      );
    }
  }

  export default App;
