import React, { Component } from "react";
import propTypes from "prop-types";

import { Grid, Row, Col, Table } from "react-bootstrap";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

class Device extends Component {
  state = {
    deviceDetails: {},
    detailsShown: false
  };

  getDeviceInfo = deviceIP => {
    const ipArr = deviceIP.split(".");
    let ipArrs = "";
    ipArr.map((arr, i) => {
      ipArr.length === i + 1 ? (ipArrs += arr) : (ipArrs += arr + "/");
    });
    var settings = {
      async: true,
      crossDomain: true,
      url: "http://localhost:8080/ipinfo/" + ipArrs,
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "cache-control": "no-cache"
      }
    };

    fetch(settings.url, settings)
      .then(function(response) {
        return response.json();
      })
      .then(
        function(response) {
          this.setState({
            deviceDetails: response,
            detailsShown: true
          });
        }.bind(this)
      );
  };

  hideDetails = () => {
    this.setState({ detailsShown: false });
  };

  render() {
    const { device } = this.props;

    const { deviceDetails, detailsShown } = this.state;
    console.log(device);
    console.log(deviceDetails);
    const actions = [
      <FlatButton
        label="Cool, thanks man!"
        primary={true}
        onClick={this.hideDetails}
      />
    ];

    return (
      <React.Fragment>
        <Dialog
          title={"Details for " + device.devicealias}
          actions={actions}
          modal={true}
          open={detailsShown}
        >
          <Grid>
            <Row>
              <Col md={4}>
                <b> City: </b>
                {deviceDetails.city}
              </Col>
              <Col md={4}>
                <b> Country: </b>
                {deviceDetails.country_name}
              </Col>

              <Col md={4}>
                <b> Continent: </b>
                {deviceDetails.continent_name}
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <b> Latitude: </b>
                {deviceDetails.latitude}
              </Col>
              <Col md={4}>
                <b> Longitude: </b>
                {deviceDetails.longitude}
              </Col>

              <Col md={4}>
                <b> Zip: </b>
                {deviceDetails.zip}
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <b> Type: </b>
                {deviceDetails.type}
              </Col>
              <Col md={4}>
                <b> Languages Spoken: </b>
                {deviceDetails.location
                  ? deviceDetails.location.languages
                    ? deviceDetails.location.languages[0].name
                    : null
                  : null}
              </Col>
            </Row>
          </Grid>
        </Dialog>

        <tr>
          <td> {device.devicealias}</td>

          <td> {device.devicestate}</td>

          <td> {device.georegion}</td>

          <td> {device.ownerusername}</td>

          <td> {device.servicetitle}</td>
          <td>
            <RaisedButton
              onClick={
                !detailsShown
                  ? this.getDeviceInfo.bind(this, device.devicelastip)
                  : this.hideDetails
              }
              primary={true}
              label={!detailsShown ? "IP Details" : "Thanks"}
            />
          </td>
        </tr>
        {false && (
          <tr>
            <Table striped bordered condensed hover bsClass={"deviceTable"}>
              <thead>
                <tr>
                  <th>City</th>
                  <th>State</th>
                  <th>Region</th>
                  <th>Owned By</th>
                  <th>Service Title</th>
                  <th />
                </tr>
              </thead>
              <tbody />
            </Table>
          </tr>
        )}
      </React.Fragment>
    );
  }
}

Device.PropTypes = {
  device: propTypes.object
};

export default Device;
