import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles.css';  

const Chart = ({ customerId }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const transactions = await fetchTransactions();
            const filteredTransactions = transactions.filter(transaction => transaction.customer_id === customerId);
            setTransactions(filteredTransactions);
        };
        fetchData();
    }, [customerId]);

    const data = transactions.reduce((acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
    }, {});

    const chartData = Object.keys(data).map(date => ({ date, amount: data[date] }));

    return (
        <div className="chart-container">
            <LineChart
                width={600}
                height={300}
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default Chart;
