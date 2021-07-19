## mapbox-gl

Mapbox GL JS 是一个 JavaScript 库, 它使用 WebGL, 以 vector tiles 和 Mapbox styles 为来源, 将它们渲染成互动式地图

## 显示一个地图

安装:` npm install mapbox-gl`  

或引入样式与脚本

```html
<link href="https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.js"></script>
```

初始化地图

```html
<div id='map' style='width: 400px; height: 300px;'></div>
<script>
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbmd6cyIsImEiOiJja3EweXViaXYwMTQwMnFvNzlneXY3c3NpIn0.TbjccHE0MqTmTsYBBnPdyA';
  var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 6 // starting zoom
});
</script>
```

## 创建地图的参数

Map 对象代表页面上的地图, 可以创建 Map 并通过指定的 container 和其他可选参数来在页面上初始化地图并返回 Map  

new Map(options: Object)

`container`: 地图渲染的 HTML 元素或该元素的字符串 id, 该指定元素不能有子元素  
`minZoom`: 地图最小缩放级别(0-24), 默认为 0  
`maxZoom`: 地图最小缩放级别(0-24), 默认为 22  
`style`: 地图的配置样式, 必须是一个符合 `Mapbox 样式规范` 的 JSON 对象, 或者是一个指向该 JSON 的 URL 地址  
... ...

## Popup 弹窗组件

例子

```ts
var popup = new mapboxgl.Popup({ closeOnClick: false })
.setLngLat([-96, 37.8])
.setHTML('<h1>Hello World!</h1>')
.addTo(map);
```

new Popup(options: Object)

`closeButton`: 为 true 则弹窗右上角将出现关闭按钮  
`closeOnClick`: 为 true 则点击地图时弹窗将关闭  
`anchor`: 表示弹窗位置  
`offset`: 对应到弹窗位置的像素偏移  
`className`: 添加到弹窗容器的以空格分隔的CSS类名  
`maxWidth`: 设置弹窗CSS属性中最大宽度的字符串, 为确保弹窗在缩放后能容纳内容, 应设置此属性为 'none'  

方法

`addTo(map)`: 在地图上添加弹窗  
`remove()`: 从添加地图中移除弹窗  
`setLngLat(lnglat)`: 设置弹窗的锚的地理位置  
`setHTML(html)`: 将弹窗内容设置为以字符串形式提供的 HTML  

## Mapbox 样式规范

Mapbox 样式由一组根属性组成  
某些根属性如 version, name, metadata 对地图的外观或行为没有任何影响, 但会提供与地图相关的重要描述信息  
某些根属性如 layers, sources 决定了哪些地图要素将出现在地图上以及它们的外观  
某些属性如 center, zoom, pitch, bearing 为地图渲染器提供了一组默认值, 以便在最初显示地图时使用  