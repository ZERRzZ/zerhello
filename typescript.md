## 安装与使用

安装: `npm install typescript -g`  
编译: `tsc test.ts`  
版本: `tsc -v`  

配置编译器

```json
// tsconfig.json 文件
{
  "include": [ "./src/**/*" ], // 读取所有可识别的 src 目录下的文件
  "compileOnSave": true, // 在保存时编译
  "compilerOptions": { // 编译选项
    "allowJs": true, // 接受 javascript 作为输入
    "outDir": "./built", // 生成的所有文件放在 built 目录下
    "target": "es5", // 将 JavaScript 代码降级到低版本比如 ECMAScript 5
    "noEmitOnError": true, // 不想在发生错误的时候 ypeScript 还会被编译成 JavaScript
    "noImplicitAny": true, // 不想让 TypeScript 将没有明确指定的类型默默地推断为 any 类型
    "noImplicitReturns": true, // 防止你忘记在函数末尾返回值
    "noImplicitThis": true, // 当没有明确指定类型（或通过类型推断）的 this 被使用时 TypeScript 会产生一个错误
    "noFallthroughCasesInSwitch": true, // 会防止在 switch 代码块里的两个 case 之间忘记添加 break 语句
    "strictNullChecks": true, // null 和 undefined 获得了它们自己各自的类型 null 和 undefined
  }
}
```
 
## 类型注解

基础类型

布尔值: `boolean`, false/true  
数字: `number`, 支持十进制和十六进制字面量, 二进制和八进制字面量  
字符串: `string`, 可以使用双引号或单引号表示字符串  
数组: 可以在元素类型后面接上 `[]`, 也可以使用数组泛型 `Array<元素类型>` 来定义数组  
元组: 表示一个已知元素数量和类型的数组, 各元素的类型不必相同, 访问一个越界的元素会使用联合类型替代  
枚举: 使用 `enum` 定义, 默认情况下从 0 开始为元素编号, 也可以手动为其赋值, 可以由枚举的值得到它的名字, 反之亦然  
any: 任意类型, 与 Object 相比, Object 类型的变量只是允许你给它赋任意值但是却不能够在它上面调用任意的方法  
void: 没有任何类型, 常用于函数没有返回值的情况, 声明一个 void 类型的变量只能为其赋值 null 与 undefined  
null 和 undefined: 是所有类型的子类型, 而在 `strictNullChecks` 模式下, 只能赋给他们本身和 void  
never: 表示的是那些永不存在的值的类型, 是任何类型的子类型但没有类型是 never 的子类型  
object: 表示非原始类型, 也就是除 number, string, boolean, symbol, null 或 undefined 之外的类型  
 
```ts
let isTrue: boolean = true

let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744

let name: string = "bob"

let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3]

let x: [string, number] // declare a tuple type

enum Color { red, green, blue }
let color: Color = Color.green
let colorName: string = Color[1]

// 返回never的函数必须存在无法达到的终点
function error(message: string): never { throw new Error(message) }
function infiniteLoop(): never { while (true) { }}
```

类型断言

告诉 TypeScript 我比你更了解这个变量的类型, 所以你就不用再进行类型检查了  
尖括号写法: `<数据类型>变量`  
as 语法: `变量 as 数据类型`  

```ts
let value: any = 'this is a string'
let length: number = (<string>value).length
let length2: number = (value as string).length
```

## 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查, 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约  
接口使用 interface 关键字定义  
可选属性: 属性名后加一个 `?` 即可  
只读属性: 属性名前加一个 `readonly` 即可, `ReadonlyArray<T>` 类型同理, 不可以改变的数组  

额外的属性检查

直接使用接口中不存在的属性会报错  
绕开检查的方法之一是使用类型断言: `as`  
还可以添加一个字符串索引签名: `[propName: string]: any` 表示接口可以拥有任意数量的属并且类型任意  
还可以将这个对象赋值给另一个对象  

```ts
interface Dog { name: string, color: string }
// 报错, gender 不存在在 Dog 接口中
let dog: Dog = { name: 'sadanya', color: 'black', gender: '女' }
// 使用类型断言
let dog: Dog = { name: 'sadanya', color: 'black', gender: '女' } as Dog
// 增加字符串索引签名
interface Dog { name: string, color: string, [prop: string]: any }
// 赋值给另一个对象
let dog1 = { name: 'sadanya', color: 'black', gender: '女' }
let dog: Dog = dog1
```

函数类型接口

定义函数接口: 只有参数列表和返回值类型的函数定义  

```ts
interface funcInterface { 
  (soure: string, substring: string): boolean
}
// 使用时貌似只可以用函数变量形式使用
```

接口索引签名

TypeScript 支持两种索引签名: 字符串和数字, 数字索引的返回值必须是字符串索引返回值类型的子类型  
使用数字索引签名时, JavaScript 会将它转换成 string 然后再去索引对象  
可以将索引签名设置为只读, 相当于给所有属性设置只读  

```ts
interface arrstirng {
  name: number // 报错
  age: number // 报错
  [index: string]: string
}
// 数字索引签名的使用
interface arr { [index: number]: string }
let arr: Arr = [ '1', '1']
```

类类型接口

实现接口: TypeScript 也能够用它来明确的强制一个类去符合某种契约, 关键字: `implements`  
接口描述了类的公有部分, 它不会检查类是否具有某些私有成员  
接口之间也可以相互继承  
接口继承类: 会继承类的成员但不包括其实现, 还得注意类的 private 与 protected 成员  
? 类的静态部分与实例部分的区别  
? 混合类型: 一个对象可以同时做为函数和对象使用, 并带有额外的属性  

```ts
interface Shape { color: string }
class S implements Shape {  // 类实现接口
  constructor() { }
  color: string
}
interface Square extends Shape { sideLength: number } // 继承

// 定义一个类和接口, 类中有私有字段, 接口继承类
class Control { private state: any }
interface SelectableControl extends Control { select(): void }
// Button 类继承了 Control 所以能实现接口
class Button extends Control implements SelectableControl { select() { } }
// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl { select() { } }
```

## 类

基本例子

```ts
class Greeter { // 声明一个 greeter 类, 该类有三个成员, 属性 greeting, 构造函数, 方法 greet
  greeting: string;
  constructor(message: string) { this.greeting = message; } // 用 this 表示访问的是类的成员
  greet() { return "Hello, " + this.greeting; }
}
// 使用 new 构造 Greeter 类的一个实例, 它会调用构造函数来创建一个 Greeter 类型的新对象并执行构造函数初始化它
let greeter = new Greeter("world");
```

类的继承

使用 `extends` 关键字来实现继承, 派生类叫子类, 基类叫超类, 子类会继承超类的方法与属性  
派生类中有构造函数时, 需调用 `super()` 会执行基类的构造函数, `super` 即代表基类, 类似于 this 一个代理  

```ts
class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}
```

修饰符

修饰符: `public` 默认, 公有, `private` 私有, 不能在该类的外面使用, `protected` 保护, 允许在子类中使用  
可使用 `readonly` 关键字将属性设置为只读, 只读属性必须在声明时或构造函数里被初始化  
参数属性: 通过在构造函数参数前面添加一个访问限定符来在一个地方定义并初始化一个成员  

```ts
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor (theName: string) { this.name = theName }
}
class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) { } // 使用参数属性, public, private, protected 类似
}
```

存取器

通过 getters/setters 来截取对对象成员的访问, 能有效的控制对对象成员的访问  
只带有 `get` 不带有 `set` 的存取器自动被推断为 `readonly`  

```ts
class Employee {
  private _fullName: string;
  get fullName(): string { return this._fullName; }
  set fullName(newName: string) { // 当密码正确时才允许修改, 控制对 fullName 属性的访问
    if (password && password == "123456") { this._fullName = newName; }
    else { console.log("Error: Unauthorized update of employee!"); }
  }
}
```

静态属性

静态属性存在于类本身上面而不是类的实例上, 使用 `static` 来定义  

抽象类

抽象类做为其它派生类的基类使用且一般不会直接被实例化, 类似接口, 但它可以包含成员实现的细节  
使用 `abstract` 定义一个抽象类和抽象类中的抽象方法  

```ts
abstract class Animal {
  abstract makeSound(): void // 抽象方法必须在派生类中实现细节
  move(): void { console.log('roaming the earch...') } // 包含了实现细节的方法
}
```

## 函数

函数类型

类似于 JavaScript, Typescript 中可以创建带有名字的函数和匿名函数, 即函数声明式与函数表达式  
按上下文归类: 当在赋值语句的一边指定了类型但是另一边没有类型的话, TypeScript 编译器会自动识别出类型  

```ts
// TypeScript 能够根据返回语句自动推断出返回值类型, 因此我们通常省略它
function func(x: number, y: number): number { return x + y }
let func = function(x: number, y: number): number { return x + y }
// 完整的函数类型写法, 此处的 => 并非箭头函数
let func: (x: number, y: number) => number = function(x: number, y: number): number { return x + y }
```

函数参数

传递给一个函数的参数个数必须与函数期望的参数个数一致, 这一点与 JavaScript 不同  
可选参数: 在参数名后跟一个 `?` 表示, 可选参数必须放在必选参数列表后  
默认参数: 在参数列表中直接为参数赋值即可, 当调用时不传该参数或该参数的值为 undefined 时取默认值  
剩余参数: 可以把所有参数收集到一个变量里, 以便同时操作多个参数 `...rest: any[]`  

this

JavaScript 中, this 的值在函数被调用时才会指定  
ECMAScript 6 中, 箭头函数能保存函数创建时的 this 值, 而不是调用时的值  
每调用一次箭头函数都会创建一个箭头函数, 而方法只会被创建一次, 会添加到原型链上, 在不同实例间是共享的  
设置 `--noImplicitThis` 时, 需显示指定 this 的类型, 不然会时不时的报错, 应放在参数列表的最前面  

重载

为同一个函数提供多个函数类型定义即可进行函数重载  
查找重载列表时, 从上到下, 所以需将最精确的放在前面  

```ts
function func(x:number):number;
function func(x:string):string;
function func(x:number, y:number):number {
  if (typeof x === 'number') { }
  if (y) { }
}
```

## 泛型

举个栗子

```ts
// 虽然这样可以传入任意类型值并返回它们, 但不能保证返回值的类型与传入的参数类型相同
function identity(arg: any): any { return arg }
// 使用类型变量, 它是一种特殊的变量, 用于表示类型而不是值
// T 捕获使用者传入的类型, 这样不会丢失信息, 确保准确性
function identity<T>(arg: T): T { return arg }
// 使用泛型函数, 可以明确指定 T 的类型, 也可以使用类型推论
identity<string>("myString")
identity("myString") // 型推论帮助我们保持代码精简和高可读性
```

? 泛型接口

理解何时把参数放在调用签名里和何时放在接口上是很有帮助的

```ts
interface Func { <T>(arg: T): T }
interface Func<T> { (arg: T): T }
```

泛型类

与泛型接口类似, 使用 `<>` 括起泛型类型跟在类名后面  
泛型类指的是实例部分的类型, 所以类的静态属性不能使用这个泛型类型  

```ts
class Add<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}
let add = new Add<number>()
```

泛型约束

约束带有某些属性的特定类型

```ts
// 定义一个接口, 带有 length 属性
interface Length { length: number } 
// 只要是包含属性 length 的类型 T, 都可以被传入该函数, 约束了一类类型
function logLen<T extends Length>(arg: T) { console.log(arg.length) }
```

? 在泛型里使用类类型

## ? 枚举

## 类型推论

基础

在有些没有明确指出类型的地方, 类型推论会帮助提供类型  
推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时  

```ts
let x = 3 // x 推论为 number
function func(x = 3) { } // x 推论为 number
function func() { return true } // 函数返回值推论为 boolean
```

上下文类型

类型推论也可能按照相反的方向进行, 这被叫做按上下文归类, 会发生在表达式的类型与所处的位置相关时  
上下文归类通常包含函数的参数, 赋值表达式的右边, 类型断言, 对象成员和数组字面量和返回值语句  