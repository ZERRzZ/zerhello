# 基础

## JS 输出

打印: `console.log()`, `console.warn()`, `console.error()`

警告框: `window.alert()`, `window.confirm()`, `window.prompt()` 区别在于返回值 `undefined/布尔值/用户输入值`

测试性能: `console.time()`, `console.timeEnd()` 开启与关闭计时器

写入 body/HTML 中: `document.write()` / `innerHTML`

JavaScript 位运算

& AND 如果两位都是 1 则设置每位为 1
| OR 如果两位之一为 1 则设置每位为 1
^ XOR 如果两位只有一位为 1 则设置每位为 1
~ NOT 反转所有位
<< 零填充左位移 通过从右推入零向左位移，并使最左边的位脱落。

> >     有符号右位移	通过从左推入符号位来向右位移，并使最右边的位脱落。
> >
> > >     零填充右位移	通过从左推入零来向右位移，并使最右边的位脱落。

判断奇偶 &
将小数转换为整数 | Math.floor()
用于交换两整数, 代码: a = a ^ b ,b = b ^ a, a= a ^ b

>

JavaScript DOM 基础

DOM 是宿主对象 Document Object Model
D: 网页即文档对象
O: 把文档的每一个元素, 每个部分转化为对象
M: 用模型来表示对象间的关系, 方便选取

节点: Node 构成 HTML 文档的最基本单元, 也是对象
分类: 文档节点, 元素节点, 属性节点, 文本节点
属性:
nodeName: #document | 标签名 | 属性名 | #text
nodeType: 9 | 1 | 2 | 3
nodeValue: null | null | 属性名 | (文本内容)

事件属性: 用户与浏览器交互的瞬间, 一般为该类属性绑定函数来实现一些功能
onclick 用户点击了 HTML 元素
onmouseover 用户把鼠标移动到 HTML 元素上
onmouseout 用户把鼠标移开 HTML 元素
onload 浏览器已经完成页面加载
onchange HTML 元素已被改变
onkeydown 用户按下键盘按键

浏览器加载页面时从上到下执行, 因注意 JS 代码的位置
可用 onload 事件让 JS 代码在页面加载完成之后才执行, 一般用 window.onload 实现

>

JavaScript DOM 元素操作

文档节点即 document 对象, 属于 window 对象的属性

获取元素节点: 用 document 调用
getElementById(), getElementsByTagName(), getElementsByName()
当获取一组元素节点时 (getElements), 会将其保存在一个数组里, 即使只有一个也是

获取元素节点的内容:
元素.innerHTML: 标签对里的内容, 单标签无 (文本节点)
元素.innerText: 将 innerHTML 中的标签去除 (文本节点)
元素.属性: 标签的属性, 当读取 class 时需用 className 来获取 (属性节点)

获取元素的子节点: 用具体元素节点调用
getElementsByTagName()... 当前元素节点下查找
childNodes, firstChild, lastChild 子节点
children, firstElementChild, lastElementChild 子元素节点
子节点还包括文本节点, 标签间的空白也会算作一个文本节点

获取父节点与兄弟节点:
parentNode 当前节点的父节点
previousSibling, nextSibling 前一个兄弟节点, 后一个兄弟节点
previousElementSibling, nextElementSibling 前后兄弟元素节点

根据 css 选择器来查询:
document.querySelector(选择器) 只返回第一个
document.querySelectorAll(选择器) 将所有元素保存在一个数组中

其他的查询方法:
获取 body 节点: document.body
获取 html 节点: document.documentElement
获取页面所有元素: document.all
用 class 获取: getElementsByClassName()
"\*" 也代表所有元素, 可以考虑使用

增删改:
document.createElement(标签名) 创建元素节点
document.createTextNode(内容) 创建文本节点
父节点.appendChild(子节点) 在末尾添加节点
父节点.insertBefore(新节点, 旧节点) 在旧节点前插入新节点
父节点.replaceChild(新节点, 旧节点) 替换
父节点.removeChild(子节点) 删除
可用 innerHTML 来完成简化完成相关操作

>

JavaScript DOM 样式操作

读取与修改内联样式:
语法: element.style.样式名 = 样式值
若样式名里含有 - 号, 用驼峰命名法修正

读取当前显示的样式 (只读):
window.getComputedStyle(元素, 伪元素)
一般伪元素参数设置为 null, 返回一个对象, 封装了当前的样式
不支持 IE9 以下
元素.currentStyle.样式名
只支持 IEs
用这类方法时应注意兼容性问题

用类的方法批量操作样式：
新建一个类存放新的样式，然后替换类
添加一个类，判断一个类有没有，删除一个类，切换一个类

JavaScript DOM 事件

事件对象：
浏览器会将一个事件对象作为实参传递给事件响应函数，可设置形参或 argument 来调用
但 IE8 会将事件对象保存在 window 的属性中，event = event || window.event

事件对象的属性：
clientX | clientY 鼠标水平|垂直位置，可见窗口
pageX | pageY 鼠标水平|垂直位置，整个页面 兼容有问题
cancelBubble 布尔值，是否取消事件的冒泡
target 事件的目标节点，触发事件的元素
currentTarget

元素相对鼠标移动：
可用 clientY 减去 scrollTop 来计算出鼠标相对于整个页面的位置，直接用 page 不兼容

事件的绑定：1.对象.事件 = 函数 ：只能绑定一个，可用 return false 来取消浏览器默认行为
2.addEventListener()方法 可绑定多个，不兼容 IE8
参数：事件字符串，不加 on，回调函数，是否在捕获阶段触发事件，一般 false
可用 event.preventDefault() 来取消浏览器默认行为
3.attachEvent(事件字符串，加 on; 回调函数) IE8
addEventListener 与 attachEvent 中的 this 不同，可用 call() 来手动统一

事件的传播：
第一阶段：捕获阶段，从最外层祖先元素向目标元素进行捕获，但不出发事件
第二阶段：目标阶段
第三阶段：冒泡阶段，从目标元素向祖先元素传递并依次触发事件

>

## 位置与偏移量

viewport

视口代表当前可见的计算机图形区域, 在 Web 浏览器术语中, 通常与浏览器窗口相同, 但不包括浏览器的 UI, 菜单栏等, 即指你正在浏览的文档的那一部分

window

`outerHeight/outerWidth` 整个浏览器窗口的宽高
`innerHeight/innerWidth` 浏览器窗口的**视口**宽高, 如果有滚动条, 也包括滚动条宽高
`window.screen` 实现了 Screen 接口, 它是个特殊的对象, 返回当前渲染窗口中和屏幕有关的属性

client

`el.clientWidth/clientHeight` 元素内部宽高, 包括内边距, 但不包括边框和外边距, 以及滚动条
`el.clientLeft/clientTop` 元素左边框/上边框的宽度, 如果有滚动条则包括滚动条

offset

`el.offsetWidht/offsetHeight` 元素 `border + padding + width` 三者的总宽高
`el.offsetParent` 返回一个当前元素最近的定位父元素
`el.offsetLeft/offsetTop` 返回当前元素左上角相对于 `offsetParent` 节点的左边界/上边界偏移的像素值

scroll

`el.scrollWidth/scrollHeight` 当没有 overflow 时等于视口宽高, 内容超出时表示整个滚动区的宽高
`el.scrollLeft/scrollTop` 元素滚动条到元素左边/上边的距离, 可以设置
满足 scrollHeight - scrollTop == clientHeight 时表示滚动条到底

el.getBoundingClientRect()

返回元素的大小及其相对于**视口**的位置, 一个 `DOMRect` 对象
标准盒模型时大小为 `width/height + padding + border` 的总和, `border-box` 时大小为 `width/height`
`left, top, right, bottom, x, y` 都是相对于视口的左上角来计算的

## 拖拽

前置知识

事件的冒泡: 当子元素事件被触发时, 其祖先元素相同事件也会被触发, 用 `event.cancelBubble = true` 来禁止
事件的委派: 利用冒泡将事件绑定到祖先元素上, 再用 `event.target` 来获取真正触发事件的元素

拖拽事件

设置 `draggable = true` 来让元素可拖动, 链接和图片默认即可拖动
注意 `ondragenter` 会 enter 自己

```js
// 源元素上的事件
ondragstart() // 开始拖动元素
ondrag() // 正在拖动元素
ondragend() // 完成元素的拖动
// 目标元素上的事件
ondragenter() // 拖动对象进入其容器范围时触发
ondragover() // 拖动对象在其容器范围内拖动时触发
ondragleave() // 拖动对象离开其容器范围时触发
ondrop() // 拖动对象在其容器内释放鼠标键时触发
// 在拖动元素时，每隔 350 毫秒会触发 ondragover 事件
```

实现拖拽排序

获取元素的位置: `el.getBoundingClientRect()` 提供元素大小和相对于**视口**的位置
在某元素之前插入元素: `insertBefore(new, old)` 在旧元素前插入新元素
使用 `el.offsetWidth` 或者 `setTimeout` 来使触发页面的重绘, 实现 `css animation` 效果

实现拖拽移动

实际上使用 `onmousedown, onmousemove, onmouseup` 三个鼠标事件实现的
`onmusemove` 时默认会全选内容, 应取消默认事件

JavaScript DOM 事件案例

拖拽：
所用事件：onmousedown, onmousemove, onmouseup
注意全选时拖拽浏览器默认会用内容去搜索，应注意取消默认行为
IE 8 中应用 元素.setCapture() 方法， 元素.releaseCapture() 方法
将下一次事件强制捕获到该元素上，释放强制捕获

鼠标滚轮：
所用事件：onmousewheel, 火狐中 DOMMouseScroll, 用 addEventListener 添加
获取滚轮的方向：event.wheelDelta, 火狐中 event.detail
注意用 return false 来取消浏览器的默认行为
addEventListener() 方法应用 event.preventDefault() 来取消默认行为

键盘事件：
所用事件: onkeydown, onkeyup
相关属性：
event.keyCode 获取按键的 unicode 编码
event.altKey | ctrlKey | shiftKey 布尔值，这三个按键是否被按下
在文本框中输入内容是默认行为，可以来限制输入
<

JavaScript BOM 一般对象

浏览器对象模型，通过 JS 操作浏览器

navigator: 浏览器的信息，可用来标识浏览器
属性：由于倔强的 IE 导致了许多属性的失效,如 appName
userAgent: 属性值为字符串，可结合正则来判断不同浏览器
倔强的 IE 可用其独有的对象来判断 ("activXObject" in window)

history: 历史记录，向前向后翻页
属性：length 返回当次访问页面的个数
方法：
back() 回退到上一个页面
forward() 前进到下一个页面
go() 跳转到指定页面，参数为正整数则向前跳几页，反之亦然

location: 封装了浏览器地址栏信息
直接调用 location 则返回当前页面完整地址, 修改 location 即跳转页面
属性：地址的各个部分...
方法：
assign() 跳转到其他页面
reload() 重新加载页面
replace() 用新页面替换当前页面，不产生历史记录
<

15.H5 Web Workers 多线程
可以将大计算的代码交给 web workers 运行而不冻结用户界面

操作：创建一个分线程的 JS 文件，在主线程发消息并设置回调

web workers 提供一构造函数：
Worker -- var worker = new Worker("worker.js")
事件：worker.onmessage
数据：event.data
方法：worker.postMessage() -- 发送数据

在分线程 JS 中，全局对象并非 window，而是 worker 本身
