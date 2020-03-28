/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import routes from './routes';

routes.filter(route => Reflect.has(route, 'title'));

export const App = () =>
  <div>
    <Switch>
      { routes.map(route => (
        // tslint:disable-next-line:jsx-key
        <Route exact path={ route.path } component={ route.component }/>
      )) }
      <Route component={ NotFoundPage }/>
    </Switch>
    <GlobalStyle/>
  </div>;
