import React from 'react';
import { CustomNodeWidget } from "./customNodeWidget";
import { AbstractNodeFactory } from "storm-react-diagrams";
import { CustomNodeModel } from './customNodeModel';

export class CustomNodeFactory extends AbstractNodeFactory {
	constructor() {
		super("custom");
	}

	generateReactWidget(diagramEngine, node) {
		return React.createElement(CustomNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig) {
		return new CustomNodeModel();
	}
}