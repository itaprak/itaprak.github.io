export function History(){
    this.history = {
        gameDetails: {
            // numberOfCitizens: 0,
            // populationMovement: 20,
            // numberOfConnectionPerCitizen: 1,
            // infectiousness: 3
        },
        gameHistory: [
            // {
            //     turn: 0,
            //     infected: 1,
            //     sick:0,
            //     curred: 0,
            
            //     newInfection: 0,
            //     newCurred: 0,
            //     newSick: 0
            // }
        ]
    }

    this.saveCurrentTurn = function(data){
        let newCurred = 0;
        if(this.history.gameHistory[this.history.gameHistory.length-1]){            
            newCurred = (data.curred - this.history.gameHistory[this.history.gameHistory.length-1].curred) > 0 ?
                             data.curred - this.history.gameHistory[this.history.gameHistory.length-1].curred : 0;
        }   
        data.newCurred = newCurred;       
        this.history.gameHistory.push(data);
    }

    this.setGameDetails = function(data) {
        this.history.gameDetails = data;
    }   

    this.reset = function(){
        this.history = {
            gameDetails: {
                // numberOfCitizens: 0,
                // populationMovement: 20,
                // numberOfConnectionPerCitizen: 1,
                // infectiousness: 3
            },
            gameHistory: [
                // {
                //     turn: 0,
                //     infected: 1,
                //     sick:0,
                //     curred: 0,
                //     neverInfected: 'x',
                
                //     newInfection: 0,
                //     newCurred: 0,
                //     newSick: 0
                // }
            ]
        }
    }
}