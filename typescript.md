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
void: 

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