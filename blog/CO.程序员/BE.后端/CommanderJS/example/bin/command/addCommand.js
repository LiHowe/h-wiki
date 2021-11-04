const { program } = require('commander')

function eat () {
	const eat = new Command('eat')
	eat
		.command('bread')
		.action(() => {
			console.log('吃面包')
		})

	eat
		.command('noodle')
		.action(() => {
			console.log('吃面条')
		})
	return eat
}

program.addCommand(eat())

program.parse()