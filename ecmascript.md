## 简介

与宿主环境相分离的一个描述, 描述了类型, 值, 对象, 属性, 函数和程序语言及语义, 其他语言可以实现 ECMAScript 来作为功能的基准  

## 基础

语法

区分大小写, 弱类型变量, 行末分号可不写, 注释, 括号表示代码块  

变量

声明: 使用 var 声明变量, 一次可声明多个, 用逗号隔开, 不一定需要初始化  
命名: 不以数字开头的包含字母, 数字, 下划线或 $ 的区分大小写的一串字符  
规则: Camel 标记法, Pascal 标记法, 匈牙利类型标记法  
未声明变量: 遇到未声明过的标识符时, 解释程序会用该变量名创建一个全局变量, 并将其初始化为指定的值  

关键字

根据规定, 关键字是保留的, 不能用作变量名或函数名  

保留字

保留字在某种意思上是为将来的关键字而保留的单词, 因此保留字不能被用作变量名或函数名  

值

分类: 变量可存在两种类型的值, 即原始值和引用值  
原始值: 存储在栈(stack)中的简单数据段, 直接存储在变量访问的位置  
引用值: 存储在堆(heap)中的对象, 存储在变量处的值是一个指针, 指向存储对象的内存处  

原始类型

五种原始类型: `Undefined, Null, Boolean, Number, String`  
typeof: 该运算符有一个参数, 即要检查的变量, 返回值有 `undefined, boolean, number, string, object`, 注意 `null` 类型返回值是 `object`  
Number: 既可以表示 32 位的整数, 也可以表示 64 位的浮点数  

	整数: 
		八进制首数字须是 0, 十六进制首数字须是 0, 并且其后接 x, 例 070, 0x1b
		注: 尽管所有整数都可以表示为八进制或十六进制的字面量, 但所有数学运算返回的都是十进制结果
	浮点数: 
		包括小数点和小数点后的一位数字, 在进行计算前, 真正存储的是字符串
	科学计数法: 
		把一个数表示为数字加 e (或 E), 后面加乘以 10 的倍数
	特殊的 Number 值: 
		Number.MAX_VALUE 和 Number.MIN_VALUE, 定义 Number 值集合的边界, 但计算生成的数值可以超出
		Number.POSITIVE_INFINITY 和 Number.NEGATIVE_INFINITY, 计算生成的数值超出范围后被赋予的值, 意味着不再有数字值
		Infinity 与 -Infinity, 专门表示无穷大的值, 是 Number.POSITIVE_INFINITY 与 Number.NEGATIVE_INFINITY 的值, 不能用与其他计算
		ifFinite(), 可对任何数使用, 判断该数是否无穷大
		NaN, 表示非数(Not a Number), 发生在类型转换失败时, 不能用于计算, 它与自身不相等, 推荐使用函数 isNaN()

String: 没有固定大小的原始类型, 用 `'' 或 ""` 声明

	字符串中每个字符都有特定的位置, 首字符从位置 0 开始, 第二个字符在位置 1, 依此类推
	String 类型还包括几种字符字面量:
		\n	换行
		\t	制表符
		\b	空格
		\r	回车
		\f	换页符
		\\	反斜杠
		\'	单引号
		\"	双引号
		\0nnn	八进制代码 nnn 表示的字符（n 是 0 到 7 中的一个八进制数字）
		\xnn	十六进制代码 nn 表示的字符（n 是 0 到 F 中的一个十六进制数字）
		\unnnn	十六进制代码 nnnn 表示的 Unicode 字符（n 是 0 到 F 中的一个十六进制数字）

Boolean: 两个值 `true/false`, false 不等于零但零可以在必要时转成 false  
Undefined: 只有一个值 `undefined`, 当声明的变量未初始化时或函数无明确返回值时, 都默认值是 `undefined`  
Null: 只有一个值 `null`, 值 undefined 实际上是从值 null 派生来的, 即 `undefined == null`, 但两者意义不同, null 表示尚未存在的对象  

类型转换

所有程序设计语言最重要的特征之一是具有进行类型转换的能力  
ECMAScript 的 Boolean 值, 数字和字符串的原始值都是伪对象, 具有属性与方法  
toString(): 将值转换成字符串, 所有对象都有此方法, 无论是真对象还是伪对象  

	Boolean 类型的 toString() 方法只是输出 "true" 或 "false", 结果由变量的值决定
	Number 类型的 toString() 方法有两种模式, 即默认模式和基模式, 默认模式返回十进制, 可传 2, 8, 16 来转换不同进制
	Array 类型的 toString(), 返回值与没有参数的 join() 方法相同, 当数组用于字符串环境时, 会自动调用该方法, 也可以显式调用
	Date 对象的 toString(), 用字符串表示, 使用本地时间格式

parseInt(): 会仔细分析字符串, 将数值和某类字符串转换为整数, 也有基模式 `parseInt("10", 2) 值为 2`  
parseFloat(): 与 parseInt 类似, 但会处理小数点, 只识别第一个小数点, 没有基模式, 也不识别前导零或前导 0x  
Boolean(): 当值是至少有一个字符的字符串, 非 0 数字或对象时返回 true, 如果该值是空字符串, 数字 0, undefined 或 null, 将返回 false  
Number(): 转换的是整个值, 当整个字符串值不能转换成数字时, 返回 NaN, 当字符串值能被完整地转换时, 将判断是调用 parseInt() 还是 parseFloat() 方法  

	特殊:
		空的字符串转换为 0, 其他字符串将转换为 NaN
		Null 类型转换为 0, Undefined 类型转换为 NaN
		布尔类型转换为 0 和 1
		日期对象转换为毫秒

String(): 可把任何值转换成字符串, 包括 null 与 undefined, 而 null 与 undefined 没有 toString() 方法  

引用类型

引用类型通常叫做类(class), 即遇到引用值, 所处理的就是对象  
ECMAScript 定义了对象定义, 并不真正具有类, 逻辑上等价于其他程序设计语言中的类  
对象是由 new 运算符加上要实例化的对象的名字创建的 `var o = new Object()` 没有参数时可省略括号  
Object 对象, 所有对象都由这个对象继承而来, 每种属性和方法都会被其他对象覆盖  

```js
// 属性
constructor // 对创建对象的函数的引用(指针), 对于 Object 对象, 该指针指向原始的 Object() 函数
Prototype // 对该对象的对象原型的引用, 对于所有的对象, 它默认返回 Object 对象的一个实例
// 方法
hasOwnProperty(property) // 判断对象是否有某个特定的属性。必须用字符串指定该属性
isPrototypeOf(object) // 判断该对象是否为另一个对象的原型
propertyIsEnumerable() // 判断给定的属性是否可以用 for...in 语句进行枚举
toString() // 返回对象的原始字符串表示
valueOf() // 返回最适合该对象的原始值。对于许多对象，该方法返回的值都与 ToString() 的返回值相同
```

Boolean 对象, 是 Boolean 原始类型的引用类型 `var bool = new Boolean(true)`  

	Boolean 对象将覆盖 Object 对象的 ValueOf() 方法, 返回原始值, 即 true 和 false
	ToString() 方法也会被覆盖, 返回字符串 "true" 或 "false"
	虽然你应该了解 Boolean 对象的可用性, 不过最好还是使用 Boolean 原始值

Number 对象, 是 Number 原始类型的引用类型 `var number = new Number(68)`  

	数值类型的所有特殊值都是 Number 对象的静态属性
	用 number.valueOf() 来得到数值对象的原始值
	Number 类也有 toString() 方法, 以及从 Object 对象继承的标准方法
	toFixed() 返回的是具有指定位数小数的数字的字符串表示, 能表示具有 0 到 20 位小数的数字, 参数为小数位数
	toExponential() 返回的是用科学计数法表示的数字的字符串形式, 参数为小数位数
	toPrecision() 根据最有意义的形式来返回数字的预定形式或指数形式, 参数为数的数字总数 (试试就懂了)

String 对象, 是 String 原始类型的对象表示法 `var string = new String('hello world')`  
String 对象的所有属性和方法都可应用于 String 原始值上，因为它们是伪对象  

	String 对象的 valueOf() 方法和 toString() 方法都会返回 String 类型的原始值
	length 属性, 字符串中的字符个数
	charAt()/charCodeAt(), 参数为位置, 返回在该位置上的字符/字符代码
	indexOf()/lastIndexOf(), 参数为字符, 返回字符在字符串上的位置, 从前到后/从后到前, 找不到返回 -1
	concat(), 参数为字符串, 返回连接后的字符串, 不改变原数组
	localeCompare(), 参数为字符串, 返回正数/0/负数, 表示按字母表排序在参数之前/相等/之后
	slice() 第一个参数是起始位置, 第二个参数是终止位置且默认为字符串长度, 返回截取后的字符串, 参数中有负数时会用字符串长度加上参数
	substring() 第一个参数是起始位置, 第二个参数是终止位置且默认为字符串长度, 返回截取后的字符串, 参数有负数时会无视负数且总把较小的数字作为起始位
	toLowerCase(), toUpperCase(), toLocaleLowerCase(), toLocaleUpperCase() 大小写转换

instanceof 运算符, 弥补 typeof 对引用类型都返回 object 的问题, 判断变量是否是某对象的实例 `xxx instanceof xxxObject`

## 运算符

一元运算符

delete: 删除开发者自己定义的对象属性或方法的引用, 意味着强制解除对它的引用, 将其设置为 undefined `delete obj.name`  
void: 对任何值返回 undefined  
++/--: 前增量和前减量, 后增量和后减量  