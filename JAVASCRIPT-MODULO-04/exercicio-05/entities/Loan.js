const Installment = require("./Installment");

module.exports = class Loan {
    static #interestRate = 1.05;

    constructor(value, installments) {
        this.value = value;
        this.installments = [];
        for (let i = 1; i <= installments; i++) {
            this.installments.push(new Installment((value * Loan.#interestRate) / installments, i));
        }
        this.dateCreated = new Date();
    }

    static get interestRate() {
        return Loan.#interestRate;
    }

    static set interestRate(value) {
        Loan.#interestRate = 1 + (value / 100);
    }
}