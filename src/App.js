import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeDashboard from './components/adminComponents/HomeDashboard';
import HostList from './components/adminComponents/HostList';
import DevBoyList from './components/adminComponents/DevBoyList';
import OrderListHost from './components/adminComponents/OrderListHost';
import OrderListDevBoy from './components/adminComponents/OrderListDevBoy';
import { DevBoyProvider } from './components/context/DevBoyContext';
import { HostProvider } from './components/context/HostContext';
import OrderList from './components/adminComponents/OrderList';
import { OrderListProvider } from './components/context/OrderListContext';
import MealsList from './components/adminComponents/MealsList';
<<<<<<< Updated upstream
=======
import ConstantChargesComponent from './components/adminComponents/ConstantChargesComponent';
import AdminLogin from './components/adminComponents/AdminLogin';
import { useNavigate } from 'react-router-dom';
import DevBoyDetails from './components/adminSubComponents/DevBoyDetails';
import HostsItem from './components/adminSubComponents/HostsItem';
import MealDetail from './components/adminSubComponents/MealDetail';
import OrderItem from './components/adminSubComponents/OrderItem';
>>>>>>> Stashed changes

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <OrderListProvider>
    <DevBoyProvider>
      <HostProvider> 
        <Router>
          <Routes>
          <Route exact path="/" element={isLoggedIn ? <HomeDashboard /> : <AdminLogin />} />
            <Route path="/hosts-list" element={<HostList />} />
            <Route path="/devBoy-list" element={<DevBoyList />} />
            <Route path="/order-list-host" element={<OrderListHost />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/order-list-devBoy" element={<OrderListDevBoy />} />
            <Route path="/meals-list" element={<MealsList />} />
<<<<<<< Updated upstream
            {/* <Route path="*" element={<NotFound />} /> */}
=======
            <Route path="/constants" element={<ConstantChargesComponent />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/devBoy-details" element={<DevBoyDetails />} />
            <Route path="/hosts-item" element={<HostsItem />} />
            <Route path="/meal-detail" element={<MealDetail />} />
            <Route path="/order-Item" element={<OrderItem />} />
>>>>>>> Stashed changes
          </Routes>
        </Router>
      </HostProvider>
    </DevBoyProvider>
    </OrderListProvider>

  );
}

export default App;
