---
title: DockerFile
series: Docker
description: DockerFile的使用
titleSlug: docker-file
categories:
	- Docker
wip: true
top: false
---
# DockerFile

DockerFile 是用来定制 Docker 镜像每一层配置的脚本文件， 其中包含了一条条的 `指令`

文件名为 `Dockerfile`

使用 `#` 在 `Dockerfile` 中添加注释

## 指令

> 指令全部为大写
>
> `<>` 代表必须参数
>
> `[]` 代表可选参数

### FROM - 基础镜像

Dockerfile文件的第一条指令，用来**指定基础镜像**

`FROM <imagename>`

> Docker 有一个特殊的虚拟镜像(空白镜像): `scratch` 
> 如果使用 `scratch` 作为基础镜像， 则表明你所构建的镜像不以任何镜像为基础
>

例: `FROM node:12`

### RUN - 执行命令

用来**执行命令行命令**， 有两种书写方式

- `RUN <command>`
- `RUN <[command, arg1, arg2, ...]>`

> 多个命令应该放到一个 `RUN` 下进行执行。（这样Docker只创建了一层， 而非每个命令一层）
>

例:

**反例**, 每个命令对应一个RUN

```docker
FROM debian:stretch

RUN apt-get update
RUN apt-get install -y gcc libc6-dev make wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN mkdir -p /usr/src/redis
RUN tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1
RUN make -C /usr/src/redis
RUN make -C /usr/src/redis install
```

**推荐写法**, 使用 `\` 和 `&&` 来分隔多条命令

```docker
FROM debian:stretch

RUN apt-get update \
    && apt-get install -y $buildDeps \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && mkdir -p /usr/src/redis \
    && tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
    && make -C /usr/src/redis \
    && make -C /usr/src/redis install \
    && rm -rf /var/lib/apt/lists/* \
    && rm redis.tar.gz \
    && rm -r /usr/src/redis \
    && apt-get purge -y --auto-remove $buildDeps
```

> 在执行了安装命令或下载命令后， 记得清除之前步骤下载的无用的包，避免镜像过于臃肿
>

### WORKDIR - 工作目录

表明指令工作的上下文目录

### COPY - 复制文件

将源路径文件拷贝到目标文件路径

`COPY <sourcePath> <targetPath>`

- `sourcePath` : 待拷贝文件目录, 可以是单个文件路径, 也可以是文件通配符
- `targetPath` : 目标路径可以是容器内的绝对路径, 也可以是相对于工作目录(`WORKDIR`)的相对路径

文件通配符如: `package*.json` , `src/*.js` 等

> 通配符用法参考 [path/filepath](https://pkg.go.dev/path/filepath#Match)
>

> 注意: COPY指令会将源文件的元数据保留(权限, 变更时间等)
> 可以使用 `--chown=<user>:<group>` 来改变文件所属
>

### ADD - 复制文件

被视作为高级版的COPY, 在COPY的基础上添加了一些功能。

比如: 

`ADD <url> <targetPath>` 可以下载远程文件放到目标路径 , 权限将自动设置为 600 (`-rw`)

```
文件权限：读: r=4, 写: w=2, 执行: x=1
-rw------- (600) 只有拥有者有读写权限。
-rw-r--r-- (644) 只有拥有者有读写权限；而属组用户和其他用户只有读权限。
-rwx------ (700) 只有拥有者有读、写、执行权限。
-rwxr-xr-x (755) 拥有者有读、写、执行权限；而属组用户和其他用户只有读、执行权限。
-rwx--x--x (711) 拥有者有读、写、执行权限；而属组用户和其他用户只有执行权限。
-rw-rw-rw- (666) 所有用户都有文件读、写权限。
-rwxrwxrwx (777) 所有用户都有读、写、执行权限
```

### CMD - 启动命令

指定容器主线程启动命令, 命令形式与RUN类似

- `CMD <command>`
- `CMD <[command, arg1, arg2, ...]>`

实质上CMD命令会被包装为 `sh -c` 的形式进行调用

`CMD echo $HOME` 实质为 `CMD ["sh", "-c", "echo $HOME"]`

### ENTRYPOINT - 入口点

当指定了 `ENTRYPOINT` 之后, `CMD` 的作用就变成了 **作为参数传递给** `ENTRYPOINT` 了

解决了以下场景问题:

1. CMD 无法在运行时补充参数的问题

比如我们定义CMD为 `CMD ["npm", "run"]`

在我们构建并运行该镜像的时候使用 `docker run xxx`

如果我们需要将启动命令改为 `npm run dev` , 那么直接使用 `docker run xxx dev` 是会报错的。

所以我们要将 CMD 改为 ENTRYPOINT

`ENTRYPOINT ["npm", "run"]`

然后运行镜像 `docker run xxx dev` 即可成功运行

1. 应用运行前的准备工作

因为CMD可以在运行时覆盖， 所以镜像的一些通用的脚本（比如环境准备等）可以使用 `ENTRYPOINT` 进行调用

```docker
ENTRYPOINT ["prepare.sh"]
EXPOSE 8080
CMD ["run"]
```

### ENV - 设置环境变量

用于定义其他指令可以使用的变量

`ENV <key> <value>`

`ENV <key1>=<value1> <key2>=<value2>...`

在其他指令中使用

```docker
ENV NODE_VERSION 12.0.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz"
```

### AGE - 构建参数

`AGE <参数>[=<默认值>]`

- 使用`AGE`所定义参数不会存在于容器运行时
- `AGE`定义的参数在使用后即失效

在构建时可以使用 `docker build --build-arg <参数名>=<值>` 来覆盖

### VOLUME - 定义匿名卷

- `VOLUME ["<路径1>", "<路径2>"...]`
- `VOLUME <路径>`

## 构建

### 本地构建

我们使用 `docker build [options] <contextPath>` 来使用 `contextPath` 下的 `Dockerfile` 进行镜像构建

- contextPath: 上下文路径, docker运行指令的上下文目录

可以使用 `-f <dockerfilepath>` 来指定 `Dockerfile`

> Docker在运行时分为 Docker引擎(守护进程:Docker Daemon) 和 客户端工具
>

如: `docker build -t demo .`

### 使用Git repo构建

### 使用tar压缩包构建

- 远程压缩包
  
    `docker build <tar-url>`
    
- 本地压缩包
  
    `docker build - < <tar-path>`