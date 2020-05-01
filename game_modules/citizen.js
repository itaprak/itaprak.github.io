import generateId from './id-generator.js';
import { BUILDING_TYPES } from '../game_modules/building.js';

// IDEAS...
// const CITIZEN_AGE = ["young","adult", "elderly"];
// const CITIZEN_HEALTH_STATE = ["awful", "bad", "avarage", "good", "excelent"]; // 0 - 100  // how easy is to infect the citizen
// const CITIZEN_RULE_FOLLOWING = 100;

function Citizen (config){
    this.id = generateId();
    // this.age = "";
    this.homeId = config.homeId // building id;
    this.currentBuildingId = config.homeId; // building id
    this.connections = []; // buildings // generated after city routes were created
    // this.movementHistory = [] ToDo
    this.curredAfter = config.curredAfter;
    this.incubationTime = config.incubationTime;

    this.state = {
        infected: false,
        curred: false,
        sick: false,
        // immune: false, // Todooooo
        numberOfTurnsSinceInfection: 0 // number of turn
    }; 

    this.next = function(movementRestriction){
        this.stateUpdate();
        this.move(movementRestriction);
    }

    this.stateUpdate = function(){
        if(!this.state.infected) {  
            return        
        } else {
            if(this.state.numberOfTurnsSinceInfection === this.incubationTime){
                this.state.sick = true;
            }
            if((this.incubationTime+this.curredAfter) === this.state.numberOfTurnsSinceInfection){
                this.state.curred = true;
                this.state.infected = false;
            }
            this.state.numberOfTurnsSinceInfection++;
        }
    }

    this.move = function(data){ // Todo refactor movement restriction
        if(data.currentTurn > 0 && data.currentTurn % 4 === 0) { this.currentBuildingId = this.homeId; return;} // Todo doccument 4 cycle... after 4 trun everybody returns home... 4 turn is a day...
        if(this.state.sick){ this.currentBuildingId = this.homeId; return }
        if(Math.floor(Math.random() * 100) > data.populationMovementRate){ return } 

        if(this.currentBuildingId === this.homeId) {
            this.currentBuildingId = this.connections[[Math.floor((Math.random() * this.connections.length))]]
        }else{
            this.currentBuildingId = this.homeId;
        }
    }
}


export function CitizenManager(){
    this.generateCitizens = function (residentialBuildinList, gameConfig){
        let population = []
        residentialBuildinList.forEach((building)=>{
            if(building.type === BUILDING_TYPES[0]){
                for (let index = 0; index < gameConfig.city.population.house; index++) { 
                    population.push(new Citizen({homeId: building.id, curredAfter: gameConfig.citizen.curredAfter, incubationTime: gameConfig.citizen.incubationTime}))              
                }
            }
            if(building.type === BUILDING_TYPES[1]){
                for (let index = 0; index < gameConfig.city.population.apartment; index++) { // TODO
                    population.push(new Citizen({homeId: building.id, curredAfter: gameConfig.citizen.curredAfter, incubationTime: gameConfig.citizen.incubationTime }))              
                }
            }
        })
        return population;
    }
    this.generateCitizenConnections = function(citizens, numberOfConnections, buildingList){
        citizens.forEach(citizen => {   
            // BETA ONLY residental buildings we have (Yoda english :D)         
            for (let index = 0; index < numberOfConnections; index++) {
                citizen.connections.push(buildingList[Math.floor((Math.random() * buildingList.length))].id) 
            }
        });
        return citizens;
    }
}

