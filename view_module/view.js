import { BUILDING_TYPES } from '../game_modules/building.js'

export function View(config) {
    this.domId = config.domId;
    this.root = document.getElementById(this.domId);
    this.buildingHashMap = {};

    this.init = function(buildings, citizens, guiData){ // TODO Refactor // init hashmap // init buildings // init citizens
        
        // ToDo refactor..........................
        let currentTurn = document.getElementById('currentTurn')
        currentTurn.innerHTML = 0;    
        let numberOfCitizens = document.getElementById('numberOfCitizens')
        numberOfCitizens.innerHTML = citizens.length;    
        let numberOfCitizensHadNoContactWithTheVirus = document.getElementById('numberOfCitizensHadNoContactWithTheVirus')
        numberOfCitizensHadNoContactWithTheVirus.innerHTML = citizens.length-1;       

        let numberOfCurredCitizens = document.getElementById('numberOfCurredCitizens')
        numberOfCurredCitizens.innerHTML = 0;      
        
        let infectiousnessHTML = document.getElementById('virusInfectiousness')
        infectiousnessHTML.innerHTML = guiData.infectiousness + ' %';
        let editVirusInfectiousness = document.getElementById('editVirusInfectiousness')
        editVirusInfectiousness.value = guiData.infectiousness;

        let numberOfConnectionPerCitizen = document.getElementById('numberOfConnectionPerCitizen')
        numberOfConnectionPerCitizen.innerHTML = guiData.numberOfConnectionPerCitizen;
        
        let populationMovement = document.getElementById('populationMovement')
        populationMovement.innerHTML = guiData.populationMovement + ' %';   
        let editPopulationMovement = document.getElementById('editPopulationMovement')
        editPopulationMovement.value = guiData.populationMovement;   

        let incubationPeriod = document.getElementById('incubationPeriod')
        incubationPeriod.innerHTML = guiData.incubationPeriod + ' turn';  
        let editIncubationPeriod = document.getElementById('editIncubationPeriod')
        editIncubationPeriod.value = guiData.incubationPeriod;          
        
        let curredAfter = document.getElementById('curredAfter')
        curredAfter.innerHTML = guiData.curredAfter + ' turn';
        let editCurredAfter = document.getElementById('editCurredAfter')
        editCurredAfter.value = guiData.curredAfter;

        let houseNumber = document.getElementById('houseNumber')
        houseNumber.innerHTML = guiData.houseNumber;  
        let editHouseNumber = document.getElementById('editHouseNumber')
        editHouseNumber.value = guiData.houseNumber;  

        let apartmentNumber = document.getElementById('apartmentNumber')
        apartmentNumber.innerHTML = guiData.apartmentNumber;  
        let editApartmentNumber = document.getElementById('editApartmentNumber')
        editApartmentNumber.value = guiData.apartmentNumber;  

        let housePopulation = document.getElementById('housePopulation')
        housePopulation.innerHTML = guiData.housePopulation;  
        let editHousePopulation = document.getElementById('editHousePopulation')
        editHousePopulation.value = guiData.housePopulation; 

        let apartmentPopulation = document.getElementById('apartmentPopulation')
        apartmentPopulation.innerHTML = guiData.apartmentPopulation;  
        let editApartmentPopulation = document.getElementById('editApartmentPopulation')
        editApartmentPopulation.value = guiData.apartmentPopulation;  

        
        if(citizens.length < 1001) { // TODO REFACTOR 1001
            let layer = {row: 0, col: 0}; 

            // REFACTOR VIEW::::!!!!
            buildings.forEach((building)=>{
                if(layer.col % 10 === 0){ 
                    layer.col = 0; 
                    layer.row++;
                }
                

                let buildingDiv = document.createElement("div");

                function generateSpan(className) {
                    let span = document.createElement("span");
                    span.className = className;
                    return span;
                }
                
                if(building.type === 'house'){
                    buildingDiv.className = 'icon-house';                    
                    buildingDiv.appendChild(generateSpan('path1'))
                    buildingDiv.appendChild(generateSpan('path2'))
                    buildingDiv.appendChild(generateSpan('path3'))
                    buildingDiv.appendChild(generateSpan('path4'))
                    buildingDiv.appendChild(generateSpan('path5'))
                    buildingDiv.appendChild(generateSpan('path6'))
                    buildingDiv.appendChild(generateSpan('path7'))
                    buildingDiv.appendChild(generateSpan('path8'))
                    buildingDiv.appendChild(generateSpan('path9'))
                    
                }else{
                    buildingDiv.className = 'icon-hotel';
                    buildingDiv.appendChild(generateSpan('path1'))
                    buildingDiv.appendChild(generateSpan('path2'))
                    buildingDiv.appendChild(generateSpan('path3'))
                    buildingDiv.appendChild(generateSpan('path4'))
                    buildingDiv.appendChild(generateSpan('path5'))
                    buildingDiv.appendChild(generateSpan('path6'))
                    buildingDiv.appendChild(generateSpan('path7'))
                    buildingDiv.appendChild(generateSpan('path8'))
                    buildingDiv.appendChild(generateSpan('path9'))
                    buildingDiv.appendChild(generateSpan('path10'))
                    buildingDiv.appendChild(generateSpan('path11'))
                    buildingDiv.appendChild(generateSpan('path12'))
                    buildingDiv.appendChild(generateSpan('path13'))
                    buildingDiv.appendChild(generateSpan('path14'))
                    buildingDiv.appendChild(generateSpan('path15'))
                    buildingDiv.appendChild(generateSpan('path16'))
                    buildingDiv.appendChild(generateSpan('path17'))
                    buildingDiv.appendChild(generateSpan('path18'))
                    buildingDiv.appendChild(generateSpan('path19'))
                    buildingDiv.appendChild(generateSpan('path20'))
                    buildingDiv.appendChild(generateSpan('path21'))
                    buildingDiv.appendChild(generateSpan('path22'))
                    buildingDiv.appendChild(generateSpan('path23'))
                    buildingDiv.appendChild(generateSpan('path24'))
                    buildingDiv.appendChild(generateSpan('path25'))
                    buildingDiv.appendChild(generateSpan('path26'))
                    buildingDiv.appendChild(generateSpan('path27'))
                    buildingDiv.appendChild(generateSpan('path28'))
                    buildingDiv.appendChild(generateSpan('path29'))
                    buildingDiv.appendChild(generateSpan('path30'))
                    buildingDiv.appendChild(generateSpan('path31'))
                    buildingDiv.appendChild(generateSpan('path32'))
                    buildingDiv.appendChild(generateSpan('path33'))
                    buildingDiv.appendChild(generateSpan('path34'))
                    buildingDiv.appendChild(generateSpan('path35'))
                    buildingDiv.appendChild(generateSpan('path36'))
                    buildingDiv.appendChild(generateSpan('path37'))
                    buildingDiv.appendChild(generateSpan('path38'))
                    buildingDiv.appendChild(generateSpan('path39'))
                    buildingDiv.appendChild(generateSpan('path40'))
                }
                
                buildingDiv.id = building.id;
                buildingDiv.style.left = 100 * layer.col + 'px';
                buildingDiv.style.top = 100* layer.row + 'px';
                this.buildingHashMap[building.id] = {left: 100 * layer.col , top: 100 * layer.row, citizensInTheBuilding: 0}            
                this.root.append(buildingDiv);
                layer.col++;
            })       
            citizens.forEach((citizen) => {
                let citizenDiv = document.createElement("div");
                citizenDiv.className = "citizen";
                if(citizen.state.infected === true) {
                    citizenDiv.classList.add("infected");
                }
                citizenDiv.id = citizen.id;
                citizenDiv.style.left = this.buildingHashMap[citizen.currentBuildingId].left + 'px';
                citizenDiv.style.top = this.buildingHashMap[citizen.currentBuildingId].top + this.buildingHashMap[citizen.currentBuildingId].citizensInTheBuilding*10 + 'px';
                this.buildingHashMap[citizen.currentBuildingId].citizensInTheBuilding++;
                this.root.append(citizenDiv);
            }) 
        }
    }
    
    this.next = function(citizens, guiData){
        this.updateGUI(guiData);

        Object.keys(this.buildingHashMap).forEach((id)=>{
            this.buildingHashMap[id].citizensInTheBuilding = 0;
        })
        // Todo tetect statre change.. performance.. REFACTOR 1001
        if(citizens.length < 1001) {
            citizens.forEach((citizen) => {
                let citizenDiv = document.getElementById(citizen.id); 
                if(citizen.state.infected === true && citizen.state.sick === false) {
                    citizenDiv.classList.add("infected");
                } 
                if(citizen.state.sick === true) {
                    citizenDiv.classList.remove("infected");
                    citizenDiv.classList.add("sick");
                }                
                if(citizen.state.curred === true) {
                    citizenDiv.classList.remove("sick");
                    citizenDiv.classList.add("curred");
                } 
            }) 

            setTimeout(()=>{
                citizens.forEach((citizen) => {
                    let citizenDiv = document.getElementById(citizen.id);              
                    citizenDiv.style.left = this.buildingHashMap[citizen.currentBuildingId].left + 'px';
                    citizenDiv.style.top = this.buildingHashMap[citizen.currentBuildingId].top + this.buildingHashMap[citizen.currentBuildingId].citizensInTheBuilding*10 + 'px';
                    this.buildingHashMap[citizen.currentBuildingId].citizensInTheBuilding++;         
                })
            }, 1000)
        }
    }

    this.updateGUI = function(guiData){
        let turnHTML = document.getElementById('currentTurn')
        turnHTML.innerHTML = guiData.turn;
        let infectedHTML = document.getElementById('numberOfInfectedCitizens')
        infectedHTML.innerHTML = guiData.infected;
        let curredHTML = document.getElementById('numberOfCurredCitizens')
        curredHTML.innerHTML = guiData.curred;      
        let numberOfSickCitizens = document.getElementById('numberOfSickCitizens')
        numberOfSickCitizens.innerHTML = guiData.sick;      
        let numberOfCitizensHadNoContactWithTheVirus = document.getElementById('numberOfCitizensHadNoContactWithTheVirus')
        numberOfCitizensHadNoContactWithTheVirus.innerHTML = guiData.neverInfected;      
    }
}