const { program } = require('commander')

program
    .argument('<name>')
    .argument('[locations...]', '地址', 'China')
    .action((name, locations) => {
        console.log('location is', locations)
        console.log('name is', name)
    })
//   .allowExcessArguments(false)

program.parse()

// $ node ./bin/argument/excess hangzhou lihowe excess
// -> location is hangzhou
// -> name is lihowe

// $ node ./bin/argument/excess hangzhou lihowe excess
// -> error: too many arguments. Expected 2 arguments but got 3.