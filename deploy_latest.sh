#!/bin/bash
# 开启错误退出
set -e

git_usernamne=${GIT_USER}
git_password=${GIT_PASS}
git_email=${GIT_EMAIL}

if ([ "$1" ])
then
    versionDir=$1
    echo "$versionDir"
else
  echo "required version dir"
  exit 1
fi

# 推送至show-im
if [ -d "show-im" ]; then
    rm -rf show-im
fi
echo "https://${git_usernamne}:${git_password}@gitee.com/goeasy-io/show-im.git"
git clone https://${git_usernamne}:${git_password}@gitee.com/goeasy-io/show-im.git
cd show-im
# 传入的versionDir不存在退出执行
if [ -d $versionDir ]
then
  echo "exist"
else
  echo "version dir not exists"
  exit 1
fi
# 清除老数据
if [ -d "index.html" ]; then
    rm -rf index.html
fi
# 拷贝versionDir下的index.html到根目录index.html
cp $versionDir/index.html index.html
# 设置信息
git config user.name "${git_usernamne}"
git config user.password "${git_password}"
git config user.email "${git_email}"
# 标记推送
git add .
git commit -m "[deploy.sh]将[$versionDir]版本部署到pages"
git push
# 退出当前目录
cd ../
# 清理本地目录
rm -rf show-im