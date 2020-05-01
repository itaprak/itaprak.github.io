export const BUILDING_TYPES = ["house", "apartment","publicTransport", "store", "office", "hospital"];
export function Building (config) {
    this.id = config.id;
    this.type = config.type; // enum
    // this.connections = [];
    // this.size = size; // per type -> range
    // this.buildingInfectivity = 0; 
    // this.position = config.position; // [num][num]
}

// const BUILDING_CONDITION = ["awful","bad", "avarage", "good", "excelent"];