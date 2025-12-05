const Deposit = require("./entities/Deposit");
const Loan = require("./entities/Loan");
const Transfer = require("./entities/Transfer");
const User = require("./entities/User");

module.exports = class App {
    static #users = [];

    static findUser(email) {
        const user = this.#users.find(user => user.email === email)
        return user ?? null;
    }

    static createUser(nome, email) {
        const userExists = App.findUser(email);
        if (!userExists) {    
            const user = new User(nome, email);
            this.#users.push(user);
            return user;
        }
    }

    static deposit(email, value) {
        const user = App.findUser(email);
        if (user) {
            const deposit = new Deposit(value);
            user.account.addDeposit(deposit);
        }
    }

    static transfer(fromUserEmail, toUserEmail, value) {
        const fromUser = App.findUser(fromUserEmail);
        const toUser = App.findUser(toUserEmail);
        if (fromUser && toUser) {
            const transfer = new Transfer(fromUser, toUser, value);
            fromUser.account.addTransfer(transfer);
            toUser.account.addTransfer(transfer);
        }
    }

    static takeLoan(email, value, numberOfInstallments) {
        const user = App.findUser(email);
        if (user) {
            const loan = new Loan(value, numberOfInstallments);
            user.account.addLoan(loan);
        }
    }

    static changeInterestRate(value) {
        Loan.interestRate = value;
    }
}