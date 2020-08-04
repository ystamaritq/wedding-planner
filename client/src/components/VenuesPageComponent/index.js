import React, { Component, useState, useEffect } from 'react';
import {
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import PlaceholderImage from './placeholder_venue.png';
import BtnComponent from '../Button';
import './style.css';
import VenueCard from '../VenueCard';
import axios from 'axios';

const VenuesPageComponent = (props) => {
  const getAccessToken = props.getAccessToken;
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('Convention');

  // When user hits enter while still in text input focus, trigger venue search
  const onKeyPress = (event) => {
    if (event.charCode === 13) {
      searchVenues();
    }
  };

  // When user clicks search button, trigger venue search
  const handleFormSubmit = (event) => {
    event.preventDefault();
    searchVenues();
  };

  // Method to call venue search API endpoint
  const searchVenues = async () => {
    // Do not allow the user to search for a venue if the search text input is empty.
    if (!search) {
      alert('Please enter a venue name to search.');
      return;
    }

    setLoading(true);

    const token = await getAccessToken();

    var config = {
      method: 'get',
      url: `/api/venue/search?name=${search}`,
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data);
        setLoading(false);
        setVenues(res.data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    searchVenues();
  }, []);

  return (
    // Components venue search functionality
    <Container className="pt-5 mb-5">
      <h1 className="title-style">Search for Venues</h1>
      <Row className="d-flex flex-column flex-md-row vertical-align">
        <Col className="col-sm-12 col-lg-6">
          <InputGroup className="p5 mb-3 vertical-align">
            <InputGroup.Prepend>
              <InputGroup.Text>Search by venue name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onKeyPress={onKeyPress}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col className="col-sm-12 col-lg-6 mb-3">
          <BtnComponent name="Search" onClick={handleFormSubmit} />
        </Col>
      </Row>
      <br></br>
      {/* Venue card components */}
      <Row>
        {loading ? (
          <Col className="col-6 mb-3">
            <h1 className="title-style">Loading...</h1>
          </Col>
        ) : (
          venues.map((venue) => (
            <Col className="col-6 mb-3">
              <VenueCard
                img={
                  venue.photo === 'Sorry, no photo available'
                    ? PlaceholderImage
                    : venue.photo
                }
                name={venue.name}
                address={venue.address}
                url={venue.url}
                username={'wedding team'}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default VenuesPageComponent;