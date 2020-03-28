/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { App } from 'containers/App';
import LanguageProvider from 'containers/LanguageProvider';
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';

import { HelmetProvider } from 'react-helmet-async';

import configureStore from './configureStore';
import { translationMessages } from 'i18n';

const openSansObserver = new FontFaceObserver('Open Sans', {});

openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app') as HTMLElement;

const ConnectedApp = (props: { messages: any }) => (
  <Provider store={ store }>
    <LanguageProvider messages={ props.messages }>
      <ConnectedRouter history={ history }>
        <HelmetProvider>
          <App/>
        </HelmetProvider>
      </ConnectedRouter>
    </LanguageProvider>
  </Provider>
);
const render = (messages: any) => {
  ReactDOM.render(<ConnectedApp messages={ messages }/>, MOUNT_NODE);
};

if (module.hot) {
  module.hot.accept([ './i18n' ], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install();
}
