import { Container, Row, Col } from "react-bootstrap";
import LeftLocationBar from "./LeftLocationBar";
import RightPart from "./RightPart";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";

const MainPart = () => {
  const [showLeftContainer, setShowLeftContainer] = useState(false);

  const toggleLeftContainer = () => {
    setShowLeftContainer(!showLeftContainer);
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        {showLeftContainer && (
          <Col className="LeftContainer pt-5" xs={12} md={2}>
            <LeftLocationBar />
          </Col>
        )}
        <Col xs={12} md={showLeftContainer ? 10 : 12} className="text-center">
          <RightPart />
        </Col>
      </Row>
      <button onClick={toggleLeftContainer} style={{ position: "absolute", top: 0, left: 0 }}>
        {showLeftContainer ? <TfiClose className="Icon" /> : <FaBars className="Icon" />}
      </button>
    </Container>
  );
};
export default MainPart;
