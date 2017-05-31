export default class Account {
    constructor() {
        this.state = { username:"", password:"" };
        this.setPassword.bind(this);
        this.setUsername.bind(this);
    }

    setUsername(text) {
        this.state.username = text;
    }

    setPassword(text){
        this.state.password = text;
    }
}