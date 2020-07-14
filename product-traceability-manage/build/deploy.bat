echo off
cd ./../dist
git init
git add -A
git commit -m "no message"
git remote rm origin
git remote add origin https://git.dev.tencent.com/canknow/application-manage-demo.git
git push -f origin master
pause
