const { program } = require('commander')

program
    .option('-d --debug', '空格分隔')
    .option('-a, --all', '逗号分隔')
    .option('-t | --test', '|分隔')
    .option('-p <port>', '接收参数', 80) // 默认值 80
    .option('-B', '只有短名称')
    .option('--save', '只有长名称')
    .action((options) => {
        console.log(options)
    })
    
program.parse()