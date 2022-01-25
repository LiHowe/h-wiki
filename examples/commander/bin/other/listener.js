const { program } = require('commander')

// 监听指定command
program
    .on('command:test', () => {
        console.log('enter command listener')
    })
//  监听未定义command
program
    .on('command:*', function (operands) {
        console.log('enter command:* listener', operands)
    })

program
    .command('test')
    .option('-p <port>')
    // 监听选项p
    .on('option:p', opt => {
        console.log('enter option listener, option<p> is', opt)
    })
    .action(() => {
        console.log('enter action')
    })

program.parse()