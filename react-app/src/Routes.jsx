import { Route, Switch } from 'react-router-dom';
import News from './News/News';

function Routes() {
  return (
    <Switch>
      <Route path="/">
        <News />
      </Route>
    </Switch>
  );
}

export default Routes;