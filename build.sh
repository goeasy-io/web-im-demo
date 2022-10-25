#!/bin/bash
# 开启错误退出
set -e

if [ "$1" ]; then
    ACTION=$1
fi

config_appkey=${APPKEY}
git_usernamne=${GIT_USER}
git_password=${GIT_PASS}
git_email=${GIT_EMAIL}

# 获取当前版本并创建目录
confirm_version() {

    originBranch=$(git rev-parse --abbrev-ref HEAD)

    if [ "$ACTION" = "r" ]; then
        # release 版本
        cd h5
        currentVersion=$(npm version patch --no-git-tag-version)
        vesionDir=${currentVersion:1}
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

    elif [ "$ACTION" = "b" ]; then
        # build 版本
        cd h5
        currentVersion=$(npm run env | grep npm_package_version | cut -d '=' -f 2)
        vesionDir=$currentVersion
    else
        # 本地开发 版本
        cd h5
        currentVersion=$(npm run env | grep npm_package_version | cut -d '=' -f 2)
        vesionDir="show-im/"$currentVersion
    fi
    # 退回根目录
    cd ../
    echo "version confirmed:$currentVersion"

}

# 获取当前版本并创建目录
make_build_folder() {

    # 创建版本目录
    if [ -d "build" ]; then
        rm -rf build
    fi
    mkdir -p build/$vesionDir

    echo "made dir: build/$vesionDir"
}
# 构建web服务
build_web() {
    cd h5
    npm install
    npm run build --appkey=$config_appkey
    mv dist ../build/$vesionDir/agent
    cd ../
}

# 构建custiner服务
build_customer() {
    cd uniapp
    npm install
    npm run build -- --appkey=$config_appkey
    mv dist/build/h5 ../build/$vesionDir/customer
    rm -rf dist
    cd ../
}

# 拷贝inde.html
copy_html() {
    cp index.html build/$vesionDir/index.html
}

# 升级web服务的版本
upgrade_versions() {
    if [ "$ACTION" = "r" ]; then
        git checkout -f $originBranch
    fi
    cd h5
    nextVersion=$(npm version prerelease --no-git-tag-version)
    git add .
    cd ../uniapp
    nextVersion=$(npm version prerelease --no-git-tag-version)
    node correctManifestVersion.js
    git add .
    # 设置信息
    git config user.name "${git_usernamne}"
    git config user.password "${git_password}"
    git config user.email "${git_email}"
    # 推送
    git commit -m "[CI-build.sh] 将版本号升级为：$nextVersion，为下个版本做准备"
    git push -u origin $originBranch

    echo "$currentVersion is build, next version $nextVersion"

}

# 推送至show-im
deploy() {
    if [ -d "show-im" ]; then
        rm -rf show-im
    fi
    git clone https://${git_usernamne}:${git_password}@gitee.com/goeasy-io/show-im.git
    # 清除老数据
    if [ -d "show-im/$vesionDir" ]; then
        rm -rf show-im/$vesionDir
    fi
    # 移动版本目录
    mv build/$vesionDir show-im/

    # 切换仓库
    cd show-im
    # 设置信息
    git config user.name "${git_usernamne}"
    git config user.password "${git_password}"
    git config user.email "${git_email}"
    # 标记推送
    git add $vesionDir
    git commit -m "[CD-build.sh]将$vesionDir部署到pages"
    git push
    # 退出当前目录
    cd ../
}

# 清理本地目录
clear_file() {
    rm -rf show-im
    rm -rf build
    rm -rf uniapp/node_modules
    rm -rf h5/node_modules
}

confirm_version
make_build_folder
build_web
build_customer
copy_html
if [ "$ACTION" != "" ]; then
    deploy
    clear_file
    upgrade_versions
else
    # 启动静态页面服务
    cd build
    http-server .
fi
