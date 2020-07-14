echo off
cd ./../dist
git init
git add -A
git commit -m "no message"
git remote add origin https://e.coding.net/canknow/product-traceability-mobile-dist.git
git push -f origin master
pause
