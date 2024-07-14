export const fetchCustomers = async () => {
    const response = await fetch('./db.json');
    const data = await response.json();
    return data.customers;
};

export const fetchTransactions = async () => {
    const response = await fetch('./db.json');
    const data = await response.json();
    return data.transactions;
};
