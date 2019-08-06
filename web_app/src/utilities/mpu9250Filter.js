const filterNormAcceleration = data => {
    let a = normalize({
        x: -data.a[0],
        y: data.a[1],
        z: data.a[2]
    });
    return a;
}

const filterAcceleration = data => {
    return {
        x: -data.a[0],
        y: data.a[1],
        z: data.a[2]
    };
}

const filterAll = data => {
    return {
        a: filterAcceleration(data),
        g: null, //TODO
        m: null //TODO
    }
}

const normalize = toNormalize => {
    let norm = Math.sqrt(Math.pow(toNormalize.x, 2) + Math.pow(toNormalize.y, 2) + Math.pow(toNormalize.z, 2));
    norm = 1.0 / norm;

    return {
        x: toNormalize.x * norm,
        y: toNormalize.y * norm,
        z: toNormalize.z * norm
    }
}

export { filterAcceleration, filterNormAcceleration }

export default filterAll;