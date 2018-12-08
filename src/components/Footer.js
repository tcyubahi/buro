import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
        <div className="footer">
          <Grid>
            <Row>
                <Col md={4} className="name">

                </Col>
                <Col md={4} className="time bold">
                    <small>Buro © 2018</small>
                </Col>
                <Col md={4} className="time bold">
                    <div className="pull-right">
                        {/*<Button bsClass="transparent grey button-22">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </Button>
                        <Button bsClass="transparent grey button-22">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                        <Button bsClass="transparent grey button-22">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>*/}
                    </div>
                </Col>
            </Row>
          </Grid>
        </div>
    )
  }
}

export default Footer;