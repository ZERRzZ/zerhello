# Hyper Text Markup Language

简介: 超文本标记语言

标记: 使用尖括号 <> 表示一个标记, 标记分为封闭类标记与非封闭类标记

属性: 属性必须在开始标记中, 且与标记名称之间用空格隔开, 属性值与属性之间用 = 连接, 属性值用引号引起来, 多属性间用空格隔开

# 注释

`<!-- -->`

# 公共属性

`id` 定义元素在页面上独一无二的名称

`title` 鼠标悬停时在元素上显示的文字

`class` 类, css 中用类选择器时使用

`style` 内联样式, css 中的属性

```html
<div id="h" title="hello world" class="" style="color: red">hello world</div>
```

# 基础标签

**结构标签**

`<html></html>` 根标签, 表示页面的开始与结束

`<head></head>` 头标签, 设置文档的属性, 引入外部的资源

`<body></body>` 体标签, 页面的主体内容

**head 里的标签**

`<title></title>` 标题

`<style></style>` 内部样式

`<link></link>` 引入外部样式

`<script></script>` 引入 js 文件或写 js 代码

`<meta />` 提供有关页面的元信息(meta-information)

**body 里的标签**

`<h1></h1>` ~ `<h6></h6>` 标题

`<p></p>` 段落

`<div></div>` 块

`<span></span>` 行间文本

`<br/>` 换行

`<hr/>` 分割线

# 特殊文本

HTML 中可以使用实体的方式来显示 `&quot;`, 如果没有可以用十进制 `&#34;` 或十六进制 `&#x0022;` 来引用

`&nbsp;` 空格

`&lt;` <

`&gt;` >

`&amp;` & 和号

`&quot;` " 引号

`&copy;` © 版权

`&reg;` `&trade;` 注册商标, ™ 商标

`&times;` `&divide;` 乘号, 除号

`&cent;` `&pound;` `&yen;` `&euro;` 分, 镑, 元, 欧元

# HTML 文档基本结构

html 的属性 lang 默认为 `en`, 可设置为中文 `zh-CN`

```html
<!DOCTYPE html>
<html lang='zh-CN'>
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body></body>
</html>
```

# 图片标签

**标签**

`<img />`

**属性**

`src` 图片的地址 url

`alt` 图片的替换文本，当图片加载不出来时有大用

`width`, `height` 宽与高，规定宽高可以加速浏览器渲染速度

这四个属性必须写全, 缺一不可, 宽高可加快页面渲染, alt 是必要提示

# 列表标签

有序列表

```html
<ol>
  <li>111</li>
  <li>222</li>
  <li>333</li>
</ol>
```

无序列表

```html
<ul>
  <li>111</li>
  <li>222</li>
  <li>333</li>
</ul>
```

# 超链接标签

**标签**

`<a></a>`

**属性**

`href` 要链接的页面 url

`target` 指定新网页的打开方式, `_self` 覆盖当前页面, `_blank` 在新网页打开

`download` 在 href 后加一个 download = filename 即可

```html
<a href="./favicon.jpg" download="favicon">下载</a>
```

**锚点**

用 `href = "url#锚点名"` 来跳转到某页面的某锚点, 任何标签的 id 就是一个锚点, a 标签的 name 属性也是一个锚点

```html
<!-- 保证页面长度够长 -->
<a href="#id">跳转</a>
<p id="id">id</p>
<a name="name">name</p>
```

# 表格标签

**标签**

`<table>`,`<tr>`,`<th>`,`<td>`,`<thead>`,`<tbody>`,`<tfoot>`

**属性**

td,th 标签的特殊属性 `rowspan`, `colspan` 跨行与跨列, 值为数字, 表示要跨几行或几列

```html
<table border="1px black solid">
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

**标签**

`<form></form>`

**属性**

`action` 指定某个服务器脚本来处理被提交的表单

`method` 指定表单被提交时所使用的 http 方法 `GET` `POST` `PUT` `DELETE`

`enctype` 指定提交的数据类型, 默认为 `application/x-www-form-urlencode` 表示表单提交, 值 `multipart/form-data` 表示文件上传

```html
<!-- 用表单发送文件上传请求 --->
<form action="http://www.baidu.com" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" placeholder="头像">
  <input type="submit" value="submit">
</form>
```

# 表单元素标签

**http 表单元素**

`<input>` 元素根据不同的 type 属性, 可以变化为多种形态

`<select>` 元素定义下拉列表, `<option>` 元素定义待选择的选项, 添加 `selected` 属性来定义预定义选项

`<textarea>` 元素定义多行输入字段(文本域), cols, rows

`<button>` 元素定义可点击的按钮

`<datalist>` 元素为 `<input list="...">` 元素规定预定义选项列表, `<input>` 元素的 list 属性必须引用 `<datalist>` 元素的 id 属性

`<label>` 关联文本与表单控件，点击文本如同点击控件一样, for 指定要关联的表单控件的 id 值

`<fieldset><legend>标题</legend>内容</fieldset>` 为控件分组

**inupt 元素**

`<input type="text">` 定义供文本输入的单行输入字段

`<input type="password">` 定义密码字段

`<input type="submit">` 定义提交表单数据至表单处理程序的按钮

`<input type="reset">` 重置按钮

`<input type="radio">` 定义单选按钮, name 须相同

`<input type="checkbox">` 定义复选框, name 需相同

`<input type="hidden">` 隐藏域

`<input type="button>` 定义按钮

`<input list="id"> `定义下拉列表, 配合 `<datalist>` 使用

`<input type="file">` 文件选择框

**h5 新类型**

`color date datetime datetime-local email month number range search tel time url week img`

**属性**

`name`: 表单可通过该属性来获取值

`disabled` 规定输入字段应该被禁用

`readonly` 规定输入字段为只读（无法修改）

`value` 规定输入字段的默认值

`size` 规定输入字段的宽度（以字符计）

`maxlength` 规定输入字段的最大字符数

`placeholder` 规定用以描述输入字段预期值的提示(样本值或有关格式的简短描述)

`required` 属性是布尔属性, 规定在提交表单之前必须填写输入字段

`autocomplete` 规定表单或输入字段是否应该自动完成, on | off

`novalidate` 规定在提交表单时不对表单数据进行验证

`autofocus` 属性是布尔属性, 规定当页面加载时 input 元素应该自动获得焦点

`max min` 规定输入字段的最大值, 最小值

`width height` 规定 input 元素的高度和宽度, 仅用于 `<input type="image">`

`multiple` 属性是布尔属性, 则规定允许用户在 input 元素中输入一个以上的值

`pattern` 规定通过其检查输入值的正则表达式

`step` 规定输入字段的合法数字间隔

其他属性: `form formaction formenctype formmethod formnovalidate formtarget`

# meta 标签

**标签**

`<meta />`

**属性**

`name` 主要有 author, description, keywords 等值, 一般可以自由使用对自己来说有意义的名称

`http-equiv` 主要有 content-type 等值, 指示服务器在发送文档之前先要传送给浏览器的消息头信息

`content` 作为 name 与 http-equiv 的值, 与它们搭配使用

```html
<meta name="keywords" content="html,css,javascript">
<meta http-equiv="content-type" content="text/html">
```

# 框架标签

**标签**

`<iframe></iframe>`

**属性**

`src` 要引入的页面的 url

`frameborder` 边框, 默认为 1

```


  ---------- 分割线 ---------


```
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