
class Account {
    constructor(bank, ledger, number, balance) {
        this.id = `${bank}-${ledger}-${number}`;
        this.balance = balance;
    }
}

export {Account};