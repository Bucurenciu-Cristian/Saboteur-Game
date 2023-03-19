import '../styles/globals.css'
import type {AppProps} from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from '../redux/store';
import {Provider} from 'react-redux';
import {createWrapper} from "next-redux-wrapper";

function MyApp({Component, pageProps}: AppProps) {
    return (
        //TODO: Add here some list with the links to the pages, from the pages folder
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
