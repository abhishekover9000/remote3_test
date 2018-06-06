import React, { Component } from "react";
import propTypes from "prop-types";
import "./Devices.css";

import { Table, Row } from "react-bootstrap";
import Device from "./Device";

class Devices extends Component {
  state = {
    deviceDetails: {},
    detailsShown: false
  };

  render() {
    const { detailsShown, deviceDetails } = this.state;

    const devices = this.props.currentDevices.map(device => {
      return <Device device={device} />;
    });

    return (
      <Row style={{ textAlign: "center" }}>
        <Table striped bordered condensed hover bsClass={"deviceTable"}>
          <thead>
            <tr>
              <th>Alias</th>
              <th>State</th>
              <th>Region</th>
              <th>Owned By</th>
              <th>Service Title</th>
              <th />
            </tr>
          </thead>
          <tbody>{devices}</tbody>
        </Table>
      </Row>
    );
  }
}

Devices.PropTypes = {
  currentDevices: propTypes.array
};

export default Devices;
