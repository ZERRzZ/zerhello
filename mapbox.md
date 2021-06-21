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

`options.container`: 地图渲染的 HTML 元素或该元素的字符串 id, 该指定元素不能有子元素  
`options.minZoom`: 地图最小缩放级别(0-24), 默认为 0  
`options.maxZoom`: 地图最小缩放级别(0-24), 默认为 22  
`option.style`: 地图的配置样式, 必须是一个符合 `Mapbox 样式规范` 的 JSON 对象, 或者是一个指向该 JSON 的 URL 地址  


## Mapbox 样式规范

Mapbox 样式由一组根属性组成  
某些根属性如 version, name, metadata 对地图的外观或行为没有任何影响, 但会提供与地图相关的重要描述信息  
某些根属性如 layers, sources 决定了哪些地图要素将出现在地图上以及它们的外观  
某些属性如 center, zoom, pitch, bearing 为地图渲染器提供了一组默认值, 以便在最初显示地图时使用  