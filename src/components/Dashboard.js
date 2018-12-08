import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import LeftCard from './LeftCard';
import DateView from './DateView';
import Queue from './Queue';

class Dashboard extends Component {
  render() {
    return (
    	<div className="dashboardContent">
    		<Grid>
    			<Row className="show-grid">
    				<Col md={4}>
                        <DateView day="Thursday 22, 11, 2018"/>
    					<LeftCard type={0} name='Tresor' time='10:30 - 11:15'/>
    					<LeftCard type={1} name='Clark' time='11:30 - 12:15'/>
    				</Col>
    				<Col md={8}>
    					<Queue />
    				</Col>
    			</Row>
    		</Grid>
    	</div>
    	)
}
}

export default Dashboard;