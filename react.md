<!-- 笔记来源：React 官网 -->

# **组件**

## **概述**

组件是 UI 的基础

HTML 允许使用内置的标签集来创建丰富的结构化文档

而 React 允许将标签、CSS 和 JavaScript 组合成自定义的组件，来绘制整个页面

## **定义组件**

```js
// 1.导出组件
// 2.定义函数，组件的名称必须以大写字母开头
export default function Profile() {
  // 3.添加标签，是 JavaScript 的 JSX 语法，非 HTML
  return <img src="xxx.jpg" alt="xxx" />
}
```

## **使用组件**

```html
<section>
  <Profile />
</section>
```

`<section>` 小写而 `<Profile />` 以大写开头，所以 React 能识别出谁是 HTML 标签，谁是自定义组件

最终在浏览器中看到的是组件内部的基础标签，而非组件标签：

```html
<section>
  <img src="xxx.jpg" alt="xxx" />
</section>
```

组件内部可以渲染其他组件，但不应去定义其他组件

## **导入导出组件**

组件应当模块化：

  1. 创建一个新的 JS 文件存放组件
  2. 导出该文件中的组件，可使用默认导出和具名导出
  3. 在使用组件的地方导入组件，根据导出方式导入

默认导出与具名导出语法比较：

语法 | 导出语句                               | 导入语句
---  |---                                    |---
默认 | `export default function Button() {}` | `import Button from './Button.js`
具名 | `export function Button() {}`         | `import { Button } from './Button.js'`

## **传递 Props 给组件**

组件间可通过 Props 来通信，它可以是任意 JavaScript 值

```js
// 1.传递 props 给组件，方式类似 HTML 的属性
<Avatar person={{ name: 'xxx' }} size={100} />
// 2.在子组件中读取 props ，方式同函数参数， 一般使用解构语法 
function Avatar({ person, size })
// 如需默认值则同参数默认值，当不传值或值为 undefined 时生效
function Avatar({ { person, size = 100 } })
```

JSX 提供一种展开语法，可以有效的预防重复代码

```js
// props 里可以有很多个属性
<Avatar {...props} />
```

当将子组件嵌套在父组件的标签中时，父组件将在 `children` 的 props 中接收到值

```js
function Parent({ children }) {
  return <div>{children}</div>
}
<Parent>
  <Children />
<Prarent>
```

props 是不可变的，当组件需要改变它的 props 时只能重新请求父组件传递一个新的 props

## **条件渲染**

大概分为三种方式：

  1. 使用 `if`
  2. 使用三目运算符 `? :`
  3. 使用与运算符或或运算符 `&&` `||`

## **列表渲染**

一般通过 `map` 方法渲染组件列表，`filter` 方法筛选

需要用 `key` 来保持列表的顺序

## **保持组件纯粹**

纯函数：

  1. 只负责自己的任务，不会更改在该函数调用前就已存在的对象或变量
  2. 输入相同，则输出相同，给定相同的输入，组件应该总是返回相同的 JSX

# **JSX 拓展语法**

## **概述**

JSX 允许在 JavaScript 中书写类似 HTML 的标签

JSX 是 JavaScript 的一种语法扩展，而 React 则是一个 JavaScript 库，它们相互独立却通常一同使用

## **规则**

***只能返回一个根元素***

一般使用 `<div>` 标签，但若不想增加一个额外的标签，可以使用空标签 `<></>`

在底层一个 JSX 标签会被转化成一个 JavaScript 对象，而一个函数不能返回多个对象，需要用一个数组包裹

***标签必须闭合***

自闭合标签必须闭合 `<img />`，普通标签则必需开始标签和结束标签 `<div></div>`

***使用驼峰式命名法给属性命名***

JSX 中需用 `strokeWidth` 代替 `stroke-width` ，用 `className` 代替 `class`，同 DOM

JSX 会转化成 JavaScript 对象，而 JavaScript 对变量的命名有限制，不能包含 `-` 符号和 `class` 关键字

## **通过大括号使用 JavaScript**

JSX 中只可在标签内的文本 `<p>{title}</p>` 和紧跟在 `=` 后的属性 `src={avatar}` 这两个地方使用 `{}`

`{}` 中除了字符串，数字和表达式，也可以传递对象，这时可能会出现双大括号情况

```html
<p style={{ width: '100%' }} className='info'>我是 {name} </p>
```






















# **CDN 引入**

```html
<!-- 准备容器 -->
<div id="app"></div>

<!-- 引入 react 核心库 -->
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<!-- 引入 react-dom , 用于支持 react 操作 DOM -->
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<!-- 引入 babel , 用于将 jsx 转为 js -->
<script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<!-- 使用 JSX 创建虚拟 DOM -->
<script type="text/babel">
  const VDOM = <h1 title="title">Hello, React</h1>
  // 渲染
  ReactDOM.render(VDOM, document.getElementById('app'))
  // 虚拟 DOM 本质是 js 对象
  console.log(VDOM)
</script>
```

# **组件**

用来实现局部功能效果的代码和资源的集合, html , css , js , image 等

可以直接使用函数来定义 '函数' 组件, 也可以使用 `ES6` 中的类来定义 'class' 组件

## **函数式组件**

```html
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
  class Person1 extends React.Component {
    // 类型限制
    // 小写的 propTypes 在类上, 大写的 PropTypes 在包里 (16+)
    static propTypes = {
      // name: PropTypes.string.isRequired,
      // speak: PropTypes.func
    }
    // 默认值
    static defaultProps = {}
    render() {
      // 直接用 this.props 来使用 props
      // this.props.name = 'xxx' 错误, props 是只读的
      return (
        <ul>
          <li>{this.props.name}</li>
          <li>{this.props.age}</li>
        </ul>
      )
    }
  }
  // 调用时在标签上定义属性即可
  // ReactDOM.render(<Person1 name='aa' age='bb' />, document.getElementById('app6'))
  // 简写方式, 用展开运算符展开对象, 原生不能这样使用, 只在标签上可以
  ReactDOM.render(<Person1 {...{ name: 'aaa1', age: 'bbb1' }} />, document.getElementById('app6'))
  ReactDOM.render(<Person2 {...{ name: 'aaa2', age: 'bbb2' }} />, document.getElementById('app7'))
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

## **组件的 props 属性**

```html
<!-- 类中的 props -->
<script type="text/babel">
  class Person extends React.Component {
    // 类型限制
    // 小写的 propTypes 在类上, 大写的 PropTypes 在包里 (16+), 名称不可更改
    static propTypes = {
      name: PropTypes.string.isRequired,
      speak: PropTypes.func
    }
    // 默认值
    static defaultProps = {}
    render() {
      // this.props.name = 'xxx' 错误, props 是只读的
      return (
        <ul>
          <li>{this.props.name}</li>
          <li>{this.props.age}</li>
        </ul>
      )
    }
  }
  // 一般方式
  // ReactDOM.render(<Person name='aa' age='bb' />, document.getElementById('app6'))
  // 简写方式, 用展开运算符展开对象, 原生不能这样使用, 且 react 中只在标签上可以直接展开对象
  ReactDOM.render(<Person {...{ name: 'aaa', age: 'bbb' }} />, document.getElementById('app6'))
</script>
```

React 中构造器只用于以下两个场景

  - 通过 `this.state` 赋值对象来初始化 `state`
  - 为事件处理函数绑定实例

即非必要可以不使用 `construct` , 如果使用, 需要接收 `props` 并 `super(props)`

```html
<!-- 函数中的 props -->
<script type="text/babel">
// 通过参数 props 来获得 props
function Person2(props) {
  // 参数的类型限制和默认值通过 Person2.propTypes 或 .defaultProps 来实现
  return (
    <ul>
      <li>{props.name}</li>
      <li>{props.age}</li>
    </ul>
  )
}
</script>
```

## **组件实例的 refs 属性**

react 中提供 `refs` 属性获取原生 HTML 元素或者 react 组件实例, 分为三种形式

  - 字符串形式, 不推荐, 会被遗弃 `ref='xxx'` , 字符串就存在组件实例的 `refs` 上
  - 回调函数形式, `ref={c => this.xxx = c}` , 回调中 c 即节点, 赋给组件上的属性
  - 最新形式 `createRef()` , 该方法返回 ref 所在的节点, 事先用属性存储

```html
<!-- 组件实例的 refs 属性 -->
<script type="text/babel">
  class TextInput extends React.Component {
    showMsg1 = () => alert(this.refs.input1.value)
    showMsg2 = () => alert(this.input2.value)
    setRef = c => this.input2 = c
    showMsg3 = () => console.log(this)
    render() {
      return (
        <div>
          { /* 字符串形式, 不推荐, 会被遗弃 */}
          <input ref='input1' type="text" placeholder="失去焦点提示" onBlur={this.showMsg1} /><br />
          { /* 回调函数形式, 该回调会有一个参数表示当前节点, 再把该节点赋给实例的 input2 */}
          { /* 使用内敛写法会在每次更新时, 函数被调用两次, 清空旧的设置新的, 避免重复调用可以定义成 class 绑定的函数 */}
          { /* <input ref={c => this.input2 = c} type="text" placeholder="失去焦点提示" onBlur={this.showMsg2} /> */}
          <input ref={this.setRef} type="text" placeholder="失去焦点提示" onBlur={this.showMsg2} /><br />
          { /* 最新的 createRef() 形式, 该函数将 ref={} 所在节点返回, 缺点是一个对应一个 */}
          <input ref={this.input3 = React.createRef()} type="text" placeholder="失去焦点提示" onBlur={this.showMsg3} />
        </div>
      )
    }
  }
</script>
```

# **事件处理**

React 中通过 `onXxx` 属性指定事件处理器, 它是用的自定义事件而非原生, 做了更好的兼容性

事件绑定中 `onXxx` 后不得加小括号, 否则就是执行函数, 要想传递参数应该保证是个函数

默认的事件参数名称为 `event` , 也可以显示修改名称

```js
this.onXxx.bind(this, arguments)
() => this.onXxx(arguments)
```

# **表单与受控组件**

现拿现用, 即想获取数据时通过 ref 拿到数据再使用, 这是非受控组件, 频繁使用 ref , 不推荐

将数据时刻保存在 state 中, 使用时从 state 中读取, 类似双向绑定, 这是受控组件

# **生命周期**

## **概述**

组件从创建到死亡会经历特定的阶段, react 会在这些阶段执行特定的回调函数

## **旧生命周期**

初始化时的顺序: constructor -> componentWillMount -> render -> componentDidMount

```html
<script type="text/babel">
  // 生命周期回调函数
  class Life extends React.Component {
    // 构造器, 初始化调用
    constructor(props) { console.log('constructor') }
    // 组件将要挂载
    componentWillMount() { console.log('componentWillMount') }
    // 初始化渲染和状态更新后调用
    render() { console.log('render') }
    // 组件完成挂载后调用
    componentDidMount() { console.log('componentDidMount') }
    // 组件将要卸载时调用
    componentWillUnmount() { console.log('componentWillUnmount') }
  }
</script>
```

更新时的顺序:

  - setState() -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
  - forceUpdate() -> componentWillUpdate -> render -> componentDidUpdate
  - 父组件 render() -> componentWillReceiveProps -> shouldComponentUpdate -> ...

```html
<script type="text/babel">
  // 生命周期回调函数
  class Life extends React.Component {
    // 组件将要接收新的 props 时调用, 第一次不算, 适用于父子间组件传值
    componentWillReceiveProps(props) { console.log('componentWillReceiveProps') }
    // 组件是否应该被更新, 必须返回一个布尔值
    shouldComponentUpdate() {
      console.log('shouldComponentUpdate')
      return true
    }
    // 组件将要更新
    componentWillUpdate() { console.log('componentWillUpdate') }
    // 初始化渲染和状态更新后调用
    render() { console.log('render') }
    // 组件完成更新
    componentDidUpdate() { console.log('componentDidUpdate') }
  }
</script>
```

## **新生命周期**

```js
// 这三个需要加上 UNSAFE_ 前缀, 可以说废弃了
UNSAFE_componentWillMount() { console.log('UNSAFE_componentWillMount') }
UNSAFE_componentWillReceiveProps() { console.log('UNSAFE_componentWillReceiveProps') }
UNSAFE_componentWillUpdate() { console.log('UNSAFE_componentWillUpdate') }
```

挂载顺序: constructor -> getDerivedStateFromProps -> render -> componentDidMount

更新时: ... -> getDerivedStateFromProps -> ... -> getSnapshotBeforeUpdate -> componentDidUpdate

```js
// 从 props 得到派生状态, 需要写成静态方法, 且返回状态
// 当 state 的值任何时候都取决于 props 时可以使用
static getDerivedStateFromProps(props, state) {
  console.log('getDerivedStateFromProps')
  return null
}
// 更新前返回快照值, 需返回值
getSnapshotBeforeUpdate() {
  console.log('getSnapshotBeforeUpdate')
  return 'snapshot'
}
componentDidUpdate(preProps, preState, snapshot) {
  console.log('getSnapshotBeforeUpdate', preProps, preState, snapshot)
}
```