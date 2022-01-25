---
WIP: true
---



# Jest

Jest `/dʒɛst/` 是一款优雅、简洁的 JavaScript 测试框架。

支持 [Babel](https://babeljs.io/)、[TypeScript](https://www.typescriptlang.org/)、[Node](https://nodejs.org/)、[React](https://reactjs.org/)、[Angular](https://angular.io/)、[Vue](https://vuejs.org/) 等诸多框架！

## 总结

让我们先来看一下总结, 如果需要细致阅读的话可以带着阅读总结时的疑问进行阅读

### 安装

`npm install -D jest` or `yarn add -D jest`

`TypeScript`下安装使用`ts-jest`(`npm install -D ts-jest`)

然后在`jest.config.[ts,js]`文件中设置`preset: 'ts-jest'`

### API

Jest的API都可以直接使用, 无需`import` (当然, 非要`import`也不会报错)

#### Glboals API - 全局API

API功能主要分为三类(*仅依照本人意愿, 不代表官方意见*)

+ 生命周期钩子类
  + `beforeAll`
  + `afterAll`
  + `beforeEach`
  + `afaterEach`
+ 声明测试组类(块) - `describe`
+ 定义测试用例类 - `test`, 别名为`it`, 有`.todo`方法

除钩子函数外, 定义方法按照通用功能分为

+ basic: 方法基础体
+ `.skip`: 注释方法, 用于跳过该方法, 别名前缀为`x`
+ `.only`: 唯一方法, 用于同文件下仅执行该方法, 别名前缀为`f`
+ `.each(table)`: 循环方法

**在保持`.only`与`.skip`不共存的前提下**, Jest的API形式基本上保持

`基础方法体 + [.each, .only, .skip]中的一个或两个`

比如`it.skip(name, fn)`, `it.skip.each(name, fn)`等

详细API列表以及功能可以查看[API说明](#API说明)



### Expect API - 期望API

用于写测试用例时做值匹配而提供的一些方法, 由于方法名起的都比较直观, 就不列举以及特殊说明了.

下面为官网的API列表, 哪里不懂点哪里吧

<details>
<summary>官方Expect API列表</summary>
  <ul class="table-of-contents"><li><a href="#expectvalue"><code>expect(value)</code></a></li><li><a href="#expectextendmatchers"><code>expect.extend(matchers)</code></a></li><li><a href="#expectanything"><code>expect.anything()</code></a></li><li><a href="#expectanyconstructor"><code>expect.any(constructor)</code></a></li><li><a href="#expectarraycontainingarray"><code>expect.arrayContaining(array)</code></a></li><li><a href="#expectassertionsnumber"><code>expect.assertions(number)</code></a></li><li><a href="#expecthasassertions"><code>expect.hasAssertions()</code></a></li><li><a href="#expectnotarraycontainingarray"><code>expect.not.arrayContaining(array)</code></a></li><li><a href="#expectnotobjectcontainingobject"><code>expect.not.objectContaining(object)</code></a></li><li><a href="#expectnotstringcontainingstring"><code>expect.not.stringContaining(string)</code></a></li><li><a href="#expectnotstringmatchingstring--regexp"><code>expect.not.stringMatching(string | regexp)</code></a></li><li><a href="#expectobjectcontainingobject"><code>expect.objectContaining(object)</code></a></li><li><a href="#expectstringcontainingstring"><code>expect.stringContaining(string)</code></a></li><li><a href="#expectstringmatchingstring--regexp"><code>expect.stringMatching(string | regexp)</code></a></li><li><a href="#expectaddsnapshotserializerserializer"><code>expect.addSnapshotSerializer(serializer)</code></a></li><li><a href="#not"><code>.not</code></a></li><li><a href="#resolves"><code>.resolves</code></a></li><li><a href="#rejects"><code>.rejects</code></a></li><li><a href="#tobevalue"><code>.toBe(value)</code></a></li><li><a href="#tohavebeencalled"><code>.toHaveBeenCalled()</code></a></li><li><a href="#tohavebeencalledtimesnumber"><code>.toHaveBeenCalledTimes(number)</code></a></li><li><a href="#tohavebeencalledwitharg1-arg2-"><code>.toHaveBeenCalledWith(arg1, arg2, ...)</code></a></li><li><a href="#tohavebeenlastcalledwitharg1-arg2-"><code>.toHaveBeenLastCalledWith(arg1, arg2, ...)</code></a></li><li><a href="#tohavebeennthcalledwithnthcall-arg1-arg2-"><code>.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)</code></a></li><li><a href="#tohavereturned"><code>.toHaveReturned()</code></a></li><li><a href="#tohavereturnedtimesnumber"><code>.toHaveReturnedTimes(number)</code></a></li><li><a href="#tohavereturnedwithvalue"><code>.toHaveReturnedWith(value)</code></a></li><li><a href="#tohavelastreturnedwithvalue"><code>.toHaveLastReturnedWith(value)</code></a></li><li><a href="#tohaventhreturnedwithnthcall-value"><code>.toHaveNthReturnedWith(nthCall, value)</code></a></li><li><a href="#tohavelengthnumber"><code>.toHaveLength(number)</code></a></li><li><a href="#tohavepropertykeypath-value"><code>.toHaveProperty(keyPath, value?)</code></a></li><li><a href="#tobeclosetonumber-numdigits"><code>.toBeCloseTo(number, numDigits?)</code></a></li><li><a href="#tobedefined"><code>.toBeDefined()</code></a></li><li><a href="#tobefalsy"><code>.toBeFalsy()</code></a></li><li><a href="#tobegreaterthannumber--bigint"><code>.toBeGreaterThan(number | bigint)</code></a></li><li><a href="#tobegreaterthanorequalnumber--bigint"><code>.toBeGreaterThanOrEqual(number | bigint)</code></a></li><li><a href="#tobelessthannumber--bigint"><code>.toBeLessThan(number | bigint)</code></a></li><li><a href="#tobelessthanorequalnumber--bigint"><code>.toBeLessThanOrEqual(number | bigint)</code></a></li><li><a href="#tobeinstanceofclass"><code>.toBeInstanceOf(Class)</code></a></li><li><a href="#tobenull"><code>.toBeNull()</code></a></li><li><a href="#tobetruthy"><code>.toBeTruthy()</code></a></li><li><a href="#tobeundefined"><code>.toBeUndefined()</code></a></li><li><a href="#tobenan"><code>.toBeNaN()</code></a></li><li><a href="#tocontainitem"><code>.toContain(item)</code></a></li><li><a href="#tocontainequalitem"><code>.toContainEqual(item)</code></a></li><li><a href="#toequalvalue"><code>.toEqual(value)</code></a></li><li><a href="#tomatchregexp--string"><code>.toMatch(regexp | string)</code></a></li><li><a href="#tomatchobjectobject"><code>.toMatchObject(object)</code></a></li><li><a href="#tomatchsnapshotpropertymatchers-hint"><code>.toMatchSnapshot(propertyMatchers?, hint?)</code></a></li><li><a href="#tomatchinlinesnapshotpropertymatchers-inlinesnapshot"><code>.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)</code></a></li><li><a href="#tostrictequalvalue"><code>.toStrictEqual(value)</code></a></li><li><a href="#tothrowerror"><code>.toThrow(error?)</code></a></li><li><a href="#tothrowerrormatchingsnapshothint"><code>.toThrowErrorMatchingSnapshot(hint?)</code></a></li><li><a href="#tothrowerrormatchinginlinesnapshotinlinesnapshot"><code>.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)</code></a></li></ul>
</details>

### Mock Functions API - 模拟方法API

Mock方法主要用于模拟一些`jsDom`还未收录的或者当前环境没有的对象或者方法

比如 `fetch` 方法



### 报告指标

在我们执行测试命令之后命令行会输出测试报告表格

```shell
--------------------|---------|----------|---------|---------|---------------------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                          
--------------------|---------|----------|---------|---------|---------------------------------
All files           |    48.2 |      100 |   10.52 |    48.2 |                                                                            
...
```

测试覆盖率指标含义如下

+ `Stmts`: Statement coverage, 声明覆盖率(是否所有的声明都被使用)
+ `Branch`: branch coverage, 分支覆盖率(是否所有的判断都执行了)
+ `Funcs`: Function coverage, 方法覆盖率(是否所有方法都被调用)
+ `Lines`: Line coverage, 代码行覆盖率(是否所有代码都执行了)
+ `Uncovered Line`: 未覆盖到的行号





---



## 基础使用

### 安装

<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn add -D jest
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install -D jest
```

  </CodeGroupItem>
</CodeGroup>



> 有关NPM的使用可以查看[npm的使用](../TE.工程化/npm.md)

### 初始化项目配置文件

```shell
jest --init
```

> 需要全局安装jest `npm install -g jest`

```shell
$ jest --init

The following questions will help Jest to create a suitable configuration for your project
✔ Would you like to use Typescript for the configuration file? … yes
✔ Choose the test environment that will be used for testing › jsdom (browser-like)
✔ Do you want Jest to add coverage reports? … yes
✔ Which provider should be used to instrument code for coverage? › v8
✔ Automatically clear mock calls and instances between every test? … no
```

随后将会在项目根目录下生成`jest.config.ts`(由于第一个问题选`yes`所以是ts文件)



### TypeScript支持

可以使用[`ts-jest`](https://kulshekhar.github.io/ts-jest), 它提供了类型校验

```shell
npm install --save-dev ts-node jest typescript ts-jest @types/jest
```

然后在`jest.config.ts`中添加`preset: 'ts-jest'`

```typescript
export default {
  // ...
  preset: 'ts-jest',
  // ...
}
```

> 有关Babel的相关使用说明可以参考
>
> + [Babel官网](https://babeljs.io/docs/en/)
> + [Babel的使用及配置](./Babel.md)



## 配置

WIP...

## API说明

本段内容基本属于翻译官网, 有英文基础的可以[移步官网](https://jestjs.io/docs/api)直接查看

### 生命周期钩子

> 这里笔者在方法参数内写了默认值, 即表明该参数为选填参数, 同时告知默认值

#### `beforeAll(fn, timeout = 5)`

在所有用例执行之前, 通常用于配置一些全局设置或状态

+ `fn`: 回调方法
+ `timeout`: 非必须参数, 超时时间, 默认5s

#### `beforeEach(fn, timeout = 5)`

在每个用例执行之前, 通常用于配置每个测试用例创建的一些临时状态

#### `afterAll(fn, timeout = 5)`

全部用例(test)执行完之后执行, 通常用于清理全局设置及状态

#### `afterEach(fn, timeout = 5)`

每个用例执行完之后执行, 通常用于清理每个测试用例创建的一些临时状态



### 声明测试组 - Describe

#### `describe(name, fn)`

创建一个测试组, 里面包含多个测试用例(test). 测试组可以嵌套声明.

+ `name`: 测试组名称
+ `fn`: 测试组方法

#### `describe.each(table)(name, fn, timeout = 5)`

为测试组内的每个测试用例提供相同的测试套件(参数集合)

+ `table`: 测试数据集合
+ `name`: 测试组名称, 支持formatting(如`%p`, `%s`等)

会循环测试数据集合, 将每一项作为参数传给测试用例, 如果参数为1维数组, 则每一项将会被拆为单独的数组后组合

如

`[1,2,3]` --> `[[1], [2], [3]]`

可以理解为将一维数组作为`...args`, 伪代码理解如下

```javascript
table.forEach(item => {
  if (item instanceof Array) {
	  fn(...item)
  } else {
    fn(item)
  }
})
```

例如

```typescript
describe.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('.add(%i, %i)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});
/**
.add(1, 1)
  ✓ returns 2 (2 ms)
  ✓ returned value not be greater than 2
  ✓ returned value not be less than 2 (1 ms)
.add(1, 2)
  ✓ returns 3
  ✓ returned value not be greater than 3 (1 ms)
  ✓ returned value not be less than 3
.add(2, 1)
  ✓ returns 3
  ✓ returned value not be greater than 3 (1 ms)
  ✓ returned value not be less than 3
*/
```

```shell
describe.each([
  {a: 1, b: 1, expected: 2},
  {a: 1, b: 2, expected: 3},
  {a: 2, b: 1, expected: 3},
])('.add($a, $b)', ({a, b, expected}) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});
```

> 该方法也支持``` describe.each`table`(name, fn, timeout)` ```的形式, 比较难用, 如有兴趣请前往[官网查看](https://jestjs.io/docs/api#describename-fn)

#### `describe.only(name, fn)`

在一个文件中有多个`describe`块时, 只会执行第一个`only`的

该API有别名, 为`fdescribe(name, fn)`

#### `describe.only.each(table)(name, fn)`

只会执行文件内该测试组内的测试用例



### 注释测试组 - skip

#### `describe.skip(name, fn)`

用于注释掉测试组, 在普通的声明后面直接加上`skip`, 方便注释



#### `describe.skip.each(table)(name, fn)`

注释each测试组



### 测试用例 -test

测试用例API关键词为 `test`, 方法别名为 `it`

#### `test(name, fn, timeout = 5)`

定义测试用例

也可以使用`it(name, fn, timeout)`

+ `name`: 描述测试内容
+ `fn`: 需要执行的方法, 里面包含了该测试用例通过的条件
+ `timeout`: 测试超时时间(依旧是5秒)

#### `test.concurrent(name, fn, timeout = 5)`

同时执行`name`相同的测试用例, 比如

```javascript
test.concurrent('addition of 2 numbers', async () => {
  expect(5 + 3).toBe(8);
});

test.concurrent('subtraction 2 numbers', async () => {
  expect(5 - 3).toBe(2);
});
```

#### `test.concurrent.each(table)(name, fn, timeout = 5)`

`test.concurrent`的循环版, 同步循环用例

#### `test.concurrent.only.each(table)(name, fn, timeout = 5)`

仅执行该同步循环用例

#### `test.concurrent.skip.each(table)(name, fn, timeout = 5)`

跳过该同步循环用例

#### `test.each(table)(name, fn, timeout = 5)`

循环用例

#### `test.only(name, fn, timeout = 5)`

同文件下仅执行该用例

#### `test.only.each(table)(name, fn, timeout = 5)`

同文件下仅执行该循环用例

#### `test.skip(name, fn)`

跳过该用例

```javascript
it.skip('skip', () => {})
```

#### `test.skip.each(table)(name, fn)`

跳过循环用例

#### `test.todo(description)`

类似于TODO的注释, 但是会在执行测试文件的时候输出.

如果文件内有`it.only`类的用例, 则todo也将会被跳过

```javascript
it.todo('这是TODO')
// 将会输出
// ✎ todo 这是TODO
```

