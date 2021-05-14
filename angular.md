# 相关技术

- Typescript 的基本使用
- ES6 的使用

# TS 的使用

- 全局安装：`npm i typescript -g`
- 文件后缀：`.ts`
- 编译文件：`tsc test.ts`
- 查看版本：`tsc -v`

# Angular/cli 的使用

- 全局安装脚手架：`npm i @angular/cli -g`
- 生成一个项目：`ng new my-app`
- 在项目文件夹里运行项目： `ng serve --open --port <port>` 可指定端口
- 生成一个组件： `ng generate component [position] <name>` 

# TS 数据类型

- 原始数据类型：`boolean`, `number`, `string`,` null`, `undefined`
- 定义变量时可以指定数据类型，用冒号来指定
- null 和 undefined 是一切类型的子类型

```ts
// boolean 类型的定义
let isTrue:boolean = true
let isTrue:boolean = Boolean(1)
// number 类型的定义
let num:number = 1
let num16:number = 0xff
let notNum:number = NaN
let infNum:number = Infinity
// string 类型定义略
// null,undefined 类型定义略
```

- TS 中还有空值类型 void, 一般用于函数无返回值 `function test():void { }`
- TS 中还有任意值类型 any, 可以赋任意类型的值
- 当定义变量时未定义类型，也未赋值，则会被定义为任意值类型
- 类型推断：定义变量时未定义类型但赋了值，则 TS 推断类型为所赋的值的类型

```ts
let test1
test1 = 123 // 不报错
let test2 = '123'
test2 = 123 // 报错
```

- 联合类型：用 | 分个多个类型 `let test:string|number`
- 对象类型：`let obj:object = { }`
- 规范对象类型的属性：`let obj:{p1:string,p2:number}`
- 类型断言：`<string>name` 强制指定类型

# 数组类型

- TS 中可以为数组中的元素限定类型

```ts
// 数据类型后跟一个 []
let arr:number[] = [1, 2, 3]
// 数组的泛型写法
let arr2:Array<number> = [1, 2, 3]
``` 

# TS 接口

- 用 interface 定义一个对象，再约束属性，只定义属性的类型，但不会去赋值
- 调用该接口时 `let teacher:Teacher = { }` 属性必须与约束的一致
- 带 `?` 表示该属性可以不带, `[propName:string]:any` 表示可以多写一个属性

```ts
interface Teacher {
  name:string
  age?:number
  [propName:string]:any
}
```

- 只读属性：用 `readonly` 修饰，在进行一次赋值后就不可以修改了

```ts
// 根据接口创建对象
let t1:Teacher = { }
// 根据接口创建类
// 实施 implements 类实现接口的关键字
class T2 implements Teacher { }
```

# TS 函数

- TS 中对函数的输入和输出有约束

```ts
// 函数声明式写法
function func(x:number, y:number):number {
  return x + y
}
// 函数表达式写法
// 这种写法实质上只将右侧函数进行了类型的定义，对左边变量没有定义
let func = function(x:number, y:number):number {
  return x + y
}
// 对左边参数的限制，限制其为函数类型
// => 在 TS 中用于函数的定义，左边输入类型，右边输出类型
let func:(x:nubmer, y:number) => number = function(x:number, y:number):number {
  return x + y
}
```

- TS 中函数的参数并不能随意传任意值，定义多少穿传多少
- TS 中可以设置可选参数，同接口，用 `?` 表示
- 必选参数不能放在可选参数后面

```ts
// y 即是可选参数
function func(x:number, y?:number):number { return x + y }
```

- TS 中可以为参数设置默认值 `function func(x:number=3, y:number=4):number { return x + y }`
- TS 中的剩余参数 `function func(...values:any[]):void { }`

- 函数的重载：同一个函数，但接收不同数量或类型的参数，用 `|` 联合类型实现

```ts
// 重载的另一种实现
// 多种参数形式用分号隔开，在最终的函数体内做判断
function func(x:number):number;
function func(x:string):string;
function func(x:number, y:number):number {
  if (typeof x === 'number') { }
  if (y) { }
}
```

# TS 类

- 定义静态方法，关键字：`static`

```ts
class Animal {
  static age = 20
  static isAnimal(a) {
    return a instanceof Animal
  }
}
// 使用时直接用类名来调用
let dog = new Animal()
Animal.isAnimal(dog)
console.log(Animal.age)
```

- 定义类的属性，TS 中直接定义在类里，构造器中只做修改

```ts
class Abc {
  // 定义属性
  a:number = 1
  b:number = 2
  constructor() {
    // 修改
    this.a = 2
    this.b = 3
  }
}
```

- 属性可以有三种访问的修饰词：`public/private/protect`
- `public`: 默认，任何地方都可以访问
- `private`: 私有的，只能在此类中使用，不能在类外面访问
- `protected`: 受保护的，只可以在此类或子类使用
- 抽象类：关键字 `abstract`, 不允许实例化，一般用与继承实现
- 抽象方法：只定义，不实现，通过继承实现

```ts
abstract class Pig {
  name
  constructor(name) {
    this.name = name
  }
  abstract sayHi()   // 只定义，不实现
}
class SmallPig extends Pig {
  sayHi() {
    console.log('hello smallpig');
  }
}
```

# Angular 文件结构

- 模块 Module.ts 的基本结构
- 导入所有用到的组件并声明

```ts
// 导入核心模块
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 导入要用的所有组件
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ // 在此声明要用的组件
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] // 首页需要挂载的组件, 首页中其他组件无效
})
export class AppModule { }
```

- 组件 component.ts 的基本结构
- 组件由三个文件组成 `css, html, ts`，表示样式，模板，代码

```ts
// 导入核心模块 Component 组件
import { Component } from '@angular/core';
// angular 核心模块里导入组件装饰器
// 装饰器定义元数据
@Component({
  selector: 'app-root', // selector 组件名称，
  templateUrl: './app.component.html', // template 组件模板或模板地址
  styleUrls: ['./app.component.css'] // style 组件样式或样式文件
})
export class AppComponent {
  title = 'my-app';
}
```

# Angular 样式简介

- 在 `.component.html` 中写模板，在 `.component.css` 中写样式
- `.component.css` 中样式是只对该组件起作用，会带一个独一无二的属性选择器- 根目录下 `style.css` 中样式是全局的
- `.component.html` 中可以不像 vue，react 那样必须写在根标签里，因为 Angular 自动帮你写了

# Angular 框架模式

- Angular 是 MVVM 模式，该模式起源于 MVC
- `M -> model`: 数据，`V -> view`: 视图， `C -> control`: 控制器
- `VM -> 数据和视图的双向绑定`：只要修改数据，VM 就会自动的改变视图，视图的交互又改变了数据

# Angular 基础插值语法

- `{{}}` 可以在里面放变量，表达式等，须在 `.component.ts` 的导出类中定义
- `{{}}` 插值可以应用应用于内容里，也可以用于属性中
- 绑定自定义属性：`<p [attr.<name>]="value"></p>`
- 绑定已有属性：`<p [name]="value"></p>`
- `{{}}` 不会将 html 形式的文本进行转义
- 转义 HTML: `[innerHtml]='htmlValue'` 会将内容以 html 形式来转义，会自动屏蔽 script 标签

- 绑定 class 属性的方式：`class={{name}}`, `[class]="name"`, `[attr.class]="name"`
- 对象模式绑定：`[class]="{name1: boolean, name2: boolean}"`
- 数组模式绑定：`[class]="[name1, name2]"`
- Angular 特有的方式绑定：`[class.<name>]="boolean"`

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

# Angular 管道

- `|` 管道符号，前面是想要改变的值，后面是管道函数, 如 `{{abcd | uppercase}}`
- 管道可以用链式的写法
- 常见管道：`| json` 将 js 对象转换为 json 字符串
- 常见管道：`| data: '格式'` 例：`Date.now() | data: 'YYYY-MM-DD'` 有问题，不能显示 DD
- 管道可以被自定义：生成管道文件 - 在管道文件中的 transform 中写内容

```ts
```