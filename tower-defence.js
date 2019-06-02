Vue.component('tower', {
    props: ['id', 'tower', 'money'],
    template: "#template-tower",
    computed: {
    },
    methods: {
        buildBasic: function () {
            if (this.money >= 50) {
                this.$emit('pay', 50);
                this.tower.show = true;
                this.tower.name = "Basic Tower";
                this.$set(this.tower, 'cooldown', {
                    lvl: 0,
                    value: 100,
                    valueF: function (n) {
                        return Math.floor(90 / (n + 1) + 10);
                    },
                    upgradeCost: 50,
                    upgradeCostF: function (n) {
                        return n * n + 50;
                    }
                });
                this.$set(this.tower, 'range', {
                    lvl: 0,
                    value: 100,
                    valueF: function (n) {
                        return 100 + n * 20;
                    },
                    upgradeCost: 20,
                    upgradeCostF: function (n) {
                        return 20 + 2 * n;
                    }
                });
                this.$set(this.tower, 'damage', {
                    lvl: 0,
                    value: 10,
                    valueF: function (n) {
                        return Math.floor(10 + n * (n + 1) / 2);
                    },
                    upgradeCost: 10,
                    upgradeCostF: function (n) {
                        return n * 10 + 10;
                    }
                });
            }
        },
        buildFlameTower: function () {
            if (this.money >= 50) {
                this.$emit('pay', 50);
                this.tower.show = true;
                this.tower.name = "Basic Tower";
                this.$set(this.tower, 'cooldown', {
                    lvl: 0,
                    value: 100,
                    valueF: function (n) {
                        return Math.floor(90 / (n + 1) + 10);
                    },
                    upgradeCost: 50,
                    upgradeCostF: function (n) {
                        return n * n + 50;
                    }
                });
                this.$set(this.tower, 'range', {
                    lvl: 0,
                    value: 100,
                    valueF: function (n) {
                        return 100 + n * 20;
                    },
                    upgradeCost: 20,
                    upgradeCostF: function (n) {
                        return 20 + 2 * n;
                    }
                });
                this.$set(this.tower, 'damage', {
                    lvl: 0,
                    value: 10,
                    valueF: function (n) {
                        return Math.floor(10 + n * (n + 1) / 2);
                    },
                    upgradeCost: 10,
                    upgradeCostF: function (n) {
                        return n * 10 + 10;
                    }
                });
            }
        },
        buildMagic: function () {
            if (this.money >= 50) {
                this.$emit('pay', 50);
                this.tower.show = true;
                this.tower.name = "Magic Tower";
                this.$set(this.tower, 'cooldown', {
                    lvl: 0,
                    value: 60,
                    valueF: function (n) {
                        return n !== 0 ? Math.floor(40 / n + 5) : 60;
                    },
                    upgradeCost: 50,
                    upgradeCostF: function (n) {
                        return 50;
                    }
                });
                this.$set(this.tower, 'range', {
                    lvl: 1,
                    value: 200,
                    valueF: function (n) {
                        return 160 + n * 40;
                    },
                    upgradeCost: 20,
                    upgradeCostF: function (n) {
                        return 16 + 2 * n;
                    }
                });
                this.$set(this.tower, 'damage', {
                    lvl: 1,
                    value: 2,
                    valueF: function (n) {
                        return n + 1;
                    },
                    upgradeCost: 10,
                    upgradeCostF: function (n) {
                        return n * 10;
                    }
                });
            }
        },
        buildTax: function () {
            if (this.money >= 50) {
                this.$emit('pay', 50);
                this.tower.show = true;
                this.tower.name = "Tax Tower";
                this.$set(this.tower, 'cooldown', {
                    lvl: 0,
                    value: 120,
                    valueF: function (n) {
                        return n !== 0 ? Math.floor(120 / (n / 4 + 1) + 5) : 60;
                    },
                    upgradeCost: 50,
                    upgradeCostF: function (n) {
                        return 50;
                    }
                });
                this.$set(this.tower, 'range', {
                    lvl: 1,
                    value: 200,
                    valueF: function (n) {
                        return 160 + n * 40;
                    },
                    upgradeCost: 20,
                    upgradeCostF: function (n) {
                        return 16 + 2 * n;
                    }
                });
                this.$set(this.tower, 'damage', {
                    lvl: 1,
                    value: 1,
                    valueF: function (n) {
                        return n;
                    },
                    upgradeCost: 30,
                    upgradeCostF: function (n) {
                        return n * 30;
                    }
                });
            }
        },
        upgrade: function(statistic) {
            if (this.money >= this.tower[statistic].upgradeCost) {
                this.$emit('pay', this.tower[statistic].upgradeCost);
                this.tower[statistic].lvl += 1;
                this.tower[statistic].value = this.tower[statistic].valueF(this.tower[statistic].lvl);
                this.tower[statistic].upgradeCost = this.tower[statistic].upgradeCostF(this.tower[statistic].lvl);
            } else {
                console.log("Insufficient money. Upgrade cost " + statistic + " " + this.tower.damage.upgradeCost);
            }
        }
    }
});

Vue.component('enemy', {
    props: ['id', 'enemy'],
    data: function () {
        return {
        }
    },
    template: '\
    <div class="enemy">\
        <progress id="health" v-bind:value="enemy.hp" v-bind:max="enemy.maxhp"></progress>\
    </div>'
});

Vue.component('effect', {
    props: ['effect'],
    template:
    '<div v-if="effect.show" class="effect">\
        <button @click="action">{{effect.name}}</button>\
    </div>',
    methods: {
        action: function () {
            this.effect.f();
            CardGame.effects.forEach(function(e){
                e.show = false;
            });
        }
    }
});

var CardGame = new Vue({
    el: "#cardGame",
    data: {
        spawnRate: 150,
        lvlLength: 6000,
        money: 800,
        lives: 20,
        time: 0,
        score: 0,
        kills: 0,
        gameName: "Tower Defence",
        towers: [
            {
                id: 0,
                name: "Empty Slot",
                position: 83,
                lastShot: 0,
                show: false,
                kills: 0
            },
            {
                id: 1,
                name: "Empty Slot",
                position: 250,
                lastShot: 0,
                show: false,
                kills: 0
            },
            {
                id: 2,
                name: "Empty Slot",
                position: 416,
                lastShot: 0,
                show: false,
                kills: 0
            },
            {
                id: 3,
                name: "Empty Slot",
                position: 583,
                lastShot: 0,
                show: false,
                kills: 0
            },
            {
                id: 4,
                name: "Empty Slot",
                position: 749,
                lastShot: 0,
                show: false,
                kills: 0
            },
            {
                id: 5,
                name: "Empty Slot",
                position: 916,
                lastShot: 0,
                show: false,
                kills: 0
            }
        ],
        enemyId: 1,
        enemies: [
        ],
        effects: [
            {
                id: 0,
                name: "+20 gold",
                f: function () {
                    CardGame.money += 20;
                },
                show: true
            },
            {
                id: 1,
                name: "slow all enemies",
                f: function () {
                    CardGame.enemies.forEach(function(enemy){
                        enemy.speed = enemy.speed / 2;
                    });
                },
                show: true
            },
            {
                id: 2,
                name: "+5 lives",
                f: function () {
                    CardGame.lives += 5;
                },
                show: true
            },
            {
                id: 3,
                name: "tear armor",
                f: function () {
                    CardGame.enemies.forEach(function(enemy){
                        enemy.armor = 0;
                    });
                },
                show: true
            },
            {
                id: 4,
                name: "spawn 3 enemies",
                f: function () {
                    CardGame.addEnemy({position:-150});
                    CardGame.addEnemy({position:-200});
                    CardGame.addEnemy({position:-250});
                },
                show: true
            },
            {
                id: 5,
                name: "kill 2 cratures",
                f: function () {
                    let index = CardGame.enemies.reduce(function (indexOfHighestHpSoFar, currentValue, currentIndex, array) {
                        return currentValue.hp > array[indexOfHighestHpSoFar].hp ? currentIndex : indexOfHighestHpSoFar;
                    }, 0);
                    CardGame.removeEnemy(index);
                    index = CardGame.enemies.reduce(function (indexOfHighestHpSoFar, currentValue, currentIndex, array) {
                        return currentValue.hp > array[indexOfHighestHpSoFar].hp ? currentIndex : indexOfHighestHpSoFar;
                    }, 0);
                    CardGame.removeEnemy(index);
                },
                show: true
            }
        ],
        styleObject: {
            color: 'red'
        }
    },
    methods: {
        activateEffects: function () {
            this.effects.forEach(function(e){
                e.show = true;
            });
        },
        test: function () {
            let newEnemy = {
                id: this.enemyId,
                name: "Alien",
                maxhp: 800,
                hp: 800,
                armor: 20,
                speed: 2,
                position: -50,
                img: "url('img/alien.png') no-repeat center bottom",
                reward: 45
            };
            this.enemies.push(newEnemy);
            this.enemyId += 1;
        },
        main: function () {
            this.time += 1;
            //spawn enemies
            if (this.time % this.spawnRate === 0) {
                this.addEnemy();
            }
            if (this.time % 6000 === 0) {
                this.spawnRate = Math.floor(this.spawnRate * 0.75);
            }
            if (this.time % 2500 === 0) {
                this.activateEffects();
            }
            //every tower shots at first enemy if they are ready
            this.towers.forEach(function (tower) {
                if (tower.show) {
                    let i;
                    tower.lastShot += 1;
                    if (tower.lastShot >= tower.cooldown.value) {
                        //find enemy and substract health
                        switch (tower.name) {
                        //lowest id within range
                        case "Basic Tower":
                            //find taget
                            i = 0;
                            while (
                                i <  this.enemies.length &&
                                (
                                    tower.position + tower.range.value < this.enemies[i].position ||
                                    tower.position - tower.range.value > this.enemies[i].position
                                )
                            ) {
                                i = i + 1;
                            }
                            //shot
                            for (let i = 0; i < this.enemies.length; i++) {
                                if (
                                    tower.position + tower.range.value > this.enemies[i].position && 
                                    tower.position - tower.range.value < this.enemies[i].position
                                ) {
                                    tower.lastShot = 0;
                                    this.enemies[i].hp -= Math.max(tower.damage.value - this.enemies[i].armor, 0);
                                    if (this.enemies[i].hp <= 0) {
                                        tower.kills += 1;
                                        this.kills += 1;
                                        this.removeEnemy(i);
                                    }
                                    break;
                                }
                            }
                            break;
                        //lowest id within range
                        case "Tax Tower":
                            //find taget
                            i = 0;
                            while (
                                i <  this.enemies.length &&
                                (
                                    tower.position + tower.range.value < this.enemies[i].position ||
                                    tower.position - tower.range.value > this.enemies[i].position
                                )
                            ) {
                                i = i + 1;
                            }
                            console.log(i);
                            //shot
                            for (let i = 0; i < this.enemies.length; i++) {
                                if (
                                    tower.position + tower.range.value > this.enemies[i].position && 
                                    tower.position - tower.range.value < this.enemies[i].position
                                ) {
                                    console.log(i);
                                    tower.lastShot = 0;
                                    this.money += tower.damage.value;
                                    this.enemies[i].hp -= Math.max(tower.damage.value - this.enemies[i].armor, 0);
                                    if (this.enemies[i].hp <= 0) {
                                        tower.kills += 1;
                                        this.kills += 1;
                                        this.removeEnemy(i);
                                    }
                                    break;
                                }
                            }
                            break;
                        //highest armor
                        case "Magic Tower":
                            let index = this.enemies.reduce(function(highestArmor, currentValue, currentIndex, array) {
                                if (
                                    (highestArmor === undefined || array[highestArmor].armor < currentValue.armor) &&
                                    tower.position + tower.range.value > currentValue.position &&
                                    tower.position - tower.range.value < currentValue.position
                                ) {
                                    return currentIndex;
                                } else {
                                    return highestArmor;
                                }
                            }, undefined);
                            if (index !== undefined) {
                                this.enemies[index].armor = this.enemies[index].armor - tower.damage.value;
                                this.enemies[index].hp -= tower.damage.value;
                                tower.lastShot = 0;
                                if (this.enemies[index].hp <= 0) {
                                    tower.kills += 1;
                                    this.kills += 1;
                                    this.removeEnemy(index);
                                }
                            }
                            break;
                        default:
                        }
                    }
                }
            }, this);
            //move all enemies
            this.enemies.forEach(function(enemy) {
                enemy.position += enemy.speed;
                if (enemy.position > 1050) {
                    enemy.position = -50;
                    enemy.armor += 2;
                    CardGame.loseLife(1);
                }
            });
        },
        addEnemy: function (modifications) {
            const startingPosition = -50;
            let newEnemy = {};
            let ev = (this.time / this.lvlLength);
            let variance = Math.random();
            variance = (variance - 0.5) * 2.3;
            variance = (variance > 0) ? variance * variance : - variance * variance;
            ev = ev + variance;
            if (ev < 1) {
                newEnemy = {
                    id:this.enemyId,
                    name:"Skeleton",
                    maxhp: 100,
                    hp: 100,
                    armor: 1,
                    speed: 1,
                    position: startingPosition,
                    img: "url('img/skeleton.png') no-repeat center bottom",
                    reward: 5
                };
            } else if (ev < 2) {
                newEnemy = {
                    id: this.enemyId,
                    name: "Knight",
                    maxhp: 170,
                    hp: 170,
                    armor: 3,
                    speed: 1.65,
                    position: startingPosition,
                    img: "url('img/knight.png') no-repeat center bottom",
                    reward: 15
                };
            } else if (ev < 3) {
                newEnemy = {
                    id: this.enemyId,
                    name: "Skeleton Captain",
                    maxhp: 500,
                    hp: 500,
                    armor: 10,
                    speed: .8,
                    position: startingPosition,
                    img: "url('img/redskeleton.png') no-repeat center bottom",
                    reward: 30
                };
            } else if (ev < 4) {
                newEnemy = {
                    id: this.enemyId,
                    name: "Alien",
                    maxhp: 800,
                    hp: 800,
                    armor: 20,
                    speed: 2,
                    position: startingPosition,
                    img: "url('img/alien.png') no-repeat center bottom",
                    reward: 45
                }
            } else if (true) {
                newEnemy = {
                    id: this.enemyId,
                    name: "Faerie Dragon",
                    maxhp: 5000,
                    hp: 5000,
                    armor: 30,
                    speed: .9,
                    position: startingPosition,
                    img: "url('img/faeriedragon.png') no-repeat center bottom",
                    reward: 300
                }
            }
            if (modifications !== undefined) {
                Object.keys(modifications).forEach(function (key) {
                    newEnemy[key] = modifications[key];
                });
            }
            this.enemies.push(newEnemy);
            this.enemyId += 1;
        },
        removeEnemy: function (n) {
            if (n < this.enemies.length) {
                this.money += this.enemies[n].reward;
                this.score += this.enemies[n].maxhp;
                this.enemies.splice(n, 1);
            } else {
                console.log("Error: trying to remove enemy that doesn't exist");
            }
        },
        payMoney: function (n) {
            if (this.money >= n) {
                this.money -= n;
                return true;
            } else {
                clearInterval(mainLoop);
                return false;
            }
        },
        loseLife: function (n) {
            this.lives -= n;
            if (this.lives <= 0) {
                clearInterval(mainLoop);
            }
        }
    }
});

var mainLoop = setInterval(render, 1000/30);

function render() {
    CardGame.main();
}