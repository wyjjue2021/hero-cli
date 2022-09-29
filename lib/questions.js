/*
 * @Author: 吴俊杰 20717@etransfar.com
 * @Date: 2022-09-28 18:30:25
 * @LastEditors: 吴俊杰 20717@etransfar.com
 * @LastEditTime: 2022-09-29 10:17:07
 * @FilePath: /个人工作/hero-cli/bin/inquirer.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { templateList } = require("../util/index");

let info = [
    {
        name:'name',
        type:'input',
        message:'请输入项目名称(默认：hero-app)',
        default:'hero-app',
    },
    {
        name:'version',
        type:'input',
        message:'请输入项目版本(默认：1.0.0)',
        default:'1.0.0',
    },
    {
        name:'auth',
        type:'input',
        message:'请输入作者(默认：hero)',
        default:'hero',
    },
]

let selectTemplate = [
    {
        name:'templateUrl',
        type:'list',
        message: '新选择下载项目：',
        choices:templateList
    }
];

let createCover =  {
    name:'isCover',
    type:'list',
    message: '目标文件目录已经存在，是否替换：',
    choices:[
        {name:'替换当前目录',value:1},
        {name:'取消操作',value:0}
    ]
}


module.exports = {
    info,
    selectTemplate,
    createCover
}
