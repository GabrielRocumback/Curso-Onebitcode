class User {
    constructor(fullname, email, password) {
        this.fullname = fullname;
        this.email = email;
        this.password = password;
    }

    login(email, password) {
        if (email === this.email && password === this.password)
            return "Logado com sucesso!";
        else
            return "Email ou senha incorretos!";
    }
}

const user = new User("Isaac", "isaac@email", "1234");
console.log(user.login("isaac@email", "1234"));