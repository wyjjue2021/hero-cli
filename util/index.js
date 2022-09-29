/*
 * @Author: 吴俊杰 20717@etransfar.com
 * @Date: 2022-09-14 14:35:09
 * @LastEditors: 吴俊杰 20717@etransfar.com
 * @LastEditTime: 2022-09-29 10:16:39
 * @FilePath: /个人工作/w-cli/util/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const createLogger = require('progress-estimator');
const chalk = require('chalk')
const path  = require('path')
function errorColor(str) {
  // 添加 ANSI 转义字符，以将文本输出为红色
  return `\x1b[31m${str}\x1b[0m`;
}

const templateList = [
  {name:'基于next + mobx + 多页签',value: 'wyjjue2021/w-nextjs-app'},
  {name:'React-v18 源码debugger',value: 'wyjjue2021/react-debugger'},
]


let _logger = null;
/**
 * @description: 
 * @param {*} task
 * @param {*} message
 * @param {*} estimate
 * @return {*}
 */
const logger = (task, message, estimate = 1500) => {
  if (!_logger) {
    _logger = createLogger({
      storagePath: path.join(__dirname, '.progress-estimator'),
    });
  }
  return _logger(task, chalk.blue(message), {
    estimate,
  });
};

/**
 * @description: 
 * @param {*} task
 * @param {*} message
 * @param {*} estimate
 * @return {*}
 */
const warpLoading = async (task, message, estimate) => {
    const startTime = Date.now();
    await logger(task, message,estimate);
    const endTime = Date.now();
    const time = ((endTime - startTime) / 1000).toFixed(2);
    console.log()
    console.log(chalk.green(`✨ Done in ${time}s`));
}

/**
 * @description: 
 * @param {*} obj
 * @return {*}
 */
function objectToString(obj) {
  const objJson = JSON.stringify(obj, null, "\t")
  const strArr = objJson.split(/\r\n|\n|\r/gm).map(item => {
    return item.replace(/"/, "").replace(/\"\:/, ":")
  })
  const objStr = strArr.join("\r\n")
  return objStr
}




module.exports = {
  errorColor,
  warpLoading,
  templateList,
  objectToString
};


