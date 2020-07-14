#!/usr/bin/env sh

# 确保脚本抛出遇到的错误。你写的每个脚本都应该在文件开头加上set -e,这句语句告诉bash如果任何语句的执行结果不是true则应该退出。
set -e

# 生成静态文件
npm run bootstrap
npm run build

# 进入生成的文件夹
cd dist

git config --global user.email "3230525823@qq.com"
git config --global user.name "Canknow"
git init
git add -A
git commit -m 'deploy'
git remote add origin https://canknow:lianhubo131314@gitee.com/canknow/application_manage_template_dev.git
git push -f origin master

cd -
