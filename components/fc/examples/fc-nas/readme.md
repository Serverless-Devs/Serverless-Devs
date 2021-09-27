指令
````
<!-- 上传 -->
$ s exec -- nas upload -r -n ./event-code nas:///mnt/auto/folder

<!-- 下载 -->
$ s exec -- nas download -r -n nas:///mnt/auto/folder/. ./folder

<!-- 查看目录 -->
$ s exec -- nas command ls -a nas:///mnt/auto/folder

<!-- 删除指令 -->
$ s exec -- nas command rm -r nas:///mnt/auto/folder

<!-- 上传 -->
$ s exec -- nas upload -r -n ./event-code nas:///mnt/auto1/folder

<!-- 下载 -->
$ s exec -- nas download -r -n nas:///mnt/auto1/folder ./folder

<!-- 查看目录 -->
$ s exec -- nas command ls -a nas:///mnt/auto1/folder

<!-- 删除指令 -->
$ s exec -- nas command rm -r nas:///mnt/auto1/folder
````