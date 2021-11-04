const { program } = require('commander')

program
    .command('create')
    .description('命令描述')
    .action(() => {
        console.log('执行 create')
    })

program
    .command('hidden-create', { hidden: true })
    .description('不会显示在帮助信息中')
    .action(() => {
        console.log('执行 hidden create')
    })

program
    .command('hidden-default', { hidden: true, isDefault: true })
    .description('不会显示在帮助信息中, 且默认执行这个命令')
    .option('-p --port <port>', '端口', 80)
    .action(async (option) => {
        console.log('执行 hidden default, port is', option.port)
        await new Promise(resolve => {
            console.log('正在执行 hidden default...')
            setTimeout(() => {
                resolve(true)
            }, 3000)
        })
        console.log('执行 hidden default 完毕')
    })

program.parseAsync()