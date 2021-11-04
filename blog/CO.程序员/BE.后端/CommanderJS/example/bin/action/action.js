const { program } = require('commander')

program
  .command('demo')
  .argument('<name>')
  .argument('[age]')
  .option('-t, --title <title>', 'title to use before name')
  .option('-d, --debug', 'display some debugging')
  .action((name, age, options, command) => {
    if (options.debug) {
      console.error('Called %s with options %o', command.name(), options);
    }
    const title = options.title ? `${options.title} ` : '';
    console.log(`Thank-you ${title}${name} ${age}`);
  })

program.parse()