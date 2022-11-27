# **定义**

用于构建用户界面的 JavaScript 库

由 Facebook 开发且开源

特点:

- 采用组件化的编码方式, 声明式编程, 效率和复用率高
- 可以用 React Native 使用 React 语法进行移动端开发
- 使用虚拟 DOM 和 Diffing 算法, 尽量减少与真实 DOM 的交互

# **CDN 引入**

```html
<!-- 准备容器 -->
<div id="app1"></div>
<div id="app2"></div>

<!-- 引入 react 核心库 -->
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<!-- 引入 react-dom , 用于支持 react 操作 DOM -->
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<!-- 引入 babel , 用于将 jsx 转为 js -->
<script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<!-- 使用 JSX 创建虚拟 DOM -->
<script type="text/babel">
  const VDOM3 = <h1 title="title">Hello, React</h1>
  // 渲染
  ReactDOM.render(VDOM3, document.getElementById('app2'))
  // 虚拟 DOM 本质式 js 对象
  console.log(VDOM3)
</script>
```

# **JSX 语法**

定义虚拟 DOM 时, 不用引号, 一般用 `()` 括起来

需要 JS 表达式的地方使用 `{}` 来包裹

样式的类名指定不用 `class` 而是 `className`

内联样式要用对象形式 `key: value` 形式来写

虚拟 DOM 只有一个根标签

标签名若以小写字母开头, 则转化为 html 同名标签; 若以大写字母开头, react 会渲染对应组件

# **组件**

## **简单介绍**

用来实现局部功能效果的代码和资源的集合, html , css , js , image 等

可以直接使用函数来定义 '函数' 组件, 也可以使用 `ES6` 中的类来定义 'class' 组件

## **函数式组件**

```html
<!-- 函数式组件 -->
<script type="text/babel">
  // 创建函数式组件 (大写)
  function Demo1() {
    console.log(this)
    return <h1>我是函数式组件</h1>
  }
  // 渲染函数式组件
  // react 会解析组件标签, 找到对应组件, 发现是函数式写法就调用函数, 将返回的虚拟 DOM 转成真实 DOM
  // 此时 Demo1 函数的 this 为 undefined , 因为是严格模式, 所以不让指向 window
  ReactDOM.render(<Demo1 />, document.getElementById('app3'))
</script>
```

## **类式组件**

```html
<!-- 类式组件 -->
<script type='text/babel'>
  // 创建类式组件, 需继承 React.Component 这个类
  class Demo2 extends React.Component {
    // 必须有 render 方法, 且返回 react 元素
    render() {
      console.log(this)
      return <h1>我是类式组件</h1>
    }
  }
  // 渲染类式组件
  // react 解析组件标签, 找到对应组件, 发现是类式写法就 new 该类, 并调用实例原型上的 render 方法, 将返回的虚拟 DOM 转成 真实 DOM
  ReactDOM.render(<Demo2 />, document.getElementById('app4'))
</script>
```

## **组件实例的 state 属性**

```html
<script type="text/babel">
  class Weather extends React.Component {
    // 添加构造器放法并 super(props)
    constructor(props) {
      super(props)
      // 修改实例对象上 state 的值
      this.state = { isHot: false }
    }
    render() {
      console.log(this)
      // 使用 state 中的值
      // react 中事件绑定, 命名基于原生但小驼峰, 函数不能加 () 否则就执行
      // 使用 bind 来修改 this 指向, 否则 change 函数中 this 为 undefined
      return <h1 onClick={this.change.bind(this)}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h1>
    }
    change() {
      // this 是 undefined , 丢失了
      // change 方法不是用实例调用的, 而是赋值给 onClick 作为回调来调用, 所以理应是 window , 但类中的方法默认开启局部 'use strict' , 所以是 undefined
      console.log(this)
      // state 不可以直接更改, 应用 setState 来更改
      this.setState({ isHot: !this.state.isHot })
    }
  }
  ReactDOM.render(<Weather />, document.getElementById('app5'))
</script>
```

setState 方法在 `React.Component` 的原型对象上, 接收修改的 state 对象, 会与原 state 对象合并而非覆盖

绑定事件是需要用 bind 来修改 this , 否则会因为不是通过实例对象调用, 从而丢失 this 指向, 或者用箭头函数也可

修改 state 后, 构造函数不会再调用, 而 render 方法只要页面更新就会再次调用

```html
<!-- 简写形式 -->
<script type="text/babel">
  class Weather extends React.Component {
    // 状态
    state = { ... }
    // render
    render() {
      return ...
    }
    // 其他函数
    change = () => ...
  }
</script>
```