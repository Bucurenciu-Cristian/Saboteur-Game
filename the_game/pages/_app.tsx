import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NewLink } from '../src/components/RoutesList';
import store from '../redux/store';

function ShowLinks() {
  return (
    <>
      <NewLink href="/auth/login" />
      <NewLink href="/auth/register" />
      <NewLink href="/Table" />
      <NewLink href="/cardsList" />
      <NewLink href="/Socket" />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Row>
        <Col xs={1}>
          <ShowLinks />
        </Col>
        <Col xs={11}>
          <Provider store={store}>
            <Container>
              <Component {...pageProps} />
            </Container>
          </Provider>
        </Col>
      </Row>
    </Container>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
