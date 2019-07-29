import { NodeModel, Toolkit } from "storm-react-diagrams";
import { CustomPortModel, } from "./customPortModel";
import * as _ from "lodash";
import { getOptionsValues } from '../exercisesDiagramUtility/exercisesOptionsFactory';

export class CustomNodeModel extends NodeModel {
	name;
	color;
	ports;
	customType;
	options;

	constructor(name = "Untitled", color = "rgb(0,192,255)", customType = "none") {
		super("custom");
		this.name = name;
		this.color = color;
		this.customType = customType;
		this.options = getOptionsValues(customType);
	}

	addInPort(label) {
		let port = new CustomPortModel(true, Toolkit.UID(), label);
		port.maximumLinks = 1;
		port.customType = "IN";
		return this.addPort(port);
	}

	addOutPort(label) {
		let port = new CustomPortModel(false, Toolkit.UID(), label);
		port.maximumLinks = 1;
		port.customType = "OUT";
		return this.addPort(port);
	}

	addCustomPort(label, isInput, customNodeType) {
		let port = new CustomPortModel(isInput, Toolkit.UID(), label);
		port.type = "custom";
		port.customType = customNodeType;
		return this.addPort(port);
	}

	deSerialize(object, engine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.color = object.color;
		this.customType = object.customType;
		this.options = object.options;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			color: this.color,
			customType: this.customType,
			options: this.options
		});
	}

	getInPorts() {
		return _.filter(this.ports, portModel => {
			return portModel.in && portModel.type === "default";
		});
	}

	getOutPorts() {
		return _.filter(this.ports, portModel => {
			return !portModel.in && portModel.type === "default";
		});
	}

	getCustomPorts() {
		return _.filter(this.ports, portModel => {
			return portModel.type === "custom";
		});
	}
}
