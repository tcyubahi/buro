import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import SettingsContainer from './SettingsContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy, faCheck, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	profile: {},
    	usercreds: {},
      	editProfileSettings: false,
    }
    this.nameEdit = this.nameEdit.bind(this);
    this.phoneEdit = this.phoneEdit.bind(this);
    this.addressEdit = this.addressEdit.bind(this);
    this.emailEdit = this.emailEdit.bind(this);
  }

  async componentWillMount () {
  	const {buroID, email} = this.props.usercreds;
  	await this.getProfile(buroID, email);
  }

  async componentDidMount () {
  	const {profile, usercreds} = this.props;
  	this.setState({
  		profile: profile,
  		usercreds: usercreds
  	}, () => {
  		console.log(this.state.profile);
  		console.log(this.state.usercreds);
  	});
  }

  async getProfile (buroID, email) {
  	await fetch("http://localhost:8000/profile",
    {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'buroID': buroID, 'email': email})
    })
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result);
      if (result.success) {
		this.setState({
			profile: result.profile
		});
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

  nameEdit (event) {
  	var profile = this.state.profile;
  	profile.companyName = event.target.value;
    this.setState({profile: profile});
  }

  phoneEdit (event) {
  	var profile = this.state.profile;
  	profile.phone = event.target.value;
    this.setState({profile: profile});
  }

  addressEdit (event) {
  	var profile = this.state.profile;
  	profile.address = event.target.value;
    this.setState({profile: profile});
  }

  emailEdit (event) {
  	var profile = this.state.profile;
  	profile.companyEmail = event.target.value;
    this.setState({profile: profile});
  }

  oneditProfileSettings = () => {
  	this.setState({editProfileSettings: true});
  }

  saveProfileSettings = () => {
  	console.log(this.state.profile);
  	const {buroID, email} = this.state.usercreds;
  	const {companyEmail, companyName, phone, address} = this.state.profile;

  	if (companyEmail !== undefined && companyEmail !== '' && companyName !== undefined && companyName !== '' && phone !== undefined && phone !== '' && address !== undefined && address !== '') {
  		this.saveProfile (buroID, email, companyEmail, companyName, phone, address);
  		this.setState({editProfileSettings: false});
  	} else {	
  		toast.error('All inputs are required', {
          position: toast.POSITION.TOP_RIGHT
        });
  	}	
  }

  async saveProfile (buroID, email, companyEmail, name, phone, address) {
    await fetch("http://localhost:8000/editprofile",
    {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'buroID': buroID, 'email': email, 'companyEmail': companyEmail,'name': name, 'phone': phone, 'address': address})
    })
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result);
      if (result.success) {
        toast.success('Profile Updated', {
          position: toast.POSITION.TOP_RIGHT
        });
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

  render() {
  	const {editProfileSettings, profile, usercreds} = this.state;
  	return (
  		<div>
  		    <ToastContainer />
  			<Grid>
  				<Row>
  				<Col sm={3}>
  				</Col>
  				<Col sm={6}>
			  		<SettingsContainer title="Service Account Details">
				  		<Form horizontal className="profile">
				  			<FormGroup controlId="formHorizontalEmail">
				  				<Col sm={12}>
				  					Company Name/Service Alias
				  				</Col>
				  				<Col sm={12}>
				  					<FormControl type="text" placeholder="" disabled={!editProfileSettings} value={profile.companyName} onChange={this.nameEdit} />
				  				</Col>
				  			</FormGroup>
				  			<FormGroup controlId="formHorizontalPassword">
				  				<Col sm={12}>
				  					Email
				  				</Col>
				  				<Col sm={12}>
				  					<FormControl type="email" placeholder="" disabled={!editProfileSettings} value={profile.companyEmail} onChange={this.emailEdit}/>
				  				</Col>
				  			</FormGroup>
				  			<FormGroup controlId="formHorizontalPassword">
				  				<Col sm={12}>
				  					Phone
				  				</Col>
				  				<Col sm={12}>
				  					<FormControl type="phone" placeholder="" disabled={!editProfileSettings} value={profile.phone} onChange={this.phoneEdit}/>
				  				</Col>
				  			</FormGroup>
				  			<FormGroup controlId="formHorizontalPassword">
				  				<Col sm={12}>
				  					Address
				  				</Col>
				  				<Col sm={12}>
				  					<FormControl type="text" placeholder="" disabled={!editProfileSettings} value={profile.address} onChange={this.addressEdit}/>
				  				</Col>
				  			</FormGroup>
							<FormGroup>
				  				{ !editProfileSettings && 
				  					<Col smOffset={10} sm={2}>
				  						<Button onClick={() => this.oneditProfileSettings()} bsClass="transparent pull-right button-22">
				  							<FontAwesomeIcon icon={faPenFancy} />
				  						</Button>
				  					</Col> 
				  				}
				  				{ editProfileSettings && 
				  					<Col smOffset={10} sm={2}>
				  						<Button onClick={() => this.saveProfileSettings()} bsClass="transparent pull-right green button-22">
				  							<FontAwesomeIcon icon={faCheck} />
				  						</Button>
				  					</Col> 
				  				}
				  			</FormGroup>
			  			</Form>
			  		</SettingsContainer>
			  	</Col>
			  	<Col sm={3}>
			  	</Col>
			</Row>
			</Grid>
  		</div>
  		)
  }
}

Profile.propTypes = {
	profile: PropTypes.isRequired,
	usercreds: PropTypes.isRequired
}

export default Profile;