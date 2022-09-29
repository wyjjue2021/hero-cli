/*
 * @Author: 吴俊杰 20717@etransfar.com
 * @Date: 2022-09-14 10:02:13
 * @LastEditors: 吴俊杰 20717@etransfar.com
 * @LastEditTime: 2022-09-29 10:22:15
 * @FilePath: /个人工作/w-cli/lib/create.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const path = require('path')
const extra = require('fs-extra')
const fs = require('fs')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const { warpLoading } = require("../util/index");
const questions =  require('../lib/questions')
const { objectToString } = require("../util/index");

const fetchDownload = async (name,templateUrl,options) => {
    const task = new Promise(resolve => {
        download(templateUrl, name, function (err) {
            if (err) {
                console.log('下载失败：', err);
                process.exit();
            } else {
                const package = path.join(process.cwd(), `/${name}/package.json`)
                setPackage(package,options)
                // console.log('success!')
                resolve()
            }
        });
    });
   await warpLoading(task, '下载中。。')
}
const setPackage = (file,options) => {
    fs.readFile(file,'utf-8',function (err, data) {
        if (err) {
        } else {
            let fileContent = JSON.parse(data)
            Object.keys(options).forEach(key => {
                fileContent[key] = options[key]
            })
            fs.writeFile(file, JSON.stringify(fileContent,null, "\t"),function(){
                if (err) {}
            })
        }
    })
}

const Create = async (name, templateUrl, options) => {
    // console.log(options, 'options')
    const dir = path.join(process.cwd(), `/${name}`)
    if(extra.existsSync(dir)){
        if (options.force) {
            await extra.remove(dir)
            return
        }
        const isCover = await inquirer.prompt(
            questions.createCover
        )
        if(!isCover) return
        await extra.remove(dir)
    }
    await fetchDownload(name,templateUrl,options)
}

module.exports = Create