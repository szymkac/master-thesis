export default class ExerciseModel {
    constructor(uid, diagramModel) {
        this.uid = uid;
        this.name = diagramModel.name;
        this.description = diagramModel.description;
        this.exerciseQueue = this.getExerciseQueue(diagramModel);
        this.stepCounts = 0; //TODO
    }

    getExerciseQueue = diagramModel => {
        let queue = [];
        let node = diagramModel.nodes.find(n => n.customType === "START");
        queue.push(node);

        while (node.customType !== "FINISH") {
            node = getNodeByOutput(node, diagramModel);
            if (!!node) {
                if (node.customType === "LOOP") {
                    node.jumpTo = getNodeIndexByOutput(node, diagramModel, "LOOP_OUT", queue) + 1;
                }
                queue.push(node);
            }
            else
                break;
        }

        return queue;
    }
}

const getNodeByOutput = (node, diagramModel, customType = "OUT") => {
    const outPort = node.ports.find(p => p.customType === customType);
    const linkToNext = diagramModel.links.find(l => l.id === outPort.links[0]);
    return !!linkToNext ? diagramModel.nodes.find(n => n.id === linkToNext.target) : null;
}

const getNodeIndexByOutput = (node, diagramModel, customType = "OUT", nodes) => {
    const outPort = node.ports.find(p => p.customType === customType);
    const linkToNext = diagramModel.links.find(l => l.id === outPort.links[0]);
    return !!linkToNext ? (nodes || diagramModel.nodes).findIndex(n => n.id === linkToNext.target) : -1;
}