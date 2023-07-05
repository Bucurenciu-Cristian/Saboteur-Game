import type { AppProps } from 'next/app';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import store from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container fluid className="bg-opacity-25 py-3">
      <Row>
        {/* <Col className="d-none d-xxl-block" xxl={1}> */}
        {/*  <ShowLinks /> */}
        {/* </Col> */}
        <Col>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Col>
      </Row>
    </Container>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
