const { program } = require('commander')

program
    .name('custom-name')
    .usage('[global options] command')
    .description('这是命令描述')
    .helpOption('-e --H', '描述: 覆写帮助选项为 -e --H')

program
    .command('test')
    .option('-p')
    .action(() => {
        console.log('enter action')
    })
    .help()



console.log(program.helpInformation())

program.parse()