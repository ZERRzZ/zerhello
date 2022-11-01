# let、const、var

let 拥有块级作用域

``` js
var i = 10
for (var i = 1; i < 5; i++) console.log(i)
console.log(i) // 此时最底下的 i 值为 5

var i = 10
for (let i = 1; i < 5; i++) console.log(i)
console.log(i) // 此时最低下的 i 为 10
```

let 定义的变量不能再重复定义

``` js
let i = 10
let i = 5 // 报错 Identifier 'i' has already been declared
```

TDZ 暂时性死区: 指变量在作用域内已经存在, 但必须在 let/const 声明后才可以使用, 可以让程序保持先声明后使用的习惯, 让程序更稳定, 建议使用 let/const 而少使用 var

``` js
var i = 10
function fun() {
  console.log(i)
  let i = 5
}
fun() // 报错，Cannot access 'i' before initialization
```

const 声明的是常量, 不能够被修改, 且声明时必须同时赋值

``` js
const PI = 3.14
PI = 3 // 报错，Assignment to constant variable.
```

# 字符串的方法

`includes(str[, position])`: 是否找到了参数字符串，返回布尔值

`startsWith(str[, position])`: 参数字符串是否在原字符串的头部，返回布尔值

`endsWith(str[, endPosition])`: 参数字符串是否在原字符串的尾部，返回布尔值

``` js
let str = 'hello world'
let test1 = str.includes('hello')
let test2 = str.includes('hello', 1)
let test3 = str.startsWith('hello')
let test4 = str.startsWith('hello',1)
let test5 = str.endsWith('world')
let test6 = str.endsWith('hello',5)
console.log(test1,test2,test3,test4,test5,test6);
```

# 模板字符串

* 放弃用引号，而用 `` 号表示字符串，这种写法是预格式的
* 如果由变量的话不用 + 拼接，而用 ${} 在花括号里写出表达式
* 表达式支持一切类型
``` js
let name = 'sadanya'
let age = 22
let showMessage = (age) => {
  return age-1
}
let str = `我叫${name},今年${age}岁了,哦不，是${showMessage(age)}岁`
console.log(str)
// 我叫sadanya,今年22岁了,哦不，是21岁
```

# 带标签的模板字符串

* `` 里的内容可以紧跟在一个函数后面，这个函数会被调用来处理该模板字符串
* 该函数第一个参数是字符串模板的字符串数组，后面的每一个参数为表达式的计算结果
* 标签模板是一种特殊的函数调用，标签即函数，紧跟的模板字符串就是参数
``` js
let name = 'sadanya'
let age = 18
let tag = (strings, ...values) => {
  console.log(strings)
  console.log(values)
  // 注意空格
}
tag`我的名字叫${name}, 今年${age}岁了`
```

* strings 还有一个属性 raw, 它返回的是纯字符串，无视转义字符
``` js
let tag = (strings, ...values) => {
  console.log(strings[0])
  console.log(strings.raw[0]) // 在 raw 属性的后面写下标
}

tag`我这里\n很热，啦啦啦\t`
```

# 扩展运算符对数组的解构

* `...values`：三个点来表示，values 随意名字

``` js
let arr = [1,2,3,4,5,6]
console.log(...arr)
```
* 可以用于数组的拼接

``` js
let arr1 = [1,2,3]
let arr2 = [4,5,6]
let arr3 = arr1.concat(arr2)
let arr4 = [...arr1,...arr2]
console.log(arr3,arr4)
```

* 结构数组为函数赋值

``` js
let arr = [1,2,3]
function func(a,b,c) {
  console.log(a,b,c)
}
func(...arr)
```

# ES6 中的对象

* 简写定义，对象是以 key:value 存在，当 key 与变量名一致时，可只定义一项
* 当 value 是一个函数，可以用 key(){} 来定义方法

``` js
let name = "sadanya"
let age = 18
let obj = {
  name,
  age,
  showInfo() {
    console.log(name,age)
  }
}
console.log(obj.name,obj.age)
obj.showInfo()
```

* 对象可通过 `.`,`[]` 来取值，在 ES6 中可以通过解构来取值

``` js
let obj = {
  name: 'sadanya',
  age: 18,
  showinfo() {
    console.log(name,age)
  }
}
let {name,age} = obj // 解构属性
let {showinfo} = obj // 解构方法，这样少写几个字符，懒癌发作
console.log(name,age)
showinfo()
```

* 可结合 rest 参数将剩余参数放到一个新对象上

``` js
let obj = {
  name: `sadanya`,
  age: 18,
  power: undefined
}
let {name,...values} = obj
console.log(name,values)
```

# ES6 中的函数

* 函数默认值
* 在以前用短路语法 `x = x||1` 来给 x 默认取 1
* 在 ES6 中可在形参列表中直接设置默认值
``` js
function func(a=10,b=20) {
  console.log(a+b)
}
func()
```

* rest 参数
* 无需使用 arguments 对象来获取参数，它是一个伪数组
* 直接用 `...values` 来获取剩余参数，是一个数组
``` js
function func(obj, ...values) {
  console.log(obj)
  console.log(values)
}
func({name:'sadanya',age:18}, "enginee","student")
```

* 箭头函数
* es6 用箭头函数来简化函数的定义，替代 function
* 当没有参数或多个参数时，必须写括号，否则不用写
* 当有多行函数体时，必须写 {}，只有一行时不用写花括号
* 当只存在一行代码时，有 renturn 时可以省略
``` js
let func = () => {
  console.log("es6 箭头函数")
}
let func2 = a => a+1
let result = func2(3)
console.log(result)
```

* 箭头函数函数没有自己的 this, 用的是外部的 this
``` js
let func = name => console.log(this.name)
func.call({name: 'sadanya'}, 'sadanikya')
// undefined
```

# Promise风格

- 是一种清晰的写代码风格，用来处理回调地狱
- 构造实例：
- 构造函数接受一个函数作为参数，此函数立即执行
- 函数带有两个参数函数resolve, reject, 代表成功失败
- promise.then方法：当成功时执行, 可传递参数
- promise.catch方法：当失败时执行, 可传递参数
- then与catch方法即构造函数的参数函数
```js
const promise = new Promise((resolve, reject) => {
  if (1==0) resolve(1)
  else reject(0)
})
promise.then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err)
})
```

# ES6模块化开发
- 模块化的核心：导入和导出
- common.js规范：
```js
module.exports = ...  // 导出
require('xxx')  // 导入
```
- ES6模块化: export | import
- 在用 <script> 标签引入 js 文件时，指定 `type='moudle'`, 即将文件模块化，，不会发生作用域混乱的情况
- ES6 中的导出
```js 
export {test, test2, ...} // 在对象中直接导出需要的值
export let test = ...   // 在定义变量时就直接导出
export default test // 一个模块只能存在一个，再导入时允许自定义名字
```
- ES6 中的导入
```js
import {...} from 'xxx.js'  // 从什么文件哪里导入什么，最基本的导入
import xxx from 'xxx.js' // 接收 default 导出的内容，可以自己重命名
import * as obj from 'xxx.js' // 导入所有，作为 obj 的属性
```

# 未完待续
# 类的定义，继承