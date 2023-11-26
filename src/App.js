import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeDashboard from './components/adminComponents/HomeDashboard';
import HostList from './components/adminComponents/HostList';
import OrderListHost from './components/adminComponents/OrderListHost';
import OrderListDevBoy from './components/adminComponents/OrderListDevBoy';
// import NotFound from './components/NotFound';
import { DevBoyProvider } from './components/context/DevBoyContext';
import { HostProvider } from './components/context/HostContext';
import OrderList from './components/adminComponents/OrderList';

function App() {
  return (
    <DevBoyProvider>
      <HostProvider> 
        <Router>
          <Routes>
            <Route exact path="/" element={<HomeDashboard />} />
            <Route path="/hosts-list" element={<HostList />} />
            <Route path="/order-list-host" element={<OrderListHost />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/order-list-devBoy" element={<OrderListDevBoy />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </HostProvider>
    </DevBoyProvider>
  );
}

export default App;
