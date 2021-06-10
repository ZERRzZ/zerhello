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