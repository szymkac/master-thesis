import { TextBox, CheckBox } from '../../../common';

const getOptionsConfig = exercise => {
    switch (exercise) {
        case "LIFTING":
        case "PUTTING":
        case "SHIFTING":
        case "ROTATION":
        case "SHAKING":
        case "TOUCHING":
            return {};
        case "PRESSURE":
            return {
                time: { component: TextBox, labelText: "Time of pressure [s]" },
                threshold: { component: TextBox, labelText: "Pressure threshold", validation: { min: 1, max: 120 } },
                rigor: { component: CheckBox, labelText: "Rigorous use of all fingers" }
            }
        case "LOOP":
            return { iterations: { component: TextBox, labelText: "Number of iterations", validation: { min: 1 } } };
        case "DELAY":
            return { time: { component: TextBox, labelText: "Time of delay [s]" } };
        default:
            return null;
    }
}

const getOptionsValues = exercise => {
    switch (exercise) {
        case "LIFTING":
        case "PUTTING":
        case "SHIFTING":
        case "ROTATION":
        case "SHAKING":
        case "TOUCHING":
            return {};
        case "PRESSURE":
            return { time: 3, threshold: 60, rigor: true };
        case "LOOP":
            return { iterations: 3 };
        case "DELAY":
            return { time: 3 };
        default:
            return null;
    }
}

export { getOptionsConfig, getOptionsValues };