const { program } = require('commander')
program
    .option('--no-debug', '表明默认debug为true')
    .option('-d --debug', '描述', false)
    // .option('--no-log', 'debug')
    .action((options) => {
        console.log(options)
    })
program.parse()