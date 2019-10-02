const ADMIN = "ADMIN";
const PATIENT = "PATIENT";
const PHYSIOTHERAPIST = "PHYSIOTHERAPIST";

const ROLES_OPTIONS = [
    {value: PATIENT, description: "Patient"},
    {value: PHYSIOTHERAPIST, description: "Physiotherapist"}
];

const ROLES = {
    [ADMIN] : ADMIN,
    [PATIENT] : PATIENT,
    [PHYSIOTHERAPIST] : PHYSIOTHERAPIST
};

export {ROLES_OPTIONS, ROLES};