export default class Transaction {
    constructor(id, accountId, type, amount, date) {
        this.id = id
        this.accountId = accountId
        this.type = type
        this.amount = amount
        this.date = date
    }
} 