#!/bin/bash
# 开启错误退出
set -e

action=${ACTION}
config_appkey=${APPKEY}
ftp_host=${FTP_HOST}
ftp_username=${FTP_USER}
ftp_password=${FTP_PASS}
ftp_compressed=${FTP_UPLOAD_COMPRESSED}
echo "action: $action"
echo "config_appkey: $config_appkey"
echo "ftp_host: $ftp_host"
echo "ftp_username: $ftp_username"
echo "ftp_password: $ftp_password"
echo "ftp_compressed: $ftp_compressed"

# 获取当前版本并创建目录
confirm_version() {
    echo "----------start execute confirm_version----------"
    originBranch=$(git rev-parse --abbrev-ref HEAD)

    if [ "$action" = "r" ]; then
        # release 版本
        cd web
        currentVersion=$(npm version patch --no-git-tag-version)
        versionDir=${currentVersion:1}
        git add .

        cd ../uniapp
        npm version patch --no-git-tag-version
        node correctManifestVersion.js
        git add .

        git commit -m "[CI-build.sh]版本号修改为：$currentVersion, 准备生成release的tag"
        git push origin $originBranch
        # 打tag，推送并切分支
        git tag $currentVersion
        git push origin $currentVersion
        git checkout $currentVersion

    elif [ "$action" = "b" ]; then
        # build 版本
        cd web
        currentVersion=$(npm run env | grep npm_package_version | cut -d '=' -f 2)
        versionDir=$currentVersion
    else
        # 本地开发 版本
        cd web
        currentVersion=$(npm run env | grep npm_package_version | cut -d '=' -f 2)
        versionDir="show-im/"$currentVersion
    fi
    # 退回根目录
    cd ../
    echo "version confirmed:$currentVersion"
    echo "----------end execute confirm_version----------"
}

# 获取当前版本并创建目录
make_build_folder() {
    echo "----------start execute make_build_folder----------"
    # 创建版本目录
    if [ -d "build" ]; then
        rm -rf build
    fi
    mkdir -p build/$versionDir

    echo "made dir: build/$versionDir"
    echo "----------end execute make_build_folder----------"
}
# 构建web服务
build_web() {
    echo "----------start execute build_web----------"
    cd web
    npm ci
    npm run build --appkey=$config_appkey
    mv dist ../build/$versionDir/web
    cd ../
    echo "----------end execute build_web----------"
}

# 构建custiner服务
build_uniapp() {
    echo "----------start execute build_uniapp----------"
    cd uniapp
    npm ci
    npm run build -- --appkey=$config_appkey
    mv dist/build/h5 ../build/$versionDir/uniapp
    rm -rf dist
    cd ../
    echo "----------end execute build_uniapp----------"
}

# 拷贝index.html
copy_html() {
    echo "----------start execute copy_html----------"
    cp index.html build/$versionDir/index.html
    # 替换index.html中的路径
    basePath="\/show-im\/$versionDir"
    uniappPath=src\=$basePath\\/uniapp\\/
    webPath=src\=$basePath\\/web\\/
    sed -i "s/src\=\"uniapp\/\"/$uniappPath/g" build/$versionDir/index.html
    sed -i "s/src\=\"web\/\"/$webPath/g" build/$versionDir/index.html
    echo "----------end execute copy_html----------"
}

# 升级web服务的版本
upgrade_versions() {
    echo "----------start execute upgrade_versions----------"
    if [ "$action" = "r" ]; then
        git checkout -f $originBranch
    fi
    cd web
    nextVersion=$(npm version prerelease --no-git-tag-version)
    git add .
    cd ../uniapp
    nextVersion=$(npm version prerelease --no-git-tag-version)
    node correctManifestVersion.js
    git add .
    # 推送
    git commit -m "[CI-build.sh] 将版本号升级为：$nextVersion，为下个版本做准备"
    git push -u origin $originBranch

    echo "$currentVersion is build, next version $nextVersion"
    echo "----------end execute upgrade_versions----------"
}

# 提交压缩文件或非压缩文件到ftp服务器
publish_ftp_server() {
    npm ci
    if [ "$ftp_compressed" = true ] ; then
        echo "ftp upload compressed files"
        mkdir $versionDir
        cp -rf ./build/$versionDir/** ./$versionDir/
        mkdir dist
        tar -czvf ./dist/$versionDir.tar.gz ./$versionDir
        node ftp-upload.js $ftp_host $ftp_username $ftp_password
	      rm -rf dist
        rm -rf $versionDir
        rm -rf node_modules
    else
        echo 'ftp upload uncompressed files'
        mkdir dist
	      cp -rf ./build/$versionDir/ ./dist/
        node ftp-upload.js $ftp_host $ftp_username $ftp_password
        rm -rf dist
        rm -rf node_modules
    fi
}

# 清理本地目录
clear_file() {
    echo "----------start execute clear_file----------"
    rm -rf show-im
    rm -rf build
    rm -rf uniapp/node_modules
    rm -rf web/node_modules
    echo "----------end execute clear_file----------"
}

confirm_version
make_build_folder
build_web
build_uniapp
copy_html
if [ "$action" = "" ]; then
    # 启动静态页面服务
    cd build
    http-server .
else
    publish_ftp_server
    clear_file
    upgrade_versions
fi
