import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import MovieForm from "./Component/MovieForm";
import MovieList from "./Component/MovieList";

function App() {
  return (
    <div className="App">
      <h1 className="head">Movie Review</h1>
      <Container>
        <Row>
          <Col>
            <MovieForm />
          </Col>
          <Col>
            <MovieList/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
