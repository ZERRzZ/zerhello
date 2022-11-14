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