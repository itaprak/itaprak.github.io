import { City }    from './game_modules/city.js';
import { CitizenManager } from './game_modules/citizen.js';
import { View }    from './view_module/view.js';
import { ShowChart }  from './view_module/chart-manager.js';
import { History }    from './game_modules/history.js';
import { Controllers } from './controller_module/controls.js'

function GameConfig(config) {
    if(!config){config = {}};
    this.virusInfectiousness = config.virusInfectiousness || 100;
    this.city = config.city || {
        residential: {
            house: 12,
            apartment: 8
        },
        population: {
            house:3,
            apartment: 8,
        }
    }; 
    this.citizen = config.citizen || {
        numberOfConnections: 1, // number
        populationMovement: 100, // percentage
        incubationTime: 4, // turn
        curredAfter: 4 // turn
    }

    // REFACTOR...
    this.resetGameConfig = function(config){
        this.virusInfectiousness = config.virusInfectiousness;
        this.city = config.city;
        this.citizen = config.citizen;
    }
    // todo setters (getters???)
    // MODULE PATTERN
}

function Game(gameConfig, gameControllers){
    this.gameConfig = gameConfig;
    this.gameControllers = gameControllers;
    this.gameControllers.init(this);

    this.gameHistory = new History();
    this.city = new City();
    this.view = new View({domId: "gameScreen"});
    this.citizenManager = new CitizenManager();

    this.citizens = [];
    this.residentialBuildings = [];
    this.infectedCitizens = [];
    // this.infectedBuildings = []; todo idea...
    this.turn = 0;
    this.newInfection = 0;
    this.autoInterval = undefined;


    this.initInfection = function() {
        let randomStart = Math.floor((Math.random() * this.citizens.length));
        this.citizens[randomStart].state.infected = true;
        this.citizens[randomStart].state.numberOfTurnsSinceInfection++;

        this.infectedCitizens.push(this.citizens[randomStart]);
        this.citizens.splice(randomStart, 1);
        this.newInfection++;
    }

    this.spreadTheInfection = function() {        
        this.infectedCitizens.forEach(infectedCitizen => {            
            this.citizens.forEach((citizen) => {
                if(citizen.state.curred || citizen.state.infected){return}
                if(citizen.currentBuildingId === infectedCitizen.currentBuildingId){
                    let random0to100 = Math.floor(Math.random() * 100)
                    let toBeInfected = !!((random0to100 - this.gameConfig.virusInfectiousness) < 0)
                    if(toBeInfected){
                        citizen.state.infected = true;
                        this.infectedCitizens.push(citizen);    
                        this.newInfection++;                    
                    }
                 }
            })
        })  
        this.citizens = this.citizens.filter(c => {return c.state.infected === false})      
    }

    this.clearInfectedCitizensArray = function(){ 
        let curredCitizens = this.infectedCitizens.filter((iC)=>{return iC.state.curred});
        this.infectedCitizens = this.infectedCitizens.filter((iC)=>{return iC.state.infected});
        this.citizens = this.citizens.concat(curredCitizens);
    }

    this.init = function(){
        this.residentialBuildings = this.city.generateHouses(this.gameConfig.city);
        this.citizens = this.citizenManager.generateCitizens(this.residentialBuildings, this.gameConfig); 
        this.citizens = this.citizenManager.generateCitizenConnections(this.citizens, this.gameConfig.citizen.numberOfConnections, this.residentialBuildings);

        this.initInfection(this.citizens);

        let data = {             
            infectiousness: this.gameConfig.virusInfectiousness,
            numberOfConnectionPerCitizen: this.gameConfig.citizen.numberOfConnections,
            populationMovement: this.gameConfig.citizen.populationMovement,
            incubationPeriod: this.gameConfig.citizen.incubationTime,
            curredAfter: this.gameConfig.citizen.curredAfter,
            numberOfCitizens: this.citizens.concat(this.infectedCitizens).length,
            apartmentNumber: this.gameConfig.city.residential.apartment,
            houseNumber: this.gameConfig.city.residential.house,
            apartmentPopulation: this.gameConfig.city.population.apartment,
            housePopulation: this.gameConfig.city.population.house,

        }
        this.gameHistory.setGameDetails(data);
        this.gameHistory.saveCurrentTurn({
            turn: 0,
            infected: 1,
            newInfection: 1,
            sick:0,
            curred: 0,
            neverInfected: this.citizens.length
        })
        this.view.init(this.residentialBuildings, this.citizens.concat(this.infectedCitizens), data);
    }

    this.next = function(simulatorMode){     
        this.newInfection = 0;
        
        if(!this.infectedCitizens.length){
            this.view.next(this.citizens.concat(this.infectedCitizens), this.gameHistory.history.gameHistory[this.gameHistory.history.gameHistory.length-1]); 
            clearInterval(myGame.autoInterval);
            ShowChart('chartsContainer', this.gameHistory);
            this.gameControllers.simulationEnds();
        }
        this.turn++;

        this.clearInfectedCitizensArray();  // Double CLEAR citizen state update sick -> curred REFACTOR TODO
        this.spreadTheInfection();

        this.citizens.forEach(citizen => {
            citizen.next({populationMovementRate: this.gameConfig.citizen.populationMovement, currentTurn: this.turn});           
        })
        this.infectedCitizens.forEach(infectedCitizen => {
            infectedCitizen.next({populationMovementRate: this.gameConfig.citizen.populationMovement, currentTurn: this.turn});
        })
        this.clearInfectedCitizensArray(); // Double CLEAR citizen state update sick -> curred REFACTOR TODO

        let data = {
            turn: this.turn,
            infected: this.infectedCitizens.length,
            newInfection: this.newInfection,
            curred: this.citizens.reduce((acc, curr)=>{ return curr.state.curred ? ++acc : acc}, 0),
            neverInfected: this.citizens.reduce((acc, curr)=>{ return !curr.state.curred && !curr.state.infected && !curr.state.sick ? ++acc : acc}, 0),
            sick: this.infectedCitizens.reduce((acc, curr)=>{ return curr.state.sick ? ++acc : acc}, 0)
        }
        if(!simulatorMode){
            this.view.next(this.citizens.concat(this.infectedCitizens), data);   
        }
        this.gameHistory.saveCurrentTurn(data)
    }

    this.restart = function(){
        // REFACTOR
        this.gameControllers.simulationRestart();

        let chartsContainer = document.getElementById('chartsContainer');
        chartsContainer.style.display = 'none';

        let gameScreen = document.getElementById('gameScreen');
        gameScreen.innerHTML = '';

        this.gameHistory.reset();
        this.turn = 0;
        this.citizens = [];
        this.residentialBuildings = [];
        this.infectedCitizens = [];
        // this.infectedBuildings = []; todo idea...
        this.turn = 0;
        this.autoInterval = undefined;
        this.init();
    }

    this.saveGameConfigurationChanges = function(config) {
        this.gameConfig.resetGameConfig(config);
        this.restart();
    }
}

// START
let myGameConfig = new GameConfig();
let myControllers = new Controllers();

const myGame = new Game(myGameConfig, myControllers);
myGame.init();
