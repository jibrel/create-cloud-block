'use strict';

const packageJson = require('../package.json');

const chalk = require('chalk');
const commander = require('commander');
const fs = require('fs-extra');
const path = require('path');


let projectName;

const program = new commander.Command(packageJson.name)
.version(packageJson.version)
.arguments('<project-directory>')
.usage(`${chalk.green('<project-directory>')} [options]`)
.action(name => {
  projectName = name;
})
.allowUnknownOption()
.on('--help', () => {
  console.log(`  Only ${chalk.green('<project-directory>')} is required.`);
  console.log();
})
.parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-block')}`);
  console.log();
  console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
  process.exit(1);
}



// 1. Create the directory

const root = path.resolve(projectName);
const appName = path.basename(root);
const base = path.resolve('./examples/1-simple-block');

// TODO: Check and validate the appName


// 1.1 Create the directory
fs.ensureDir(root);

console.log(`Creating a new Cloud Block in ${chalk.green(root)}.`);


// 1.2 Copy files from the example
console.log(`Copying files...`);

fs.copySync(base, root);


// 1.3 Rename the project files
console.log(`Renaming the project to ${appName}`);


console.log(chalk.green('Done!'));
