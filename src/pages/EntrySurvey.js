
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Form, Button, Badge, ProgressBar, Container, Row, Col } from "react-bootstrap";
import "./EntrySurvey.css";
import "../global.css"; 

const EntrySurvey = () => {

    return (
        <div className="screen-container">
            <div className="banner-top">
                <h2>Welcome to</h2>
                <img src="/movaid-blue.png" alt="Movaid Icon" className="app-icon" />
            </div>
            {/* Citation: https://getbootstrap.com/docs/4.0/components/forms/ */}
            <Form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label className= "fn-input" for="inputFirstName4">First Name</label>
                        <input type="name" class="form-control" id="inputFirstName4" placeholder="First Name"></input>
                    </div>
                    <div class="form-group col-md-6">
                        <label className= "ln-input" for="inputLastName4">Last Name</label>
                        <input type="name" class="form-control" id="inputLastName4" placeholder="Last Name"></input>
                    </div>
                </div>
                <div class="form-group col-md-9">
                    <label className= "addr-input" for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="123 Main St"></input>
                </div>
                <div class="form-group col-md-9">
                    <label className= "addr2-input" for="inputAddress2">Address Line 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label className= "city-input" for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity"></input>
                    </div>
                    <div class="form-group col-md-4">
                        <label className= "state-input" for="inputState">State</label>
                        <select id="inputState" class="form-control">
                            <option selected>Choose...</option>
                            <option>Boston</option>
                            <option>California</option>
                            <option>Illinois</option>
                            <option>New York</option>
                            <option>Pennsylvania</option>
                        </select>
                    </div>
                    <div class="form-group col-md-4">
                        <label className= "zip-input" for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip"></input>
                    </div>
                </div>
                <Link to="/" className="submit-link">
                    <button className="submit-button" type="submit" class="btn btn-primary">Submit</button>
                </Link>
            </Form>
        </div>
    );
}

export default EntrySurvey;