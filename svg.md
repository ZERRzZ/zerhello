## SVG

可缩放矢量图形 `Scalable Vector Graphics`, 使用 `XML` 格式定义图像  

## HTML 页面中的 SVG

使用 `<embed>` 标签: 允许创建脚本  
使用 `<object>` 标签: 标准标签, 被所有较新的浏览器支持, 不支持脚本  

```html
<embed src width height type='images/svg+xml' pluginspage='下载插件的 URL'>
<object data width height type="image/svg+xml" codebase="下载插件的 UR">
```

## SVG 矩形

## SVG 圆形

`<circle cx="10" cy="10" r="2" fill="red"/>`

## SVG Path

path 元素的形状是通过属性 d 来定义的, 属性 d 的值是一个命令 + 参数的序列

命令

命令允许小写字母, 大写表示绝对定位, 小写表示相对定位

	M = moveto
	L = lineto
	H = horizontal lineto
	V = vertical lineto
	C = curveto
	S = smooth curveto
	Q = quadratic Bézier curve
	T = smooth quadratic Bézier curveto
	A = elliptical Arc
	Z = closepath

直线命令

`Mx y` 移动到点 x,y, 只移动画笔, 不画线  
`Lx y` 在当前位置和新位置间画一条线段, 当前位置是 L 命令前画笔的位置    
`H x` 绘制平行线, 只传入目标点的 x, 因为 y 是一样的  
`V y` 绘制垂直线  
`Z` 从当前点画一条直线到路径的起点  

```html
<!-- 一个正方形, (10, 10), (90, 10), (10, 90), (90, 90) -->
<svg width="100px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10 H 90 V 90 H 10 L 10 10" fill="transparent" stroke="black" /> 
</svg>
<!-- 用 Z 命令简写 -->
<path d="M10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black" />
```

相对命令使用的是小写字母, 即参数不是指定一个明确的坐标, 而是表示相对于它前面的点需要移动多少距离  

```html
<!-- 画笔移动到(10,10)点, 由此开始, 向右移动 80 像素构成一条水平线, 然后向下移动 80 像素, 然后向左移动80像素, 最后再回到起点 -->
<svg width="100px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path d="M10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black" />
</svg>
```

曲线命令

`C` 三次贝塞尔曲线  
`S` 简写的贝塞尔命令  

`Q` 二次贝塞尔曲线

`A` 弧形

`A rx ry x-axis-rotation large-arc-flag sweep-flag x y`  
`rx, ry` 表示弧的 x 轴半径与 y 轴半径  
`x-axis-rotation` 弧形的旋转角度, 90 表顺时针 90 度, -90 表逆时针 90 度  
`large-arc-flag` 弧度是否大于 180 度, 大角度弧为 1, 小角度弧为 0  
`sweep-flag` 弧线的方向, 0 表示逆时针画弧, 1 表示顺时针画弧  
`x, y` 终点的位置  

```html
<svg width="320px" height="320px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
</svg>
```