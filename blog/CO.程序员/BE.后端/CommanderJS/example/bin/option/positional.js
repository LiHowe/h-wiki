const { program } = require('commander')

program
  .option('-p --port <port>')
  .action(opt => {
      console.log('program port is', opt.port)
  })

program
  .command('run')
  .option('-p --port <port>')
  .action(opt => {
      console.log('run port is', opt.port)
  })

// program.enablePositionalOptions()

program.parse()