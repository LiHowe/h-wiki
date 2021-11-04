/**
 * 可变参数option
 */
const { program } = require('commander')

program
    .option('-n --number [numbers...]', '可选可变数量参数', [100, 86])
    .option('-s <second...>', '必填可变数量参数')
    .action(option => {
        console.log(option)
    })

program.parse()
