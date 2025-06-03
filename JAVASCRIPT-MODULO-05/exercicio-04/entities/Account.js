export default class Account {
    constructor(id, name, balance) {
        this.id = id
        this.name = name
        this.balance = balance
    }

    deposit(amount) {
        this.balance = (parseFloat(this.balance) + parseFloat(amount)).toString();
    }

    withdraw(amount) {
        if (parseFloat(this.balance) >= parseFloat(amount))
            this.balance = (parseFloat(this.balance) - parseFloat(amount)).toString();
        else {
            alert('Insufficient funds');
            throw new Error('Insufficient funds')
        }
    }
}