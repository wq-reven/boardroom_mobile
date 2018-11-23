import Room from "./room";
import Appo from "./appo";
import User from "./user";

class Stores{
    constructor() {
        this.room = new Room();
        this.appo = new Appo();
        this.user = new User();
    }
}

export default new Stores();
