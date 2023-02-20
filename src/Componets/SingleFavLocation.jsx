import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

const SingleFavLocation = ({ city }) => {
  const dispatch = useDispatch();
  console.log("Sono city", city);

  return (
    <Col xs={12}>
      <div
        className="SingleLocationContainer"
        onClick={() => {
          dispatch({
            type: "ADD_TO_MAIN",
            payload: city[0],
          });
        }}
      >
        <div className="locationContainer">
          <div>
            <h3>{city[0].name}</h3>
            <p className="P">{city[0].weather[0].description}</p>
          </div>
          <div>
            <p className="Ptemp">{Math.round(city[0].main.temp - 273.15)}°</p>
            <p className="PtempMaxMin">
              MAX: {Math.round(city[0].main.temp_max - 273.15)}° MIN: {Math.round(city[0].main.temp_min - 273.15)}°
            </p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SingleFavLocation;
