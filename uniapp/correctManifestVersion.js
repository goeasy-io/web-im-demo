const fs = require('fs');


const packageJSON = require('./package.json');
const manifestJSON = require('./src/manifest.json');

let version = packageJSON.version;
manifestJSON.versionName = version;
manifestJSON.h5.publicPath = `/show-im/${version}/uniapp/`;
manifestJSON.h5.router.base = manifestJSON.h5.publicPath;

fs.writeFile(`${__dirname}/src/manifest.json`, JSON.stringify(manifestJSON, null, 2), {
    encoding: "utf-8"
}, function (err) {
    if (err) {
        console.log('写入versionName失败', err);
    } else {
        console.log('写入versionName成功');
    }
});
