import React, { useState } from 'react';
import Table from './components/Table.jsx';
import Chart from './components/Chart.jsx';

const App = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    return (
        <div>
            <h1>Customer Transactions</h1>
            <Table setSelectedCustomer={setSelectedCustomer} />
            {selectedCustomer && <Chart customerId={selectedCustomer} />}
        </div>
    );
};

export default App;
