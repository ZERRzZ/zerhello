# angular/cli 的使用

- 全局安装脚手架 `npm i @angular/cli -g`
- 生成项目 `ng new <project-name>` 不生成测试文件 `--skip-tests`
- 运行项目 `ng serve` 是否自动在浏览器中打开 `--open` 指定端口 `--port <port>` 在项目根目录下运行
- 生成组件 `ng generate component filename` 默认在 `/src/app/` 下生成文件，可自定义生成位置
- 生成管道 `ng generate pipe` 
- 生成指令 `ng generate directive`

# angular 组件结构

```ts
// 导入核心 Component
import { Component } from '@angular/core'
// 装饰器定义元数据
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

# angular 样式简介

- `.component.html` 中写模板，在 `.component.css` 中写样式
- `.component.css` 中样式是只对该组件起作用，会带一个独一无二的属性选择器- 根目录下 `style.css` 中样式是全局的
- `.component.html` 中可以不像 vue，react 那样必须写在根标签里，因为 angular 自动帮你写了

# angular 框架模式

- angular 是 MVVM 模式，该模式起源于 MVC
- `M -> model`: 数据，`V -> view`: 视图， `C -> control`: 控制器
- `VM -> 数据和视图的双向绑定`：只要修改数据，VM 就会自动的改变视图，视图的交互又改变了数据

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

- `|` 管道符号，前面是模板变量，想要改变的值，后面是管道函数, 如 `{{abcd | uppercase: xxxx}}`
- 常见管道：`json` 将 js 对象转换为 json 字符串, `data: '格式'` 例：`Date.now() | data: 'YYYY-MM-DD'` 有问题，不能显示 DD
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

# angular 组件传值

## 父传子

- 利用 `[]` 属性绑定与 `@Input()` 来实现
- 在父组件中定义数据，父组件模板里引用子组件并为其绑定 DOM 属性并赋值为传递的值 `[name]='value'`
- 在子组件中用 `@Input()` 定义输入属性，即可在子组件中模板中使用
- `@Input()` 将某个类字段标记为输入属性，括号内可传值来指定输入属性绑定到 DOM 属性的名字，无值则名字与原始名字一致

```ts
// 父模板中为子组件输入属性绑定父组件 DOM 属性
<app-child [child-name]='name' [age]='age'></app-child> // child-name 为指定的名字，age 为默认名
// 子组件中定义, 不知为什么需要赋初始值
@Input('child-name') public name:string = 'default'  // 指定了默认的名字
@Input() public age:number = 0
// 子组件模板, 只能使用默认的名字，不能使用指定的名字
<h1>{{name}}</h1>
<h1>{{age}}</h1>
```

## 子传父

- 利用 `EventEmitter` 自定义事件与 `@Output` 来实现
- 在在子组件中用 `@Output()` 定义自定义事件，该事件是 `EventEmitter` 的实例
- 在子组件模板中绑定默认事件函数，在事件函数里用自定义事件的 `emit` 方法发射数据
- 在父组件模板中绑定子组件自定义事件的事件函数，该事件函数的 `$event` 事件参数即 `emit` 发射的数据

```ts
// 子组件
@Output() public childEvent:EventEmitter<string> = new EventEmitter<string>() // 定义子组件的事件 childEvent
<input type="button" value="send" (click)='sentEvent("I am child mssg")'> // 绑定 click 事件
public sentEvent(value:any):void { // 定义 sentEvent 方法
  this.childEvent.emit(value)
}
// 父组件
<app-child [child-name]='name' [age]='age' (childEvent)='requireMsg($event)'></app-child> // 绑定子组件事件，用 $event 接收数据
```

# angular 生命周期

## constructor 构造函数

- 虽然不归入生命周期函数里，但它是在组件初始化时调用, 最先调用

## ngOnChanges() 

- 当数据发生改变之时，就会调用此函数
- 在 ngOnInit() 之前以及所绑定的一个或多个输入属性的值发生变化时都会调用。注意，如果你的组件没有输入就不会调用 ngOnChanges()

## 其他生命周期

- `ngOnInit()` 第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件, 在第一轮 ngOnChanges() 完成之后调用，只调用一次
- `ngDoCheck()` 检测，并在无法或不愿意自己检测的变化时作出反应, 紧跟在每次执行变更检测时的 ngOnChanges() 和 首次执行变更检测时的 ngOnInit() 后调用
- `ngAfterContentInit()` 把外部内容投影进组件视图或指令所在的视图之后调用。第一次 ngDoCheck() 之后调用，只调用一次
- `ngAfterContentChecked()` 检查完被投影到组件或指令中的内容之后调用。ngAfterContentInit() 和每次 ngDoCheck() 之后调用
- `ngAfterViewInit()` 初始化完组件视图及其子视图或包含该指令的视图之后调用, 第一次 ngAfterContentChecked() 之后调用，只调用一次
- `ngAfterViewChecked()` 做完组件视图和子视图或包含该指令的视图的变更检测之后调用。ngAfterViewInit() 和每次 ngAfterContentChecked() 之后调用
- `ngOnDestroy()` 每次销毁指令/组件之前调用并清扫, 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏, 在 angular 销毁指令或组件之前立即调用

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