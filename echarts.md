# 快速上手

在 head 中引入 echars.js: `<script src="echarts.js"></script>`

定义容器: 

```html
<body>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div id="main" style="width: 600px;height:400px;"></div>
</body>
```

绘制表格:

```js
var myChart = echarts.init(document.getElementById('main')) // 基于准备好的dom, 初始化echarts实例
var option = { // 指定图表的配置项和数据
  title: { text: 'ECharts 入门示例' },
  tooltip: {},
  legend: { data: ['销量']},
  xAxis: { data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']},
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
}
myChart.setOption(option) // 使用刚指定的配置项和数据显示图表。
```

# 下载与使用

npm 下载: `npm install echarts`

引入所有: `import * as echarts from 'echarts'`

也可以按需引入: 

```js
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

// 接下来的使用就跟之前一样，初始化图表，设置配置项
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  // ...
});
```

# 图表容器

容器宽高: 定义一个 div 并规定宽高即为容器宽高, 但可通过 `opts.width` 和 `opts.height` 改变

动态改变大小: 通过 `onresize` 事件来调用 `echartsInstance.resize` 方法来适应屏幕大小 `onresize = () => myChart.resize()`

# 图表样式

设置样式以改变图形元素或者文字的颜色, 明暗, 大小等

## 颜色主题

直接使用主题是最快的方法 `echarts.init(dom, 'dark)`

第三方主题需自己加载: 

```js
// 如果主题保存为 JSON 文件，则需要自行加载和注册，例如：
$.getJSON('xxx/xxx/vintage.json', function(themeJSON) {
  echarts.registerTheme('vintage', JSON.parse(themeJSON));
  var chart = echarts.init(dom, 'vintage');
});
//如果保存为 UMD 格式的 JS 文件，文件内部已经做了自注册，直接引入 JS 即可：
var chart = echarts.init(dom, 'vintage');
```

## 调色盘

调色盘在 option 中设置, 它给定了一组颜色, 图形, 系列会自动从其中选择颜色, 可以设置全局的调色盘, 也可以设置系列自己专属的调色盘

```js
option = {
  color: ['#c23531', '#2f4554'], // 全局调色盘。
  series: [
    {type: 'bar', color: ['#dd6b66', '#759aa0']}, // 此系列自己的调色盘
    {type: 'pie', color: ['#37A2DA', '#32C5E9']} // 此系列自己的调色盘
  ]
}
```

## 直接样式设置

纵观 ECharts 的 option 中，很多地方可以设置 `itemStyle、lineStyle、areaStyle、label` 等等。

这些的地方可以直接设置图形元素的颜色、线宽、点的大小、标签的文字、标签的样式等等。

## 高亮的样式

鼠标悬浮时会出现高亮，可以通过 `emphasis` 自定义

```js
option = {
  series: {
    type: 'scatter',

    // 普通样式
    itemStyle: { color: 'red' }, // 点的颜色
    label: { show: true, formatter: 'This is a normal label.' } // 标签的文字

    // 高亮样式
    emphasis: { 
      itemStyle: { color: 'blue' }, // 高亮时点的颜色
      label: { show: true, formatter: 'This is a emphasis label.' } // 高亮时标签的文字
    }
  }
}
```

# 数据集

数据集 `dataset` 是专门用来管理数据的组件。

虽然每个系列都可以在 `series.data` 中设置数据，但是从 ECharts4 支持数据集开始，更推荐使用数据集来管理数据。