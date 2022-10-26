// 运行 npm run serve --appkey=BC-xxxxxxx

let argv = process.env.npm_config_argv;
if (argv) {
    argv = JSON.parse(argv);
    const cooked = argv.cooked;
    const length = argv.cooked.length;
    if (!process.env.VUE_APP_APPKEY) {
        process.env.VUE_APP_APPKEY = cooked[length - 1]
    }
}
const config = require('./package.json');
module.exports = {
  lintOnSave : false,
  publicPath: `/show-im/${config.version}/web`,
  //只有Https才能使用录音
  devServer : {
    https : true,
    port : 9004
  },
  productionSourceMap: false
}
