	JavaScript 位置
		HTML 事件中: <button onclick="..."></button>
		<a> 标签中: <a href="javascript:..."></a>
			在 <a> 的 href 属性中设置"javascript:;"来防止其跳转, 或在响应函数中return false取消浏览器默认行为
		<script> 标签中:
			1.把脚本置于 <body> 元素的底部可改善显示速度, 因为脚本编译会拖慢显示
			2.外部 JS 文件中: 使用外部脚本, 请在 <script> 标签的 src 属性中设置脚本的名称
	>
JavaScript 骨灰级用句
  写入警告框：window.alert()
  写入body中：document.write()
  写入控制台：console.log()
  写入HTML元素：innerHTML
  单行注释：//
  多行注释：/* */
  注：confirm()  比 alert() 功能要强大
>
JavaScript 基础语法
  字面量与变量: 字面量类型即为数据类型, 变量是存储字面量的容器, 使用 var 关键词来声明变量
  标识符: 包含字母、数字、下划线和美元符号 $, 不能以数字开头, 区分大小写
  字符集:
    1.JS 使用 Unicode 字符集
    2.JS 中用 \u 转义字符来输出 Unicode 码, "\u字符集"
    3.HTML 中用 "&#编码;" 来输出, 或者用 "&名字;" 输出
  可输出的警告框: prompt()  返回用户输入的内容, 参数为提示文字
  测试性能: console.time(), console.timeEnd()  开启与关闭计时器, 参数为名字
>
JavaScript 数据类型
  数据类型即字面量类型：
    Number, String, Boolean, Null, Undefined  基本类型 (原始值)
    Object  引用类型 (Function 也是对象, 但 typeof 可以识别)
      Object 包括 Function, Date, Array, Object 等等
  注：
    1.方法和属性也可用于原始值，因为在执行方法和属性时 JS 将原始值临时转换为对象
    2.引用类型可用 new 关键字调用函数来定义, new 调用的函数为构造器函数 constructor
    3.原始值也都可用 new 作为对象来定义, 但 new 使代码复杂化, 不推荐
  Number: ...
  String: ...
  Boolean: 只有两个值：true 或 false
  Undefined: 未赋值的变量值和未声明的变量为 undefined, 但使用未声明的变量会报错
  Null: 表示空的对象, null 的数据类型是对象 object (bug) 它本应是 null
>
JavaScript 类型转换
  分类：分为强制类型转换与自动类型转换
  正规转换方法：
    Number() 函数 - 转变成数值类型
      1.空的字符串转换为 0, 其他字符串将转换为 NaN
      2.Null 类型转换为 0, Undefined 类型转换为 NaN
      3.布尔类型转换为 0 和 1
      4.日期对象转换为毫秒
    ParseInt(), ParseFloat() 函数
      1.与 Number() 不同的是可将有效的数取出, 不是一味地 NaN
      2.遇非 String 类型时先转化成字符串, 再判断, 规则同上
    String() 函数 - 转变成字符串类型
    .toString() 方法
      Null 与 Undefined 没有 toString() 方法, 自动 toString
  偏方（隐式转换）:
    转换成数值："string" * 1
    转换成字符串：number + ""
    转换成布尔类型：！！xxx
  转换布尔值:
    Boolean() 函数
      0, NaN 为 false, 其他 Number 为 true
      "" 空字符串为 false, 其他 String 为 true
      undefined, null 为 false
      Object 为 true
  转换数组：
    .split() 方法 - 字符串转换成数组
  转换字符串：
    .join() 方法 - 数组转换字符串，括号内为连接符号
    .toString() 方法 - 连接符号为 ，
>
Javascript 数值
  定义方法：
    阴间定义：let num = new Number(); num.valueOf()
    字面量定义：let num = xxx;
  数值的方法：
    .toString() 原型链的末端，一般的对象都有该方法
    .valueOf() 取值
    .toFixed(位数) 保留几位小数，四舍五入
    Number.isInteger(num) 构造函数的静态方法，判断值数值是否为整数
    Number.isNaN() 判断数值是否是NaN


  数字字符串:
    加法和级联都使用 + 运算符, 数字用加法。字符串用级联
    在其他所有数字运算中，JS 会尝试将字符串转换为数字

  Infinite (-Infinite):
    Infinite 是数值类型, 是在计算数时超出最大可能数范围时返回的值
    除以 0（零）也会生成 Infinity, 负数除以零为 -Infinity;

  进制: 0x 开头为十六进制, (0 开头为八进制, 0b 开头为二进制)
  精度: 浮点的算数并不总是 100% 精准 (.2 + .1 != .3)


>

Javascript 字符串

  字符串是一串字符, 可使用单引号或双引号, 空的字符串变量既有值又有类型

  字符串中一些特殊的字符无法显示, 可用转义字符来处理 ' " \

  转义字符:
    \' 单引号, \" 双引号, \\ 反斜杠
    \n, \t, ...
  字符串的拼接：
    + ： "" + ""
    ``: `${变量}字符串` 预格式

  字符串常见方法：
    .length 属性，获取长度
    .toUpperCase(), .toLowerCase() 大小写
    .trim() 消除空格
    .charAt(i) 去第i位字符，也可用下标，string[i] 同数组

  字符串截取操作：
    slice(start, end) 开始位置与结束位置，负数即从后数起
    substring(start, end) 开始位置与结束位置，不识别负数，看作0
    substr(start, length) 开始位置与截取长度，负数即从后数起

  字符串检索操作：
    .indexOf(字符, start) 开始查找的位置，找不到返回 -1
    .lastIndexOf(字符, start) 从后向前找，0，1，2，3，...
    .includes(字符, start) 返回的是布尔值
    .startsWith(字符) 开始的位置是否有该字符
    .endsWith(字符)

  字符串重复
    .repeat(重复次数)

  字符串变数组：
    .split() 只有一项的数组
    .split("") 每个字符都成为数组的一项
    () 里为分隔符
>

JavaScript 运算符

  运算符总会得出一个返回值, 注意自动的类型转换, 规则与强制转换类似

  算数运算符
    + 在用于字符串时，+ 运算符被称为级联运算符
    -, *, /, %, ** 幂 Math.pow(x, y)
    ++, --
    + - 正负号
    非数值会自动转换为数值, 转换不了则 NaN, 但级联时转换字符串的优先级高
    NaN 是一个钉子户, 任何数与他计算都为 NaN
    自增自减的前后问题 ++a | a++ 是表达式, 值为原值 | 新值, 但 a 是变量, 必变
    常用 + 转换类型为数值, 用 + "" 转换类型为字符串, 而不用 Number(), String()

  逻辑运算符
    &&, ||, ! 与或非
    非布尔类型会自动转换为不布尔, 用两次 ! 来转换类型为布尔, 不用 Boolean()
    短路逻辑, && 只看 false, || 看 true
    与或运算会返回原值, 而不是布尔值, 但计算是用自动转换的布尔值计算

  赋值运算符: =, +=, -=, *=, /=, %=

  比较运算符
    >, <, >=, <=
    !=, !==  不等, 不等值不等型
    ==, ===  相等, 等值等型
    比较返回值的类型是布尔类型, 非数值类型会自动转换为数值来比较
    字符串之间的比较会比较器每位字符的 Unicode 码, 一位一位比
    与 NaN 运算都得 false, 包括等于, 全等, 所以用 isNaN() 函数来判断是否为 NaN

  三元运算符
    条件语句 ? 语句1 : 语句2

  类型运算符
    typeof: 返回数据类型 string number boolean undefined object function
    instanceof: 判断实例是否属于某类

  位运算符
    该运算中的任何数值运算数都会被转换为 32 位的数。结果会被转换回数值
    & | ~  与 或 非
    ^  异或

  !!运算符优先级
>

JavaScript 条件语句

  三种形式:
    if (条件表达式) {语句...}
    if (条件表达式) {语句...} else {语句...}
    if (条件表达式) {语句...} else if (条件表达式) {语句...} else {语句...}
  else if 形式中只会执行一个代码块, 应注意条件表达式的书写

  条件分支:
    switch(条件表达式) {
      case 表达式:
        代码块
        break;
      default: 如都不匹配时运行的代码块
    }
  把条件表达式的值与每个 case 的值进行对比, switch 使用严格的比较 ===
  如匹配则从当前位置处开始执行, 除非有 break
  有时需要不同 case 来使用相同的代码块

  break 关键词: 遇到此词时, 会跳出 switch 代码块, 节省大量时间
  default 关键词: 规定不存在 case 匹配时所运行的代码
  如果 default 不是 switch 代码块中最后一个 case，请记得用加上 break

  条件表达式可以为 true, 这样 case 中表达式可以写比较判断，这样就不是比较了
>

JavaScript 循环语句

  while 语句:
    while (条件表达式) {语句...}
    do {语句..} while (条件表达式)
    do...while...: 在检查条件是否为真之前，这种循环会保证执行一次代码块

  for 语句:
    for (1; 2; 3) {语句...}
      1 在循环开始之前执行, 初始化表达式
      2 在循环开始之前执行, 条件表达式
      3 会在循环每次被执行后执行, 更新表达式

  for/in  遍历属性: for (key in 对象名) 遍历下标
  for/of 遍历值： for (value of xxx)

  循环的嵌套: 常用外循环控制列, 用内循环控制行

  break 与 continue:
    break 语句跳出循环, continue 语句跳过单次循环, 用提高代码性能的作用
    break 可配合 JS 标签可跳过一段代码块, continue 不能
    labelname: {... ...}   break labelname;
    break 与 continue 可配合 JS 标签跳过指定循环
>

JavaScript Object

  多个数据的封装体

  对象的分类:
    内建对象: Number, String, Boolean, Object, Function, Math, Date 等
    宿主对象: BOM, DOM  由运行环境提供的对象
    自定义对象

  对象的创建:
    声明: var obj = new Object()  new 调用的函数为构造函数 constructor
    赋值: 对象里保存的值成为属性, 语法: 对象.属性名 = 属性值
    读取与修改: 对象.属性名, 对象.属性名 = 新值
    删除: delete 对象.属性名
    属性名:
      不强制要求规范但若使用特殊的名字应换一个形式 对象["属性名"] = 属性值
      使用 [] 这种形式更为灵活, 可在 [] 里传递变量, 动态
    属性值: 可谓任意类型, 即包括对象和函数, 对象里的函数被称为方法

  对象字面量:
    var obj = {属性名: 属性值, ...};
    更简单的创建变量, 属性名可不加引号, 但特殊名字必加引号, 且调用的形式也得换

  in 运算符:
    检查对象中是否含有指定属性 "属性名" in 对象, 返回布尔值
    枚举对象的属性: for (var 变量 in 对象) {}, 此时变量即为一个个属性名

  new 关键字 :
    通过关键词 new 调用函数来声明 JS 变量，则该变量会被创建为对象
    请不要把字符串、数值和布尔值声明为对象, 会增加代码的复杂性并降低执行速度

  访问对象方法: objectName.methodName() 如果不使用 () 则返回的是函数定义

  基本数据类型: 直接存储在栈中, 不同的值完全独立, 传递的就是值本身
  引用数据类型:
    创建一个对象则在堆中开辟一块空间, 将值存入其中
    栈中也存数据, 只是存的是堆的内存地址, 通过地址来与堆中的值链接
    传递的是内存地址, 是链接, 即改变的是同一个值, 如果删除整个对象则是删除链接
  比较基本类型是比较值, 而比较引用类型是比较存储值的堆的内存地址
>

JavaScript Function

  函数指预定义好的并可以被反复使用的代码块. 也是一个对象

  创建函数: (基本不用此方式)
    var fun = new Function();  证明 function 为对象, 有对象的基本功能
    可将代码通过字符串的方式来传递给构造函数

  调用函数: () 运算符调用函数, 不用 () 则返回函数定义, 即函数对象本身

  用函数声明创建函数: function 函数名(形参列表) {语句...}
  用函数表达式创建函数:
    var 函数名 = function(参数列表) {语句...};  对象的方法创建形式
    function(参数列表) {语句...}  匿名函数, 无意义, 无法调用
    立即执行函数: (匿名函数)() 调用, 没有 () 则返回的是函数定义

  函数的参数:
    可在函数 () 中声明形参, 相当于在函数里声明变量, 多个形参用 , 隔开
    调用函数时可在 () 里指定实参, 相当于为形参赋值
    应注意形参的合法性即数量, 多余的形参不会被赋值, 缺少的形参用 undefined 代替

  返回值:
    可在函数中用 return 来返回一个结果, return 是一个语句, 可接表达式等
    return 之后的语句不会执行, 也可直接用 return 来跳出函数
    没有返回值却妄想接收则为 undefined

  参数与返回值的类型: 都可以为任意类型, 即包括 对象 函数, 复杂的应用

  函数也可作为对象的属性, 此时称之为对象方法
  当函数未定义时使用会报错，而对象方法则返回 undefined，处理兼容性问题注意点

  全局|函数作用域:
    全局作用域: 页面打开时创建, 页面关闭时销毁, 全局变量
    函数作用域: 函数调用时创建, 函数执行完毕时销毁, 局部变量
    局部作用域中可访问全局变量, 但全局作用域里不能访问局部变量
    局部变量优先级 > 全局变量, 如想再局部作用域里访问全局变量可用 window 来调

  全局对象 window: 浏览器窗口, 由浏览器创建, 全局变量都为其属性, 函数都为其方法

  声明提前:
    用 var 声明的变量其声明会提升至当前作用域的最前面, 而赋值不会
    也可不用 var 来声明, 此时该变量无论何时都是全局变量且不会声明提前
    用 function 声明的函数其声明与定义都会被提升至最前边
>

JavaScript 对象与函数

	this 关键字:
		调用函数时浏览器都会向函数内传递一个隐含的参数 this, 此参数指向一个对象
		此对象称为函数执行的上下文对象, 根据调用的方式不同 this 会指向不同对象
		一般谁调用就指向谁 (window, object), 构造函数中的 this 指向新建的对象
		apply() 与 call() 方法会改变 this 的指向

	用工厂方式创建对象: 用函数来创建对象, 并根据参数的不同来表示属性的差异

	构造函数: 是普通函数, 只是一般把函数名大写, 且用 new 来调用

	用 new 调用时函数的执行:
		立刻创建一个新的对象, 执行函数的代码, 返回该新对象
		会将函数的 this 指向为该新对象, 即可用 this 引用新对象

	类与实例: 同一构造函数创建的对象称为一类对象, 构造函数为类, 对象为该类的实例

	instanceof 与 constructor:
		检查对象是否是一个类的实例, 对象 instanceof 构造函数, 返回布尔值
		所有的对象都是 Object 的后代, 但 constructor 属性只是返回构造函数

	原型:
		每个函数都会被添加一个属性 prototype, 对应一个原型对象
		函数做普通调用时 prototype 没有任何作用
		用 new 调用时 (即构造函数), 其创建的对象也都会包含一个属性 __proto__
		__proto__ 指向其构造函数的原型对象, 即与对应的 prototype 指向同一个原型对象

	原型对象:
	  就是一个公共的区域, 同一类中的所有实例都能访问到, 存放共有内容
		公共方法一般存放在原型对象中, 而不在函数内 (每次创建对象都会重复定义方法)
		一般也不将方法放在全局空间内, 会污染空间, 还很不安全
		原型对象是一个对象, 他也有一个属性 __proto__, 指向一个新的原型对象
		最高层是 Object 的原型对象, Object 的原型的原型为 null, 即到 Object 截止
		访问一个对象时会按 优先级 来查找属性与对象, 直到 Object 的原型的原型

	存在原型里的方法:
		hasOwnProperty(): 检查对象里是否有自己本身的属性, 因为 in 运算符不靠谱
		toString(): 自动 toString, 打印对象时实际上打印的是对象.toString(), 可更改
		可以在对象里更改这些方法以覆盖掉原型里的方法实现自定义

	垃圾回收:
		当对象没有任何变量与之链接时, 就是垃圾, 因为对象存在堆里, 其地址存在栈里
		JS 有自动垃圾回收机制, 我们只需切断不用的对象的链接, 设为 null

	call() 与 apply():
		两方法为函数的方法, 作用都是调用函数, 与直接调用没差
		可将一个对象作为其第一个参数, 此时函数的 this 指向该对象, 修改 this 的指向
		call() 可直接将实参作为其他参数传入函数 (对象, 实参, ...)
		apply() 只能把实参封装到一个数组里 (对象, [实参, ...])

	arguments:
		在调用函数时, 浏览器会传递给函数两个隐含的参数 this, arguments
		arguments 是封装实参的对象, 是伪数组, 通过索性来获取值, 且有长度属性
		调用函数时所传递的实参会保存到 arguments 中, 即不用形参也允许, arguments[]
		属性 callee, 对应当前正在指向的函数对象
>

JavaScript Array

	数组也是一个对象, 不同的是他用数字作为索引来操作元素 替代了属性, 值
	数组的元素是任意类型的, 对象, 函数, 数组

	创建数组:
		var arr = new Array(...);
		var arr = [...];
		可在 [] 与 () 里添加元素, 用逗号隔开, 最后一个元素之后不要写逗号
		用构造函数赋值时, 当只有一个参数时代表的是数组元素数量而不是数组元素

  操作数组:
		添加元素: 数组[索引] = 值
		引用元素: 数组[索引]
		删除元素: 可使用 delete 运算符来删除, 会留下未定义的空洞
		索引值从零开始, 只有索引没有值时返回 undefined, 数组的空洞

	数组长度:
		length 属性返回数组的长度, 即索引值加一, 也可用 length 手动改变数组长度
		常用 数组[数组.length] 给数组末尾添加元素

	数组四大方法:
	  push() 向数组末尾添加一个或多个元素, 并返回新的数组长度
		pop() 删除并返回数组的最后一个元素
	  unshift() 向数组开头添加一个或多个元素, 并返回新的数组长度
		shift() 删除并返回数组第一个元素

	数组遍历:
		for 循环, 此时循环条件应小于数组的长度
		in 运算符, 类似于对象, 获取的是与属性对应的索引
		forEach() 方法, 用函数作为一个参数, 会为每个数组元素调用该函数
			此函数由浏览器来调用, 称之为回调函数, 回调函数各不相同
			浏览器会为该回调函数传递三个实参, 元素, 索性, 数组, 需手动设置形参
			每次调用时, value, index, Array 即对应元素的相关值

	数组其他方法:
		splice(start, number, 元素, ...)
      可以删除元素，替换元素，插入元素
			可用于向数组添加新项, 改变了原数组, 返回一个所删除元素组成的数组
			start 表示添加与删除的位置, number 表示删除多少元素, 元素表示添加的元素
		slice(start, end)
			返回数组的子数组, 不改变原数组
			start end 开始与结束的位置, end 可不要, 且负值代表从后往前数
		concat() 连接多个数组并返回新数组, 参数还可以是元素
		join() 将数组转换为字符串, 参数为连接符, 默认为逗号
		toString() 把数组转换为字符串, 用逗号隔开, 会根据需要来自动 toString()
		reverse() 方法反转数组的元素, 改变了原数组
		sort()
			数组排序, 直接修改数组, 默认按 Unicode 编码排序, 数字也一样
			可添加回调函数来排序数字, 此时浏览器会传递两个实参, 需手动设置形参 a b
			在数组中 a 在 b 的前面, 若返回值 >0 则交换位置, <=0 则不交换
		Array.isArray() 判断参数是否为数组

  map 函数
    它返回一个新的数组，数组中的元素为原始数组调用函数处理后的值
    语法：array.map(function(value, index, arr), thisIndex)
      function(value, index, arr)：必须, 为一个函数，数组中的每个元素都会执行这个函数
        currentValue：必须。当前元素的的值。
        index：可选。当前元素的索引。
        arr：可选。当前元素属于的数组对象。
      thisValue：可选。对象作为该执行回调时使用，传递给函数，用作"this"的值。

  some() 方法
    用于检测数组中的元素是否满足指定条件(函数提供)
    some() 方法会依次执行数组的每个元素：
      如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
      如果没有满足条件的元素，则返回false
    语法：array.some(function(value, index, arr), thisIndex)

  reduce() 方法
    对数组中的值一次操作，与其他迭代函数不同，他有一个特殊参数 pre
    array.reduce(function(pre, value, index, arr), initialValue)
      pre 上次调用函数的返回值
      value, index, arr ...
      initialValue pre 的初值，没有则 pre 为数组第一个值，此情况 value 从数组第二个值开始
  
  数组的遍历：
    for 循环，
    for...in... 拿到的是索引
    for...of... 拿到的是值

  数组的高阶函数：
    arr.filter()  过滤，filter中的函数有一个要求，必须返回一个布尔值，当返回true时，将此次的值保存在新数组中，false则过滤掉此次值
    arr.map()  映射
    arr.reduce() 对数组中所有值的汇总
>

JavaScript Date

    时间的开始: 1970-01-01 00:00:00 UTC 世界统一时间, 等同于 GMT (格林威治时间)
    时间的开始: 1970-01-01 08:00:00 GMT+0800 (中国标准时间)
    JS 用 0 - 11 来表示月份, 用 0 - 6 表星期, 当年份为两位时, 可能代表 19xx 年
    JS 底层储存的是从时间的开始到现在时间的毫秒数

  创建日期对象:
    var d = new Date()  构造函数创建
    () 里没有值时返回该代码执行的时间, 当前时间

    new Date(year, month, day, hours, minutes, seconds, milliseconds)
    用指定的日期和时间来创建对象, 当只有一个值时, 表示的是毫秒而不是年

    new Date(date string)
    从给定的日期字符串创建一个日期对象

  日期字符串格式:
    YYYY-MM-DDTHH:MM:SS 是首选的 JS 日期格式, T 分隔日期和时间
    默认为当前时区的时间, 可在结尾加 Z 来表示 UTC 时间
    其他格式: MM/DD/YYYY HH:MM:SS, YYYY/MM/DD, Feb 19 2018

  获取日期方法:
    getFullYear()	获取四位的年份
    getMonth()	获取月 0 -11
    getDate()	以数值返回天 1-31
    getDay()	以数值获取周名 0-6
    getHours()	获取小时 0-23
    getMinutes()	获取分 0-59
    getSeconds()	获取秒 0-59
    getMilliseconds()	获取毫秒 0-999
    getTime()	获取时间 从 1970-01-01T00:00:00 UTC 到当前时间的毫秒数

  Date.now() 构造函数的方法, 返回当前的毫秒数

  设置日期方法: set...()
>

JavaScript Math

  Math 不是构造函数, 是一个对象, 封装许多数学相关的方法与属性

  属性: Math.PI, ...
  方法:
    Math.ceil(x) | .floor  x 的上舍入 与 下舍入
    Math.round(x)  x 四舍五入为整数
    Math.pow(x, y)  x 的 y 次幂
    Math.sqrt(x)  x 的平方根
    Math.abs(x)  x 的绝对值
    Math.min() | max()  查找参数列表里最大最小值
    Math.random() 返回 [0,1) 间的随机数, 可乘以一个数来扩大范围
>

JavaScript 包装类

  Number, String, Boolean 都是构造函数, 可将基本类型转化为对象
  不要使用 new 创建基本类型, 会是代码复杂化且让比较更困难
  对基本类型调用属性时, 会临时将其转换为对象, 并在调用结束后销毁该对象

  Number:
    (构造函数 Number 的属性):
    Number.MAX_VALUE, Number.MIN_VALU  JS 最大数, 最小数
    Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY  无穷大, 无穷小
    Number.NaN  NaN 同时也是 JS 的保留字

    toString() 以字符串返回数值, () 内可以不填, 自动 toString
    toExponential() 返回科学计数法字符串, 参数为小数点位数
    toFixed() 返回小数, 同上

    valueOf() 以数值返回数值
      使用 valueOf() 方法可将 Number 对象转换为原始值

  String:
    字符串在底层是通过字符数组的形式储存的, 也可用索引来操作
    所有字符串方法都会返回新字符串, 它们不会修改原始字符串

    length 属性: 返回字符串的长度, 同数组

    charAt(index) 根据索引来获取字符
    charCodeAt(index) 根据索引来获取字符的 Unicode 码 (十进制)
    String.fromCharCode() 根据 Unicode 码获取字符

    indexOf(string, start)
      返回指定文本首次出现的位置, 可以指定开始检索的位置
      字符串从零开始, 如未找到文本则返回 -1,
      lastIndexOf() 与之类似, 只是从后往前找

    slice(start, end): 提取子串, 参数可为负, 可省略 end
    substring(num, num) 提取子串, 负值自动置 0, 可自动交换位置, 大的在后
    substr(start, length) 提取子串, 开始的位置与长度

    trim() 方法删除字符串两端的空白符
    concat() 连接多个数组, 相当于 +
    toUpperCase(), toLowerCase() 把字符串转换为大, 小写

    search() 返回指定本文首次出现的位置, 可用正则来强力搜索
    replace(被替换, 替换) 替换字符串, 不能全局匹配, 可用正则来修饰 被替换
    match() 提取字符串中符合条件的内容, 不能全局匹配, 可用正则, 保存在数组中
    split(分隔字符) 拆分字符串为数组, 可用正则, 参数为 "" 时每个字符即数组元素
>

JavaScript 位运算

  &	  AND	         如果两位都是 1 则设置每位为 1
  |	  OR	         如果两位之一为 1 则设置每位为 1
  ^	  XOR	         如果两位只有一位为 1 则设置每位为 1
  ~	  NOT	         反转所有位
  <<	零填充左位移	通过从右推入零向左位移，并使最左边的位脱落。
  >>	有符号右位移	通过从左推入符号位来向右位移，并使最右边的位脱落。
  >>>	零填充右位移	通过从左推入零来向右位移，并使最右边的位脱落。

  判断奇偶 &
  将小数转换为整数 |  Math.floor()
  用于交换两整数, 代码: a = a ^ b ,b = b ^ a, a= a ^ b
>

JavaScript RegExp

  正则定义一些字符串的规则, 用于个计算机判断某些字符串是否符合规则

  创建正则对象:
    var reg = new RegExp("模式", "修饰语")
    var reg = /pattern/modifiers 模式 与 修饰符

  正则的方法:
    test(str): 判断字符串是否符合该正则, 返回布尔值
    exec(str): 判断字符串是否符合该正则, 返回一找到的本文, 未找到则为 null

  修饰符: i: 忽略大小写, g: 全局匹配, m 多行匹配

  模式的语法:
    [], |, [-], [^]: [] 里为或, | 为或, - 区间, [^] 除...外 (非)
    {n}, {m,n}, {n,}, +, *, ?: n次, m到n次, n到无穷次, {1,}, {0,}, {0,1}
    ^, $: 以...开头, 以...结尾, 同时存在则表示...自行体会
    . 表示任意字符

  转义字符:
    \. \\ ...
    \w 任意数字字母下划线, \d 任意数字, \s 空格, \b 单词边界, 大写的话则相反
    /\bchild\b/ 表示 child 独立单词, /child/ 表示含以上字符串即可
>

JavaScript DOM 基础

  DOM 是宿主对象 Document Object Model
    D: 网页即文档对象
    O: 把文档的每一个元素, 每个部分转化为对象
    M: 用模型来表示对象间的关系, 方便选取

  节点: Node 构成 HTML 文档的最基本单元, 也是对象
    分类: 文档节点, 元素节点, 属性节点, 文本节点
    属性:
      nodeName: #document | 标签名 | 属性名 | #text
      nodeType: 9 | 1 | 2 | 3
      nodeValue: null | null | 属性名 | (文本内容)

  事件属性: 用户与浏览器交互的瞬间, 一般为该类属性绑定函数来实现一些功能
    onclick	用户点击了 HTML 元素
    onmouseover	用户把鼠标移动到 HTML 元素上
    onmouseout	用户把鼠标移开 HTML 元素
    onload	浏览器已经完成页面加载
    onchange	HTML 元素已被改变
    onkeydown	用户按下键盘按键

  浏览器加载页面时从上到下执行, 因注意 JS 代码的位置
  可用 onload 事件让 JS 代码在页面加载完成之后才执行, 一般用 window.onload 实现
>

JavaScript DOM 元素操作

  文档节点即 document 对象, 属于 window 对象的属性

  获取元素节点: 用 document 调用
    getElementById(), getElementsByTagName(), getElementsByName()
    当获取一组元素节点时 (getElements), 会将其保存在一个数组里, 即使只有一个也是

  获取元素节点的内容:
    元素.innerHTML: 标签对里的内容, 单标签无 (文本节点)
    元素.innerText: 将 innerHTML 中的标签去除 (文本节点)
    元素.属性: 标签的属性, 当读取 class 时需用 className 来获取 (属性节点)

  获取元素的子节点: 用具体元素节点调用
    getElementsByTagName()...  当前元素节点下查找
    childNodes, firstChild, lastChild  子节点
    children, firstElementChild, lastElementChild  子元素节点
    子节点还包括文本节点, 标签间的空白也会算作一个文本节点

  获取父节点与兄弟节点:
    parentNode  当前节点的父节点
    previousSibling, nextSibling  前一个兄弟节点, 后一个兄弟节点
    previousElementSibling, nextElementSibling  前后兄弟元素节点

  根据 css 选择器来查询:
    document.querySelector(选择器)  只返回第一个
    document.querySelectorAll(选择器)  将所有元素保存在一个数组中

  其他的查询方法:
    获取 body 节点: document.body
    获取 html 节点: document.documentElement
    获取页面所有元素: document.all
    用 class 获取: getElementsByClassName()
    "*" 也代表所有元素, 可以考虑使用

  增删改:
    document.createElement(标签名)  创建元素节点
    document.createTextNode(内容)  创建文本节点
    父节点.appendChild(子节点)  在末尾添加节点
    父节点.insertBefore(新节点, 旧节点)  在旧节点前插入新节点
    父节点.replaceChild(新节点, 旧节点)  替换
    父节点.removeChild(子节点)  删除
    可用 innerHTML 来完成简化完成相关操作
>

JavaScript DOM 样式操作

  读取与修改内联样式:
    语法: element.style.样式名 = 样式值
    若样式名里含有 - 号, 用驼峰命名法修正

  读取当前显示的样式 (只读):
    window.getComputedStyle(元素, 伪元素)
      一般伪元素参数设置为 null, 返回一个对象, 封装了当前的样式
      不支持 IE9 以下
    元素.currentStyle.样式名
      只支持 IEs
    用这类方法时应注意兼容性问题

  其他样式操作 (只读):
    元素.clientWidth | clientHeight  可见宽高, 包括内容区与内边距
    元素.offsetWidth | offsetHeight  包括内容区, 内边距, 边框
    元素.scrollWidth | scrollHeight  整个滚动区域的宽高

    元素.offsetParent             当前元素的定位父元素
    元素.offsetLeft | offsetTop   当前元素的定位偏移量
    元素.scrollLeft | scrollTop   当前元素滚动条的偏移量

    应用: 满足 scrollHeight - scrollTop == clientHeight 时表示滚动条到底

  用类的方法批量操作样式：
    新建一个类存放新的样式，然后替换类
    添加一个类，判断一个类有没有，删除一个类，切换一个类
>

JavaScript DOM 事件

  事件对象：
    浏览器会将一个事件对象作为实参传递给事件响应函数，可设置形参或 argument 来调用
    但 IE8 会将事件对象保存在 window 的属性中，event = event || window.event

  事件对象的属性：
    clientX | clientY  鼠标水平|垂直位置，可见窗口
    pageX | pageY  鼠标水平|垂直位置，整个页面  兼容有问题
    cancelBubble  布尔值，是否取消事件的冒泡
    target  事件的目标节点，触发事件的元素
    currentTarget 

  元素相对鼠标移动：
    可用 clientY 减去 scrollTop 来计算出鼠标相对于整个页面的位置，直接用 page 不兼容

  事件的绑定：
    1.对象.事件 = 函数 ：只能绑定一个，可用 return false 来取消浏览器默认行为
    2.addEventListener()方法  可绑定多个，不兼容 IE8
      参数：事件字符串，不加 on，回调函数，是否在捕获阶段触发事件，一般 false
      可用 event.preventDefault() 来取消浏览器默认行为
    3.attachEvent(事件字符串，加 on; 回调函数) IE8
    addEventListener 与 attachEvent 中的 this 不同，可用 call() 来手动统一

  事件的传播：
    第一阶段：捕获阶段，从最外层祖先元素向目标元素进行捕获，但不出发事件
    第二阶段：目标阶段
    第三阶段：冒泡阶段，从目标元素向祖先元素传递并依次触发事件
>

## JS 拖拽

前置知识

事件的冒泡: 当子元素事件被触发时, 其祖先元素相同事件也会被触发, 用 `event.cancelBubble = true` 来禁止  
事件的委派: 利用冒泡将事件绑定到祖先元素上, 再用 `event.target` 来获取真正触发事件的元素  

实现拖拽排序

获取元素的位置: `el.getBoundingClientRect()` 提供元素大小和相对于**视口**的位置  
在某元素之前插入元素: `insertBefore(new, old)` 在旧元素前插入新元素  

拖拽事件

设置 draggable = true 来让元素可拖动, 链接和图片默认即可拖动  

```js
// 源元素上的事件 
ondragstart() // 开始拖动元素
ondrag() // 正在拖动元素
ondragend() // 完成元素的拖动
// 目标元素上的事件
ondragenter() // 拖动对象进入其容器范围时触发
ondragover() // 拖动对象在其容器范围内拖动时触发
ondragleave() // 拖动对象离开其容器范围时触发
ondrop() // 拖动对象在其容器内释放鼠标键时触发
// 在拖动元素时，每隔 350 毫秒会触发 ondragover 事件
```

JavaScript DOM 事件案例

  拖拽：
    所用事件：onmousedown, onmouseover, onmouseup
    注意全选时拖拽浏览器默认会用内容去搜索，应注意取消默认行为
    IE 8 中应用 元素.setCapture() 方法， 元素.releaseCapture() 方法
    将下一次事件强制捕获到该元素上，释放强制捕获

  鼠标滚轮：
    所用事件：onmousewheel, 火狐中 DOMMouseScroll, 用 addEventListener 添加
    获取滚轮的方向：event.wheelDelta, 火狐中 event.detail
    注意用 return false 来取消浏览器的默认行为
    addEventListener() 方法应用 event.preventDefault() 来取消默认行为

  键盘事件：
    所用事件: onkeydown, onkeyup
    相关属性：
      event.keyCode 获取按键的 unicode 编码
      event.altKey | ctrlKey | shiftKey  布尔值，这三个按键是否被按下
    在文本框中输入内容是默认行为，可以来限制输入
<

JavaScript BOM 一般对象

  浏览器对象模型，通过 JS 操作浏览器

  navigator: 浏览器的信息，可用来标识浏览器
    属性：由于倔强的 IE 导致了许多属性的失效,如 appName
      userAgent: 属性值为字符串，可结合正则来判断不同浏览器
    倔强的 IE 可用其独有的对象来判断 ("activXObject" in window)

  history: 历史记录，向前向后翻页
    属性：length 返回当次访问页面的个数
    方法：
      back() 回退到上一个页面
      forward() 前进到下一个页面
      go() 跳转到指定页面，参数为正整数则向前跳几页，反之亦然

  location: 封装了浏览器地址栏信息
    直接调用 location 则返回当前页面完整地址, 修改 location 即跳转页面
    属性：地址的各个部分...
    方法：
      assign() 跳转到其他页面
      reload() 重新加载页面
      replace() 用新页面替换当前页面，不产生历史记录
<

Javascript BOM window

  window 的方法属性可以不用 window 调用
  常见方法：alert(), confirm(), prompt()

  定时调用：
    setInterval(回调函数，间隔毫秒)
    每隔一段时间执行一次函数
    返回值是一个数，作为定时器的唯一标识
    clearInterval(唯一标识)
    停止该定时器

  延时调用：
    setTimeout(回调函数，间隔毫秒)
    clearTimeout(唯一标识)
<

注意:
  4.index %= arr.length --> index 一直在 0 - arr.length 间变动