export const mapVals = (object, f) => {
    return Object.keys(object).reduce(function(result, key) {
        result[key] = f(object[key])
        return result
    }, {})
}
