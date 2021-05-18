# angular/cli 的使用

- `npm i @angular/cli -g` 全局安装脚手架
- `ng new <project-name>` 生成项目，选项 `--skip-tests` 指定不生成测试文件 
- `ng serve` 在项目根目录下执行，运行项目，选项 `--open` 指定是否自动在浏览器中打开，选项 `--port <port>` 指定端口
 
# angular 组件

## 组件概述

- 组件由 HTML 模版, Typescript 类, CSS 选择器, CSS 样式组成
- `ng generate component <name>` 用脚手架创建组件，可指定生成的位置，默认在 `src/app/` 下生成

## 组件类结构

```ts
// 导入核心 Component
import { Component } from '@angular/core'
// 装饰器定义组件元数据
@Component({
  // selector 组件名称, css 选择器
  selector: 'app-root', 
  // template 组件模板, templateUrl 模板地址
  templateUrl: './app.component.html', 
  // style 组件样式, styleUrls 多个样式地址
  styleUrls: ['./app.component.css'] 
})
// 导出该组件类, 处理数据和功能
export class AppComponent {}
```

## 组件生命周期

- 当实例化组件类并渲染组件视图及其子视图时，组件实例的生命周期就开始了
- 生命周期一直伴随着变更检测，Angular 会检查数据绑定属性何时发生变化，并按需更新视图和组件实例
- 当销毁组件实例并从 DOM 中移除它渲染的模板时，生命周期就结束了

```ts
// 可以使用生命周期钩子方法来触发组件或指令生命周期中的关键事件
// 生命周期钩子是一种接口，它允许你监听指令和组件的生命周期，比如创建、更新和销毁
// 每个接口只有一个钩子方法，方法名是接口名加前缀 ng, 要添加方法需先实施该接口
// Angular 中生命周期钩子方法的顺序：
// 在输入属性 (input)/输出属性 (output)的绑定值发生变化时调用，当没有时不调用
ngOnChanges()
// 在第一次 ngOnChanges 完成后调用
ngOnInit()
// 开发者自定义变更检测
ngDoCheck()
// 在组件内容初始化后调用
ngAfterContentInit()
// 在组件内容每次检查后调用
ngAfterContentChecked()
// 在组件视图初始化后调用
ngAfterViewInit()
// 在组件视图每次检查后调用
ngAfterViewChecked()
// 在指令销毁前调用
ngOnDestroy()
```

## 组件视图包装

- 组件的 CSS 样式被封装进了自己的视图中，而不会影响到应用程序的其它部分
- `encapsulation: ViewEncapsulation.Emulated` 通过在组件的元数据上设置视图封装模式，你可以分别控制每个组件的封装模式

```ts
// 视图封装模式
- "ShadowDom: 使用原生 Shadow DOM 实现, 来为组件的宿主元素附加一个 Shadow DOM (组件样式出不去, 没有样式能进来)"
- "Emulated(默认值): 通过预处理并改名 CSS 代码来模拟 Shadow DOM 的行为 (全局样式能进来，组件样式出不去)"
- "None: 不使用视图封装, 把 CSS 添加到全局样式中, 而不会应用上前面讨论过的那些作用域规则、隔离和保护"
// Emulated 模式下生成的 CSS 代码
- "当元素属于宿主元素时会被添加一个 _nghost 属性，后面的值随机"
- "组件中其他元素会被添加一个 _ngcontent 属性，标记出该元素属于那个宿主元素"
- "每个选择器都加上 _nghost 或 _ngcontent 属性选择器, 用来提供作用域规则"
```

## 组件的交互

### 父传子

- 利用 `[]` 属性绑定与 `@Input()` 来实现
- 在父组件中定义数据，父组件模板里引用子组件并为其绑定 DOM 属性并赋值为要传递的值 `[name]='value'`
- 在子组件中用 `@Input()` 声明输入属性，即可在子组件中模板中使用
- `@Input()` 将某个类字段标记为输入属性，括号内可传值来指定别名

### 用 setter 截取输入数据

```ts
// Input() 装饰器，后面是一个整体
@Input() 
// get 与 set 被称作 setter , 用来截获输入的数据, 可在此作处理
get name():string { return this._name; }
// 本例中将名字两边空格去掉了
set name(name:string) { this._name = (name && name.trim()) || '<no name set>' }
// 这条语句必须放在后面
private _name = ''
```

### 用 ngOnChanges() 截取输入数据

- 当监视多个输入属性的时候，本方法比用属性的 setter 更合适
- 当频繁地更改输入属性时，可以每次更改都截取

```ts
// 会自动引入 OnChanges, SimpleChangs
import { OnChanges, SimpleChanges } from '@angular/core';
// 实施接口 OnChanges
export class NotifyBtnComponent implements OnChanges {
  // changes 类似于依赖注入，放着改变相关的属性
  ngOnChanges(changes:SimpleChanges):void {
    console.log(changes);
    // 实现上面 name 空格的去除
    this.name = (this.name && this.name.trim()) || '<no name set>'
  }
}
```

### 子传父

- 利用 `EventEmitter` 自定义事件与 `@Output` 来实现
- 在在子组件中用 `@Output()` 输出一个属性, 该属性是 `EventEmitter` 的实例
- 在子组件中利用该属性的 `emit` 方法发射事件, 可带参数
- 在父组件模板中绑定子组件自定义事件的事件函数，该事件函数的 `$event` 事件参数即 `emit` 发射的数据

# angular 模块结构

```ts
// 导入核心模块 NgModule, BrowserMoudle
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 导入要用的所有组件
import { AppComponent } from './app.component';
// NgModule 装饰器
@NgModule({
  // declarations 声明要使用的组件
  declarations: [AppComponent],
  // imports 引入要使用的模块
  imports: [BrowserModule], 
  // providers
  providers: [], 
  // bootstrap 指定首页需要挂载的组件, 首页中其他组件无效
  bootstrap: [AppComponent] 
})
// 导出该模块类
export class AppModule {}
```

# angular 框架模式

- angular 是 MVVM 模式，该模式起源于 MVC
- `M -> model`: 数据，`V -> view`: 视图， `C -> control`: 控制器
- `VM -> 数据和视图的双向绑定`：只要修改数据，VM 就会自动的改变视图，视图的交互又改变了数据

# angular 样式相关

- 组件的样式是只对该组件起作用, 编译后会带一个独一无二的属性选择器, 而根目录下 `style.css` 中样式是全局的
- 模版中可以不像 vue，react 那样必须写在根标签里，因为 angular 自动会生成根标签
- 在 angular 生成的标签上可以直接写样式，但路由输出 `<router-outlet>` 不能在上面写样式

# angular 基础插值语法

- `{{}}` 可以在里面放变量，表达式等，须在 `.component.ts` 的导出类中定义
- `{{}}` 插值可以应用应用于内容里，也可以用于属性中
- 绑定自定义属性：`<p [attr.<name>]="value"></p>`
- 绑定已有属性：`<p [name]="value"></p>`
- `{{}}` 不会将 html 形式的文本进行转义
- 转义 HTML: `[innerHtml]='htmlValue'` 会将内容以 html 形式来转义，会自动屏蔽 script 标签

- 绑定 class 属性的方式：`class={{name}}`, `[class]="name"`, `[attr.class]="name"`
- 对象模式绑定：`[class]="{name1: boolean, name2: boolean}"`
- 数组模式绑定：`[class]="[name1, name2]"`
- angular 特有的方式绑定：`[class.<name>]="boolean"`

- 绑定事件：`(click)="func()"` 左侧写事件名称，右侧写事件函数
- 传递事件对象参数：`(click)="func($event)"`

- 条件渲染：指令 `*ngIf` 特殊的属性, 会直接将元素移出 HTML，不适合频繁切换
- 样式切换：`[style.display]`，适合频繁切换

- 循环渲染：`*ngFor = "let item of xxx; let i = index"` 获取数组中的值和索引

- 条件分支：`ngSwich` , `*ngSwitchCase` , `*ngSwitchDefault`

```html
<div [ngSwitch]="state">
  <div *ngSwitchCase="1">待付款</div>
  <div *ngSwitchCase="2">已付款</div>
  <div *ngSwitchCase="3">发货</div>
  <div *ngSwitchDefault>丢失</div>
</div>
```

- 双向绑定：`[(ngModel)]` 需要引入内置的表单模块 `FormsModule`
- 不用内置表单模块：直接在标签内部定义临时元素 `#name` 表示元素对象本身
- 在标签内定义的变量优先级比在 ts 中定义的变量优先级高, 且不可以赋值

```html
<div>
  <!-- #input 表示为这个元素起一个名字，该名字就是元素对象本身, 临时变量 -->
  <p><input type="text" #input></p> 
  <p><input type="button" value="点击" (click)="getContent(input.value)"></p>
</div>
```
```ts
public getContent(input:string|object):void {
  console.log(input);
}
```

- 在表单标签这一特殊的标签下, 可以用 `ngForm` 来获取表单对象
- 为表单的临时变量赋值 ngForm , 此时该临时变量是表单对象, 而未赋值时临时变量是表单元素

```html
<form #form='ngForm'>
  <input type="text" name="text" id="text" placeholder="put your name">
  <input type="button" value="click me" (click)="show(form)">
</form>
```

# angular 管道

- `|` 管道符号，前面是模板变量，想要改变的值，后面是管道函数, 管道函数允许接受参数，紧跟 `:` 来实现
- `json` 将 js 对象转换为 json 字符串
- `data` 转变日期格式，例：`Date.now() | data: 'YYYY-MM-DD'` 有问题，不能显示 DD
- `async` 管道从数据流中返回最新值
- `currency` 管道把数据转换为货币格式
- 用 `ng generate pipe <dir/filename>` 在指定位置生成管道，管道应在 `module` 文件的 `declarations` 中声明
- 在管道文件中的 `transform` 函数中写操作，该函数有两个参数，`value` 指 `|` 前的模板变量，`args` 指 `:` 后的参数, 多个参数间用 `:` 隔开
- 管道可以用链式的写法，`{{abcd | uppercase | lowercase}}`

```ts
// 导入管道的两个核心类
import { Pipe, PipeTransform } from '@angular/core';
// pipe 装饰器 @Pipe()
@Pipe({
  name: 'transformRMB' // name 管道的名字
})
export class TransformRMBPipe implements PipeTransform {
  // transform 即转换函数，再此定义操作
  transform(value: number, ...args: number[]): number { // value 是 | 前的参数，args 是 pipe:xxx 中的参数
    return '￥' + value.toFixed(2)
  }
}
```

# angular 自定义指令

- 用 `ng generate directive` 创建指令文件
- 自定义指令以绑定属性的形式来对该元素进行功能的增加
- 为了能操作元素，需注入 `ElementRef` 来获取元素对象

```ts
import { Directive, ElementRef, Input } from '@angular/core'; // 导入核心装饰器 Directive
// @Directive 中定义的是名字
@Directive({
  selector: '[appAddClassname]'
})
export class AddClassnameDirective {
  constructor(
    private ref:ElementRef // 注入 ElementRef 服务
  ) { }
  @Input() public appAddClassname:string // 用 @Input() 来定义输入属性
  ngOnChanges() { // 在 ngOnChanges() 钩子中获取绑定该指令的值及元素
    console.log(this.ref.nativeElement);
    console.log(this.appAddClassname);
  }
}
```

# angular 服务与依赖注入

- 公用的功能一般封装进服务里, 然后用依赖注入的方式重复利用
- 依赖注入实际就是类的实例化

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstServiceService {

  constructor() { }
}
```

- 服务即时类的一个实例，依赖注入只是一种简写，相当于实例化一个类

# angular 路由

- `RouterLink` 指令用来自定义 a 元素，用来实现单页面跳转，而 href 属性则不是单页面复用
- `<router-oulet>` 路由的占位标签
- `ActivatedRoute` 中包含有关路由和路由参数的信息, 通过导入并注入以使用服务
- 路由模块中设置 `{path: '', component: , children: [{...}]}` children 表示子路由
- 兜底路由: `path: '**'`

- 编程时导航: 导入并注入 Router 服务, 利用 `navigate` 方法进行导航
- 第一个参数是数组形式: `['url', params]`, 第二个参数是对象: `{queryParams, fragment, replaceUrl}`

# angular HTTP 客户端

- 在模块中导入并引入 `HttpClientModule`
