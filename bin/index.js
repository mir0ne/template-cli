#! /usr/bin/env node

import { Command } from "commander"
import chalk from "chalk"
import * as path from "node:path"
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs';
import { copyFile } from "./file.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const program = new Command()

program
  .name("tianmian-template-cli")
  .description("use template cli to create")
  .version("1.0.0")

program.on('--help', () => {
  console.log(`\r\nRun ${chalk.cyan(`tt <command> --help`)} for detailed useage of given command\r\n`)
})

program
  .command('create <name>')
  .description('create a new project')
  .option('-c, --context [contextPath]', 'welab.contextPath')
  .action((name, params) => {
    const sourceDir = path.resolve(__dirname,'../package','template')
    const targetDir = path.resolve(name)
    const packageJsonPath = path.resolve(targetDir, 'package.json');

    console.log("params", params.context)

    if(!fs.existsSync(targetDir)){
      // 创建目的文件夹
      fs.mkdirSync(targetDir, err => console.log(err));
    }
    // 复制文件夹
    copyFile(sourceDir, targetDir)

    // update package.json
    if(fs.existsSync(packageJsonPath)){
      const file = fs.readFileSync(packageJsonPath, 'utf8')
      const  fileObj = JSON.parse(file);

      fileObj.name = name;

      fs.writeFileSync(packageJsonPath, JSON.stringify(fileObj, null, 2))

    }

    console.log('init success')
    
  })


program.parse()