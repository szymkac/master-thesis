import { TextBox, CheckBox } from '../../../common';

const getOptionsConfig = exercise => {
    switch (exercise) {
        case "LIFTING":
        case "PUTTING":
        case "ROTATION":
            return {};
        case "TOUCHING":
            return {
                thumb: { component: CheckBox, labelText: "Touth with thumb" },
                index: { component: CheckBox, labelText: "Touth with index finger" },
                middle: { component: CheckBox, labelText: "Touth with middle finger" },
                ring: { component: CheckBox, labelText: "Touth with ring finger" },
                little: { component: CheckBox, labelText: "Touth with little finger" },
                random: { component: CheckBox, labelText: "Randomly select fingers to touch" },
                randomMax: { component: TextBox, labelText: "Amount of fingers to select randomly" } //TODO disabled finger selection on random and enalbled randomMax (Maybe by extra onChange?)
            };
        case "SHAKING":
            return {
                time: { component: TextBox, labelText: "Time of shaking [s]" },
                threshold: { component: TextBox, labelText: "Acceleration threshold [mg]", validation: { min: 0.3, max: 0.8 } }
            }
        case "SHIFTING":
            return { threshold: { component: TextBox, labelText: "Acceleration threshold [mg]", validation: { min: 0.3, max: 0.8 } } }
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
        case "ROTATION":
            return {};
        case "TOUCHING":
            return {
                thumb: false,
                index: false,
                middle: false,
                ring: false,
                little: false,
                random: false,
                randomMax: null 
            };
        case "SHAKING":
            return { time: 1, threshold: 0.4 }; //TODO change units
        case "SHIFTING":
            return { threshold: 0.4 }; //TODO change units
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