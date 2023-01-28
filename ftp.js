const FtpDeploy = require("ftp-deploy");
const packageJson = require('./package.json');
const ftpDeploy = new FtpDeploy();

var config = {
    user: "hyu7385950001",
    password: "Uwant123",
    host: "hyu7385950001.my3w.com",
    port: 21,
    localRoot: "./test",
    remoteRoot: "/htdocs/docs/" + packageJson.version,
    include: ["*", "**/*"],
    deleteRemote: true,
    forcePasv: true,
    sftp: false
};

ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));

ftpDeploy.on("uploading", function(data) {
    console.log('uploading - ', data.filename);
});