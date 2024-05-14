## **数组的响应式**

对象的每一项甚至嵌套对象, Vue 都会劫持设置 getter/setter, 所以都是响应式的

而 Vue 不会给数组的每一项添加 getter/setter, 所以直接操作数组的每一项的操作不是响应式, 如下标修改

数组响应式函数：push, pop, shift, unshift, splice, sort, reverse, Vue 将这些方法包装了一下, 让它们可以响应式变化

为什么不给数组的每一项添加响应式设计: 理论上可以, 但作者说时性能问题

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
vm.$watch("isHot", {
  /* 与配置项里一致 */
});
```

## **深度监视**

Vue 自身可以检测对象内部值的变化, 但 Vue 提供的 `watch` 默认不可以

watch 配置里的 `deep` 实现滚设置为 true 即可监测

```js
watch: {
  isHot: {
    deep: true, handler();
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

**key 的作用与原理**

key 是虚拟 DOM 对象的标识, 当数据发生变化时, Vue 会根据新数据生成新的虚拟 DOM, 随后 Vue 会进行新虚拟 DOM 与旧虚拟 DOM 的差异比较:

- 旧虚拟 DOM 中找到与新虚拟 DOM 相同的 key：当虚拟 DOM 中内容没变, 直接使用之前的真实 DOM, 当虚拟 DOM 中内容变了, 则生成新的真实 DOM
- 旧虚拟 DOM 中找不到与新虚拟 DOM 相同的 key: 创建新的真实 DOM 并渲染

当 `key` 使用 index 时, 如果对数据进行改变顺序的操作, 会产生没有必要的真实 DOM 的更新(效率低下), 而如果有输入类 DOM 的时候, 会造成输入类 DOM 错位的情况

一般开发中建议使用数据的唯一标识作为 `key`

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

指令名如果是多个单词, 需使用 `kebab-case` 命名方式 1, 不用 `camelCase` 命名方式

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
      x: 1,
    };
  },
};
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
    xxx: demo, // 'xxx' 组件的标签名
  },
});
```

全局注册: 使用 `Vue.component(标签名, 组件)` 方法

```js
Vue.component("xxx", demo);
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
<style>
  组件样式
</style>
<template>组件模板</template>
<script>
  组件脚本;
</script>
```

script 中利用 es6 模块化导出, 直接导出对象是因为注册组件时, 当接受的是对象将自动调用创建组件的 api

```html
<script>
  export default {
    name: "demo", // 指定组件名称, 指定在开发者工具中的名字
    data() {
      return {
        xxx,
      };
    },
  };
</script>
```

# **Vue 脚手架**

安装 `@vue/cli` 包 `npm i @vue/cli -g`, 装完即可识别 vue 命令

创建项目 `vue create xxx`

## **render 函数**

默认使用 es6 引入 `import Vue from 'vue'` 的 vue 是 `vue.runtime.esm.js` 版本, 缺少模板编译器

模板编译完成后, 就不需要编译器了, 不需要再打包到项目文件里, 节省空间

```js
import Vue from "vue";
new Vue({
  // 使用 template 配置项不会生效，因为没有模板解析器
  // template: `<h2>hello</h2>`,
  // 使用 render 函数接收到的 createElement 函数去指定具体内容
  render: () => (createElement) => createElement("h2", "hello"),
}).$mount("#app");
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
import Vue from "vue";
new Vue({
  // 使用 template 配置项不会生效，因为没有模板解析器
  // template: `<h2>hello</h2>`,
  // 使用 render 函数接收到的 createElement 函数去指定具体内容
  render: () => (createElement) => createElement("h2", "hello"),
}).$mount("#app");
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
<Demo name="xxx" />
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
    Vue.prototype.$bus = this; // 安装全局事件总线
  },
});
```

```js
// 发送数据
this.$bus.$emit("xxx", 数据);
// 最好在 beforeDestroy 钩子中用 $off 解绑当前组件所用到的事件
// 接受数据
this.$bus.$on("xxx", 回调);
```

## **消息的订阅与发布**

可以安装 `pubsub-js` 实现

api: `pubsub.subscribe(消息名, 回调)` `pubsub.publish(消息名, 数据)` `pubsub.unsubscribe(pid)`

# **nextTick**

在下一次 DOM 更新结束后执行其指定的回调

```js
this.$nextTick(回调函数);
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
<transition name="test" appear> xxx </transition>
```

**动画实现**

```css
/* 进入, 名称固定, 但前面 test 是 transition 的 name, 若没有则用 v 来表示 */
.test-enter-active {
  animation: xxx 0.5s;
}
/* 离开 , 名称固定, 但前面 test 是 transition 的 name, 若没有则用 v 来表示*/
.test-leave-active {
  animation: xxx 0.5s reverse;
}
@keyframes xxx {
}
```

**过渡实现**

```css
/* 进入起点, 离开终点 */
.test-enter,
.test-leave-to {
  transform: translateX(-100%);
}
/* 进入的过程, 离开的过程 */
.test-enter-active,
.test-leave-active {
  transition: 0.5s;
}
/* 进入终点, 离开起点 */
.test-enter-to,
.test-leave {
  transform: translateX(0);
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
  proxy: "http://localhost:8000";
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
<slot name="aaa"></slot>
<slot name="bbb"></slot>
<!-- 使用时 -->
<div slot="aaa"></div>
<div slot="bbb"></div>
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
    <slot :sname="name"></slot>
  </div>
</template>
<!-- 使用时，在 template 标签里使用，绑定属性 slot-scope ，属性值即为 slot 对象 -->
<!-- 也可以不在 template 标签上使用 -->
<test>
  <template slot-scope="test">{{test.sname}}</template>
  <div slot-scope="test">{{test}}</div>
</test>
```

# **vuex**

## **概念**

专门在 Vue 中实现集中式数据管理的插件

## **快速上手**

组件中读取 vuex 的数据: `$store.state.sum`

组件中修改 vuex 的数据: `$store.dispatch('actions方法名', 数据)` 或 `$store.commit('mutations中方法名', 数据)`

一般情况下: `state -> actions -> mutations`, 但如果没有其他业务逻辑, 可以越过 `actions`

```js
// npm i vuex 安装
import Vuex from "vuex"; // 导入
Vue.use(Vuex); // 使用插件
new Vue({
  store: store, // 再 new Vue 中配置
});
```

```js
// 定义 store, 以及其中的 state, actions, mutations
export default new Vuex.Store({
  state: {}, // 准备 state 用于存储数据
  actions: {}, // 准备 actions 用于响应组件中的动作
  mutations: {}, // 准备 mutations 用于操作数据
});
```

## **上下文对象**

在 `actions` 中存在, 包括了 `dispatch` `commit` `state` 等, 方便做一些处理

## **getters**

相当于 store 的计算属性, 可以在全局复用的计算属性

```js
export default new Vuex.Store({
  getters: {
    xxx() {
      return xxx;
    },
  },
});
```

## **mapState 与 mapGetters**

`vuex` 中提供的映射 `state` 与 `getters` 中数据的方式, 方便在组件中的应用

`mapState` 和 `mapGetters` 中会返回一个对象, 做一个映射

```js
computed: {
  ...mapState({ xxx: 'xxx', ... }) // 对象写法
  ...mapState({ xxx: 'xxx', ... }) // 对象写法
  ...mapState(['xxx', '...']) // 数组写法
}
```

## **mapActions 与 mapMutations**

类似上面, 可以简写 `actions` 和 `mutations` 的 `dispatch` 和 `commit`

```js
<input type='button' value='click me' @click='test(n)'>
methods: {
  ...mapActions({
    test: 'test' // 'test' 为 actions 中的方法
  })
  ...mapMutations({
    test: 'TEST' // 'TEST' 为 mutations 中的方法
  })
}
```

## **modules 模块化**

允许将 store 分割成模块，相当于一层一层的

```js
// 定义不同的 store 模块
const s1 = { actions: ..., mutations: ..., state: ..., getters: ... }
cosnt s2 = { ... }
// 导出
export default new Vuex.Store({
  modules: {
    s1,
    s2
  }
})
```

模块化之后, 数据都分别存在 s1, s2 中, 比如 `$store.state.s1.xxx`, 需要分别去拿

也可以使用 `namespaced: true` 配置来配置命名空间

```js
// 使用命名空间来区别
...mapState('s1', { xxx: 'xxx', ... }) // 对象写法
...mapState('s2', { xxx: 'xxx', ... }) // 对象写法
```

在使用了 `namespaced: true` 之后, 但不用 map 类方法

```js
// commit
this.$store.commit("s1/TEST", xxx);
```

# **路由**

`npm i vue-router` 安装

通过检测地址栏 url 的变化, 根据配置好的路由组件来进行组件间的切换, 这种切换并不会刷新页面。

组件的切换会销毁组件和重新挂载组件

## **SPA 应用**

单页面应用, 只有一个页面, 跳转不会刷新页面

## **前后端路由**

路由一般是 `key-value` 形式

前端: `key` 匹配路径, `value` 是组件, 根据路径展示不同组件

后端: `key` 匹配路径, `value` 是处理函数, 根据路径匹配不同处理函数

## **基本路由使用**

在 js 里配置好路由, 在页面上用 `<router-link>` 来指定跳转的链接, `<router-view>` 指定路由出口

`<router-link>` 有两个属性 `to` 指定跳转 url, `active-class` 指定激活路由时的样式类名

```js
// 一级路由带有根路径 /
const routes = [{ path: "/xxx", component: xxx }];
// 页面上使用
<router-link to='/xxx' active-class='active'><router-link>
<router-view>
```

## **多级路由**

在 `children` 配置项里配置, 同样有 `path` `component` 等属性, 但 `path` 不加 `/`

```js
routes = [
  { path: '/xxx', component: xxx },
  {
    path: '/xxx',
    component: xxx,
    children: [
      path: 'xxx', component: xxx
    ]
  }
]
```

## **$route 或 $router**

每个组件都有自己的 `$route` 属性, 存储着自己的路由信息

整个应用只有一个 `$router`, 存储着路由相关方法

## **路由参数**

```js
// 带 query 参数并跳转路由
// 配置路由时不变
<router-link :to="`/home/message/detail?id=${id}`"></router-link> // 字符串
<router-link :to="{ path: '/home/message/detail', query: {id: id}}"></router-link> // 对象
// 带 params 参数并跳转路由
<router-link :to="`/home/message/detail/${id}`"></router-link> // 字符串
<router-link :to="{ name: 'detail', params: {id: id}}"></router-link> // 对象, 不允许写 path, 只能用 name
// 配置路由时
{
  name: 'detail'
  path: 'detail/:id', // : 占位
}
```

## **路由其他配置**

**name**

命名路由, 配置路由时可以加一个 name 参数, 使用时可以用 name 字段来指定路由, 而不用 path

**props**

在路由配置时可以配上 `props` 这样在组件中也可以用 `props` 接收, 同父传子

```js
{
  path: '',
  component: xxx,
  // 对象形式, 该对象中所有 key-value 都会以 props 形式传递个 xxx 组件
  // props: { a: 1, b: 2 }
  // 布尔值, 为真时把该路由组件收到的所有 params 参数以 props 的形式传给 xxx 组件
  // props: true
  // 函数形式, 带有参数 $route 可拿到路由信息
  props($route) {
    return { id: $route.query.id, title: $route.query.title }
  }
}
```

## **路由历史记录**

使用 `router-link` 默认是 `push` 模式, 他会生成新的历史记录而不会删除当前的

可以使用 `<router-link replace>` 改变成 `replace` 模式, 会替换掉当前历史记录

## **编程式导航**

利用 `$rouer` 上的方法来实现, 而不借助 `<router-link>`

```js
// 历史记录跳转, number 为正数则往前跳几步, 为负则往后跳几步
this.$router.go(number)
// push 模式跳转
this.$router.push({配置路劲参数等})
// replace 模式跳转
this.$router.replace({配置路劲参数等})
// 前进
this.$router.forward()
// 后退
this.$router.back()
```

## **缓存路由组件**

使用 `<keep-alive></keep-alive>` 标签包裹路由出口标签, 可以使用 `include` 来指定需要缓存的组件

可以缓存切走的路由组件, 而不销毁, 保存比如输入的内容等

```js
<keep-alive include='组件名'>
  <router-view></router-view>
</keep-alive>
<keep-alive :include='[组件名, ...]'></keep-alive>
```

## **activated 和 deactivated**

路由相关的生命周期, 路由组件激活时触发和路由组件失活时触发, 只适用于路由组件

```js
activated() {
  this.timer = setInterval(() => console.log(1), 16)
}
deactivated() {
  clearInterval(this.timer)
}
```

## **路由守卫**

**全局前置路由守卫**

在路由切换之前调用守卫函数从而达到保护路由的目的

`router.beforeEach((to, from, next) => { })` 通过此函数来在路由跳转前做一些验证

```js
// 全局放置路由守卫 - 初始化时被调用, 每次切换前被调用
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 当跳转到 news 或 message 时判断本地缓存中学校名字
  // 通过 to.path 来决定那些路径需要守卫
  if (to.path === '/home/news' || to.path === '/home/message') {
    if (localStorage.getItem('school') === 'xxx') {
      next()
    } else {
      alert('无权限!')
    }
  } else {
    next()
  }
})
```

可以通过路由配置的配置项 `meta: { }`, 一般在 `meta` 配置项里配置布尔属性来判断那些路径需要守卫

```js
{
  name: '',
  path: '',
  component: xxx,
  meta: { isAuth: true }
}
```
```js
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    ...
  }
})
```

**全局后置路由守卫**

`router.afterEach((to, from) => { })` 在路由跳转之后触发

**独享路由守卫**

在配置路由组件的地方配置 `beforeEnter` 表示前置路由守卫, 只对这个组件路由做守卫, 没有独自的后置路由守卫

```js
{
  path: ...,
  component: ...,
  beforeEnter: (to, from, next) => {
    ... // 逻辑于全局一致
  }
}
```

**组件内路由守卫**

在组件内部实现路由守卫 `beforeRouteEnter` `beforeRouterLeave`

```js
new Vue({
  // 通过路由规则进入该组件时被调用
  beforeRouteEnter(to, from, next) {
  
  }
  // 通过路由规则离开组件时被调用
  beforeRouterLeave(to, from, next) {
  
  }
})
```

## **history 模式和 hash 模式**

在 `new VueRouter({ routes, mode})` 中通过 `mode` 来配置 `history/hash`

区别1: hash 模式兼容性比 history 模式兼容性好

区别2: 部署时使用 history 模式的话, 刷新页面会将路径上的内容发送给服务器, 会报 404 错误

# Vue 原理

## 什么是响应式

举个例子来说：c = a + b，改变 a 和 b 的同时，c 也会自动改变。

对应到 Vue 中就是更改状态的同时，组件视图也会自动更新。

## Vue 中响应式是如何工作的

原生 JS 中并不能对一个基本类型的变量进行追踪的，但是可以追踪对象属性的读写。**（为什么 ref 返回的是一个对象而不是一个基本变量）**

JS 中有两种劫持属性的方式：getter/setter 和 Proxy，Vue 3 中使用 Proxy 来创建响应式对象，但仍然会把 getter/setter 用在 ref 上。

在 getter 中有 track 函数，它会检查当前是否有正在运行的副作用，然后查到该属性的所有订阅的副作用的 Set，然后将这个副作用作为新的订阅者添加上去。

在 setter 中有 trigger 函数，它会再次查找该属性的所有订阅副作用，并执行他们。