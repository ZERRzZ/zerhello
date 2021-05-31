## angular/cli 的使用

全局安装脚手架 `npm install @angular/cli --global`  
生成新项目 `ng new <name>` 指定不生成测试文件 `--skip-tests`  
运行项目 `ng serve` 指定是否自动在浏览器中打开 `--open` 指定端口 `--port <port>`
 
## angular 组件

组件创建

创建: 脚手架创建组件 `ng generate component <name>` 可指定生成的位置, 默认在 src/app/ 下生成  
组成: HTML 模版, Typescript 类, CSS 选择器, CSS 样式  
样式: 在元数据处生成 styles, 而代替默认的样式文件和 styleUrls `--inline-style`

组件类结构

```ts
// 从核心导入 Component 装饰器
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

生命周期

开始: 实例化组件类并渲染组件视图及其子视图时, 组件实例的生命周期就开始了  
结束: 当销毁组件实例并从 DOM 中移除它渲染的模板时，生命周期就结束了  
特性: 生命周期一直伴随着变更检测, Angular 会检查数据绑定属性何时发生变化，并按需更新视图和组件实例  
生命周期钩子: 生命周期钩子是一种接口，它允许你监听指令和组件的生命周期  
生命周期函数: 每个接口只有一个钩子方法，方法名是接口名加前缀 ng, 要添加方法需先实施该接口

	Angular 中生命周期钩子方法的顺序：
	ngOnChanges() 在输入属性的绑定值发生变化时调用，当没有时不调用
	ngOnInit() 在第一次 ngOnChanges 完成后调用
	ngDoCheck() 开发者自定义变更检测
	ngAfterContentInit() 在组件内容初始化后调用
	ngAfterContentChecked() 在组件内容每次检查后调用
	ngAfterViewInit() 在组件视图初始化后调用
	ngAfterViewChecked() 在组件视图每次检查后调用
	ngOnDestroy() 在指令销毁前调用

组件样式

可以直接在元数据中设置 `styles` 并在写样式, 也可用 `styleUrls` 指定外部样式  
可以直接在组件的模板中用 `<style>` 标签来内嵌 CSS 样式, 也可以使用 `<link>` 标签引入样式文件  
组件的样式是只对该组件起作用, 编译后会带一个独一无二的属性选择器, 而根目录下 `style.css` 中样式是全局的  
可在 `angular.json` 的 `styles` 区注册全局样式文件, 默认会有一个预先配置的全局 `styles.css` 文件

特殊选择器

`:host()` 表示宿主元素, 是把宿主元素作为目标的唯一方式, 可以在后面的括号里设置条件  
`:host-context()` 从当前组件宿主元素的祖先节点中查找 CSS 类, 直到文档的根节点, 配合其他选择器使用  
`::ng-deep` 带有该伪类的样式都会变成全局样式, `:host ::ng-deep` 这样使用会将样式限制在当前组件

```css
/* 宿主元素只有带 active 类时才应用该样式 */
:host(.active) { background: #fff };
/* 当某个祖先元素有 theme-light 类时，才会应用 background 样式到组件内部的 <h2> 元素中 */
:host-context(.theme-light) h2 { background: #fff }
/* 不指定应用样式的元素时，会把样式加在 :host 上 */
:host-context(.theme-light) { background: #fff }
```

视图封装

组件间的样式互不影响 ,因为组件的 CSS 样式被封装进了自己的视图中  
视图封装模式: `encapsulation: ViewEncapsulation.Emulated` 可在在组件的元数据上设置视图封装模式

	视图封装模式: 
	ShadowDom: 使用原生 Shadow DOM 实现, 来为组件的宿主元素附加一个 Shadow DOM, 组件样式出不去, 没有样式能进来
	Emulated: 通过预处理并改名 CSS 代码来模拟 Shadow DOM 的行为, 全局样式能进来, 组件样式出不去
	None: 不使用视图封装, 把 CSS 添加到全局样式中

	Emulated 模式下生成的 CSS 代码: 
	当元素属于宿主元素时会被添加一个 _nghost 属性, 后面的值随机
	组件中其他元素会被添加一个 _ngcontent 属性, 标记出该元素属于那个宿主元素
	每个选择器都加上 _nghost 或 _ngcontent 属性选择器, 用来提供作用域规则

## 组件交互

父传子

利用 `[]` 和输入属性 `@Input` 来操作, `@Input` 将某个类字段标记为输入属性，括号内可传值来指定别名  
父组件模板里引用子组件并为其绑定 DOM 属性并赋值 `[name]='value'`  
子组件中用 `@Input` 声明输入属性, 属性名与绑定的 DOM 属性名一致即可在子组件中模板中使用

用 setter 截取输入数据

```ts
// Input() 装饰器，后面是一个整体
@Input() 
// get 与 set 被称作 setter , 用来截获输入的数据, 可在此作处理
get name():string { return this._name; }
// 本例中将名字两边空格去掉了
set name(name:string) { this._name = name.trim() }
// 这条语句必须放在后面
private _name = ''
```

用 onChanges 截取输入数据  

当监视多个输入属性的时候，本方法比用属性的 setter 更合适

```ts
// 导入 OnChanges, SimpleChangs
import { OnChanges, SimpleChanges } from '@angular/core';
// 实施接口 OnChanges
export class NotifyBtnComponent implements OnChanges {
	// SimpleChanges 类似于依赖注入，放着改变相关的属性
	ngOnChanges(changes: SimpleChanges):void {
		console.log(changes);
		// 实现上面 name 空格的去除
		this.name = this.name.trim()
	}
}
```

子传父

利用 `EventEmitter` 自定义事件与 `@Output` 来实现  
子组件中用 `@Output` 输出一个`EventEmitter` 的实例属性, 用该事件属性的 `emit` 方法发射事件, 可带参数  
父组件模板中绑定子组件自定义事件属性, 并用函数接收, 函数的 `$event` 参数即 `emit` 发射的数据

父组件调用子组件属性方法

可在父组件模板里新建一个模版变量来代表子组件, 利用该变量调用子组件属性方法  
模版变量在子组件标签中用 `#` 定义, 即 `<child-component #child>`

父组件调用 ViewChild

导入装饰器 `ViewChild` 和生命周期钩子 `AfterViewInit`  
通过 `@ViewChild()` 声明子组件变量, 在括号里传入子组件导出类, 这样就可以调用子组件方法了

	这种方法只有在显示了父组件视图之后才能访问, 所以得在 `ngAfterViewInit()` 中操作
	而在调用 `ngAfterViewInit` 之后就不能再更新父组件视图
	单向数据流规则会阻止在同一个周期内更新父组件视图, 会被迫再等一轮
	可使用 `setTimeout()` 来等待下一轮, 以寻求视图与数值一致

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

组件间通过服务来通讯

新建一个服务, 若只想在父子组件中使用, 则在父组件元数据中用 `providers` 提供服务  
如果想再整个模块中使用, 则在模块的 `providers` 中提供服务  
导入完成后在组件的构造函数里注入服务, 之后即可使用服务中的属性方法

## 组件内容投影

一般插槽

单插槽内容投影, 即在组件内部预留插槽 `<ng-content>`, 只是一个占位符, 不允许在标签内写内容  
多插槽内容投影, 利用 `<ng-content>` 的 `select` 属性指定为独有的插槽  
也可利用 `<ng-container>`, 设置 `ngProjectAs` 将多个标签一起匹配，该标签并不会被渲染到页面中

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

? 有条件的内容投影

`<ng-template>` 不会直接显示出来, 在渲染视图之前, 会把其内容替换为一个注释, 需要被特殊处理后才能渲染  
使用模版需要搭配 `TemplateRef` 和 `ViewContainerRef` 实现  
`TemplateRef` 表示内嵌的 template 模板元素  
`ViewContainerRef` 用于表示一个视图容器, 主要作用是创建和管理内嵌视图或组件视图  
有条件的内容投影 `<ng-container>` `<ng-template>` `@ContentChild`

? 动态组件

? 组件自定义元素

## angular 模版

概述

模板就是一块 HTML, 在模板中, 你可以通过一种特殊语法来使用 Angular 的许多功能

文本插值

插值是指将模版表达式嵌入到被标记的文本中, 插值使用双花括号 `{{ }}` 作为定界符  
插值也可以应用于属性中 `<img src='{{url}}'>`  
可通过组件元数据中的 `interpolation` 选项来自定义插值分隔符

	不能使用那些具有或可能引发副作用的 JavaScript 表达式，包括：
	赋值 (=, +=, -=, ...)
	运算符，比如 new、typeof 或 instanceof 等
	使用 ; 或 , 串联起来的表达式
	自增和自减运算符：++ 和 --
	一些 ES2015+ 版本的运算符

模版语句

模板语句语法类似于 JS, 但解析器有所不同, 并且模板语句解析器特别支持基本赋值 `=` 和带有分号 `;` 的串联表达式  
上下文: 语句能引用模板自身的上下文属性也可引用组件实例的属性, 且模板上下文中的名称优先级高

模版变量

语法规则: 模板中使用井号 `#` 来声明一个模板变量, 可以在组件模板中的任何地方引用模板变量

	模版变量声明位置不同所赋的值不同
	在组件上声明变量，该变量就会引用该组件实例
	在标准的 HTML 标记上声明变量，该变量就会引用该元素
	在 <ng-template> 元素上声明变量，该变量就会引用一个 TemplateRef 实例来代表此模板
	当该变量指定了一个名字, 例 #var="ngModel", 那么该变量就会引用所在元素上具有这个名字的指令或组件

SVG 作为模版

可以将 SVG 文件用作模板, 用法与 HTML 模版一样  
SVG 中的属性绑定应该是 `[attr.fill]` 模式

## angular 管道

管道用来对字符串, 货币金额, 日期和其他显示数据进行转换和格式化  
管道是一些简单的函数, 可以在模板表达式中用来接受输入值并返回一个转换后的值  
管道操作符: `|` 之前放数据, 之后紧跟管道名, 管道可以串联, 无限套娃  
管道可接收参数微调管道的输出, 用 `:` 紧跟参数, 如果参数有多个, 可继续用 `:` 分隔

	数据格式化常用管道
	根据本地环境中的规则格式化日期值
	DatePipe()
	把文本全部转换成大写
	UpperCasePipe()
	把文本全部转换成小写
	LowerCasePipe()
	把数字转换成货币字符串，根据本地环境中的规则进行格式化
	CurrencyPipe() 
	把数字转换成带小数点的字符串，根据本地环境中的规则进行格式化
	DecimalPipe()
	把数字转换成百分比字符串，根据本地环境中的规则进行格式化
	PercentPipe()
	将 js 对象转换为 json 字符串
	{{json}}
	接受一个可观察对象作为输入，并自动订阅输入
	{{async}}

可自定义管道, 把类标记为管道并提供配置元数据即可, 即把 `@Pipe` 装饰器应用到这个类上  
再把管道包含在 `NgModule` 元数据的 `declarations` 字段中以便它能用于模板  
在脚手架里用 `ng generate pipe` 自动创建管道并注册到模块里

```ts
// 导入管道的两个核心元素
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

管道的数据变更检测方式为每当数据更改时, 管道都会重新运行  
一般管道会被定义成纯管道, 只有检测到数据纯变更时才执行, 此时会忽略复合对象中的变化, 如数组, 对象  
非纯管道: 元数据中设置 `pure: false`, 每当按键或鼠标移动时, 都会检测到一次变更从而执行一个非纯管道

## 模版属性事件绑定

属性绑定

属性绑定数据流: 属性绑定在单一方向上将值从组件的属性送到目标元素的属性  
用 `[]` 绑定要进行赋值的目标属性, 有方括号时将等号的右侧看作动态表达式, 没有方括号则视为字符串字面量  
属性绑定不允许带有 `<script>` 标签的文本, 既不能用于插值也不能用于属性绑定  
绑定 `[innerHtml]` 属性会将内容放进 `innerHtml` 里, 会自动屏蔽 script 标签  
一般来说, 插值和属性绑定可以达到相同的结果

	属性绑定常用场合: 
	切换按钮功能: 绑定为布尔值
	设置指令属性: 绑定指令
	在组件之间绑定值: 绑定输入属性

另一种属性绑定 `attribute`, 类似于 `property`, 需在属性前面加 `attr.` 前缀  
当表达式解析为 `null` 或 `undefined` 时会完全删除该 `Attribute`  
该绑定的主要用例: 设置 `aria` 属性, 绑定 `colspan` 属性, 绑定 `svg` 属性

绑定 class 属性

绑定到单个类: `[class.on]='true|false'` 当为真时添加该类, 为假时删除该类  
绑定到多个类: `[class]='value']` 值可以为空格分隔的类名字符串, 类名的数组, 以类名作为键名并将真或假表达式作为值的对象

绑定 style 属性

绑定单一样式: 使用前缀 `style` 后跟一个样式属性名 `[style.width]='10px']`  
绑定多个样式: `[style]='value'` 值可以为样式的字符串列表, 键名是样式名健值是样式值的对象, 不支持绑定到数组

注入属性值

可通过装饰器 `@Attribute` 用依赖注入的方式将 HTML 属性的值传递给组件或指令的构造函数  
使用此方法不会追踪更新关联的值, 若想追踪请使用 `@Input`

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

事件绑定

由等号左侧括号内的目标事件名和右侧引号内的模板语句组成

EventEmitter 自定义事件

创建一个 `EventEmitter` 并将其对外暴露为属性  
调用 `EventEmitter.emit(data)` 发出事件, 可传入任何数据  
父指令|组件通过绑定该属性来监听事件, 并通过传入的 `$event` 对象接收数据

双向绑定

方括号和圆括号的组合 `[()]`, `[]` 进行属性绑定, `()` 进行事件绑定

用输入输出属性实现双向绑定

可利用输入输出属性来实现, 输出属性的名字必须是输入属性的名字后加 `Change`  
`[(size)]` 即 `[size]="fontSizePx" (sizeChange)="fontSizePx=$event` 的简写形式  
没有任何原生元素遵循这样的命名模式，所以与表单元素进行双向绑定需要使用 `NgModel`

## angular 指令

内置指令

指令的作用是为了元素添加额外的行为, 可分为组件指令, 属性型指令, 结构型指令  
属性型指令会更改元素, 组件或其他指令的外观或行为, 主要有 `ngClass`, `ngStyle`, `ngModel` 等  
结构型指令会添加和删除 dom 元素来更改 dom 布局, 主要有 `*ngIf`, `*ngFor`, `*ngSwitch` 等

ngClass 与 ngStyle

`ngClass` 添加和删除一组 css 类, 可配合表达式和方法使用, 需指定类名和布尔值  
`ngStyle` 添加和删除一组 html 的内联样式, 与 ngClass 不同的是它应指定样式名和样式值

ngModel

导入 `FormsModule`, 将其添加到 `NgModule` 的 `imports` 列表中  
在 html 的表单元素上添加 `[(ngModule)]` 绑定, 只能设置数据属性绑定  
想要自定义配置, 可将属性绑定和事件绑定分开来写 `[ngModel]` `(ngModelChange)`

```html
<!-- 命名要规范 -->
<input [ngModel]='value' (ngModelChange)='value=$event'>
<input [ngModel]='value' (ngModelChange)='function($event)'>
```

ngIf

`*ngIf` 从模版中创建或销毁子视图, 将 `ngIf` 赋给布尔值来删除或添加元素  
当 `NgIf` 为假时, 将从 dom 中移除该元素, 然后会销毁其组件从而释放内存和资源  
当频繁的切换时, 不建议用 ngIf, 应使用样式切换 `[style.display]`

ngFor

`*ngFor` 为列表中每个元素重复渲染一个节点  
一般语法 `let item of items` 获取下标 `let index = index`  
`trackBy` 属性跟踪条目, 只能更改和重新渲染已更改的条目, 而不必重新加载整个条目列表

ng-container 与指令配合使用

`<ng-container>` 是一个分组元素, 不会将其放置在 dom 中, 可用这种方式为没有标签的元素设置指令

```html
<div>
	I turned the corner
	<ng-container *ngIf='hero'>and saw {{hero}}</ng-container>
	and continued on my way
</div>
```

ngSwitch

`*ngSwitch` 会根据切换条件显示几个可能的元素中的一个, 只会将选定的元素放入 dom  
`ngSwitch` 是一组指令, 包括 `ngSwitch`, `*ngSwitchCase`, `*ngSwitchDefault`

```html
<div [ngSwitch]="state">
	<div *ngSwitchCase="1">待付款</div>
	<div *ngSwitchCase="2">已付款</div>
	<div *ngSwitchCase="3">发货</div>
	<div *ngSwitchDefault>丢失</div>
</div>
```

自定义属性型指令

脚手架创建指令 `ng generate directive`  
导入 `ElementRef`, 它的 `nativeElement` 属性提供宿主元素的直接访问权限  
在构造函数中用依赖注入的方法声明对宿主元素的引用, 即可使用指令操作宿主元素  
使用时即在标签中加入指令选择器即可

```ts
// 导入装饰器 Directive
import { Directive, ElementRef } from '@angular/core';
// 装饰器中的元数据 selector 指 css 选择器
@Directive({
  selector: '[apptest]'
})
export class TestDirective {
  constructor(
		// 依赖注入
		el: ElementRef
	) { 
		// 调用元素以设置样式
		el.nativeElement.style.color = 'yellow'
	}
}
```

利用指令可以监听用户事件, 需导入 `HostListener` 来监听宿主事件  
利用装饰器 `@HostListener()` 来装饰事件处理函数, 括号里为事件名称, 如 `mouseenter` `mouseleave`  

```ts
@HostListener('mouseenter') onMouseEnter() { this.el.nativeElement.style.color = 'yellow' }
@HostListener('mouseleave') onMouseLeave() { this.el.nativeElement.style.color = 'red' }
```

指令的输入属性, 即将宿主元素值传入指令中, 类似组件交互, 也用 `@Input`  
使用时在宿主元素中传入输入属性的值即可, 当值变动时需用属性绑定 `[]`, 值固定时不需要中扩号  
可在 `@Input()` 括号中将输入属性名设置为与指令名一致, 这样可少写些代码

```ts
@Input('appHighlight') highlightColor = '';
```

`ngNonBindable` 会停用模板中的插值、指令和绑定, 包括其子组件子元素  
`ngNonBindable` 不会停用应用在 `ngNonBindable` 元素上的指令

```html
<div ngNonBindable [appHighlight]="'yellow'">
	This should not evaluate: {{ 1 +1 }}, but will highlight yellow.
</div>
```

自定义结构型指令

脚手架创建指令 `ng generate directive`  
导入 `TemplateRef` `ViewContainerRef` 前者可以获取 ng-template 中的内容, 后者可以访问视图容器  
导入 `Input` 用来添加一个带 `setter` 的 `@Input()` 属性

```ts
constructor(
	// 注入 templateRef 和 viewContainerRef
  private templateRef: TemplateRef<any>,
  private viewContainer: ViewContainerRef
) { }
@Input() set appUnless(condition: boolean) {
  if (!condition && !this.hasView) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  } else if (condition && this.hasView) {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
```

星号简写原理

结构型指令前的星号会被解析为围绕宿主元素及后代的 `ng-template`

```html
<!-- ngIf 的简写与非简写 -->
<div *ngIf="hero" class="name">{{hero.name}}</div>
<!-- *ngIf 指令移到了 <ng-template> 上, 的其余部分移到了 <ng-template> 内部 -->
<ng-template [ngIf]="hero">
  <div class="name">{{hero.name}}</div>
</ng-template>
<!-- 不会创建真正的 <ng-template> 元素，只会将 <div> 和注释节点占位符渲染到 DOM 中 -->
<!--bindings={
	"ng-reflect-ng-if": "[object Object]"
}-->
<div _ngcontent-c0>Mr. Nice</div>
```
```html
<!-- ngFor 的简写与非简写 -->
<div *ngFor="let hero of heroes; let i=index; let odd=odd; trackBy: trackById" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>
<!-- 详细说明见官网 -->
<ng-template ngFor let-hero [ngForOf]="heroes" let-i="index" let-odd="odd" [ngForTrackBy]="trackById">
  <div [class.odd]="odd">({{i}}) {{hero.name}}</div>
</ng-template>
```

## angular 依赖注入

依赖注入(DI)是一种设计模式, 表现为类会从外部源中请求获取依赖, 而不是自己去创建它们  
创建一个可以注入的服务类: `ng generate service`  

```ts
import { Injectable } from '@angular/core';
// @Injectable() 装饰器把类标记为可供注入的服务
@Injectable({
	// 指定把被装饰类的提供者放到 root 注入器中
  providedIn: 'root',
})
export class HeroService {
  constructor() { }
}
```

注入器负责创建服务实例, 并把它们注入到像其他组件类中  
@NgModule 和 @Component 装饰器都有用一个 providers 元数据选项, 也可在此配置注入器  
注入器是可继承的, 组件可以依次从它自己的注入器, 祖先组件的注入器, 其父 NgModule 的注入器或从 root 注入器中获取服务  

使用依赖注入: 在构造函数中指定依赖类型的参数即可

```ts
// HeroService 就是 DI 令牌
constructor(heroService: HeroService)
```

类提供者语法是一种简写形式

```ts
// 简写形式
providers: [Logger]
// provide 属性存有令牌, 它作为一个 key, 在定位依赖值和配置注入器时使用
// useClass 是一个提供者定义对象, 告诉注入器要如何创建依赖值
// 可以使用服务类来配置注入器，也可以提供一个替代类、一个对象或一个工厂函数
[{provide: Logger, useClass: Logger}]
// 可以指定替代性的类支持者
// 当组件使用 Logger 令牌请求一个 logger 时，给它返回一个 BetterLogger
[{provide: Logger, useClass: BetterLogger}]
```

## angular 路由与导航

在单页应用中, 可以通过显示或隐藏与特定组件相对应的部分来更改用户看到的内容, 而不用去服务器获取新页面  












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

# angular 服务与依赖注入

公用的功能一般封装进服务里, 然后用依赖注入的方式重复利用
依赖注入实际就是类的实例化

```ts
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FirstServiceService {

	constructor() { }
}
```

服务即时类的一个实例，依赖注入只是一种简写，相当于实例化一个类

# angular 路由

`RouterLink` 指令用来自定义 a 元素，用来实现单页面跳转，而 href 属性则不是单页面复用
`<router-oulet>` 路由的占位标签
`ActivatedRoute` 中包含有关路由和路由参数的信息, 通过导入并注入以使用服务
路由模块中设置 `{path: '', component: , children: [{...}]}` children 表示子路由
兜底路由: `path: ''`
编程时导航: 导入并注入 Router 服务, 利用 `navigate` 方法进行导航
第一个参数是数组形式: `['url', params]`, 第二个参数是对象: `{queryParams, fragment, replaceUrl}`

## 创建路由

把单独的路由模块导入到要使用路由的模块里并把它添加到 `imports` 数组中
把 `RouterModule` 和 `Routes` 导入到你的路由模块中，定义 `Routes` 数组: `const routes:Routes = []`
在 Routes 数组中定义你的路由, 每个路由都包含两个属性, `path` 定义了该路由的 URL 路径, `component` 定义了要用作相应路径的组件


# angular HTTP 客户端

在模块中导入并引入 `HttpClientModule`
