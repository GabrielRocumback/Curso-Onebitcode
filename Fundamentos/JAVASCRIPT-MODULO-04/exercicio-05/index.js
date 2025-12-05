const App = require("./App");

App.createUser("Isaac", "isaac@email.com");
App.createUser("Joaquim", "joaquim@email.com");
App.createUser("Maria", "maria@email.com");

App.deposit("isaac@email.com", 100);

App.transfer("isaac@email.com", "joaquim@email.com", 20);

App.changeInterestRate(10);

App.takeLoan("maria@email.com", 2000, 24);

console.log(App.findUser("isaac@email.com"));
console.log(App.findUser("isaac@email.com").account);
console.log(App.findUser("joaquim@email.com"));
console.log(App.findUser("joaquim@email.com").account);
console.log(App.findUser("maria@email.com"));
console.log(App.findUser("maria@email.com").account);
console.log(App.findUser("maria@email.com").account.loans[0].installments);
