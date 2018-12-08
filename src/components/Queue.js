import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import QueueEntry from './QueueEntry';

class Queue extends Component {
  render() {
  	const { day } = this.props;
    return (
    	<div className="custom-card queue">
            <div className="queueTop bold">
                ON QUEUE
            </div>
            <div>
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Button bsClass="transparent pull-right green button-22">
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
            <div className="QueueContainer">
                <div className="queueList">
                    <QueueEntry name="Tresor Cyubahiro" time="1:00 - 1:45"/>
                    <QueueEntry name="Tresor Cyubahiro" time="1:00 - 1:45"/>
                    <QueueEntry name="Tresor Cyubahiro" time="1:00 - 1:45"/>
                </div>
            </div>
        </div>
    )
  }
}

Queue.propTypes = {
	day: PropTypes.string.isRequired
}

export default Queue;