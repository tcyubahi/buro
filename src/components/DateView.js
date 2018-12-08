import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

class DateView extends Component {
	constructor(props) {
		super(props);
	}
  render() {
  	const { day } = this.props;
    return (
    	<div className="dateView">
            <Grid>
                <Row>
                    <Col md={2}>
                        <Button bsClass="transparent dateButton button-22">
                            <FontAwesomeIcon icon={faChevronCircleLeft} />
                        </Button>
                    </Col>
                    <Col md={8} className="day bold green">
                        <div className="textCenter">
                            <p>{day}</p>
                        </div>
                    </Col>
                    <Col md={2}>
                        <Button bsClass="transparent dateButton button-22">
                            <FontAwesomeIcon icon={faChevronCircleRight} />
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
  }
}

DateView.propTypes = {
	day: PropTypes.string.isRequired
}

export default DateView;