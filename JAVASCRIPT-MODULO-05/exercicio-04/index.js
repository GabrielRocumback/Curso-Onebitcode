import Account from './entities/Account.js';
import Transaction from './entities/Transaction.js';
import Helper from './entities/helper.js';

const form = document.querySelector('form');
const cancelButton = document.getElementById('cancel');
const tbody = document.getElementById('historico');
let editTransactionId = null;
let line = null

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const account = await fetchAccounts();
        const transactions = await fetchTransactions();
        transactions.forEach(renderTransactions);
        renderAccounts(account);
    }
    catch (error) {
        console.error('Error fetching transactions:', error);
    }
});

async function fetchAccounts() {
    try {
        return await fetch('http://localhost:3000/accounts').then(res => res.json()).then(accounts => accounts[0]);
    }
    catch (error) {
        console.error('Error fetching accounts:', error);
    }
}

async function fetchTransactions() {
    try {
        return await fetch('http://localhost:3000/transactions').then(res => res.json());
    }
    catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

function renderAccounts(account) {
    document.getElementById('total').value = account.balance;
}

function renderTransactions(transaction) {
    if (editTransactionId) {
        line.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.type === '1' ? 'Entrada' : 'Saída'}</td>
            <td>${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}</td>
            <td>${transaction.date}</td>
        `;
    }
    else {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.type === '1' ? 'Entrada' : 'Saída'}</td>
            <td>${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}</td>
            <td>${transaction.date}</td>
        `;
        tbody.appendChild(tr);
    }
}

async function updateAccountBalance(account, transaction, operation = null) {
    const previousTransaction = editTransactionId != null ? await getTransaction(editTransactionId) : null;

    const updateAccount = new Account(
        account.id,
        account.name,
        account.balance
    );

    if (previousTransaction != null) {
        switch (previousTransaction.type) {
            case '1':
                updateAccount.withdraw(previousTransaction.amount);
                break;
            case '2':
                updateAccount.deposit(previousTransaction.amount);
                break;
        }
    }

    if (operation === 1 || operation === 2) {
        switch (transaction.type) {
            case '1':
                updateAccount.deposit(transaction.amount);
                break;
            case '2':
                updateAccount.withdraw(transaction.amount);
                break;
        }
    }

    try {
        const response = await fetch(`http://localhost:3000/accounts/${updateAccount.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateAccount)
        }).then(res => res.json());
        return response;
    }
    catch (error) {
        console.error('Error updating account balance:', error);
    }
}

async function getTransaction(transaction) {
    try {
        const response = await fetch(`http://localhost:3000/transactions/${transaction}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        return response;
    }
    catch (error) {
        console.error('Error getting transaction:', error);
    }
}

async function deleteTransaction(transactionId) {
    try {
        const response = await fetch(`http://localhost:3000/transactions/${transactionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        console.log('Transaction deleted:', response);
    } catch (error) {
        console.error('Error deleting transaction:', error);
    }
}

async function createTransaction(transaction) {
    try {
        const response = await fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        }).then(res => res.json());
        console.log('Transaction created:', response);
    } catch (error) {
        return console.error('Error creating transaction:', error);
    }
}

async function updateTransaction(transaction) {
    try {
        const response = await fetch(`http://localhost:3000/transactions/${transaction.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        }).then(res => res.json());
        console.log('Transaction updated:', response);
    } catch (error) {
        return console.error('Error updating transaction:', error);
    }
}

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const submitter = ev.submitter;
    if (submitter.id === 'add') {
        const account = await fetchAccounts();

        const transactions = await fetchTransactions();
        const transactionId = editTransactionId == null ? Math.max(...transactions.map(transaction => transaction.id)) + 1 : editTransactionId;
        
        const transactionData = new Transaction(
            transactionId.toString(),
            account.id,
            document.getElementById('tipo').value,
            document.getElementById('valor').value,
            new Date().toISOString().split("T")[0]
        );

        const updatedBalanceAccount = await updateAccountBalance(account, transactionData, Helper.create);
        const transactionResponse = editTransactionId == null
            ? await createTransaction(transactionData)
            : await updateTransaction(transactionData);

        form.reset();
        renderAccounts(updatedBalanceAccount);
        renderTransactions(transactionResponse);

        console.log(updatedBalanceAccount);
        console.log(transactionResponse);
        editTransactionId = null;
    }
    else if (submitter.id === 'delete') {
        const account = await fetchAccounts();
        const transactionId = editTransactionId;

        const transactionData = await getTransaction(transactionId).then(res => new Transaction(
            res.id,
            res.accountId,
            res.type,
            res.amount,
            res.date
        ));

        const updatedBalanceAccount = await updateAccountBalance(account, transactionData, Helper.delete);
        deleteTransaction(transactionId);

        form.reset();
        renderAccounts(updatedBalanceAccount);
        line.remove();
        editTransactionId = null;
    }
});

tbody.addEventListener('click', async (ev) => {
    if (ev.target.tagName === 'TD') {
        line = ev.target.parentElement;

        const selectedItems = document.querySelectorAll('.selectedItem');
        selectedItems.forEach(item => item.classList.remove('selectedItem'));

        line.classList.add('selectedItem');
        editTransactionId = ev.target.parentElement.children[0].textContent;
        const response = await getTransaction(editTransactionId);
        document.getElementById('tipo').value = response.type;
        document.getElementById('valor').value = response.amount;
    }
});

cancelButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    const input = document.getElementById('valor');
    input.value = null;

    const select = document.getElementById('tipo');
    select.value = 1;

    const selectedItem = document.querySelector('.selectedItem');
    if (selectedItem) {
        selectedItem.classList.remove('selectedItem');
    }

    editTransactionId = null;
});

