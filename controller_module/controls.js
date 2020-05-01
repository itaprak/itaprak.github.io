// Game control

export function Controllers(){
    this.clickBlocker = false;

    this.nextButton = document.getElementById("nextBtn");
    this.autoModeButton = document.getElementById("autoMode");
    this.stopAutoModeButton = document.getElementById("stopAutoMode");
    this.simulatorModeButton = document.getElementById("simulatorMode");
    this.simulatorLoader = document.getElementById("simulatorLoader");
    this.restartButton = document.getElementById("restartGame");

    this.openGameEdit = document.getElementById("openGameConfigurationPanel");
    this.discardGameEdit = document.getElementById("discardGameConfigurationPanel");
    this.saveGameConfigChanges = document.getElementById("saveGameConfigChanges");
    // buttons...

    // TODO REFACTOR clean it up... !!!!!
    this.init = function(GameObject){
        this.nextButton.addEventListener("click", ()=>{           
            if(this.clickBlocker){ return }
            GameObject.next();
            this.clickBlocker = true;
            setTimeout(()=>{this.clickBlocker = false},2000)
        });
        this.autoModeButton.addEventListener("click", ()=>{
            this.autoModeButton.disabled = true;
            this.nextButton.disabled = true;
            this.simulatorModeButton.disabled = true;
            this.restartButton.disabled = true;
            this.openGameEdit.disabled = true;
            this.saveGameConfigChanges.disabled = true;

            this.stopAutoModeButton.disabled = false;
            GameObject.next();
            GameObject.autoInterval = setInterval(function(){
                GameObject.next();
            }, 2000)    
        });
        this.stopAutoModeButton.addEventListener("click", ()=>{
            this.stopAutoModeButton.disabled = true;
            this.simulatorModeButton.disabled = false;
            this.autoModeButton.disabled = false;
            this.nextButton.disabled = false;
            this.restartButton.disabled = false;
            this.openGameEdit.disabled = false;
            this.saveGameConfigChanges.disabled = false;
            clearInterval(GameObject.autoInterval);
        });
        
        this.simulatorModeButton.addEventListener("click", ()=>{
            // REFACTORR!!!!!            
            this.simulatorLoader.style.display = "block";
            this.stopAutoModeButton.disabled = true;
            this.simulatorModeButton.disabled = true;
            this.autoModeButton.disabled = true;
            this.nextButton.disabled = true;
            this.restartButton.disabled = true;

            setTimeout(()=>{
                while(GameObject.infectedCitizens.length){
                    GameObject.next(true);
                }    
                GameObject.next(true);
            },500)
            
        });
        
        this.restartButton.addEventListener("click", function(){
            GameObject.restart();      
        });

        this.openGameEdit.addEventListener("click", ()=>{           
            document.getElementById("config-presenter").style.display ="none";
            document.getElementById("config-edit").style.display ="block";
        });
        this.discardGameEdit.addEventListener("click", ()=>{           
            document.getElementById("config-presenter").style.display ="block";
            document.getElementById("config-edit").style.display ="none";
        });

        this.saveGameConfigChanges.addEventListener("click", ()=>{           
            let gameConfig = {
                virusInfectiousness :  ~~document.getElementById("editVirusInfectiousness").value,
                city : {
                    residential: {
                        house: ~~document.getElementById("editHouseNumber").value,
                        apartment: ~~document.getElementById("editApartmentNumber").value
                    },
                    population: {
                        house: ~~document.getElementById("editHousePopulation").value,
                        apartment: ~~document.getElementById("editApartmentPopulation").value,
                    }
                },
                citizen : {
                    numberOfConnections: 1, 
                    populationMovement: ~~document.getElementById("editPopulationMovement").value, 
                    incubationTime: ~~document.getElementById("editIncubationPeriod").value, 
                    curredAfter: ~~document.getElementById("editCurredAfter").value 
                }
            }
            GameObject.saveGameConfigurationChanges(gameConfig);
            document.getElementById("config-presenter").style.display ="block";
            document.getElementById("config-edit").style.display ="none";
        });
    }

    this.simulationEnds = function(){
        this.stopAutoModeButton.disabled = true;
        this.simulatorModeButton.disabled = true;
        this.autoModeButton.disabled = true;
        this.nextButton.disabled = true;
        this.restartButton.disabled = false;

        this.simulatorLoader.style.display = "none";
    }

    this.simulationRestart = function(){
        this.simulatorModeButton.disabled = false;
        this.autoModeButton.disabled = false;
        this.nextButton.disabled = false;
        this.restartButton.disabled = false;
        this.openGameEdit.disabled = false;
        this.saveGameConfigChanges.disabled = false;
        this.stopAutoModeButton.disabled = true;
    }
}
