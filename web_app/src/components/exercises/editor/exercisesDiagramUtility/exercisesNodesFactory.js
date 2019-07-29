import { CustomNodeModel } from '../customNode/customNodeModel';

class ExercisesNodesFactory {
    constructor(typeCounter, listeners) {
        this.typeCounter = typeCounter;
        this.listeners = listeners;
    }

    getNode = (exercise) => {
        var node;
        switch (exercise.type) {
            case "LIFTING":
                node = this.getDefaultNode(exercise, true, true, true);
                node.addCustomPort("inAir", false, "IN_AIR_START")
                node.addCustomPort("onFloor", true, "ON_FLOOR_END")
                break;
            case "PUTTING":
                node = this.getDefaultNode(exercise, true, true, true);
                node.addCustomPort("inAir", true, "IN_AIR_END")
                node.addCustomPort("onFloor", false, "ON_FLOOR_START")
                break;
            case "SHIFTING":
            case "ROTATION":
            case "SHAKING":
            case "TOUCHING":
            case "PRESSURE":
                node = this.getDefaultNode(exercise, true, true, true);
                break;
            case "START":
                node = this.getDefaultNode(exercise, false, true, false);
                break;
            case "FINISH":
                node = this.getDefaultNode(exercise, true, false, false);
                break;
            case "LOOP":
                node = this.getDefaultNode(exercise, true, true, false);
                node.addCustomPort("Loop Out", false, "LOOP_OUT")
                break;
            case "SINGPOST":
                node = new CustomNodeModel(">", exercise.nodeColor, exercise.type);
                node.addInPort("In");
                node.addOutPort("Out");
                node.addCustomPort("In", true, "SIGN_IN")
                break;
            case "DELAY":
                node = this.getDefaultNode(exercise, true, true, false);
                break;
            default:
                node = new CustomNodeModel("Default error node", "white", "DEFAULT_CASE_ERROR");
        }

        node.addListener(this.listeners);
        return node;
    }

    getDefaultNode = (exercise, inPort, outPort, countOnName) => {
        let node = new CustomNodeModel(
            `${exercise.name}${countOnName ? (" " + this.typeCounter(exercise.type)) : ""}`,
            exercise.nodeColor, exercise.type
        );
        if (inPort)
            node.addInPort("In");
        if (outPort)
            node.addOutPort("Out");

        return node;
    }

}
export default ExercisesNodesFactory;