const NO_PRESSURE = "NO_PRESSURE";
const GENTLY_TOUCH = "GENTLY_TOUCH";
const LIGHT_PRESSURE = "LIGHT_PRESSURE";
const MEDIUM_PRESSURE = "MEDIUM_PRESSURE";
const STRONG_PRESSURE = "STRONG_PRESSURE";

const PRESSURE_OPTIONS = [
    { value: NO_PRESSURE, description: "No pressure" },
    { value: GENTLY_TOUCH, description: "Gently touch" },
    { value: LIGHT_PRESSURE, description: "Light pressure" },
    { value: MEDIUM_PRESSURE, description: "Medium pressure" },
    { value: STRONG_PRESSURE, description: "Strong pressure" }
];

const PRESSURE_VALUS = {
    [NO_PRESSURE]: { min: 0, max: 9 },
    [GENTLY_TOUCH]: { min: 10, max: 199 },
    [LIGHT_PRESSURE]: { min: 200, max: 499 },
    [MEDIUM_PRESSURE]: { min: 500, max: 799 },
    [STRONG_PRESSURE]: { min: 800, max: 1023 },
};

export { 
    PRESSURE_OPTIONS, 
    PRESSURE_VALUS, 
    NO_PRESSURE,
    GENTLY_TOUCH,
    LIGHT_PRESSURE,
    MEDIUM_PRESSURE,
    STRONG_PRESSURE
};