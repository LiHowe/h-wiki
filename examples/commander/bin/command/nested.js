// 嵌套命令
const { program } = require('commander')
const drink = program.command('drink')

drink
	.command('coffee')
	.action(() => {
		console.log('喝咖啡☕️')
	})

drink
	.command('tea')
	.action(() => {
		console.log('喝茶🍵')
	})

drink.parse()