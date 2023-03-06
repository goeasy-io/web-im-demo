#!/bin/bash
# 开启错误退出
set -e

publish_live_version () {
    dir=dist
    mkdir $dir
    cp -f index.html $dir
    cp -f phone.png $dir
    cp -f topbar.png $dir
    sed -i "s/src=\"uniapp\/\"/src=\"\/show-im\/${version}\/uniapp\/\"/" $dir/index.html
    sed -i "s/src=\"web\/\"/src=\"\/show-im\/${version}\/web\/\"/" $dir/index.html

    npm ci
    node ftp-upload.js $ftp_host $ftp_username $ftp_password
    echo "successfully deploy ${version}"
}

clear_useless_dir() {
    rm -rf dist
    rm -rf node_modules
}

ftp_host=${FTP_HOST}
ftp_username=${FTP_USER}
ftp_password=${FTP_PASS}
version=${latest_version}
if [[ ${version} = "" ]]; then
    echo "version is not undefined"
else
    publish_live_version
    clear_useless_dir
fi
