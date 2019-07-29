import { PortModel, DefaultLinkModel, DefaultPortModel } from "storm-react-diagrams";
import * as _ from "lodash";

export class CustomPortModel extends PortModel {
	in;
	label;
	links;
	customType;

	constructor(isInput, name, label = null, id) {
		super(name, "default", id);
		this.in = isInput;
		this.label = label || name;
	}

	deSerialize(object, engine) {
		super.deSerialize(object, engine);
		this.in = object.in;
		this.label = object.label;
		this.customType = object.customType;
	}

	serialize() {
		return _.merge(super.serialize(), {
			in: this.in,
			label: this.label,
			customType: this.customType
		});
	}

	link(port) {
		let link = this.createLinkModel();
		link.setSourcePort(this);
		link.setTargetPort(port);
		return link;
	}

	canLinkToPort(port) {
		if (port instanceof DefaultPortModel) {
			return this.in !== port.in;
		}
		return true;
	}

	createLinkModel() {
		let link = super.createLinkModel();
		return link || new DefaultLinkModel();
	}
}
