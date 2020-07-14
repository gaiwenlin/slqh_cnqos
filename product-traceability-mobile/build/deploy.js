var child_process=require("child_process");
child_process.execFile(process.cwd() + '\\build\\deploy.bat', function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
