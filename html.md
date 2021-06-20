# Hyper Text Markup Language

* 标记语言，使用尖括号 <> 表示一个标记
* 标记分为封闭类标记与非封闭类标记

```html
<div></div> <!-- 封闭类 -->
<img /> <!-- 非封闭类 -->
```

* 属性必须在开始标记中, 且与标记名称之间用空格隔开
* 属性值与属性之间用 = 连接, 属性值用引号引起来，多属性间用空格隔开

```html
<div width="100px" height="100px"></div>
```

# 注释

`<!-- -->`

# id、title、class、style

* id: 定义元素在页面上独一无二的名称
* title: 鼠标悬停时在元素上显示的文字
* class: 类，css 中用类选择器时使用
* style: 内联样式，css 中的属性

```html
<div id="h" title="hello world" class="" style="color: red">hello world</div>
```

# 常见标签

* `<html></html>`: 根标签，表示页面的开始与结束
* `<head></head>`: 头标签，设置文档的属性，引入外部的资源
* `<body></body>`: 体标签，页面的主体内容

## head 里的标签

* `<title></title>`: 标题
* `<style></style>`: 内部样式
* `<link></link>`: 引入外部样式
* `<script></script>`: 引入 js 文件或写 js 代码
* `<meta />`: 提供有关页面的元信息(meta-information)

```html
<!-- 用 link 来设置图标 -->
<link rel="shortcut icon" href="./test.jpg" type="...">

<link rel="stylesheet" href="...">
<script src="..."><script>
```

## meta 标签

* name 属性：主要有 author,description,keywords 等值，一般可以自由使用对自己来说有意义的名称
* http-equiv 属性：主要有 content-type 等值，指示服务器在发送文档之前先要传送给浏览器的消息头信息
* content 属性：作为 name 与 http-equiv 的值，与它们搭配使用

```html
<meta name="keywords" content="html,css,javascript">
<meta http-equiv="content-type" content="text/html"> ??
```

## body 里的标签

* `<h1></h1>` ~ `<h6></h6>`: 标题
* `<p></p>`: 段落
* `<div></div>`: 块
* `<span></span>`: 行间文本
* `<br/>`: 换行
* `<hr/>`: 分割线

```html
<h1>标题</h1>
<hr/>
<p>这是一个简单的 html 网页</p>
```


# 特殊文本

* `&nbsp;`: 空格
* `&lt;`: <
* `&gt;`: >
* `&copy;`: © 版权
* `&reg;`: ™ 商标
* 其它见 [特殊字符表](./img/特殊字符表.png)

```html
<p>我&nbsp;们,&lt;p&gt;,&copy;,&reg;</p>
```

# HTML 文档基本结构

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body></body>
</html>
```

# 图片标签

* 标签: `<img />`
* src 属性: 图片的地址 url
* alt 属性：图片的替换文本，当图片加载不出来时有大用
* width, height: 宽与高，规定宽高可以加速浏览器渲染速度
* 这四个属性必须写全, 缺一不可

```html
<img src="./特殊字符表.png" alt="特殊字符表" width="1360" height="602">
```

# 列表标签

* 有序列表：

```html
<ol>
  <li>111</li>
  <li>222</li>
  <li>333</li>
</ol>
```

* 无序列表：

```html
<ul>
  <li>111</li>
  <li>222</li>
  <li>333</li>target
</ul>
```

# 超链接标签

* 标签: `<a></a>`
* href 属性：要链接的页面 url
* target 属性：指定新网页的打开方式, _self:覆盖当前页面, _blank：在新网页打开
* 锚点: 用 href = "url#锚点名" 来跳转到某页面的某锚点
* 任何标签的 id 就是一个锚点，a 标签的 name 属性也是一个锚点

```html
<!-- 保证页面长度够长 -->
<a href="#id">跳转</a>
<p id="id">id</p>
<a name="name">name</p>
```

* download 属性：在 href 后加一个 download = filename 即可

```html
<a href="./favicon.jpg" download="favicon">下载</a>
```

# 表格标签

* 标签：`<table>`,`<captain>`,`<tr>`,`<th>`,`<td>`,`<thead>`,`<tbody>`,`<tfoot>`
* 分别表示：表格，标题，行，表头，单元格，页眉，主体，页脚

```html
<table>
  <captain>我是标题</captain>
  <tr>
    <th>表头1</th>
    <th>表头2</th>
  </tr>
  <tr>
    <td>单元格1</td>
    <td>单元格2</td>
  </tr>
</table>
```

* td,th 标签的特殊属性: rowspan, colspan 跨行与跨列
* 值为数字，表示要跨几行或几列, 不要搞混了

```html
<table border="1px black solid">
  <captain>我是标题</captain>
  <tr>
    <th>表头1</th>
    <th>表头2</th>
  </tr>
  <tr>
    <td rowspan="2">单元格1</td>
    <td>单元格2</td>
  </tr>
  <tr>
    <td>单元格3</td>
  </tr>
  <tr>
    <td colspan="2">单元格4</td>
  </tr>
</table>
```

# 表单标签

* 标签：`<form></form>`, 用以定义一个表单
* action 属性：指定某个服务器脚本来处理被提交的表单
* method 属性：指定表单被提交时所使用的 http 方法（GET/POST/...)
* enctype 属性: 指定提交的数据类型，默认为 application/x-www-form-urlencode, 表示表单提交
* enctype 属性的值 multipart/form-data，表示文件上传

```html
<!-- 用表单发送文件上传请求 --->
<form action="http://www.baidu.com" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" placeholder="头像">
  <input type="submit" value="submit">
</form>
```

# 表单元素标签





# template 模版标签

- `<template>` 中的内容加载页面时不渲染，但可以通过 JavaScript 进行实例化
- 用 `template.content` 获取标签内的内容
- 具体是利用 `document.importNode(content, boolean)` 方法来实例化, 第一个为标签内容，第二个表示是否获取子节点






# Web前端存储Cookie

- 主要用来辨别用户身份
- 分为内存cookie和硬盘cookie
- cookie会自动带在路径上
- 不能跨域和跨浏览器
- cookie实质上是字符串，由键值对key=value组成，之间用分号与空格隔开
- 常用属性：
```
expires：有效期
domain、path：限制能被哪些URL访问
secure：限制https传输
httponly：限制JS操作
```
- 常用操作：
```js
// 设置键值对：直接赋值给documnet.cookie
documnet.cookie = 'name = xxx'
document.cookie = 'age = 18; expires = xxx'
// 获取cookie值，直接打印即可
console.log(documnet.cookie)
// cookie会自动带在路径上，后端获取
console.log(req.cookies)
// 需要中间件
// npm i cookie-parser
app.use(cookieParser())
// 获取
req.cookies
```

# Web前端存储Session Stroage

- 不会随着客户端自动向服务器发送请求
- 临时会话，关闭浏览器将不存在
- 不同页面不能共享，是 H5 新特性
- 本质是挂在window上的一个对象
- api：
```js
// 设置
sessionStorage.setItem(key, value)
// 读取
sessionStorage.getItem(key, value)
// 删除单个
sessionStorage.removeItem(key)
// 删除所有
sessionStorage.clear()
// 根据索引查找
sessionStorage.key(index)
```

# Web前端存储Local Stroage

- 不会随着客户端自动向服务器发送请求
- 永久存在，除非手动删除
- 同一域下可以访问， 是H5新特性
- 本质是挂在window上的一个对象
- api 同上

# Web安全

- 主要有：信息泄露，XSS，CSRF，SQL注入，不完善身份注入，不完善的访问控制等
- 信息泄露：数据传输过程中需经过很多节点，如果明文传输可能会在这些节点泄露
- 解决：HTTPS协议，加密
- 加密算法：分为单向散列函数，非对称加密，对称加密

# Base64
- 用与传输 8bit 字节代码的编码方式之一
- node上的Base64
```js
// 安装 npm i js-base64
const Base64 = require('js-base64').Base64
// 编码
Base64.encode(str)
// 解码
Base64.decode(str)
```
- 在前端中也可以通过标签引入，还可以定义相关函数

# HTTPS协议
- 即HTTP内容向下传输时加了一层TLS/SSL加密
- HTTPS利用非对称加密传输一个随机数，作为后面对称加密的钥匙
- HTTPS协议默认端口号 443
```js
// 固定代码
const fs = require('fs')
const http = require('http')
const https = require('https')
let privateKey = fs.readFileSync('sslcert/server.key', 'utf-8')
let certificate = fs.readFileSync('sslcert/server.crt', 'utf-8')
let credentials = { key: privateKey, cert: certficate }
const express = require('express')
const app = express()
// your express configuration here
let httpServer = http.createServer(app)
let httpsServer = https.createServer(credentials, app)
httpServer.listen(80)
httpsServer.listen(443)
```

# 同源策略

- 限制了DOM操作，限制了cookie操作，限制了发送请求
- 同源策略并非绝对，一般跨域的写操作允许，而读操作不允许
- 带有src属性的标签也可以跨域加载
```js
// 使用CROS实现跨域访问
// 加一个响应头即可
res.append('Access-Control-Allow-Origin', '*')
```
```js
// 使用JSONP实现跨域访问
// 原理：利用<script>标签可以进行跨域访问来操作
// 后端，用express框架
res.jsonp({name: 'xxx'})
// 传输的数据是：'callback({"name": "xxx"})'
// 默认的JSONP回调函数名称是 callback,想改变名字可以在路径上带参数
// 前端，在 scripit 标签里发送请求，并定义 callback 函数来接收
<script src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd= "></script>
```


浮动框架?

  <iframe></iframe> 将其他页面导入到当前页来
    src:要引入页面的url
    frameborder：指定边框，默认为1


音频和视频标签?

	<video> 标签定义视频
		src						url				要播放的视频的 URL
		controls			controls	如果出现该属性，则向用户显示控件，比如播放按钮
		height width	pixels		设置视频播放器的高度和宽度
		poster				URL				规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像
		autoplay			autoplay	如果出现该属性，则视频在就绪后马上播放。
		loop					loop			如果出现该属性，则当媒介文件完成播放后再次开始播放。
		muted					muted			规定视频的音频输出应该被静音。
		preload				preload		如果出现该属性,则视频在页面加载时进行加载,并预备播放,如果使用 "autoplay",则忽略该属性。

  <audio> 标签定义声音
    src           url       要播放的音频的 url
    controls      controls  如果出现该属性，则向用户显示控件，比如播放按钮。
    autoplay
    loop
    muted
    preload

	<source /> 标签
		video,audio 元素允许多个 source 元素,source 元素可以链接不同的视频文件


html 5 拖放 ?

		draggable 属性设置为 true  设置元素可拖拽
	ondragstart 属性  规定当元素拖拽时,会发生什么
		setData() 方法  dataTransfer.setData(type, value) 设置被拖数据的数据类型和值
	ondragover 事件  规定在何处放置被拖动的数据
		event.preventDefault() 方法  默认无法将数据/元素放置到其他元素中,需阻止对元素的默认处理方式
	ondrop 属性  放置元素
		调用 preventDefault() 来避免浏览器对数据的默认处理(drop 事件的默认行为是以链接形式打开)
		通过 dataTransfer.getData("Text") 方法获得被拖的数据,该方法将返回在 setData() 方法中设置为相同类型的任何数据
		target.appendChild() 被拖数据是被拖元素的 id ("drag1"),把被拖元素追加到放置元素（目标元素）中


html object插件 ?

	浏览器插件是一种扩展浏览器标准功能的小型计算机程序。
	插件有很多用途：播放音乐、显示地图、验证银行账号，控制输入等等。
  可使用 <object> 或 <embed> 标签来将插件添加到 HTML 页面
	<embed> 标签定义外部(非 HTML)内容的容器
	辅助程序可用于播放音频和视频(或其他),辅助程序是使用 <object> 标签来加载的

	加载视频...
	<object classid="">
		<param name="src" value="" />
		<param name="controller" value="" />
	</object>
	... ...

	显示音频:
	<embed height="100" width="100" src="song.mp3" />
	<object height="100" width="100" data="song.mp3"></object>


html5 canvas 与 svg ?

	画布的创建: <canvas></canvas>
	用javascript绘制:
		获取  var element=document.
		创建context对象用以绘制  var object=element.getContext("2d")
		染色  object.fillStyle=color
		绘制矩形  object.fillRect(x,y,width,height)
		绘制线
			object.moveTo(x,y)  移动到,起点
			object.lineTo(x,y)	划线到
			object.stroke()  结束
		绘制圆形
			object.beginPath();
			object.arc(x, y, r, ..., Math*PI*2, true);
			object.closePath();
			object.fill();
		渐变
			var name=object.createLinearGradient(x0,y0,x0,y0)
			name.addColorStop(0, "color")
			name.addColorStop(1, "color")
			object.fillStyle=name
		贴图
			var img=new Image()
			img.src="flower.png"
			object.drawImage(img,0,0);

	可伸缩矢量图形: <svg></svg>
	SVG 文件可通过以下标签嵌入 HTML 文档：
		<embed>:
			<embed src="rect.svg" width height type="image/svg+xml" />
		<object> 或者 <iframe>


html5 API 存储与缓存 ?

	存储: 本地存储 > cookies
	通过本地存储(logcal storage),web 应用程序能够在用户浏览器中对数据进行本地的存储

	缓存 cache: HTML5 引入了应用程序缓存(Application Cache)这意味着可对 web 应用进行缓存,并可在没有因特网连接时进行访问






HTML表单?

	http表单元素:
		<input> 元素根据不同的 type 属性，可以变化为多种形态
		<select> 元素定义下拉列表,<option> 元素定义待选择的选项,添加 selected 属性来定义预定义选项
		<textarea> 元素定义多行输入字段(文本域),cols,rows
		<button> 元素定义可点击的按钮
		<datalist> 元素为 <input list="..."> 元素规定预定义选项列表,<input> 元素的 list 属性必须引用 <datalist> 元素的 id 属性
	inupt元素:
		<input type="text"> 定义供文本输入的单行输入字段
		<input type="password"> 定义密码字段
		<input type="submit"> 定义提交表单数据至表单处理程序的按钮
		<input type="radio"> 定义单选按钮,name须相同
		<input type="checkbox"> 定义复选框,name需相同
		<input type="button> 定义按钮
		<input list="id"> 定义下拉列表,配合 <datalist> 使用
		h5新类型: color date datetime datetime-local email month number range search tel time url week img
		一些限制属性:
			disabled	规定输入字段应该被禁用
			readonly	规定输入字段为只读（无法修改）
			value		规定输入字段的默认值
			size		规定输入字段的宽度（以字符计）
			maxlength	规定输入字段的最大字符数
			placeholder 规定用以描述输入字段预期值的提示(样本值或有关格式的简短描述)
			required    属性是布尔属性,规定在提交表单之前必须填写输入字段
			autocomplete规定表单或输入字段是否应该自动完成,on | off)
			novalidate  规定在提交表单时不对表单数据进行验证
			autofocus   属性是布尔属性,规定当页面加载时 <input> 元素应该自动获得焦点
			max min		规定输入字段的最大值,最小值
			width height规定 <input> 元素的高度和宽度,仅用于 <input type="image">
			multiple    属性是布尔属性,则规定允许用户在 <input> 元素中输入一个以上的值
			pattern		规定通过其检查输入值的正则表达式
			step		规定输入字段的合法数字间隔
			form formaction formenctype formmethod formnovalidate formtarget
	重要属性:
		name

表单标签?
	<input>：
		type：类型，value：值，name：名称
		<input type="text"> 文本框
		<input type="password"> 密码框
		<input type="radio">单选按钮
		<input type="checkbox">复选框
		<input type="submit"> 提交按钮
		<input type="reset"> 重置按钮
		<input type="button"> 普通按钮
		<input type="hidden">隐藏域
		<input type="file">文件选择框
	其他相关标签：
		<button></button>
		<textarea></textarea>	多行的文本域
		<select></select>		下拉列表,<option></option>列表内容。
		<label></label>	关联文本与表单控件，点击文本如同点击控件一样,for:指定要关联的表单控件的id值
		<fieldset> <legend>分组标题</legend> 分组中的内容 </fieldset>	为控件分组