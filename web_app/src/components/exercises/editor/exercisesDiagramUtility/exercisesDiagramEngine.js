import { DiagramEngine, DiagramModel } from "storm-react-diagrams";
import { CustomNodeFactory } from "../customNode/customNodeFactory";
import { SimplePortFactory } from "../customNode/simplePortFactory";
import * as EXERCISES from '../../../../constants/exercises'
import { CustomPortModel } from "../customNode/customPortModel";
import ExercisesNodesFactory from './exercisesNodesFactory';

class ExercisesDiagramEngine {
    constructor(typeCounter, listeners) {
        this.nodesFactory = new ExercisesNodesFactory(typeCounter, listeners);
        this.diagramEngine = new DiagramEngine();
        this.diagramEngine.installDefaultFactories();

        this.diagramEngine.registerPortFactory(new SimplePortFactory("custom", this.portFunc));
        this.diagramEngine.registerNodeFactory(new CustomNodeFactory());

        this.setEmptyModel();

        this.maxNumberPointsPerLink = 0;
    }

    portFunc = config => {
        return new CustomPortModel();
    }

    serializeAndClearModel = () => {
        return JSON.parse(JSON.stringify(this.diagramEngine.getDiagramModel().serializeDiagram()));
    }

    setModel = model => {
        this.diagramEngine.setDiagramModel(model);
    }

    getEmptyModel = () => {
        var model = new DiagramModel();

        let startNode = this.nodesFactory.getNode(EXERCISES.START);
        startNode.setPosition(100, 100);

        let finishNode = this.nodesFactory.getNode(EXERCISES.FINISH);
        finishNode.setPosition(600, 100);

        model.addAll(startNode, finishNode);
        return model;
    }

    setEmptyModel = () => {
        this.diagramEngine.setDiagramModel(this.getEmptyModel());
    }

    addNode = (type, points) => {
        let node = this.nodesFactory.getNode(EXERCISES[type]);
        node.x = points.x;
        node.y = points.y;
        this.diagramEngine.getDiagramModel().addAll(node);
    }

    getDiagramEngine = () => {
        return this.diagramEngine;
    }

    getNodes = () => {
        return this.diagramEngine.diagramModel.nodes;
    }
}

export default ExercisesDiagramEngine;