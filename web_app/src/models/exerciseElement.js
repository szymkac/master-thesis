export default class ExerciseElement{
    constructor(type, typeCount){
        this.type = type;
        this.typeCount = typeCount;
    }

    toKey = () => {
        return this.type + this.typeCount;
    }
}