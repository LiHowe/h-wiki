---
categories:
  - frontend
  - architecture
  - webpack
titleSlug: ''
title: 语义化版本
series: 工程化
thumbnail: ''
description: 暂无
wip: true
top: false
---
# 语义化版本(semver)
## 说明
版本号规范: X.Y.Z-P

X: 主版本号, 非兼容性的修改

Y: 次版本号, 兼容的新功能之类的修改

Z: 修订号, bug修复之类的修改

P: 先行版本号, 可选



## 命名规则
* 主版本为0表示软件处于开发初始阶段
* 1.0.0版本用来界定公共API的形成(即正式版界限)
* 主版本号提升的时候需要将其他版本号归零
* 版本号后面可以接一串先行版本号(P)
   * alpha: 内部测试版, 如 1.0.0-alpha.1
   * beta: 公开测试版, 如 1.0.0-beta.1
   * rc: 候选版本, 如 1.0.0-rc.1
   * stable: 稳定版, 如:1.0.0



## package.json版本说明
常见的 `package.json` 中的版本修饰符有 `~` , `^` , 其各自的意义为

* `~` : 修订版本约束
* `^` : 次版本约束

若无修饰符则指定精确版本进行安装

#### 例子
* "\~1.2.3": 表示版本范围为 \[1.2.3, 1.3.0), 允许依赖问题版本修复, 不升级至新功能版本
* "^1.2.3": 表示版本范围为 \[1.2.3, 2.0.0), 允许兼容版本但不升级至大版本

## node-semver
用来语义化版本判断、操作的库

[官网](https://www.npmjs.com/package/semver)

### 安装
```bash
npm install semver
```
### 使用
版本号需要符合语义化版本的规范 `x.y.z-patch`

#### 取值与操作
* `valid(version: string): string | null` 
验证版本号是否符合规范，如果不合规返回`null`

```javascript
const semver = require('semver')

console.log(semver.valid('1.2.3')) // -> 1.2.3
console.log(semver.valid('1.2.3-beta.1')) // -> 1.2.3-beta.1
console.log(semver.valid('1.2')) // -> null
```
* `inc(version: string, release: string): string` 
返回根据`release` 类型增加的版本号
   * `release` : 版本类型
      * `major` ：主版本
      * `premajor` ：主版本预览版
      * `minor` ：次版本
      * `preminor` ： 次版本预览版
      * `patch` ： 补丁版
      * `prepatch` ：补丁版预览版
      * `prerelease` ：先行版（非先行版调用等同于`prepatch`）

```javascript
let version = '1.0.0-alpha.1'
console.log(semver.inc(version, 'major'))        // 1.0.0
console.log(semver.inc(version, 'premajor'))     // 2.0.0-0
console.log(semver.inc(version, 'minor'))        // 1.0.0
console.log(semver.inc(version, 'preminor'))     // 1.1.0-0
console.log(semver.inc(version, 'patch'))        // 1.0.0
console.log(semver.inc(version, 'prepatch'))     // 1.0.1-0
console.log(semver.inc(version, 'prerelease'))   // 1.0.0-alpha.2

version = '1.0.0'
// 再次调用就不写了, 直接写对应结果
// major -> 2.0.0
// premajor -> 2.0.0-0
// minor -> 1.1.0
// preminor -> 1.1.0-0
// patch -> 1.0.1
// prepatch -> 1.0.1-0
// prerelease -> 1.0.1-0

```
* `prelease(version: string)` : 返回先行版版本数组
* `major(version: string)` ：返回版本主版本号
* `minor(version: string)` ：返回版本次版本号
* `patch(version: string)` ：返回版本修订号

```javascript
const version = '1.0.0-rc.1'
console.log(semver.major(version)) // 1
console.log(semver.minor(version)) // 0
console.log(semver.patch(version)) // 0
console.log(semver.prerelease(version)) // [ 'rc', 1 ]

```
* `intersects(range1: string, range2: string, loose: boolean): boolean` 
判断两个版本区间是否相交

```javascript
console.log(semver.intersects('~1.2.3', '^1.2.8'))
// true | [1.2.3, 1.3.0) 与 [1.2.8, 2.0.0) 区间有交集
console.log(semver.intersects('>1.0.0', '^1.0.0'))
// true | [1.0.0, infinity) 与 [1.0.0, 1.2.0) 有交集
console.log(semver.intersects('<=1.1.0', '~1.0.0'))
// true | [0.0.0, 1.1.0] 与 [1.0.0, 2.0.0) 有交集
```
* `parse(version: string): object` 
将版本号转换为SemVer对象

```javascript
const version = '1.0.0-alpha.1'
semver.parse(version)
/*
{
  "options": {},
  "loose": false,
  "includePrerelease": false,
  "raw": "1.0.0-alpha.1",
  "major": 1,
  "minor": 0,
  "patch": 0,
  "prerelease": [
    "alpha",
    1
  ],
  "build": [],
  "version": "1.0.0-alpha.1"
}
*/
```
#### 版本比较
* `gt(v1, v2)`: `v1 > v2`
* `gte(v1, v2)`: `v1 >= v2`
* `lt(v1, v2)`: `v1 < v2`
* `lte(v1, v2)`: `v1 <= v2`
* `eq(v1, v2)`: `v1 == v2` This is true if they're logically equivalent, even if they're not the exact same string. You already know how to compare strings.
* `neq(v1, v2)`: `v1 != v2` The opposite of `eq`.
* `cmp(v1, comparator, v2)`: Pass in a comparison string, and it'll call the corresponding function above. `"==="` and `"!=="` do simple string comparison, but are included for completeness. Throws if an invalid comparison string is provided.
* `compare(v1, v2)`: Return `0` if `v1 == v2`, or `1` if `v1` is greater, or `-1` if `v2` is greater. Sorts in ascending order if passed to `Array.sort()`.
* `rcompare(v1, v2)`: The reverse of compare. Sorts an array of versions in descending order when passed to `Array.sort()`.
* `compareBuild(v1, v2)`: The same as `compare` but considers `build` when two versions are equal. Sorts in ascending order if passed to `Array.sort()`. `v2` is greater. Sorts in ascending order if passed to `Array.sort()`.
* `diff(v1, v2)`: Returns difference between two versions by the release type (`major`, `premajor`, `minor`, `preminor`, `patch`, `prepatch`, or `prerelease`), or null if the versions are the same.



#### 版本区间
* `validRange(range)`
* `satisfies(version, range)`:
* `maxSatisfying(versions, range)`:

* `minSatisfying(versions, range)`: Return the lowest version in the list that satisfies the range, or `null` if none of them do.
* `minVersion(range)`: Return the lowest version that can possibly match the given range.
* `gtr(version, range)`: Return `true` if version is greater than all the versions possible in the range.
* `ltr(version, range)`: Return `true` if version is less than all the versions possible in the range.
* `outside(version, range, hilo)`: Return true if the version is outside the bounds of the range in either the high or low direction. The `hilo` argument must be either the string `'>'` or `'<'`. (This is the function called by `gtr` and `ltr`.)
* `intersects(range)`: Return true if any of the ranges comparators intersect
* `simplifyRange(versions, range)`: Return a "simplified" range that matches the same items in `versions` list as the range specified. Note that it does *not* guarantee that it would match the same versions in all cases, only for the set of versions provided. This is useful when generating ranges by joining together multiple versions with `||` programmatically, to provide the user with something a bit more ergonomic. If the provided range is shorter in string-length than the generated range, then that is returned.
* `subset(subRange, superRange)`: Return `true` if the `subRange` range is entirely contained by the `superRange` range.



#### 工具
* `clean(string)` : Clean a string to be a valid semver if possible
* `coerce(version, opts)` : Coerces a string to semver if possible
