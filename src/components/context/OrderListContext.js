import React, { createContext, useState } from 'react';

export const OrderListContext = createContext();

export const OrderListProvider = ({ children }) => {
    const [orderListState, setOrderListState] = useState({
        orders: [],
        filteredOrders: [],
        // ... other states ...
    });

    return (
        <OrderListContext.Provider value={{ orderListState, setOrderListState }}>
            {children}
        </OrderListContext.Provider>
    );
};
