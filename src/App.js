import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import HostsList from './components/HostsList';
import OrderListHost from './components/adminComponents/OrderListHost';
import NotFound from './components/NotFound';
import { DevBoyProvider } from './components/context/DevBoyContext';
import DevBoyList from './components/DevBoyList';

function App() {
  return (
    <DevBoyProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/hosts-list" component={HostsList} />
        <Route path="/order-list-host" component={OrderListHost} />
        <Route component={NotFound} />
      </Switch>
    </Router>
    </DevBoyProvider>
  );
}

export default App;
