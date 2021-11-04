const { program } = require('commander')

program
    .command('base-version')
    .version('0.0.1')

program
    .command('custom-version')
    .version('0.0.2', '-t --ver', '可以自定义版本选项')

program.parse()

// $ node ./bin/option/version.js base-version -V
// $ node ./bin/option/version.js base-version --version
// -> 0.0.1

// $ node ./bin/option/version.js custom-version -t
// $ node ./bin/option/version.js custom-version --ver
// -> 0.0.2