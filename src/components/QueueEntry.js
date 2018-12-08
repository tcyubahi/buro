import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

class QueueEntry extends Component {
  render() {
  	const { name, time } = this.props;
    return (
            <div className="queueEntry">
                    <Grid>
                        <Row>
                            <Col md={6} className="name">
                                {name}
                            </Col>
                            <Col md={6} className="time bold">
                                <small className="pull-right">{time}</small>
                            </Col>
                        </Row>
                    </Grid>
            </div>
    )
  }
}

QueueEntry.propTypes = {
	name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
}

export default QueueEntry;