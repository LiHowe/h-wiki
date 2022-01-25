const { program } = require('commander')

program
    .option('-d --double <number>','超级加倍', (val) => {
        return parseInt(val, 10) * parseInt(val, 10)
    }, 10)
    .action(option => {
        console.log(option.double)
    })
program.parse()