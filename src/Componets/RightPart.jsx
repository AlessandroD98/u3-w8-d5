import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { BsFillSunriseFill, BsFillSunsetFill, BsFillEyeFill, BsWind } from "react-icons/bs";
import { GiWaterDrop } from "react-icons/gi";
import { FaArrowLeft, FaWater } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
const WeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const RightPart = () => {
  const DayInAWeek = new Date().getDay();
  const DayRange = WeekDays.slice(DayInAWeek, WeekDays.length).concat(WeekDays.slice(0, DayInAWeek));

  const [currentlocation, setCurrentlocation] = useState({});
  const LocationFromState = useSelector((state) => state.SavedLocations.content);
  // console.log("locationfromstate", LocationFromState);
  const dispatch = useDispatch();

  const handleFetch = async () => {
    const Lon = "&lon=" + LocationFromState[0].coord.lon.toFixed(2);
    const Lat = LocationFromState[0].coord.lat.toFixed(2);
    console.log(Lon, Lat);
    const UrlTofetch =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" + Lat + Lon + "&appid=8478e96f41d556c3166363bc4af0577a";
    try {
      const fetchResult = await fetch(UrlTofetch);
      if (fetchResult.ok) {
        const data = await fetchResult.json();
        setCurrentlocation(data);
        console.log(currentlocation);
      } else {
        alert("Fetch Error");
      }
    } catch (error) {
      console.log("Catch error", error);
    }
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LocationFromState]);

  return (
    <>
      {currentlocation.list ? (
        <>
          <Row className="mt-4">
            <Col xs={12}>
              <div className="DRCOP">
                <h2>{currentlocation.city.name}</h2>
                <p className="PRFT">{Math.round(LocationFromState[0].main.temp - 273.15)}°</p>
                <p className="PRFD">{currentlocation.list[0].weather[0].description}</p>
                <p className="PRFMinTMaxT">
                  MAX: {Math.round(LocationFromState[0].main.temp_max - 273.15)}° MIN:{" "}
                  {Math.round(LocationFromState[0].main.temp_min - 273.15)}°
                </p>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={12} md={6}>
              <Row className="h-100">
                <Col xs={12}>
                  <div className="RightComponentContainer h-100">
                    <h4 className="mx-3">Forecast for next days</h4>
                    {currentlocation.list.slice(0, 7).map((item, i) => (
                      <Col hey={i} className="ForsecastNextDay mx-3">
                        <div className="d-flex align-items-center">
                          <div className="d-flex">
                            <img className="imgtime mx-2" src={`icons/${item.weather[0].icon}.png`} alt="" />
                            <p className="me-2">{DayRange[i]}</p>
                            <p className="me-2">{item.weather[0].description}</p>
                          </div>

                          <div className="d-flex">
                            <p className="me-2 TempPM">MAX: {Math.round(item.main.temp_max - 273.15)}°</p>
                            <p className="me-2 TempPM">MIN: {Math.round(item.main.temp_min - 273.15)}°</p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xs={12} md={6} className="mt-2">
              <Row className="g-2">
                <Col xs={12}>
                  <div className="RightComponentContainer">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio neque nihil debitis molestiae ut
                    quae facere itaque facilis nesciunt obcaecati commodi sed consectetur, tempore eius ducimus a unde
                    ipsum quis.
                  </div>
                </Col>
                <Col>
                  <Row className="g-2">
                    <Col xs={6} md={4}>
                      <div className="RightComponentContainer">
                        <p>
                          <GiWaterDrop className="IconRightPart" />
                          Rainfall
                        </p>
                        <p>{currentlocation.list[0].pop}%</p>
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="RightComponentContainer">
                        <p>
                          <BsFillSunriseFill className="IconRightPart" />
                        </p>
                        <p>
                          <BsFillSunsetFill className="IconRightPart" />
                        </p>
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="RightComponentContainer">
                        <p>
                          <BsWind className="IconRightPart" /> Wind
                        </p>
                        <p>{currentlocation.list[0].wind.speed}km/h</p>
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="RightComponentContainer">
                        <p>
                          <FaWater className="IconRightPart" />
                          Humidity
                        </p>
                        <p>{currentlocation.list[0].main.humidity}%</p>
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="RightComponentContainer">
                        <p>
                          <BsFillEyeFill className="IconRightPart" />
                          Visibility
                        </p>
                        <p>{Math.floor(currentlocation.list[0].visibility) / 1000}km</p>
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="RightComponentContainer">
                        <p>
                          <CiCircleInfo className="IconRightPart" />
                          Pressure
                        </p>
                        <p>{currentlocation.list[0].main.pressure}hPa</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={12} className="mt-3">
              <button
                className="SaveLocationButton mb-3"
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_FAV",
                    payload: LocationFromState,
                  });
                }}
              >
                Save Location
              </button>
            </Col>
          </Row>
        </>
      ) : (
        <div className="mt-5">
          <h2>Search for a new city from the menu on the left</h2>
          <p>
            <FaArrowLeft />
          </p>
        </div>
      )}
    </>
  );
};

export default RightPart;
