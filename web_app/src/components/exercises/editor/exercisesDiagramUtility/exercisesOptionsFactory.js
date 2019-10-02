import { TextBox, CheckBox, Select } from '../../../common';
import { PRESSURE_OPTIONS, MEDIUM_PRESSURE } from '../../../../constants/pressureThresholdsOptions';

const getOptionsConfig = exercise => {
    switch (exercise) {
        case "LIFTING":
        case "PUTTING":
            return { showSucces: { component: CheckBox, labelText: "Show succes info after done" } };
        case "ROTATION":
            return {
                showSucces: { component: CheckBox, labelText: "Show succes info after done" },
                threshold: { component: TextBox, labelText: "Rotation threshold deg/s", validation: { min: 160, max: 640 } }
            };
        case "TOUCHING":
            return {
                showSucces: { component: CheckBox, labelText: "Show succes info after done" },
                thumb: { component: CheckBox, labelText: "Touch with thumb" },
                index: { component: CheckBox, labelText: "Touch with index finger" },
                middle: { component: CheckBox, labelText: "Touch with middle finger" },
                ring: { component: CheckBox, labelText: "Touch with ring finger" },
                little: { component: CheckBox, labelText: "Touch with little finger" },
                random: { component: CheckBox, labelText: "Randomly select fingers" },
                randomMax: { component: TextBox, labelText: "Max amount of fingers" } //TODO disabled finger selection on random and enalbled randomMax (Maybe by extra onChange?)
            };
        case "SHAKING":
            return {
                showSucces: { component: CheckBox, labelText: "Show succes info after done" },
                time: { component: TextBox, labelText: "Time of shaking [s]" },
                threshold: { component: TextBox, labelText: "Acceleration threshold [mg]", validation: { min: 0.3, max: 0.8 } }
            }
        case "SHIFTING":
            return {
                showSucces: { component: CheckBox, labelText: "Show succes info after done" },
                threshold: { component: TextBox, labelText: "Acceleration threshold [mg]", validation: { min: 0.3, max: 0.8 } }
            }
        case "PRESSURE":
            return {
                showSucces: { component: CheckBox, labelText: "Show succes info after done" },
                time: { component: TextBox, labelText: "Time of pressure [s]" },
                threshold: { component: Select, labelText: "Pressure threshold", options: PRESSURE_OPTIONS },
                rigor: { component: CheckBox, labelText: "Rigorous use of all fingers" }
            }
        case "LOOP":
            return {
                showSucces: { component: CheckBox, labelText: "Show succes info after done" },
                iterations: { component: TextBox, labelText: "Number of iterations", validation: { min: 1 } }
            };
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
            return { showSucces: true };
        case "ROTATION":
            return { showSucces: true, threshold: 275 };
        case "TOUCHING":
            return {
                showSucces: true,
                thumb: false,
                index: false,
                middle: false,
                ring: false,
                little: false,
                random: false,
                randomMax: 0
            };
        case "SHAKING":
            return { showSucces: true, time: 1, threshold: 0.4 }; //TODO change units
        case "SHIFTING":
            return { showSucces: true, threshold: 0.4 }; //TODO change units
        case "PRESSURE":
            return { showSucces: true, time: 3, threshold: MEDIUM_PRESSURE, rigor: true };
        case "LOOP":
            return { showSucces: false, iterations: 3 };
        case "DELAY":
            return { time: 3 };
        default:
            return null;
    }
}

export { getOptionsConfig, getOptionsValues };