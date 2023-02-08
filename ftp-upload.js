const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

let argvs = process.argv.slice(2);
let host = argvs[0];
let username = argvs[1];
let password = argvs[2];

let config = {
    user: username,
    password: password,
    host: host,
    port: 21,
    localRoot: "./dist",
    remoteRoot: "/htdocs/demo/show-im",
    include: ["*", "**/*"],
    deleteRemote: false,
    forcePasv: true,
    sftp: false
};
console.log("config:", config);
ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));

ftpDeploy.on("uploading", function(data) {
    console.log('uploading - ', data.filename);
});
