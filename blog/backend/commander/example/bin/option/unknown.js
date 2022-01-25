const { program } = require('commander')

program
  .option('-p --port <port>')
  .action((options) => {
    console.log('options is', options)
  })
  .allowUnknownOption()

program.parse()

// 未开启
// $ node ./bin/option/unknown -a
// error: unknown option '-a'

// 开启
// $ node ./bin/option/unknown -a    
// options is {}