const FtpDeploy = require("ftp-deploy");
const packageJson = require('./package.json');
const ftpDeploy = new FtpDeploy();

var config = {
    user: "jiacai",
    password: "jiacai",
    host: "77.74.54.201",
    port: 21,
    localRoot: "./test",
    remoteRoot: packageJson.version,
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