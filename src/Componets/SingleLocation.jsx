import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";

const SingleLocation = (props) => {
  const [currentlocation, setCurrentlocation] = useState([]);
  const dispatch = useDispatch();
  const partOfBaseUrl = "&lon=" + props.lon;
  const baseUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    props.lat +
    partOfBaseUrl +
    "&appid=8478e96f41d556c3166363bc4af0577a";

  const handleFetch = async () => {
    try {
      const fetchResult = await fetch(baseUrl);
      if (fetchResult.ok) {
        const data = await fetchResult.json();
        setCurrentlocation(data);
        console.log(data);
      } else {
        alert("Fetch Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [props.lon]);

  return (
    <>
      {currentlocation.main ? (
        <div
          className="SingleLocationContainer"
          onClick={() => {
            dispatch({
              type: "ADD_TO_MAIN",
              payload: currentlocation,
            });
          }}
        >
          <div className="locationContainer">
            <div>
              <h3>{props.name}</h3>
              <p>{currentlocation.weather[0].description}</p>
            </div>
            <div>
              <p className="Ptemp">{Math.round(currentlocation.main.temp - 273.15)}°</p>
              <p className="PtempMaxMin">
                MAX: {Math.round(currentlocation.main.temp_max - 273.15)}° MIN:{" "}
                {Math.round(currentlocation.main.temp_min - 273.15)}°
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Spinner animation="border" variant="info" />
      )}
    </>
  );
};

export default SingleLocation;

// "lat": 41.8933203,
//         "lon": 12.4829321,
