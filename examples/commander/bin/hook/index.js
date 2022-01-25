const { program } = require('commander')

program
    .option('-p --port <port>')
    .action(option => {
        console.log('option port is:', option.port)
    })

program
    .command('test')
    .showHelpAfterError('(this is help information after error)')
    
program
    .addHelpText('before', 'this is before help text')
    .addHelpText('beforeAll', 'this is beforeAll help text')
    .addHelpText('after', 'this is after help text')
    .addHelpText('afterAll', 'this is afterAll help text')


program.parse()