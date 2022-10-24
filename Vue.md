# **Vue 基础结构**

编程范式：Vue 是声明范式, 而原生 JS 是命名范式

```js
<div id='app'>{{message}}</div>
// 创建一个 Vue 实例， 传入对象，固定的属性名对应固定的功能
new Vue({
  el: '#app', // 挂载要管理的元素
  data: {  // 定义数据
    message: 'Hello Vue'
  }
})
```

# **Data 与 el 的两种方式**

el: 在 `new Vue` 时配置 el 属性; 或者先创建 Vue 实例, 后通过 `vm.$mount` 指定 el 的值

data: 分为对象式和函数式, 在组件里开发时只能用函数式, 而且不能用箭头函数

```js
cosnt vm = new Vue({
  // el: '#app', // 挂载要管理的元素
  // data: {  // 定义数据
  //   message: 'Hello Vue'
  // }
  data() {
    return {
      message: 'Hello Vue'
    }
  }
})
vm.$mount('#app')
```

# **MVVM 模型**

MVVM即：Moudle(模型) - View(视图) - ViewMoudle(视图模型)

在 Vue 里就是 data 数据 - 模板 - Vue 实例对象

[vue中的MVVM](./img/Vue中MVVM.png)

# **Vue 数据代理与响应式设计**

通过一个对象代理对另一个对象中属性的操作

Vue 实例化时将 data 对象先放到 `Vue._Data` 中, 这里做了一次数据劫持, 做响应式设计

然后再通过数据代理, 将 `_Data` 中的属性直接放到 Vue 实例中, 这是为了方便书写

## **原理**

Vue 将遍历 data 所有的属性, 并使用 Object.defineProperty 把这些属性全部转为 getter/setter

```js
let obj = {
  name: '张三',
  sex: '男'
}
let _obj = { }
// 这样读写 _obj 实际上是读 obj, 做了代理
Object.defineProperty(_obj, 'age', {
  value: 18, // 属性值
  enumerable: true, // 控制属性是否可枚举, 默认值是 false
  writable: true, // 控制属性是否可以被修改, 默认值是 false
  configurable: true // 控制属性是否可以被删除, 默认值是 false
  // getter|setter 特殊配置项
  get() {
    retrun obj.age
  },
  set(value) {
    obj.age = value
  }
})
```

## **Vue.set() 与 vm.$set()**

一开始 `new Vue()` 时没有设置 data, 而后来想添加新的数据时, 直接添加不会有响应式, 需使用 `set` 与 `$set`

接收三个参数, `(target, propertyName/index, value)`, target 为响应式对象, 也可以为数组添加响应式元素

```js
// 只能在 data 对象的子对象里添加, 不能直接添加到 data 上
Vue.set(vm.xxx, 'xxxx', 'xxx')
vm.set(vm, 'xx', 'xxx') // error
```

## **数组的响应式**

对象的每一项甚至嵌套对象, Vue 都会劫持设置 getter/setter, 所以都是响应式的

而 Vue 不会给数组的每一项添加 getter/setter, 所以直接操作数组的每一项的操作不是响应式, 如下标修改

数组响应式函数：push, pop, shift, unshift, splice, sort, reverse, Vue 将这些方法包装了一下, 让它们可以响应式变化

为什么不给数组的每一项添加响应式设计: 理论上可以, 但作者说时性能问题
 
# **模板语法**

## **插值语法**

Mustache语法：`{{}}` 不仅可以写变量, 还可以写表达式

## **v-bind**

动态绑定属性 `:`, 格式：`v-bind:href="表达式"`

v-bind 的值可以为一个对象, 属性值为 boolean，当为真时, 显示该属性, 为假时不显示

绑定 class 时：`:class='{key: value, 类名：boolean值}'`

```html
<!-- 点击那个 li， 该 li 里的文字边红 -->
<style>
  .red {color: red;}
</style>
<div id="app">
  <div v-for='i in bangumi' :class="{red: init === i}" @click="addRed(i)">{{i}}</div>
</div>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      bangumi: ['TOUCH', 'H2', 'CORSS GAME', 'MIX'],
      init: ''
    },
    methods: { addRed(i) { this.init = i } }
  })
</script>
```
v-bind 也可以绑定 style 属性，`:style='{key: value, css属性名：css属性值}'`

## **v-model**

与 `v-bind` 不同的是, `v-model` 是双向绑定, 改变页面的同时会影响数据本身, 只用于表单元素

```html
<input type="text" v-model:value='name'>
<!-- 可以简写成 `v-model = 'name'`, 因为默认收集的就是 `value` 值 -->
<input type="text" v-model='name'>
```
配合 radio 使用, 默认绑定 `name` 值

```html
<label><input type="radio" value="male" v-model="gender">男</label>
<label><input type="radio" value="female" v-model="gender">女</label>
```
配合 checkbox 使用, 当作为单选框是 v-model 绑定的值时布尔值, 选中为true，未选中为false

```html
<div id="app">
  <input type="checkbox" v-model="check">{{check}}同意协议
  <input type="button" value="同意方可下一步" :disabled="!check">
</div>
<script>
  const app = new Vue({
    el: '#app',
    data: { check: false }
  })
</script>
```

当作为多选框使用时, v-model 绑定的值是数组类型, 与 value 对应

```html
<div id="app">
  <!-- 动态从数组中获得，注意要包起来 -->
  <label v-for="item in orignCheck">
    <input type="checkbox" v-model="check" :value="item">
    <span>{{item}}</span>
  </label>
</div>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      check:[],
      orignCheck: ['H2', 'TOUCH', 'CROSS GAME', 'MIX'] }})
</script>
```

v-model 配合 select 使用，v-model 绑定在 select 标签上，不常用

v-model 的修饰符：

- `.lazy`: 默认会同步数据与输入框的内容，lazy 可以让数据在失去焦点或回车时才会更新
- `.number`: 将类型转化为数字类型
- `.trim`: 去除两边的空格

## **v-on**

绑定事件监听函数 `@`, 参数可以是事件函数或表达式 `v-on:click='func'`

绑定事件监听的函数一般写在 `methods` 里, 因为不需要代理和劫持

```html
<div id="app">
  <h3>当前数字：{{count}}</h3>
  <input type="button" value="+" @click="add()">
  <input type="button" value="-" v-on:click="sub()">
</div>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      count: 0
    },
    methods: {
      add() { this.count++},
      sub() { this.count--}
    }
  })
</script>

```

事件参数 event，当只需要该参数时，可以在调用时不加小括号，而定义时使用该参数

当既需要事件参数 event，又需要其他参数时，用 `$event` 来表示事件参数

```js
// 以下两种方法都可以把event参数传过去
<input type="button" value="点击" v-on:click="showMessage">
<input type="button" value="点击" v-on:click="showMessage($event)">
```

v-on 修饰符

- `@click.stop='func'` 阻止了事件的冒泡，即调用 `event.stopPropagation()`
- `@click.prevent='func'` 阻止默认行为，即调用 `event.preventDefault()`
- `@keyup.enter='func'` 监听了键盘上的 enter 键
- `.native` 监听了组件根元素的原生事件
- `.once` 只能触发一次
- `.capture`: 使用事件的捕获模式, 即在捕获阶段就执行
- `.self`: 只有 event.target 是当前操作的元素时才触发事件
- `.passive`: 事件的默认行为立即执行, 无需等待事件回调执行完毕

键盘事件, 一般用 `@keyup` 事件, tab 较特殊, 会切走光标, 所以用 `keydown`

常见别名: `enter`, `delete`, `esc`, `space`, `tab`, `up`, `down`, `left`, `right`, 未提供别名的按键可以使用按键原始值取绑定

系统修饰键 `ctrl`, `alt`, `shift`, `meta` 也特殊

# **计算属性 computed**

从 data 中的属性里计算出的一个新的属性, 写在 `computed` 配置项里, 计算属性最终会是一个属性挂载到 vm 上

属性值有 set(), ge() 方法, 调用时不用 () 来执行函数, 实际上调用的是属性的 gettter

计算属性会在第一次读取时缓存, 之后如果所依赖数据没有发生改变, 则会直接从缓存里取, 从而提高性能

```js
// 完整的计算属性写法
// 由于一般情况下不会使用set方法，所以可以简写
computed: {
  // func 是属性，值是一个对象
  add: {
    get() {
      console.log('使用了get方法')
    },
    set(value) {
      console.log('使用set方法')
    }
  }
}
// 简写
computed: {
  func() { console.log('使用了get方法')}
}
```

# **监视属性 watch**

写在 `watch` 配置项里, 监视数据的变化, 不仅能监测 data 里的属性, 也能监测计算属性

```js
data: {
  isHot: true,
  numbers: {
    a: 1
  }
}
watch: {
  isHot: {
    immediate: true, // 初始化时调用 handler
    // 当 isHot 发生改变时调用
    handler(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },
  'numbers.a': { ... } // 监测多级结构中的属性变化
}
```

也可以使用 vm 的 `$watch` 方法来监视

```js
vm.$watch('isHot', { /* 与配置项里一致 */ })
```

## **深度监视**

Vue 自身可以检测对象内部值的变化, 但 Vue 提供的 `watch` 默认不可以

watch 配置里的 `deep` 实现滚设置为 true 即可监测

```js
watch: {
 isHot: {
    deep: true,
    handler()
 }
}
```

当只有 `handler` 配置时, 即可使用简写形式

```js
watch: {
  isHot(newValue, oldValue) { ... }
}

vm.$watch('isHot', function(newValue, oldValue) { ... })
```

## **计算属性与监视属性区别**

computed 能完成的功能 watch 都可以完成, 反之则不是, 例如: 计算属性不能开启异步任务, 而监视属性可以

tip: 所有被 Vue 管理的函数最好写成普通函数, 这样 this 的指向才是 vm 或组件实例对象, 而不被 Vue 管理的, 最好写成箭头函数

# **条件渲染** 

## **v-if**

v-if, v-else, v-else-if 类似于逻辑语句, 当比较复杂时, 不建议写在标签里

当条件为false时, 包含 v-if 指令的元素根本不会出现在 DOM 中

```js
<div v-if="n === 1">1</div>
<div v-else-if="n === 2">2</div>
<div v-else>3</div>
```

v-if 可以与 `template` 搭配使用, 在不影响页面结构的情况下批量判断

注意 `template` 只能与 `v-if` 搭配不能与 `v-show` 搭配

```js
<template v-if='n === 1'>
  <h2>你好</h2>
  <h2>Vue</h2>
  <h2>hello</h2>
</template>
``` 

## **v-show**

决定一个元素是否显示, 只是加了一个行内样式 "display: none"

tip: 当一个标签频繁的切换时, 建议使用 `v-show`, 这样就不用担心 html 节点的频繁删减

# **列表渲染**

v-for 循环, 类似于 for...in... 语法

v-for 可以遍历数组, 遍历对象, 遍历字符串甚至遍历指定次数

在使用 v-for 时, 推荐给对应元素或组件添加上一个 `key` 值, 作用是高效的更新虚拟 DOM

```html
<div id="app">
  <div v-for='(n, index) in nums' :key='index'>{{i}}</div>
</div>
```
```js
new Vue({
  el: '#app',
  data: {
    nums: [1, 2, 3, 4]
  }
})
```

循环数组：`v-for="item in array"` 或 `v-for="(item, index) in array"` 表示值和索引

遍历对象：`v-for="value in obj"` 或 `v-for="(value, key) in obj"` 只有一个参数时表示对象的属性值

**key的作用与原理**

key 是虚拟 DOM 对象的标识, 当数据发生变化时, Vue 会根据新数据生成新的虚拟 DOM, 随后 Vue 会进行新虚拟 DOM 与旧虚拟 DOM 的差异比较: 

- 旧虚拟 DOM 中找到与新虚拟 DOM 相同的 key：当虚拟 DOM 中内容没变, 直接使用之前的真实 DOM, 当虚拟 DOM 中内容变了, 则生成新的真实 DOM
- 旧虚拟 DOM 中找不到与新虚拟 DOM 相同的 key: 创建新的真实 DOM 并渲染

当 `key` 使用 index 时, 如果对数据进行改变顺序的操作, 会产生没有必要的真实 DOM 的更新(效率低下), 而如果有输入类 DOM 的时候, 会造成输入类 DOM 错位的情况

一般开发中建议使用数据的唯一标识作为 `key`

# **过滤器 filters**

类似于 angular 里的管道, 使用管道符 `|` 来使用 `{{params | filters}}`, 过滤器之间可以串联

filters 函数会默认使用 `|` 之前的参数 `params`, 也可以在 `()` 添加新参数 `{{params | filters(p2)}}`

在配置项里的过滤器是局部过滤器, 也可以配置全局过滤器 `Vue.filter('mySlice', func)`

```js
new Vue({
  filters: {
    timeFomatter(params, p2) {
      return xxx
    }
  }
})
```

# **其他内置指令**

## **v-text**

向绑定节点里渲染文本内容, 他会替换掉节点原来的内容, 其他则与 `{{}}` 一致

## **v-html**

与 `v-text` 不同, `v-html` 会解析 html 结构

`v-html` 有安全性问题, 动态渲染 HTML 非常危险, 容易导致 `XSS` 攻击

tips: `XSS` 攻击, a 标签的 `href` 中可以写 js 代码, 这样如果在里面获取 cookies 等信息时就能被解析, 从而造成信息泄露

## **v-cloak**

配合 css 使用, 将未经解析的模板隐藏, 等解析完成后再显示

```html
<style>
  [v-cloak] { display: none }
</style>
<body>
  <div v-cloak>{{xxx}}</div>
</body>
```

## **v-once**

所在节点在初次动态渲染后就视为静态内容了, 不会再引起响应式变化

## **v-pre**

让 Vue 跳过其所在节点的编译过程, 可利用它跳过没有使用指令或插值语法的节点, 加快编译

# **自定义指令**

**定义**

使用 `Vue.directive(指令名, 配置对象)` 或 `Vue.directive(指令名, 回调函数)` 来定义全局指令

使用 `new Vue()`, 在配置项里设置 `directives(指令名, 配置对象/回调函数)` 来定义

**指令的钩子函数**

`bind` 指令与元素成功绑定时调用

`inserted` 指令所在元素被插入页面时调用

`update` 指令所在模板结构被重新解析时调用

当使用回调函数时, 是简写形式, 只有 bind 和 update 两个时间节点

钩子函数接收两个参数 `(element, binding)` 表示绑定的元素和绑定对象

**注意事项**

指令定义时不加 `v-`, 使用时加上 `v-`

指令名如果是多个单词, 需使用 `kebab-case` 命名方式1, 不用 `camelCase` 命名方式

指令的钩子函数中 `this` 指向的是 `window`

# **mixins 配置项**

可以把多个组件共用的配置提取成一个混入对象

全局混入 `Vue.mixin(xxx)` 局部混入 `mixins: ['xxx']`

数据, 方法混合的优先级比组件本身拥有的低, 而生命周期函数都会调用

```js
// 局部混合
export const mix = {
  data() {
    return {
      x: 1
    }
  }
}
```
```js
import { mix } from './xxx'
export default VueComponent {
  mixins: [ mix ]
}
```

# **plugins 插件**

用于增强 Vue, 本质是包含 `install` 方法的对象

`install` 方法的第一个参数是 `Vue` 构造函数, 第二之后的参数是插件的使用者传递的数据

```js
export const plug = {
  install(Vue, ...) {
    // 可以添加全局过滤器 Vue.filter
    // 可以添加全局指令 Vue.directive
    // 可以添加全局混入 Vue.mixin
    // 可以在原型上添加方法属性 Vue.prototype.xxx = xxx
  }
}
```

使用插件时 `Vue.use(plug)`

# **生命周期函数**

在 vue 运行过程中, 会经历某些关键时刻, 在这些时刻会调用某些函数, 即生命周期函数

```js
new Vue({
  ...,
  mounted() { 
    ...
  }
})
```

`beforeCreate` 数据检测, 数据代理创建前, 此时 vm 中无法反访问到 data 与 methods 中方法

`created` 数据响应式设计创建完成后, 此时可以访问数据方法

`beforeMount` 挂载前, Vue 解析好模板, 生成好虚拟 DOM, 但页面上还是未编译的内容

`mounted` 挂载后, 完成模板解析并把初始的真实 DOM 元素放入页面后调用, 此时可以说是 Vue 初始化完成

`beforeUpdate` 页面更新前, 此时数据更新了, 但页面是旧的

`updated` 更新完成后, 数据和页面保持同步

`beforeDestory` 销毁前, 此时所有功能都处于正常状态, 一般在此关闭定时器, 取消订阅等操作

`destoryed` 销毁后

# **Vue 组件化**

组件的定义: 实现应用中局部功能的代码和资源的集合

## **创建组件(非单文件)**

创建 vue 实例使用 `new Vue`, 而创建组件用 `Vue.extend()`, 返回的是组件本身

创建组件的配置里 data 用函数式表示, 也不能用 `el` 指定模板, 而用 `template` 指定模板

```js
// 创建组件
// 这里的 demo 只是一个组件变量
const demo = Vue.extend({
  name: '', // 指定组件名称, 指定在开发者工具中的名字
  // el: '#root' // 错误写法, 组件中指定模板不用 el, el 属于 vm
  // template 只能有一个根节点
  template: `
    <div>
      ...
    </div>
  `,
  // data 需用函数形式, 因为对象是引用类型, 在组件复用时每个组件的 data 都指向同一地址, 造成混乱
  // 写成函数式, 每次都返回一个新对象
  data() { 
    return {
      ...
    }
  }
})

// 简写 
const demo = { } // 在注册是, 如果传入的组件是一个对象, Vue 会自动调用 extend
```

## **注册组件**

局部注册: 在 `new Vue()` 中用配置项 `components` 来注册

```js
new Vue({
  components: {
    'xxx': demo // 'xxx' 组件的标签名
  }
})
```

全局注册: 使用 `Vue.component(标签名, 组件)` 方法

```js
Vue.component('xxx', demo)
```

## **使用组件**

```html
<body>
  <!-- // 用标签名写 -->
  <xxx></xxx>
</body>
```

## **VueComponent**

组件本质是一个 `VueComponent` 的构造函数, 是调用 `Vue.extend()` 生成的

当解析组件标签时, 会创建 `VueComponent` 的实例对象 `new VueComponent(option)`

每一次调用 `Vue.extend` 返回的都是一个新的 `VueComponent`

在组件中, 相关 Vue 函数的 `this` 为 `VueComponent` 实例对象

[Vue 原型链](./img/vue%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

```
vm.__proto__ --> Vue.prototype -> Object.prototype
vc.__proto__ --> VueComponent.prototype --> Vue.prototype --> Object.prototype：Vue 手动实现
vue 手动将组件构造函数的原型对象指向 Vue 构造函数的原型对象, 让组件实例对象可以访问到 Vue 原型上的属性
```

## **单文件组件**

用 `.vue` 后缀结尾的, 一个文件即代表一个组件

```html
<style>组件样式</style>
<template>组件模板</template>
<script>组件脚本</script>
```

script 中利用 es6 模块化导出, 直接导出对象是因为注册组件时, 当接受的是对象将自动调用创建组件的 api

```html
<script>
  export default {
    name: 'demo', // 指定组件名称, 指定在开发者工具中的名字
    data() {
      return {
        xxx
      }
    }
  }
</script>
```

# **Vue 脚手架**

安装 `@vue/cli` 包 `npm i @vue/cli -g`, 装完即可识别 vue 命令

创建项目 `vue create xxx`

## **render 函数**

默认使用 es6 引入 `import Vue from 'vue'` 的 vue 是 `vue.runtime.esm.js` 版本, 缺少模板编译器

模板编译完成后, 就不需要编译器了, 不需要再打包到项目文件里, 节省空间

```js
import Vue from 'vue'
new Vue({
  // 使用 template 配置项不会生效，因为没有模板解析器
  // template: `<h2>hello</h2>`, 
  // 使用 render 函数接收到的 createElement 函数去指定具体内容
  render: () => createElement => createElement('h2', 'hello')
}).$mount('#app')
```

## **更改配置**

使用 `vue inspect > output.js` 可查看 Vue 脚手架的默认配置

可在 package.json 同级目录下使用 `vue.config.js` 文件修改配置

## **样式 scoped**

作用是防止样化冲突, 为组件进行样式封装

本质是为同一个组件标签添加一个唯一的自定义属性, 解析样式的时候会带上这个属性选择器, 实现区分

## **样式 lang**

可以指定 `lang='less/scss'` 等, 但需要安装相应的 loader

# **组件交互**

## **ref 属性**

用来给元素或子组件注册引用信息, 应用在标准标签上是真实 DOM 元素, 而在组件上是组件的实例对象, 以此来直接操作子组件或 DOM

可使用 `vc.$refs` 来获取所有 ref 或 `vc.$refs.xxx` 来获取某个 ref

```js
import Vue from 'vue'
new Vue({
  // 使用 template 配置项不会生效，因为没有模板解析器
  // template: `<h2>hello</h2>`, 
  // 使用 render 函数接收到的 createElement 函数去指定具体内容
  render: () => createElement => createElement('h2', 'hello')
}).$mount('#app')
```

**更改配置**

使用 `vue inspect > output.js` 可查看 Vue 脚手架的默认配置

可在 package.json 同级目录下使用 `vue.config.js` 文件修改配置

# **组件交互**

## **ref 属性**

用来给元素或子组件注册引用信息, 应用在标准标签上是真实 DOM 元素, 而在组件上是组件的实例对象, 以此来直接操作子组件或 DOM

可使用 `vc.$refs` 来获取所有 ref 或 `vc.$refs.xxx` 来获取某个 ref

```js
<ChildComponent ref='childComponent' />
<div ref='div'></div>

new Vue({
  methods: {
    getDom() {
      console.log(this.$refs)
    }
  }
})
```

## **props 配置项**

令组件接收外部传入的数据

`props` 有三种方式, 数组形式, 对象简写, 和完整对象形式

```html
<!-- // 父组件 -->
<Demo name='xxx' />
```
```js
// <!-- 子组件 -->
export default {
  props: [ 'name' ] // 数组形式，只用于接收
  props: {
    name: Number // 对象简写，限制数据类型
  }
  props: {
    name: {
      type: String, // 类型
      default: 'xx', // 默认值
      required: true // 是否必传
    }
  }
}
```

tips: props 是只读的, 如果修改了会发出警告, 如果业务中确实需要修改, 可复制到 data 中来处理

## **自定义事件**

在子组件标签上绑定事件(自定义), 在子组件中相关方法里用 `this.$emit(自定义事件名, 参数)` 来发射自定义事件

也可通过 `ref` 绑定子组件标签, 通过 `this.$ref.xxx.$on(事件名, 回调函数)` 来调用

```html
<Children @myEvent="sayHello" />
<!-- // 或者 -->
<Children ref="children" />
```
```js
// 子组件, 可以传入多个参数
this.$emit('myEvent', 1, 2, 3 ...)
this.$off('myEvent') // 解绑, 解绑多个使用数组来包裹
```
```js
// 父组件
sayHello(msg, ...other) { // 用 ...rest 接收
  console.log(msg, other)
}
// 或者
mounted() {
  this.$ref.children.on('myEvent', this.sayHello)
  this.$ref.children.once('myEvent', this.sayHello)
}
```

解绑: 在子组件中使用 `this.$off(事件名)`, 销毁子组件 `this.$destroy()`

默认给子组件绑定事件都会认为是自定义事件, 如果想绑定原生事件可以使用 `@click.native` 修饰符, 此时会转到组件的根元素上

tips: 使用 `this.$refs.xxx.$on(事件, 回调)` 绑定自定义事件时, 回调要么配置在 methods 中, 要么使用箭头函数, 否则 this 指向有问题

## **全局事件总线**

在 `new Vue()` 中通过 `beforeCreate()` 生命周期函数安装一个全局事件总线

```js
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  }
})
```
```js
// 发送数据
this.$bus.$emit('xxx', 数据)
// 最好在 beforeDestroy 钩子中用 $off 解绑当前组件所用到的事件
// 接受数据
this.$bus.$on('xxx', 回调)
```

## **消息的订阅与发布**

可以安装 `pubsub-js` 实现

api: `pubsub.subscribe(消息名, 回调)` `pubsub.publish(消息名, 数据)` `pubsub.unsubscribe(pid)`

# **nextTick**

在下一次 DOM 更新结束后执行其指定的回调

```js
this.$nextTick(回调函数)
```

适用于更新数据后, 要基于更新后的新 DOM 进行 DOM 操作时, 要在 `nextTick` 所指定的回调函数中执行

## **父子组件直接访问**

父组件直接访问子组件：`$children` 或 `$refs`, `this.$children` 是一个数组, 包含了当前父组件下所有的子组件对象

子组件访问父组件: `this.$parent`, 默认就是父组件对象, 可直接调用父组件属性

`this.$root` 直接访问 Vue 实例，跟组件

# **过渡与动画**

用固定的类型定义动画, 再将所需要的动画的元素用 `<transition>` 标签包裹

`transition` 标签有属性 `name` 指定动画名字, `appear` 初始化动画

`transition-group` 标签对多个元素指定动画, 但每个元素需要 key 值

```html
<transition name='test' appear>
  xxx
</transition>
```

**动画实现**

```css
/* 进入, 名称固定, 但前面 test 是 transition 的 name, 若没有则用 v 来表示 */
.test-enter-active { 
  animation: xxx .5s
}
/* 离开 , 名称固定, 但前面 test 是 transition 的 name, 若没有则用 v 来表示*/
.test-leave-active { 
  animation: xxx .5s reverse
}
@keyframes xxx { }
```

**过渡实现**

```css
/* 进入起点, 离开终点 */
.test-enter,
.test-leave-to {
  transform: translateX(-100%)
}
/* 进入的过程, 离开的过程 */
.test-enter-active,
.test-leave-active {
  transition: .5s
}
/* 进入终点, 离开起点 */
.test-enter-to,
.test-leave {
  transform: translateX(0)
}
```

# **发送请求**

## **常见方式**

- `xhr` 鼻祖
- `jQuery` 封装 DOM 和 xhr
- `axios` 基于 promise 的异步请求方式
- `fetch` 原生 js 就有的, 基于 promise 的异步请求方式

## **跨域**

- `jsonp` 利用 script 标签, 需要前后端配合
- `CORS` 服务器在返回的响应头上设置一个特殊的响应头
- 代理服务器方式 `nginx` 或 `vue-cli`

## **脚手架代理服务器**

在 `vue.config.js` 中配置, 前端 -> 代理服务器 -> 服务器

```js
// 开启代理服务器
// 简单配置会优先请求前端已存在的资源
devServer: {
  proxy: 'http://localhost:8000'
}
```
```js
devServer: {
  proxy: {
    '/api': { // 请求前缀, 当前缀有 '/api' 时, 就启用代理
      target: 'http://localhost:8000', // 代理目标的 host
      pathRewrite: { '^/api': '' }, // 路径重写, 用来清掉请求前缀
      ws: true, // 用于支持 websocket, 默认 true
      changeOrigin: true // 开启时, 服务器收到的请求头中 host 为服务器地址, 默认开启
    }
  }
}
```

# **插槽**

为原有的组件增加更强的扩展性

方式一: 在组件模板里预留 `<slot></slot>` 标签, 使用时在组件标签里写入想要显示的内容

```html
<!-- 使用时分别在标签里写入不同内容 -->
<test><div>one</div></test>
<test><div>two</div></test>
<!-- 定义时预留 slot 插槽 -->
<template id="test">
  <div>
    <h2>I am a default content</h2>
    <slot></slot>
  </div>
</template>
```

方式二: 具名插槽, 当一个组件中有多个插槽时, 可以用 `name` 属性来区分, 使用时则用`slot` 属性, 两属性值相等即可

```html
<!-- 组件中 -->
<slot name='aaa'></slot>
<slot name='bbb'></slot>
<!-- 使用时 -->
<div slot='aaa'></div>
<div slot='bbb'></div>
<!-- 新: 使用 template 标签可用 v-slot:xxx 来指定 -->
<template v-slot:aaa></template>
```

方式三: 作用域插槽, 替换插槽的时候, 数据由子组件来提供

插槽定义时 `:name='name'` 使用时 `slot-scope` `scope` `v-slot:xxx='name'`

```html
<template id="test">
  <div>
    <h2>I am a default content</h2>
    <!-- 定义时，绑定自定义变量，将需要传递的值赋给该变量 -->
    <slot :sname='name'></slot>
  </div>
</template>
<!-- 使用时，在 template 标签里使用，绑定属性 slot-scope ，属性值即为 slot 对象 -->
<!-- 也可以不在 template 标签上使用 -->
<test>
  <template slot-scope='test'>{{test.sname}}</template>
  <div slot-scope='test'>{{test}}</div>
</test>
```

# **vuex**

## **概念**

专门在 Vue 中实现集中式数据管理的插件