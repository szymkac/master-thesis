import * as HANDS from './hands';
import * as FINGERS from './fingers';

const FINGERS_NAMES_INDEXES = {
    [HANDS.RIGHT]: {
        [FINGERS.THUMB]: 0,
        [FINGERS.INDEX]: 1,
        [FINGERS.MIDDLE]: 2,
        [FINGERS.RING]: 3,
        [FINGERS.LITTLE]: 4
    },
    [HANDS.LEFT]: {
        [FINGERS.THUMB]: 5,
        [FINGERS.INDEX]: 1,
        [FINGERS.MIDDLE]: 2,
        [FINGERS.RING]: 3,
        [FINGERS.LITTLE]: 4
    }
}

const FINGERS_INDEXES_NAMES = {
    [HANDS.RIGHT]: {
        0: FINGERS.THUMB,
        1: FINGERS.INDEX,
        2: FINGERS.MIDDLE,
        3: FINGERS.RING,
        4: FINGERS.LITTLE
    },
    [HANDS.LEFT]: {
        5: FINGERS.THUMB,
        1: FINGERS.INDEX,
        2: FINGERS.MIDDLE,
        3: FINGERS.RING,
        4: FINGERS.LITTLE
    }
}

export { FINGERS_NAMES_INDEXES, FINGERS_INDEXES_NAMES };