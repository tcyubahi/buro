import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import SettingsContainer from './SettingsContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy, faCheck, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { fadeIn } from 'react-animations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const newSchedule = {
   'days': {
     'mon': [],
     'tue': [],
     'wed': [],
     'thu': [],
     'fri': [],
     'sat': [],
     'sun': []
   },
   'apptLen': 15,
   'breakLen': 0
  };

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTimeSettings: false,
      showEditDay: true,
      currentDay: '',
      currentDayEdit: [],
      showNewTimeInput: false,
      showDayTimes: false,
      schedule: {},
      days:  ['mon','tue','wed','thu','fri','sat','sun'],
      newTime : {
        start: '',
        end: ''
      },
      startHour: 0,
      endHour: 0,
      startMinutes: 0,
      endMinutes: 0
    }
    this.startHourEdit = this.startHourEdit.bind(this);
    this.endHourEdit = this.endHourEdit.bind(this);
    this.startMinutesEdit = this.startMinutesEdit.bind(this);
    this.endMinutesEdit = this.endMinutesEdit.bind(this);
    this.apptLenEdit = this.apptLenEdit.bind(this);
    this.breakLenEdit = this.breakLenEdit.bind(this);
  }

  async componentDidMount () {
    const {buroID, email} = this.props.usercreds;
    await this.getSchedule(buroID, email)
    .then(() => {
      console.log(this.state.schedule);
      this.evaluateSchedule(this.state.schedule);
    });
  }

  apptLenEdit (event) {
    var newSchedule = this.state.schedule;
    newSchedule.apptLen = parseInt(event.target.value);
    this.setState({
      schedule: newSchedule
    });
  }

  breakLenEdit (event) {
    var newSchedule = this.state.schedule;
    newSchedule.breakLen = parseInt(event.target.value);
    this.setState({
      schedule: newSchedule
    });
  }

  startHourEdit (event) {
    this.setState({
      startHour: parseInt(event.target.value)
    });
  }

  endHourEdit (event) {
    this.setState({
      endHour: parseInt(event.target.value)
    });
  }

  startMinutesEdit (event) {
    this.setState({
      startMinutes: parseInt(event.target.value)
    });
  }

  endMinutesEdit (event) {
    this.setState({
      endMinutes: parseInt(event.target.value)
    });
  }

  async getSchedule (buroID, email) {
    await fetch("http://localhost:8000/schedule",
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
      schedule: result.schedule
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

  async evaluateSchedule (schedule) {

    if (schedule === undefined || schedule.apptLen === undefined || schedule.breakLen === undefined || schedule.days === undefined) {
      console.log("WHHWHWHWHHWHWHWHWHHWHWH");
      const {buroID, email} = this.props.usercreds;
      var addSchedule = {
        'buroID': buroID,
        'email': email,
        'days': newSchedule.days,
        'apptLen': newSchedule.apptLen,
        'breakLen': newSchedule.breakLen
      };
      this.setState({
        schedule: addSchedule
      }, () => {
        console.log(this.state.schedule);
      });
    } else {
      var schedule = this.state.schedule;
      delete schedule['_id'];
      this.setState({
        schedule: schedule
      }, () => {
        console.log(this.state.schedule);
      });
    }
  }

  onEditTimeSettings = () => {
    this.setState({editTimeSettings: true});
  }

  saveTimeSettings = () => {
    this.setState({editTimeSettings: false}); 
    const apptLen = this.state.schedule.apptLen,
          breakLen = this.state.schedule.breakLen;
    if (apptLen > 59 || apptLen < 15 || breakLen > 59 || breakLen < 0) {
      toast.error("Invalid duration provided", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      var newSchedule = this.state.schedule;
      newSchedule.apptLen = apptLen;
      newSchedule.breakLen = breakLen;
      this.setState({
        schedule: newSchedule
      },() => {
        console.log(this.state.schedule);
        this.saveScheduleEdits();
      });
    }
  }

  editDaySettings = (day) => {
      var showDayTimes;
      if (this.state.currentDay === day) {
        showDayTimes = !this.state.showDayTimes;
      } else {
        showDayTimes = true;
      }
      console.log(showDayTimes + " " + day);
      this.setState({showDayTimes: showDayTimes});
      console.log(this.state.schedule.days[day]);

      this.setState({
        currentDay: day,
        currentDayEdit: this.state.schedule.days[day],
        startHour: 0,
        endHour: 0,
        startMinutes: 0,
        endMinutes: 0
      });
    }

    saveDaySettings = () => {
      const { startHour, endHour, startMinutes, endMinutes } = this.state;
      if (startHour === 0 && startMinutes === 0 && endHour === 0 && endMinutes === 0) {
        this.saveScheduleEdits();
      }
      // } else if (startHour > 23 || startHour <= 0 || endHour > 23 || endHour <= 0 || startMinutes > 59 || startMinutes <= 0 || endMinutes > 59 || endMinutes <= 0) {
      //   toast.error("Invalid time provided", {
      //     position: toast.POSITION.TOP_RIGHT
      //   });
      // } 
      else {
        var newTime = this.state.newTime;
        newTime.start = this.state.startHour + ':' + this.state.startMinutes;
        newTime.end = this.state.endHour + ':' + this.state.endMinutes;
        console.log(newTime);
        var newSchedule = this.state.schedule;
        newSchedule.days[this.state.currentDay].push(newTime);
        this.setState({
          schedule: newSchedule
        });
        console.log(this.state.schedule);
        this.saveScheduleEdits();
      }
    }

  addTime = () => {
    this.setState({showNewTimeInput: true});
  }

  closeTimeEdit () {
    this.setState({showDayTimes: false});
  }

  async saveScheduleEdits () {
    const newSchedule = this.state.schedule;
    await fetch("http://localhost:8000/editschedule",
    {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'newSchedule': newSchedule})
    })
    .then(res => res.json())
    .then(
      (result) => {
      console.log(result);
      if (result.success) {
        toast.success('Schedule Updated', {
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

  removeTime (index) {
    var currentDayEdit = this.state.currentDayEdit;
    currentDayEdit.splice(index, 1);
    var newSchedule = this.state.schedule;
    newSchedule.days[this.state.currentDay] = currentDayEdit;
    this.setState({
      currentDayEdit: currentDayEdit,
      schedule: newSchedule
    });
    console.log(this.state.schedule.days[this.state.currentDay]);
  }

  getHour (time) {
    return time.split(':')[0];
  }

  getMinutes (time) {
    return time.split(':')[1];
  }

  render() {

    const { editTimeSettings, showDayTimes, days, currentDayEdit } = this.state;

    let thisDay = <div>
                    { currentDayEdit.map((time, index) => 
                        <Grid className="inputGroup" key={time.start}>
                          <Row>
                            <Col sm={2}>
                              <FormControl type="number" placeholder="8"  value={this.getHour(time.start)}/>
                            </Col>
                            <Col sm={2}>
                              <FormControl type="number" value={this.getMinutes(time.start)}/>
                            </Col>
                            <Col sm={2}>
                              <FormControl type="number" placeholder="0" value={this.getHour(time.end)}/>
                            </Col>
                            <Col sm={2}>
                              <FormControl type="number" placeholder="30" value={this.getMinutes(time.end)}/>
                            </Col>
                            <Col sm={4}>
                              <Button onClick={() => this.removeTime(index)} bsClass="transparent grey pull-left">
                                <FontAwesomeIcon icon={faTimesCircle} />
                              </Button> 
                            </Col>
                          </Row>
                        </Grid>
                      )
                    }
             
                  <Grid className="inputGroup">
                    <Row>
                      <Col sm={3}>
                        <FormControl type="number" min={0} max={23} placeholder="8" onChange={this.startHourEdit}/>
                      </Col>
                      <Col sm={3}>
                        <FormControl type="number" min={0} max={59}  placeholder="00" onChange={this.startMinutesEdit}/>
                      </Col>
                      <Col sm={3}>
                        <FormControl type="number" min={0} max={23} placeholder="4" onChange={this.endHourEdit}/>
                      </Col>
                      <Col sm={3}>
                        <FormControl type="number" min={0} max={59} placeholder="30" onChange={this.endMinutesEdit}/>
                      </Col>
                    </Row>
                  </Grid> 

                    <Grid>
                      <Row>
                        <Col sm={6}>
                          <Button onClick={() => this.closeTimeEdit()} bsClass="transparent grey pull-left button-22">
                            <FontAwesomeIcon icon={faTimesCircle} />
                          </Button> 
                        </Col>
                        <Col sm={6}>
                          <Button onClick={() => this.saveDaySettings()} bsClass="transparent pull-right green button-22">
                            <FontAwesomeIcon icon={faCheck} />
                          </Button> 
                        </Col>
                      </Row>
                    </Grid>
    </div>;

    return (
    	<div className="settings">
          <ToastContainer />
          <Grid>
            <Row>
              <Col md={3}>
              </Col>
              <Col md={6}>
                <SettingsContainer title="Time Settings" info="in minutes">
                  <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                      <Col sm={6}>
                        Appointments Length:
                      </Col>
                      <Col sm={6}>
                        <FormControl type="number" value={this.state.schedule.apptLen} min={15} max={60} disabled={!editTimeSettings} onChange={this.apptLenEdit}/>
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                      <Col sm={6}>
                        Break Length:
                      </Col>
                      <Col sm={6}>
                        <FormControl type="number" value={this.state.schedule.breakLen} min={0} max={60} disabled={!editTimeSettings} onChange={this.breakLenEdit}/>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      { !editTimeSettings && <Col smOffset={10} sm={2}>
                        <Button onClick={() => this.onEditTimeSettings()} bsClass="transparent pull-right button-22">
                                <FontAwesomeIcon icon={faPenFancy} />
                        </Button>
                      </Col> }
                      { editTimeSettings && <Col smOffset={10} sm={2}>
                            <Button onClick={() => this.saveTimeSettings()} bsClass="transparent pull-right green button-22">
                                <FontAwesomeIcon icon={faCheck} />
                            </Button>
                      </Col> }
                    </FormGroup>
                  </Form>
                </SettingsContainer>

                <SettingsContainer title="Days Settings">
                  <small>Click on days to view/edit times</small>
                  <Grid>
                    <Row>
                    { days.map((day) => <Button key={day} bsClass="greenButton customButton" onClick={() => this.editDaySettings(day)}>{day.toUpperCase()}</Button>
                      )
                    }
                    </Row>
                  </Grid>
                  { showDayTimes && thisDay }
                </SettingsContainer>
              </Col>
              <Col md={3}>
              </Col>
            </Row>
          </Grid>
      </div>
    )
  }
}

Settings.propTypes = {
  usercreds: PropTypes.isRequired
}

export default Settings;