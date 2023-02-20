import { useState } from "react";
import { Container, Row, Form, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import SingleLocation from "./SingleLocation";
import SingleFavLocation from "./SingleFavLocation";

const LeftLocationBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState([]);
  const FavLocations = useSelector((state) => state.SavedLocations.favloc);

  const baseUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchResult = await fetch(baseUrl + query + "&appid=8478e96f41d556c3166363bc4af0577a");
      if (fetchResult.ok) {
        const data = await fetchResult.json();
        setLocation(data);
        console.log(data);
        setQuery("");
      } else {
        alert("Fetch Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sidebar text-center">
        <Container>
          <Row className="mb-3">
            <Col xs={12} md={12}>
              <Form onSubmit={handleSubmit}>
                <Form.Control type="seacrh" value={query} onChange={handleChange} placeholder="Search a city" />
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              {location.length > 0 ? (
                <SingleLocation name={location[0].local_names.it} lat={location[0].lat} lon={location[0].lon} />
              ) : (
                <Spinner animation="border" variant="primary" />
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h5 className="mt-2 text-white">Saved Location</h5>
            </Col>
          </Row>
          <Row>
            {FavLocations.length > 0 ? (
              FavLocations.map((place) => <SingleFavLocation city={place} key={place.id} />)
            ) : (
              <div>
                <h6>No Location Added</h6>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LeftLocationBar;
