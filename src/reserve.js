import React, { Component } from 'react';
import './Styles/reserve.css';
import { Grid, Row, Col, Form, FormControl, FormGroup, Button, Panel, InputGroup } from 'react-bootstrap';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faChevronLeft, faChevronRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as dateHelper from './dateHelper.js';

class Reserve extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: true,
			appointment: false,
			reserve: false,
			buroID: '',
			foundCompany: {},
			schedule: {},
			dotDay: dateHelper.todayDotFormat(),
			currentDay: dateHelper.todaySlashFormat(),
			currentDaySpots: [],
			notFound: false,
			reservedTime: '',
			phone: '',
			email: '',
			name: ''
		}
		this.searchEdit = this.searchEdit.bind(this);
		this.nameEdit = this.nameEdit.bind(this);
		this.phoneEdit = this.phoneEdit.bind(this);
		this.emailEdit = this.emailEdit.bind(this);
	}
	
	async componentDidMount () {

	}

	phoneEdit (event) {
		this.setState({
			phone: event.target.value
		});
	}

	emailEdit (event) {
		this.setState({
			email: event.target.value
		});
	}

	nameEdit (event) {
		this.setState({
			name: event.target.value
		});
	}

	searchEdit (event) {
		this.setState({
			buroID: event.target.value
		});
	}

	async nextDay () {
		var nextDay = dateHelper.getNext(this.state.currentDay);
		this.setState({
			currentDay: nextDay,
			dotDay: dateHelper.dayDotFormat(nextDay)
		}, () => {
			this.generateTimeSpots();
		});
	}

	async previousDay () {
		var previousDay = dateHelper.getPrevious(this.state.currentDay);
		this.setState({
			currentDay: previousDay,
			dotDay: dateHelper.dayDotFormat(previousDay)
		}, () => {
			this.generateTimeSpots();
		});
	}

	async search () {
		const {buroID} = this.state;
		console.log(buroID);
		if (buroID === '' || !buroID.includes('buro-')) {
			toast.error("Invalid buro id provided", {
          		position: toast.POSITION.TOP_RIGHT
        	});
		} else {
			await this.getProfile(buroID);
			//this.showAppointments();
		}
	}

	async getProfile (buroID) {
  	await fetch("http://localhost:8000/getprofile",
    {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'buroID': buroID})
    })
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result);
      if (result.success) {
		this.setState({
			foundCompany: result.profile,
			notFound: false
		}, ()=> {
			this.getSchedule(buroID);
		});
      } else if (result.error) {
      	this.setState({
			notFound: true
		});
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

  	async getSchedule (buroID) {
  	await fetch("http://localhost:8000/getschedule",
    {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'buroID': buroID})
    })
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result);
      if (result.success) {
		this.setState({
			schedule: result.schedule
		}, () => {
			this.showAppointments();
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

  	async generateTimeSpots () {
  		var times = await dateHelper.getDaySchedules(dateHelper.getDayName(this.state.currentDay), this.state.schedule);
		console.log(times);
		this.setState({
			currentDaySpots: times
		});
  	}

	selectAppt (time) {
		this.setState({
			reservedTime: time
		}, () => {
			this.showReserve();
		});
	}

	reserve () {
		const {name, phone, email, reservedTime, buroID, currentDay} = this.state;
		if (name === '' || (phone === '' || email === '')) {
			    toast.error("Name and either phone or email are required", {
          			position: toast.POSITION.TOP_RIGHT
        		});
		} else {
			this.completeReservation(name, phone, email, buroID, currentDay);
		}
	}

	async completeReservation (name, phone, email, buroID, date) {
		await fetch("http://localhost:8000/saveappointment",
    {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'buroID': buroID, 'details': {
      	'name': name, 'phone': phone, 'email': email, date: 'date'
      }})
    })
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result);
      if (result.success) {
        toast.success("Appointment reserved", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.showSearch();
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

	showAppointments () {
		this.generateTimeSpots();
		this.setState({
			search: false,
			appointment: true,
			reserve: false
		});

	}

	showSearch () {
		this.setState({
			search: true,
			appointment: false,
			reserve: false
		});
	}

	showReserve () {
		this.setState({
			search: false,
			appointment: false,
			reserve: true
		});
	}


	render () {
		return (
			<div>
			  		    <ToastContainer />
			<header className="App-header custom-card-only-top">
			<div className="logoContainer">
			</div>
			{ false && <div className="AppName">
			<p>Buro</p>
			</div> }
			</header>
			<div className="container content">
			 { this.state.search && 
			 	<Panel>
			<Panel.Heading className="titles"><FontAwesomeIcon icon={faSearch} /> Search</Panel.Heading>
			<Panel.Body>
			<Grid>
			<Row>
			<Col sm={10}>
			<FormControl type="text" placeholder="Search Service by Buro ID" className="inputs" onChange={this.searchEdit}/>
			{ this.state.notFound && <div className="error">No service found with buro ID: {this.state.buroID}</div> }
			</Col>
			<Col sm={2}>
			<Button bsClass="greenButton customButton pull-right" onClick={() => this.search()}>
			Search <FontAwesomeIcon icon={faSearch} />
			</Button>
			</Col>
			</Row>
			</Grid>
			</Panel.Body>
			</Panel>
			}
			{ this.state.appointment && 
			<Panel>
			<Panel.Heading className="titles"><FontAwesomeIcon icon={faCalendar} /> Select Appointment</Panel.Heading>
			<Panel.Body>
			<Grid>
			<Row>
			<Col sm={4}>
			<Button bsClass="transparent dateButton button-22 green" onClick={()=> this.previousDay()}>
			<FontAwesomeIcon icon={faChevronLeft} />
			</Button>
			</Col>
			<Col sm={4} className="date">
			{this.state.dotDay}
			</Col>
			<Col sm={4}>
			<Button bsClass="transparent dateButton button-22 green pull-right" onClick={()=> this.nextDay()}>
			<FontAwesomeIcon icon={faChevronRight} />
			</Button>
			</Col>
			</Row>
			</Grid>
			<Grid className="serviceInfo">
			<Row>
			<Col sm={4}>
			<div className="card service">
			<div className="serviceTitle">{this.state.foundCompany.companyName}</div>
			<div className="serviceAddress">{this.state.foundCompany.address}</div>
			<div className="serviceAddress">{this.state.foundCompany.companyEmail}</div>
			<div className="serviceAddress">{this.state.foundCompany.phone}</div>
			<div className="addressButton">
			<Button bsSize="large" block onClick={()=> this.showSearch()}>
			Wrong Turn? Search again
			</Button>
			</div>
			</div>
			</Col>
			<Col sm={8}>
			{
				this.state.currentDaySpots.map((time) =>
				<Grid key={time}>
					<Row>
						<Col sm={6} className="apptText appt">
						{time}
					</Col>
					<Col sm={6}className="appt">
					<Button bsClass="greenButton customButton pull-right" onClick={() => this.selectAppt(time)}>
					Reserve
					</Button>
					</Col>
					</Row>
				</Grid>
				)
			}
			</Col>
			</Row>
			</Grid>
			</Panel.Body>
			</Panel>
			}
			{ this.state.reserve &&
			<Panel>
			<Panel.Heading className="titles"><FontAwesomeIcon icon={faCheckCircle} /> Reserve</Panel.Heading>
			<Panel.Body>
			<Grid>
			<Row>
			<Col sm={3}>
			</Col>

			<Col sm={6}>
				<Form>
					<FormControl type="text" placeholder="Name" className="inputs" value={this.state.name} onChange={this.nameEdit}/>
					<FormControl type="phone" placeholder="Phone" className="inputs" value={this.state.phone} onChange={this.phoneEdit}/>
					<FormControl type="email" placeholder="Email" className="inputs" value={this.state.email} onChange={this.emailEdit}/>
				</Form>
			</Col>

			<Col sm={3}>
			</Col>

			<Col sm={12}>
			<Button bsClass="greenButton customButton pull-right" onClick={() => this.reserve()}>
			Confirm <FontAwesomeIcon icon={faCheckCircle} />
			</Button>
			</Col>
			</Row>
			</Grid>
			</Panel.Body>
			</Panel>
			}
			</div>
			<div>
			<p className="countText"><span className="countNumber">1, 426, 733</span> Schedules through us!</p>
			</div>
			<Footer />
			</div>
			)
		}
	}

	export default Reserve;