import * as React from "react";
import { DiagramWidget } from "storm-react-diagrams";

require("storm-react-diagrams/dist/style.min.css")

const ExercisesDiagram = props => {
    return <DiagramWidget className="srd-demo-canvas" {...props.exercisesDiagramEngine} />;
};

export default ExercisesDiagram;