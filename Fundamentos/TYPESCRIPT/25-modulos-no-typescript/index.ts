import { Spaceship } from './spaceship'
import * as lodash from 'lodash'

interface AttackSpaceship extends Spaceship {
    weapons: number
}

let xwing: AttackSpaceship = {
    name: 'X-Wing',
    pilot: 'Luke Skywalker',
    speed: 50,
    weapons: 4
}

console.log(lodash.camelCase(xwing.name))
console.log(lodash.kebabCase(xwing.pilot))