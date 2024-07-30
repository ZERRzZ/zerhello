// 1.冒泡排序 O(n ^ 2)

const bubbleSort = arr => {

  const len = arr.length

  // 第一层循环到 len - 1，因为倒数第二项会和最后一项对比
  for (let i = 0; i < len - 1; i++) {
    // (len - i - 1)：数组末尾的 i 个数已经排好序，无需再对比
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }

}

// 2.选择排序 O(n ^ 2)

const selectionSort = arr => {

  const len = arr.length

  let minIndex = undefined

  // 注意不用循环到最后一项
  for (let i = 0; i < len - 1; i++) {

    minIndex = i

    // 对无序区间循环找出最小的值的下标
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]

  }

}

// 3.快速排序 O(n log n)

const quickSort = (arr, begin, end) => {

  if (begin >= end) return arr

  let pivot = arr[begin], i = begin, j = end

  while (i < j) {

    while (arr[j] >= pivot && i < j) {
      j--
    }

    while (arr[i] <= pivot && i < j) {
      i++
    }

    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }

  }

  [arr[begin], arr[i]] = [arr[i], arr[begin]] // 交换基准点和大小分割点

  quickSort(arr, begin, i - 1) // 分治法对剩余分区排序
  quickSort(arr, i + 1, end) // 分治法对剩余分区排序

}

// 3.

const demoArr = [5, 1, 9, 4, 3, 7, 2, 8, 6]

// bubbleSort(demoArr)
selectionSort(demoArr)
// quickSort(demoArr, 0, demoArr.length - 1)

console.log(demoArr)