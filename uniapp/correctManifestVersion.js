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
//
//
// fs.writeFile(filename, JSON.stringify(releasePkgJson, null, 2), function (err) {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log('write package.json success');
//     console.log(filename);
//     console.log(releasePkgJson);
// });
//
// fs.readFile('src/manifest.json',
//     function (err, data) {
//         if (err) {
//             console.error(err);
//         } else {
//             var _data = JSON.parse(data.toString())
//             const version = config.version;
//             _data['versionName'] = version;
//             _data['h5'].publicPath = `/show-im/${version}/h5/`;
//             _data['h5'].router.base = `/show-im/${version}/h5/`;
//
//             _data = JSON.stringify(_data);
//
//
//         }
//     })