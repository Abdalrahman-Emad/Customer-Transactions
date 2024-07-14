import React, { useState, useEffect } from 'react';
import { fetchCustomers, fetchTransactions } from '../api';
import '../styles.css';  

const Table = ({ setSelectedCustomer }) => {
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState({ name: '', amount: '' });

    useEffect(() => {
        const fetchData = async () => {
            const customers = await fetchCustomers();
            const transactions = await fetchTransactions();
            setCustomers(customers);
            setTransactions(transactions);
        };
        fetchData();
    }, []);

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(filter.name.toLowerCase())
    );

    const filteredTransactions = transactions.filter(transaction =>
        transaction.amount >= (filter.amount || 0)
    );

    return (
        <div className="table-container">
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={filter.name}
                    onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                    className="filter-input"
                />
                <input
                    type="number"
                    placeholder="Filter by amount"
                    value={filter.amount}
                    onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
                    className="filter-input"
                />
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Transaction Date</th>
                        <th>Transaction Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        filteredTransactions
                            .filter(transaction => transaction.customer_id === customer.id)
                            .map(transaction => (
                                <tr key={transaction.id} onClick={() => setSelectedCustomer(customer.id)}>
                                    <td>{customer.name}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.amount}</td>
                                </tr>
                            ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
