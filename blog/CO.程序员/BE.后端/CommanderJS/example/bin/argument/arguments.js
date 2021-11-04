const { program, Argument } = require('commander')

program
    .command('test1 <name> [age]')
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })

program
    .command('test2 [age]')
    .argument('<name>', '名字')
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })

program
    .command('test3')
    .argument('<name>', '名字')
    .argument('[age]', '年龄', '18')
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })

program
    .command('test4')
    .arguments('<name> [age]')
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })

program
    .command('test5')
    .argument('<args...>')
    .action((args) => {
        console.log('多参数,分别是:', )
        args.forEach(arg => {
            console.log(arg)
        })
    })

program
    .command('test6')
    .argument('[args...]')
    .action((args) => {
        console.log('多参数,分别是:', )
        args.forEach(arg => {
            console.log(arg)
        })
    })


program
    .command('test7')
    .addArgument(new Argument('<name>', '名字').choices(['li', 'howe', 'lihowe']))
    .addArgument(new Argument('[age]', '年龄').default(18, '年年18岁'))
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })
    
const args = []
program
    .command('test8')
    .argument('[args...]', '多参数', (value) => {
        console.log('处理器接收值为:', value)
        args.push(value)
        return args
    },['arg1', 'arg2'])
    .action((args) => {
        console.log('多参数,分别是:')
        args.forEach(item => {
            console.log(item)
        })
    })


program
    .command('test9')
    .argument('[arg]', '单参数', (value) => {
        console.log('处理器接收值为:', value)
        console.log('处理器返回值为:', value + 'suffix')
        return value + 'suffix'
    },'default value')
    .action((arg) => {
        console.log('action接收值为:', arg)
    })

program.parse()