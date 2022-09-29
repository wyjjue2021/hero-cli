#! node
const { program } = require("commander");
const chalk = require("chalk");
const { errorColor, templateList } = require("../util/index");
const inquirer = require("inquirer");
const questions = require("../lib/questions");

program.configureOutput({
  // 此处使输出变得容易区分
  writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
  writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
  // 将错误高亮显示
  outputError: (str, write) => write(errorColor(str)),
});

program.showHelpAfterError();

program
  .command("create <app-name>")
  .description("创建一个新项目")
  .option("-f -force", "覆盖目标目录")
  .action(async (value, options) => {
    const info = await inquirer.prompt(questions.info);
    const {templateUrl} = await inquirer.prompt(questions.selectTemplate);

    // CreateLib(value, options)
    require("../lib/create")(value, templateUrl, info);
  });

// 配置版本信息
program
  .allowUnknownOption()
  .version(`v${require("../package.json").version}`)
  .description("使用说明")
  .usage("<command> [option]");

program.on("--help", () => {
  console.log();
  console.log(`可运行 ${chalk.blue("w-cli <command> --help")} 查看详细`);
  console.log();
});

program.parse(process.argv);
