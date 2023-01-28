const fs = require('fs');
const ftp = require('ftp');
const path = require('path');

const client = new ftp();
client.on('ready', () => {
    console.log('ftp client is ready');
    test();
});
client.on('close',()=>{
    console.log('ftp client has close')
});
client.on('end',()=>{
    console.log('ftp client has end')
});
client.on('error',(err)=>{
    console.log('ftp client has an error : '+ JSON.stringify(err))
});
client.connect({
    host: '77.74.54.201',
    port: '21',
    user: 'jiacai',
    password: 'jiacai',
    keepalive: 1000
});

// 查询文件列表
function list(dirpath) {
    return new Promise((resolve, reject) => {
        client.list((err, files) => {
            resolve({
                err: err,
                files: files
            });
        })
    });
}

//将文件上传到ftp目标地址
async function put(currentFile,targetFilePath){
    const dirPath = path.dirname(targetFilePath);
    const fileName = path.basename(targetFilePath);
    const rs = fs.createReadStream(currentFile);
    let {err : ea,dir} = await cwd(dirPath);//此处应对err做处理
    if(ea){
        return Promise.resolve({err : ea});
    }
    return new Promise((resolve,reject)=>{
        client.put(rs,fileName,(err)=>{
            resolve({err : err});
        })
    });
}
//切换目录
function cwd(dirpath){
    return new Promise((resolve,reject)=>{
        client.cwd(dirpath,(err,dir)=>{
            resolve({err : err,dir : dir});
        })
    });
}
//下载文件
async function get(filePath){
    const dirPath = path.dirname(filePath);
    const fileName = path.basename(filePath);
    let {err : ea,dir} = await cwd(dirPath);
    return new Promise((resolve,reject)=>{
        client.get(fileName,(err,rs)=>{
            let ws = fs.createWriteStream(fileName);
            rs.pipe(ws);
            resolve({err : err});
        });
    });
}

//获取所有文件列表
async function test() {
    let {
        err,
        files
    } = await list();
    if (err) {
        console.log(err);
        return
    }
    console.log(`获得文件列表:` + files.length);
    console.log(files);
    //文件上传
    let {err : eb} = await put('index.html', '/index.html');
    if(eb){
        console.log(eb);
        return;
    }
    console.log('文件上传成功')
    client.end();
}