# angular/cli 的使用

- `npm i @angular/cli -g` 全局安装脚手架
- `ng new <project-name>` 生成项目，选项 `--skip-tests` 指定不生成测试文件 
- `ng serve` 在项目根目录下执行，运行项目，选项 `--open` 指定是否自动在浏览器中打开，选项 `--port <port>` 指定端口
 
# angular 组件

## 组件概述

- 组件由 HTML 模版, Typescript 类, CSS 选择器, CSS 样式组成
- `ng generate component <name>` 用脚手架创建组件，可指定生成的位置，默认在 `src/app/` 下生成
- `--inline-style` 选项在元数据处生成 `styles` 数组，而代替默认的样式文件和 `styleUrls`

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

## 组件交互

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

### 在父组件中使用子组件属性方法

- 父组件不能直接读取子组件的属性或调用子组件的方法
- 但可以在父组件模板里新建一个本地变量来代表子组件，利用该变量调用子组件属性方法
- 本地变量即：`<child-component #child>` 在子组件标签中用 `#` 定义

```html
<!-- 定义了本地变量 -->
<app-children #timer></app-children>
<!-- 利用本地变量来调用子组件的方法 start() stop() -->
<input type="button" value="start" (click)='timer.start()'>
<input type="button" value="stop" (click)='timer.stop()'>
```

### 父组件调用 @ViewChild

- 导入装饰器 `ViewChild` 和生命周期钩子 `AfterViewInit`，也可用 `AfterViewChecked`
- 通过 `@ViewChild` 注入要调用的子组件, 这样就可以调用子组件方法了
- 被注入的子组件只有在显示了父组件视图之后才能访问, 所以属性或某些功能得在 `ngAfterViewInit` 中操作
- 在调用 `ngAfterViewInit` 之后就不能再更新父组件视图，单向数据流规则会阻止在同一个周期内更新父组件视图, 会被迫再等一轮
- 可使用 `setTimeout()` 来等待下一轮

```ts 
// 导入 ViewChild AfterViewInit 和子组件
import { AfterViewInit, ViewChild } from '@angular/core';
import { ChildrenComponent } from './children.component';
// 利用 ViewChild 注入子组件，() 里可能要传两个值
@ViewChild(ChildrenComponent) private childrenComponent: ChildrenComponent;
// 在 ngAfterViewInit 中处理单项数据流规则而导致的问题
ngAfterViewInit() {
  // 利用 setTimeout() 等待
  setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
}
```

### 组件间通过服务来通讯

- 新建一个服务，若只想在父子组件中使用，则在父组件元数据中用 `providers` 提供服务
- 如果想再整个模块中使用，则在模块的 `providers` 中提供服务
- 导入完成后在组件的构造函数里注入服务，之后即可使用服务中的属性方法 

## 组件样式

- 可以直接在元数据中设置 `styles` 并在此写样式, 也可用 `styleUrls` 指定外部样式
- 可以直接在组件的模板中用 `<style>` 标签来内嵌 CSS 样式，也可以使用 `<link>` 标签引入样式文件
- 组件的样式是只对该组件起作用, 编译后会带一个独一无二的属性选择器, 而根目录下 `style.css` 中样式是全局的
- 全局样式：在 `angular.json` 的 `styles` 区注册全局样式文件，默认会有一个预先配置的全局 `styles.css` 文件

### 特殊的样式

- `:host()` 表示宿主元素，是把宿主元素作为目标的唯一方式，因为宿主元素是父组件模版的一部分，可以在后面的括号里设置条件
- `:host-context()` 从当前组件宿主元素的祖先节点中查找 CSS 类，直到文档的根节点，配合其他选择器使用
- `::ng-deep` 带有该伪类的样式都会变成全局样式，`:host ::ng-deep` 这样使用会将样式限制在当前组件

```css
/* 宿主元素只有带 active 类时才应用该样式 */
:host(.active) { background: #fff };
/* 当某个祖先元素有 theme-light 类时，才会应用 background 样式到组件内部的 <h2> 元素中 */
:host-context(.theme-light) h2 { background: #fff }
/* 不指定应用样式的元素时，会把样式加在 :host 上 */
:host-context(.theme-light) { background: #fff }
```

##  组件内容投影

- 单插槽内容投影，即在组件内部预留插槽 `<ng-content>`，只是一个占位符, 不允许在标签内写内容
- 多插槽内容投影，利用 `<ng-content>` 的 `select` 属性指定为独有的插槽
- 也可利用 `<ng-container>`, 设置 `ngProjectAs` 将多个标签一起匹配，该标签并不会被渲染到页面中

```html
<!-- 定义独特的插槽 -->
<ng-content select='[a]'></ng-content>
<!-- 匹配上面的插槽, 这种写法是筛选属性，而非指令 -->
<h1 a>aaa</h1>
<!-- 一次性匹配多个标签，不知为什么要这样用 -->
<ng-container ngProjectAs='[a]'>
  <h1>aaa</h1>
</ng-container>
```

### ? 有条件的内容投影

- `<ng-template>` 不会直接显示出来, 在渲染视图之前, 会把其内容替换为一个注释, 需要被特殊处理后才能渲染, 主要用 `TemplateRef` 和 `ViewContainerRef` 实现
- `TemplateRef` 表示内嵌的 template 模板元素
- `ViewContainerRef` 用于表示一个视图容器, 主要作用是创建和管理内嵌视图或组件视图
- 有条件的内容投影 `<ng-container>` `<ng-template>` `@ContentChild`

## ? 动态组件

## ? 组件自定义元素

# angular 模版

- 模板就是一块 HTML, 在模板中，你可以通过一种特殊语法来使用 Angular 的许多功能

## 文本插值

- 插值是指将模版表达式嵌入到被标记的文本中，插值使用双花括号 `{{ }}` 作为定界符
- 插值也可以应用于属性中 `<img src='{{url}}'>`
- 可通过组件元数据中的 `interpolation` 选项来自定义插值分隔符

```ts
// 你不能使用那些具有或可能引发副作用的 JavaScript 表达式，包括：
- '赋值 (=, +=, -=, ...)'
- '运算符，比如 new、typeof 或 instanceof 等'
- '使用 ; 或 , 串联起来的表达式'
- '自增和自减运算符：++ 和 --'
- '一些 ES2015+ 版本的运算符'
```

## 模版语句

- 模板语句语法类似于 JS, 但模板语句的解析器与模板表达式的解析器有所不同，并且模板语句解析器特别支持基本赋值 `=` 和带有分号 `;` 的串联表达式
- 语句能引用组件实例的属性也可引用模板自身的上下文属性，且模板上下文中的名称优先于组件上下文中的名称

## 管道

- 管道用来对字符串、货币金额、日期和其他显示数据进行转换和格式化
- 管道是一些简单的函数，可以在模板表达式中用来接受输入值并返回一个转换后的值
- 管道操作符: `|` 之前放数据，之后紧跟管道名, 管道可以串联，无限套娃
- 管道可接收参数微调管道的输出，用 `:` 紧跟参数，如果参数有多个，可以用 `:` 分隔

```ts
// 数据格式化常用管道
// 根据本地环境中的规则格式化日期值 {{ data }}
DatePipe()
// 把文本全部转换成大写 {{ uppercase }}
UpperCasePipe()
// 把文本全部转换成小写
LowerCasePipe()
// 把数字转换成货币字符串，根据本地环境中的规则进行格式化 {{ currency: 'EUR' }}
CurrencyPipe() 
// 把数字转换成带小数点的字符串，根据本地环境中的规则进行格式化
DecimalPipe()
// 把数字转换成百分比字符串，根据本地环境中的规则进行格式化
PercentPipe()
// 其他
// 将 js 对象转换为 json 字符串
`json`
// 接受一个可观察对象作为输入，并自动订阅输入
`async`
```

- 可以自定义管道，把类标记为管道并提供配置元数据即可，即把 `@Pipe` 装饰器应用到这个类上
- 再把管道包含在 `NgModule` 元数据的 `declarations` 字段中以便它能用于模板
- 在脚手架里用 `ng generate pipe` 自动创建管道并注册到模块里

```ts
// 导入管道的两个核心类
import { Pipe, PipeTransform } from '@angular/core';
// @Pipe 装饰器设置元数据
@Pipe({
  name: 'test'
})
// 在自定义管道类中实现 PipeTransform 接口
export class TestPipe implements PipeTransform {
  // 调用 transform 方法, 第一个参数为绑定的值，第二个参数表示其他任何形式的参数，并返回转换后的值
  transform(value: any, ...args: any[]): any {
    return null;
  }
}
```

- 管道的数据变更检测，每当数据更改时，管道都会重新运行
- 一般管道会被定义成纯管道，只有检测到数据纯变更时才执行，此时会忽略复合对象中的变化(数组，对象)
- 非纯管道：在元数据中设置 `pure: false` 把管道变成非纯管道，每当按键或鼠标移动时，都会检测到一次变更从而执行一个非纯管道

## 属性绑定

- 属性绑定数据流：属性绑定在单一方向上将值从组件的属性送到目标元素的属性
- 用 `[]` 绑定要进行赋值的目标属性，有方括号时将等号的右侧看作动态表达式，没有方括号则视为字符串字面量
- 安全性：`angular` 不允许带有 `<script>` 标签的文本，既不能用于插值也不能用于属性绑定
- `[innerHtml]` 绑定该属性会将内容放进 `innerHtml` 里，会自动屏蔽 script 标签
- 一般插值和属性绑定可以达到相同的结果

```html
<!-- 属性绑定常用场合：切换按钮功能(绑定为布尔值)，设置指令属性(绑定指令)，在组件之间绑定值(绑定输入属性) -->
<!-- 下面两者一致 -->
<div class={{name}}></div>
<div [ngclass]='name'></div>
<!-- 下面两者一致 -->
<p>{{msg}}</p> 
<p [innerHtml]='msg'></p>
```

- 另一种属性绑定 `attribute`, 类似于 `property`, 需在属性前面加 `attr` 前缀 `[attr.xxx]`
- 当表达式解析为 `null` 或 `undefined` 时会完全删除该 `Attribute`
- 该绑定的主要用例：设置 `aria` 属性，绑定 `colspan` 属性

### class 属性绑定

- 绑定到单个类：`[class.on]='true|false'` 当为真时添加该类, 为假时删除该类
- 绑定到多个类：`[class]='value']` 值可以为空格分隔的类名字符串，类名的数组，以类名作为键名并将真或假表达式作为值的对象

### style 属性绑定

- 绑定单一样式：使用前缀 `style` 后跟一个点和 `CSS style Attribute` 的名称: `[style.width]='10px']`
- 绑定多个样式：`[style]='value'` 值可以为样式的字符串列表，一个对象，其键名是样式名，其值是样式值, 不支持绑定到数组

### 注入属性值

- 可通过装饰器 `@Attribute` 用依赖注入的方式将 HTML 属性的值传递给组件或指令的构造函数, 此方法不会追踪更新关联的值

```ts
// 引用该组件时设置了 type 属性
`<my-component type='number'></my-component>`
// 在组件类中导入 Attribute 装饰器
import { Attribute } from '@angular/core';
export class MyComponent {
  // 依赖注入, 并将该组件上的 type 属性值赋给本地的 type
  constructor(@Attribute('type') public type: string) { }
}
```

## 事件绑定

- 语法规则: 由等号左侧括号内的目标事件名和右侧引号内的模板语句组成

### EventEmitter 自定义事件

- 创建一个 `EventEmitter` 并将其对外暴露为属性
- 调用 `EventEmitter.emit(data)` 发出事件，可传入任何数据
- 父指令|组件通过绑定该属性来监听事件，并通过传入的 `$event` 对象接收数据

## 双向绑定

- 语法规则: 方括号和圆括号的组合 `[()]`, `[]` 进行属性绑定, `()` 进行事件绑定

### 实际应用







# OLD

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

## 创建路由

- 把单独的路由模块导入到要使用路由的模块里并把它添加到 `imports` 数组中
- 把 `RouterModule` 和 `Routes` 导入到你的路由模块中，定义 `Routes` 数组: `const routes:Routes = []`
- 在 Routes 数组中定义你的路由, 每个路由都包含两个属性, `path` 定义了该路由的 URL 路径, `component` 定义了要用作相应路径的组件


# angular HTTP 客户端

- 在模块中导入并引入 `HttpClientModule`
