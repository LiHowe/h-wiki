const { program } = require('commander')

program
  .argument('<utility>')
  .argument('[args...]')
  // .passThroughOptions()
  .option('-p --port <port>')
  .action((utility, args, options) => {
    console.log('utility is', utility)
    console.log('args is', args)
    console.log('options is', options)
  })

program.parse()

// passThroughOptions() 
// option只能在头部进行声明, 后面的参数全部作为argument进行解析

// 启用 .passThroughOptions()
// node ./bin/option/passThrough ut ar 12 32 -p 23
// utility is ut
// args is [ 'ar', '12', '32', '-p', '23' ]
// options is {}

// 未启用 .passThroughOptions()
// node ./bin/option/passThrough ut ar 12 32 -p 23
// utility is ut
// args is [ 'ar', '12', '32' ]
// options is { port: '23' }