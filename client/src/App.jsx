import React from 'react';
import CreateNew from './CreateNew/CreateNew';
import Header from './Header/Header';
import PlayerTable from './PlayerTable/PlayerTable';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Header />

          <hr />

          <Switch>
            <Route exact path="/">
              <PlayerTable />
            </Route>
            <Route path="/create">
              <CreateNew />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
