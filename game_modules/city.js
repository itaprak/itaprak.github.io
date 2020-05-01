import generateId from './id-generator.js'
import {BUILDING_TYPES, Building} from './building.js'

export function City(){
    // this.routeMap = []; Todo   
    this.generateHouses = function (config){
        let residential = []
        for (let index = 0; index < config.residential.house; index++) {
            residential.push(new Building({type: BUILDING_TYPES[0], id: generateId()}));            
        }
        for (let index = 0; index < config.residential.apartment; index++) {
            residential.push(new Building({type: BUILDING_TYPES[1], id: generateId()}));            
        }
        return residential;
    }

    this.generateCityRoutes = function(){ // ToDo
        // Every house || apartment should have N > 0 dirrect connection to another house || apartment || grocery
        // Every house || apartment should have N>  0 N < 4 dirrect connection to a store && publicTransportation
        // An apartment have have N < 2 dirrect connection to offices
        // Every building has N > 0 dirrect connection to hospitals;
    }    
}