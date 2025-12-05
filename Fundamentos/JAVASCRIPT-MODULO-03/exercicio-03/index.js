import readline from "readline";
import { age } from "./js/age.js";
import { nextAnniversaryDate, daysForBirthday } from "./js/anniversary.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Digite sua data de nascimento (formato YYYY-MM-DD): ", (date) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        console.log("Data inválida. Por favor, digite uma data no formato YYYY-MM-DD.");
        rl.close();
        return;
    }
    else {
        console.log(`Sua idade é ${age(date)}`);
        console.log(`Sua próxima data de aniversário será ${nextAnniversaryDate(date)}`);
        console.log(`Faltam ${daysForBirthday(date)} dias para o seu aniversário`);
        rl.close();
    }
});
