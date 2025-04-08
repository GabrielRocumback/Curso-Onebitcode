import Character from "./Character.js";

class Thief extends Character {
    attack(targetCharacter) {
        targetCharacter.lifePts -= (this.attackPts - targetCharacter.defensePts) * 2;
    }
}

export default Thief;