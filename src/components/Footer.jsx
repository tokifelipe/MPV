import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AppFooter = () => {
  return (
    <footer className="mt-auto py-3 bg-dark text-white">
      <Container>
        <Row>
          <Col md={6} sm={12}>
            <h5>Reunion Manager</h5>
            <p>Managing your meetings efficiently.</p>
          </Col>
          <Col md={3} sm={6}>
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center">
              © 2023 Reunion Manager, Inc.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;
