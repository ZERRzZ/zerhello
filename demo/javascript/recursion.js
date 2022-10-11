console.log("global begin:" + i )
var i = 1
foo(1)
function foo(i) {
  if (i == 4) {
    return
  }
  console.log("function begin: " + i )
  foo(i+1) // 递归调用, 压栈
  console.log("function end: " + i )
}
console.log("global end: " + i )

// 输出顺序是什么，产生了几次上下文 5次