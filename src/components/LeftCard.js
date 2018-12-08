import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

class LeftCard extends Component {
  render() {
  	const { type, name, time } = this.props;
    return (
    	<div className="leftCard custom-card">
    		{ type === 0 && 
    			<div className="leftCard-title leftCard-title-serving">
                    <Grid>
                        <Row>
                            <Col md={6}>
                                SERVING
                            </Col>
                            <Col md={6}>
                                <small className="pull-right">{time}</small>
                            </Col>
                        </Row>
                    </Grid>
    			</div>
    		}
    		{ type === 1 && 
    			<div className="leftCard-title leftCard-title-next">
                    <Grid>
                        <Row>
                            <Col md={6}>
                                NEXT
                            </Col>
                            <Col md={6}>
                                <small className="pull-right">{time}</small>
                            </Col>
                        </Row>
                    </Grid>
    			</div>
    		}
     		<div className="leftCardBody">
     			{name}
    		</div>
    	</div>
    )
  }
}

LeftCard.propTypes = {
	type: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
}

export default LeftCard;