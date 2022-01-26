const LoaderUtils = require('loader-utils')

module.exports = function (source) {
    const loaderContext = this
    const {
        target,
        request,
        minimize,
        sourceMap,
        rootContext,
        resourcePath,
        resourceQuery = ''
    } = loaderContext
    console.log(LoaderUtils)
    debugger
    return `export default ${JSON.stringify(source)}`
}
