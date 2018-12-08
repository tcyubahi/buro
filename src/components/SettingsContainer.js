import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class SettingsContainer extends Component {
  render() {
  	const { title, info, children } = this.props;
    return (
    	<div className="custom-card settingsContainer">
            <div className="settingsTitle">
                {title} {info && <small>({info})</small>}
            </div>
            <div className="settingsBody">
                {children}
            </div>
        </div>
    )
  }
}

SettingsContainer.propTypes = {
    title: PropTypes.string.isRequired
}

export default SettingsContainer;