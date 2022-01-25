const { program, Option } = require('commander')

program
    .addOption(new Option('-s --secret', 'hideHelp -- 不会在命令帮助信息的Options列表中显示').hideHelp())
    .addOption(new Option('-d --delay <delay>', '设置必填参数的默认值').default(60, '一分钟'))
    .addOption(new Option('-m --mode <mode>', '限制输入选项').choices(['normal', 'debug']))
    .action(option => {
        console.log(option)
    })

program.parse()

/*
$ node ./bin/option/advanced.js -h

Usage: advanced [options]

Options:
  -d --delay <delay>  设置必填参数的默认值 (default: 一分钟)
  -m --mode <mode>    限制输入选项 (choices: "normal", "debug")
  -h, --help          display help for command
*/

// $ node ./bin/option/advanced.js
// -> { delay: 60 }

// $ node ./bin/option/advanced.js -m n
// -> error: option '-m --mode <mode>' argument 'n' is invalid. Allowed choices are normal, debug.

// $ node ./bin/option/advanced.js -m normal
// -> { delay: 60, mode: 'normal' }