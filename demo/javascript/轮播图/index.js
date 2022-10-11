const box = document.getElementById('box')
const p = document.getElementsByClassName('p')
const leftBtn = document.getElementById('leftBtn')
const rightBtn = document.getElementById('rightBtn')

let index = 0
let n = p.length - 1
let interval = undefined

autoMove()
// 点击按钮，清空定时器值，取消自动轮播，为了优化体验
// 判断 index 是否越界
// 改变小圆点的状态
// 移动图片
// 再次开始自动轮播
leftBtn.addEventListener('click', () => {
  clearInterval(interval)
  if (--index < 0)
    index = n
  setActive()
  move()
  autoMove()
})

rightBtn.addEventListener('click', () => {
  clearInterval(interval)
  if (++index > n)
    index = 0
  setActive()
  move()
  autoMove()
})

for (let i = 0; i < p.length; i++) {
  p[i].addEventListener('click', () => {
    clearInterval(interval)
    index = i
    setActive()
    move()
    autoMove()
  })
}

// 自动轮播，即每隔一段时间 index++，当 index 达到最大时，重置
function autoMove() {
  interval = setInterval(() => {
    if (++index > n)
      index = 0
    setActive()
    move()
  }, 2000);
}

// 清除所有的 active 类名, 且为当前的元素设置 active 类
function setActive() {
  for (let div of p) {
    div.className = 'p'
  }
  p[index].className = 'p active'
}

// 根据 index 值来移动图片
function move() {
  box.style.transition = `all .5s`
  box.style.transform = `translateX(${-400 * index}px)`
}

// 函数化