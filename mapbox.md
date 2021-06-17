## mapbox-gl

Mapbox GL JS 是一个 JavaScript 库, 它使用 WebGL, 以 vector tiles 和 Mapbox styles 为来源，将它们渲染成互动式地图

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
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
</script>
```

## Map

Map 对象代表页面上的地图, 可以创建 Map 并通过指定的 container 和其他可选参数来在页面上初始化地图并返回 Map  

`new Map(options: Object)`

