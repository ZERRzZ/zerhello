# Vue.js安装
- CND导入  
```html
<!-- 开发环境版本，包含了有帮助的命令行注释 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
``` 
- 直接下载到本地
- NPM安装：`npm install vue`

# Vue基础结构
- 编程范式：Vue是声明范式，而原生JS是命名范式
```js
// <div id='app'>{{message}}</div>
// 创建一个 Vue 实例， 传入对象，固定的属性名对应固定的功能
cosnt app = new Vue({
  el: '#app', // 挂载要管理的元素
  data: {  // 定义数据
    message: 'Hello Vue'
  }
})
```

# Vue中的MVVM

- MVVM即：Moudle-View-ViewMoudle
- Moudle即数据，View即DOM，View-Moudle即Vue
- [vue中的MVVM](./img/Vue中MVVM.png)

# Vue实例的参数

- el: 数据类型：string/HTMLElement 决定Vue实例要挂载的DOM
- data: 数据类型：Object/Function Vue实例对应的数据对象
- methods: {[key: string]: function} 定义Vue方法

# 模板语法

- Mustache语法：{{}}，不仅可以写变量，还可以写表达式

# 简单指令-插值操作
- 一般指令名作为元素的属性放在开始标签里
- 有的指令有值则类似属性值的写法

- v-once: {{}} 中的值并不会随着变量的改变而改变，无值
- v-html: {{}} 中的值通过 html 来解析，有值，值为要解析的数据
- v-text: 类似于 {{}}， 但会覆盖标签原有的内容，值为要展示的数据
- v-pre: 将标签内容原封不动的展示出来，无值
- v-cloak: 斗篷，无值，当vue加载完成后，会将这个属性删除
```html
<!-- 一般配合css使用，将未用vue渲染的文本隐藏 -->
<style>
  [v-cloak]: {disply: none}
</style>
<div id='app' v-cloak></div>
```

# 简单指令-绑定属性
- v-bind: 动态绑定属性，缩写：：，格式：`v-bind:href="变量"`
```html
<div id="app">
  <!-- 根据 urls 中值创建多个 img -->
  <img v-bind:src="url" v-for="url in urls">
  <!-- 语法糖 -->
  <!-- <img :src="url" v-for="url in url1"> -->
</div>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      urls: ['./test.jpg', '../img/包相关命令.png']
    }
  })
</script>
```
- v-bind 的值可以为一个对象，属性值为boolean，当为真时，显示该属性，为假时不显示
- 绑定 class 时：`:class='{key: value, 类名：boolean值}'`
```html
<!-- 点击那个 li， 该 li 里的文字边红 -->
<style>.red {color: red;}</style>
<div id="app">
  <ul><li v-for='i in bangumi' :class="{red: init === i}" @click="addRed(i)">{{i}}</li></ul>
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
- v-bind 也可以绑定 style 属性，`:style='{key: value, css属性名：css属性值}'`
- 属性名用小驼峰命名发

# 计算属性computed
- 原理上是一个属性，属性值有 set(), ge() 方法，一般只写 get(),故而简写
- 在多次调用时，计算属性会缓存，实际上只调用一次，从而提高性能
- 使用时不用 () 来执行函数，实际上调用的是属性的 get/set方法
```js
// 完整的计算属性写法
// 由于一般情况下不会使用set方法，所以可以简写
computed: {
  // func 是属性，值是一个对象
  func: {
    set() { ... },
    get() {
      console.log('使用了get方法')
    }
  }
}
// 简写
computed: {
  func() { console.log('使用了get方法')}
}
```

# 事件监听v-on
- v-on：绑定事件监听器，缩写：@，参数可以是事件函数或表达式 `v-on:click='func'`
```html
<!-- v-on:click 不能有空格，注意格式 -->
<!-- 语法糖：@click -->
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
- 事件参数 event，当只需要该参数时，可以在调用时不加小括号，而定义时使用该参数
- 当既需要事件参数 event，又需要其他参数时，用 `$event` 来表示事件参数
```js
// 以下两种方法都可以把event参数传过去
<input type="button" value="点击" v-on:click="showMessage">
<input type="button" value="点击" v-on:click="showMessage($event)">
```
- [v-on修饰符](./img/v-on修饰符.png)：.stop, .prevent, .keyCode/keyAlias, .native, .once
- `@click.stop='func'` 阻止了事件的冒泡，即调用 `event.stopPropagation()`
- `@click.prevent='func'` 阻止默认行为，即调用 `event.preventDefault()`
- `@keyup.enter='func'` 监听了键盘上的 enter 键
- `.native` 监听了组件根元素的原生事件
- `.once` 只能触发一次时间函数

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

# v-model绑定表单
- 基础用法：`<input type="text" v-model='name'>` name 为变量，在 vue 实例中定义
- 双向绑定：修改 name 的值会改变 value 值，反之，修改 value 的值也会改变 name 值
- 双向绑定本质：v-bind 绑定 value 属性赋值为 name ，v-on 绑定 input 事件，时间函数：name = e.target.value
```html
<div id="app">
  <input type="text" :value="name" @keyup="change">
  <div>{{name}}</div>
</div>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      name: 'sadanya'
    },
    methods: {
      change(e) { 
        this.name = e.target.value
      }
    }
  })
</script>
```
- v-model 配合 radio 使用, 有 v-model 也可以二选一，name 属性就可以不要了
```html
<label><input type="radio" value="male" v-model="gender">男</label>
<label><input type="radio" value="female" v-model="gender">女</label>
```
- v-model 配合 checkbox 使用
- 当作为单选框是 v-model 绑定的值时布尔值，选中为true，未选中为false
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
- 当作为多选框使用时，v-model 绑定的值是数组类型，与 value 对应
- 值绑定：表单标签的 value 值可能从后端动态获取，所以用上值绑定
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
- v-model 配合 select 使用，v-model 绑定在 select 标签上，不常用
- v-model 的修饰符：
- `.lazy`: 默认会同步数据与输入框的内容，lazy 可以让数据在失去焦点或回车时才会更新
- `.number`: 将类型转化为数字类型
- `.trim`: 去除两边的空格

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