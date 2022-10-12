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
      message: 'Hello Vue'vm
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
Object.defineProperty(obj, 'age', {
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
配合 checkbox 使用, 当作为单选框是 v-model 绑定的值时布尔值，选中为true，未选中为false

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

当作为多选框使用时，v-model 绑定的值是数组类型，与 value 对应

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
computed: {add
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










# 条件判断v-if
- v-if,v-else,v-else-if 类似于逻辑语句，当比较复杂时，不建议写在标签里
```js
<div v-if="true">true</div>
```
- 条件判断时可能会出现元素的复用问题，这时只需指定 key 值的不同即可
- Vue 在底层会为相同的元素创建一份虚拟 DOM，而 key 值不同元素就不同

# v-show
- 决定一个元素是否显示
- v-show 只是加了一个行内样式 "display: none"
- v-if 则当条件为false时，包含v-if指令的元素根本不会出现在DOM中

# 遍历循环v-for
- v-for：循环，有值，类似于 for .. in .. 语法
```html
<!-- view 代码 -->
<div id="app">
  <div v-for='i in nums'>{{i}}</div>
</div>
```
```js
// <!-- module，view-module代码 -->
const app = new Vue({
  el: '#app',
  data: {
    nums: [1, 2, 3, 4]
  }
})
```
- 循环数组：`v-for="item in array"` 或 `v-for="(item, index) in array"` 表示值和索引
- 遍历对象：`v-for="value in obj"` 只有一个参数时表示对象的属性值
- `v-for="(value, key) in obj"` 可以获取属性值，属性名
- 在使用 v-for 时，推荐给对应元素或组件添加上一个 key 值，作用是高效的更新虚拟DOM

# 数组的响应式
- 并非所有的数组方法都是响应式的
- 数组响应式函数：push, pop, shift, unshift, splice, sort, reverse
- 数组非响应操作：通过索引值来修改数组的值
- Vue.set 方法： `Vue.set(要修改的对象，索引值，修改后的值)` 通过静态方法来实现响应式修改数组

# 过滤器filters
- 也是一个函数，类似于计算属性。
- 定义时有参数，调用时格式 `{{参数|函数名}}`, 即默认把 | 前的值当作函数参数



# Vue 组件化
- 注册组件步骤：创建组件构造器 - 注册组件 - 使用组件
```html
<div id="app">
  <!-- 在挂载了的vue元素里使用 -->
  <mytest></mytest>
</div>
<script>
  // 创建组件构造器
  const test = Vue.extend({
    // template ：定义自定义的模板
    template: `<div>hello vue</div>`
  })
  // 全局注册组件
  // 参数为注册后组件的标签名，组件构造器，相当于实例化
  Vue.component('mytest', test)
  // 使用组件
  // 组件必须挂载在某个Vue时立下，否则她不会生效
  const app = new Vue({
    el: '#app'
  })
</script>
```
- 全局组件与局部组件
- 全局组件直接用 Vue.component 注册，局部组件写在实例里面
- 全局组件所有 Vue 实例都能用，局部组件只有该实例能用
```html
<div id="app"><mytest></mytest></div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script>
  const test = Vue.extend({ template: `<q>这是一个引用</q>` })
  const app = new Vue({
    el: '#app',
    // Vue 实例化传入的对象有一个属性 components, 用来注册组件
    // 值也是一个对象，其中属性名为组件标签名，属性值为组件构建器
    components: { mytest: test }})
</script>
```
- 父组件与子组件
- 即在某个组件里注册另一个组件，new Vue() 可以看作跟组件
```html
<div id="app"><mytest></mytest></div>
<script>
  const child = Vue.extend({ template: `<q>我是一个孩子</q>` })
  const test = Vue.extend({
    template: 
    // 模板的内容必须包裹在一个根标签下
    // 使用组件
    `<div><q>这是一个父亲</q><mychild></mychild></div>`,
    // 注册局部组件
    components: { mychild: child }
  })
  const app = new Vue({
    el: '#app',
    components: { mytest: test }
  })
</script>
```
- 组件语法糖
```js
// 全局注册组件
Vue.component('mytest', { 
  template: '<div><q>组件的</q><q>语法糖</q></div>'
})
// 局部注册组件
components: {
  mytest: {
    template: '<div><q>组件的</q><q>语法糖</q></div>' }}
```
- 组件模板分离
- template 中定义模板会显得会杂乱，可以把模板给抽离出来
```html
<!-- 1. 在 script 标签里写模板，指定 type 值 -->
<script type="text/x-template" id="test">
  <div><q>hello</q><q>Vue</q></div>
</script>
<!-- 2. 在 template 标签里写模板 -->
<template id="test">
  <div><q>hello</q><q>Vue</q></div>
</template>
<!-- 使用 -->
<script>
  const app = new Vue({
    el: '#app',
    components: {
      mytest: {
        // 通过 id 来绑定相应的模板
        template: '#test'}}})
</script>
```

# Vue父子组件的传值
- 组件中的 data 属性不能为一个对象，应该是一个函数且返回一个对象
- 这样做保证了组件的复用时每次都创建一个新对象，各自的数据互不影响
```js
components: {
  test: {
    template: '#test',
    data() {  // 使用工厂函数返回一个对象的模式
      return {
        name: 'TEST'}}}}
```
- 父组件向子组件传值
- 子组件中有一个属性 props，属性值可以为数组或对象
- 当值为数组时，存储的是自定义变量名，使用时在标签中用 v-bind 绑定该变量名，并把父组件中数据赋值给它即可
```html
<!-- 使用时在组件标签上使用，v-bind 绑定变量，把想要传递的值赋给该变量 -->
<test :cname='xxx'></test>
<script>
components: {
  test: {
    template: '#test',
    props: ['cname'], // 子组件中定义 props 属性，数组里存放的是变量名，自取
    data() {
      return {
        name: 'TEST'}}}}
</script>
```
- 当值为对象时，`{type: xxx, default: xxx, required: true/false}` 有着这三个属性
- type 属性指定数据类型：String, Number, Array, Object, Boolean, Date, Function, Symbol
- 当 type 有多个值时，用数组将多个类型存储起来，当只需规定类型时，可简写：`props: {name: String}`
- default 是默认值，当类型是 Array/Object 时，默认值必须是工厂函数返回一个值，类似于 data()
- required 是必要的意思，规定当前值是否必须要传值，类型为 Boolean 
- 还可以自定义验证：validator, 可以自定义数据类型: type: Person （事先定义了一个 Person 类）
- 应该避免用 v-modle 双向绑定子组件 props 中的属性，而应用基于 props 创建的 data 中的数据
```js
props: {
  cname: {
    type: String, // 类型
    default: 'default test', // 默认值
    required: false // 是否必传值
  }
}
```
- 子组件向父组件传值
- 在子组件中定义方法，方法里用 `this.$emit()` 发射自定义事件，该方法一般用事件驱动
- `this.$emit()` 里有两个参数，第一个是自定义事件名，第二个是要传递的值
- 使用时在组件标签上用 v-on 绑定该事件，事件方法的默认参数即传递的数据
- v-on 不仅可以监听DOM事件，也可用于组件间的事件，DOM事件默认参数为event，组件自定义事件参数默认为传递的值
```html
<!-- 绑定自定义事件，事件方法 requiredata 在父组件中定义，默认参数就是传递的值，类似于 event -->
<test @send-data='requiredata'></test>
<script> 
  // 父组件中
  methods: {
    requiredata(data) { // 默认参数就是传递的值
      console.log(data)}}
  // 子组件中
  components: {
    test: {
      template: '#test',
      methods: { // 定义方法
        cclick() { // 在方法里发射自定义事件，传值该组件的 name 数据
          this.$emit('send-data', this.name)}}}}
</script>
```

# 父子组件的访问
- 父组件直接访问子组件：`$children` 或 `$refs` 
- `this.$children` 是一个数组，包含了当前父组件下所有的子组件对象
- `this.$refs` 默认是一个空对象，只有在子组件上绑定属性：`ref='name'`，才可以获得相关子组件对象：`this.$refs.name`
```html
<div id="app">
  <!-- 两个子组件，一个绑定了 ref 属性，一个没有 -->
  <test></test>
  <test ref="two"></test>
  <input type="button" value="按钮" @click="showchildren">
</div>
<template id="test"><div>test</div></template>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      name: 'TEST PARENT' // 父组件中的 name 值
    },
    methods: {
      showchildren() {
        console.log(this.$children) // 将两个子组件都打印出来
        console.log(this.$refs); // 只打印绑定了 ref 属性的组件
      }
    },
    components: {
      test: {
        template: '#test',
        data() {
          return { cname: 'test children'}}}}}) // 子组件中 cname 值
</script>
```
- 子组件访问父组件: `this.$parent`
- 默认就是父组件对象，可直接调用父组件属性
- 不推荐使用，会降低组件的独立性
- `this.$root` 直接访问 Vue 实例，跟组件

# 插槽slot
- 为原有的组件增加更强的扩展性
- 方式一：直接载组件模板里预留 <slot></slot> 标签，使用时在组件标签里写入想要显示的内容即可
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
- 方式二：可以直接在 slot 标签里写入默认内容
- 方式三：具名插槽，当一个组件中有多个插槽时，可以设置 name 属性来区分， 使用时则表明 slot 属性，两属性值相等即可
```html
<!-- 组件中 -->
<slot name='aaa'></slot>
<!-- 使用时 -->
<div slot='aaa'>
  ...
</div>
```
- 方式四：作用域插槽，替换插槽的时候，数据由子组件来提供
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