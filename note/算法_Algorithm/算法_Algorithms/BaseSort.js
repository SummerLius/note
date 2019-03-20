'use strict';

module.exports = {
    // 交换
    bubbleSort,
    quickSortInPlace,
    quickSortOutPlace,

    // 选择
    selectSort,
    heapSort,

    // 插入
    insertSort,
    shellSort,

    // 归并
    mergeSortTopDown,
    mergeSortBottomUp,

    // 基数
    radixSort,

    // 计数
    countSort
};

/**
 * @description 交换排序>冒泡排序
 *
 *  两种方式，这里采用第一种方式：
 *      1. 按数组索引正序循环，将较大的数冒泡交换到数组的后面；
 *      2. 按数组索引逆序循环，将较小的数冒泡交换到数组的前面；
 *
 *  时间复杂度：
 *      1. 最好情况，给定数据已排好序，此时时间复杂度为 n
 *          - 判断语句 n
 *          - 交换语句 1
 *      2. 最坏情况，给定数据完全逆序，此时事件复杂度为 n²
 *          - 判断语句 n²
 *          - 交换语句 n²
 *      3. 平均 n^2
 *  
 *  总结：
 *      - 稳定排序，源数据越正序，性能越好；
 *      - 冒泡排序元素每次移位距离仅仅为一步，如果将一个元素移动到指定位置，需要移动很多步，这点比其它算法劣势；
 *
 * @param {Array<Integer>}
 * @returns {Array<Integer>} 返回原数组
 */
function bubbleSort(originArray) {
    for (let i = 1; i < originArray.length; i++) {
        let isSwapped = false;
        for (let j = 0; j < originArray.length - i; j++) {
            if (originArray[j] > originArray[j + 1]) {
                isSwapped = true;
                [originArray[j], originArray[j + 1]] = [originArray[j + 1], originArray[j]];
            }
        }
        if (!isSwapped) {
            return originArray;
        }
    }
    return originArray;
}

/**
 * @description 交换排序>快速排序（原地算法）
 * 
 *  基本思想：
 *      - 冒泡排序的升级版，增大了元素比较和移动的距离，将较大的元素直接移动后面，
 *        较小的直接移到前面，从而减少总的比较次数和移动交换次数；
 *      - 通过一趟排序将数组分为两部分，其中一部分的元素均比另一部分元素小，然后
 *        再分别对这两部分元素进行排序，最后使整个有序；
 *      - 使用递归；
 *  
 *  实现方式，这里采用第一种：
 *      1. 取 lowIndex 为枢轴，然后从右边开始；
 *      2. 取 highIndex 为枢轴，然后从左边开始；
 * 
 * @param {Array<Integer>} originArray
 * @param {Integer} leftIndex
 * @param {Integer} rightIndex
 * @returns {Array<Integer>}
 */
function quickSortInPlace(originArray, leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) return;

    let i = leftIndex;
    let j = rightIndex;

    let pivotValue = originArray[i];
    
    while (i < j) {
        while (i < j && originArray[j] >= pivotValue) {
            j--;
        }

        if (i < j) {
            originArray[i++] = originArray[j];
        }

        while (i < j && originArray[i] <= pivotValue) {
            i++;
        }

        if (i < j) {
            originArray[j--] = originArray[i];
        }
    }

    originArray[i] = pivotValue;
    quickSortInPlace(originArray, leftIndex, i - 1);
    quickSortInPlace(originArray, i + 1, rightIndex);

    return originArray;
}

/**
 * @description 交换排序>快速排序（非原地算法）
 * 
 * @param {Array<Integer>} originArray
 * @returns {Array<Integer>}
 */
function quickSortOutPlace(originArray) {
    if (originArray.length <= 1) return originArray;

    const pivotValue = originArray[0],
        leftArray = [],
        rightArray = [];

    for (let i = 1; i < originArray.length; i++) {
        const value = originArray[i];

        value >= pivotValue && rightArray.push(value);
        value < pivotValue && leftArray.push(value);
    }
    return quickSortOutPlace(leftArray).concat(pivotValue, quickSortOutPlace(rightArray));
}


/**
 * @description 选择排序>简单选择排序
 * 
 *  基本思想：
 *      1. 不断选择剩余元素中的最小（或大）者，放到数组前面；
 * 
 *  时间复杂度：
 *      1. 最好情况，正序
 *          - 判断：n²
 *          - 移动：1
 *      2. 最坏情况，反序
 *          - 判断：n²
 *          - 移动：n
 *      3. 平均情况
 *          - n²
 *  分析：
 *      - 无论数组是否有序，总时间复杂度总为 n²;
 *      - 数据移动最少；
 * 
 * @param {Array<Integer>} originArray
 * @returns {Array<Integer>}
 */
function selectSort(originArray) {
    let len = originArray.length;
    let minIndex;

    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (originArray[minIndex] > originArray[j]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [originArray[i], originArray[minIndex]] = [originArray[minIndex], originArray[i]];
        }
    }
    return originArray;
}

/**
 * @description 选择排序>堆排序
 * @param {Array<Integer>} originArray
 * @returns {Array<Integer>}
 */
function heapSort(originArray) {
    let len = arr.length;

    let heapify = function (
        arr // 待排序的数组
        , x // 元素的下标
        , len // 数组的长度
    ) {
        let l = 2 * x + 1;
        let r = 2 * x + 2;
        let largest = x;

        if (l < len && arr[l] > arr[largest]) {
            largest = l;
        }

        if (r < len && arr[r] > arr[largest]) {
            largest = r;
        }

        if (largest !== x) {
            swap(x, largest, arr);
            heapify(arr, largest, len);
        }
    }

    for (let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i, len);
    }

    for (let i = len - 1; i >= 1; i--) {
        swap(0, i, arr);
        heapify(arr, 0, --len);
    }
    return arr;
}

/**
 * @description 插入排序>直接插入排序
 * 
 *  分析：
 *      1. 类似打牌，将数据插入按序插入，后面的元素均向后移动一位；
 *      2. 和选择排序不同，插入排序所需时间与数组初始顺序有关，越正序越快；
 * 
 *  时间复杂度：
 *      1. 最好情况，正序
 *          - 判断：n
 *          - 移动：1
 *      2. 最坏情况，逆序
 *          - 判断：n²
 *          - 移动：n²
 * 
 * 
 * @param {Array<Integer>} originArray
 * @returns {Array<Integer>}
 */
function insertSort(originArray) {
    let len = originArray.length;

    for (let i = 1; i < len; i++) {
        for (let j = i; j > 0 && originArray[j] < originArray[j - 1]; j--) {
            [originArray[j - 1], originArray[j]] = [originArray[j], originArray[j - 1]];
        }
    }

    return originArray;
}

/**
 * @description 插入排序>希尔排序
 * @param {Array<Integer>} originArray
 * @returns {Array<Integer>}
 */
function shellSort() {
    let len = arr.length,
        temp,
        gap = 1;

    while (gap < len / 3) {
        gap = gap * 3 + 1;
    }

    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (let i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;


    // sort(originalArray) {
    //     // Prevent original array from mutations.
    //     const array = [...originalArray];

    //     // Define a gap distance.
    //     let gap = Math.floor(array.length / 2);

    //     // Until gap is bigger then zero do elements comparisons and swaps.
    //     while (gap > 0) {
    //         // Go and compare all distant element pairs.
    //         for (let i = 0; i < (array.length - gap); i += 1) {
    //             let currentIndex = i;
    //             let gapShiftedIndex = i + gap;

    //             while (currentIndex >= 0) {
    //                 // Call visiting callback.
    //                 this.callbacks.visitingCallback(array[currentIndex]);

    //                 // Compare and swap array elements if needed.
    //                 if (this.comparator.lessThan(array[gapShiftedIndex], array[currentIndex])) {
    //                     const tmp = array[currentIndex];
    //                     array[currentIndex] = array[gapShiftedIndex];
    //                     array[gapShiftedIndex] = tmp;
    //                 }

    //                 gapShiftedIndex = currentIndex;
    //                 currentIndex -= gap;
    //             }
    //         }

    //         // Shrink the gap.
    //         gap = Math.floor(gap / 2);
    //     }

    //     // Return sorted copy of an original array.
    //     return array;
    // }
}

/**
 * @description 归并排序>自顶向下（递归）
 * @param {Array<Integer>} originArray
 * @returns {Array<Integer>}
 */
function mergeSortTopDown(originArray) {
    let len = originArray.length;

    if (len < 2) {
        return arr;
    }

    let middleIndex = Math.floor(len / 2); // 获取中间元素的索引
    let left = arr.slice(0, middleIndex); // 获取左半部分的元素
    let right = arr.slice(middleIndex); // 获取右半部分的元素

    let merges = function (left, right) {
        // 保存结果的数组
        let result = [];

        while (left.length && right.length) {
            if (left[0] < right[0]) {
                result.push(left.shift())
            } else {
                result.push(right.shift())
            }
        }

        // 如果左半边还有元素
        while (left.length) {
            result.push(left.shift());
        }

        // 如果右半边还有元素
        while (right.length) {
            result.push(right.shift());
        }

        return result;
    }

    return merges(merge(left), merge(right));
}

/**
 * @description 归并排序>自底向上（迭代）
 * @param {Array<Integer>} originArray
 * @returns {Array<Integer>}
 */
function mergeSortBottomUp(originArray) {

}

/**
 * @description 基数排序
 * @param {Array<Integer>} originArray
 * @returns {Array<Integer>}
 */
function radixSort(originArray) {
    let len = originArray.length;

    let max = Math.max(...originArray);
    let maxLength = `${max}`.length;

    let mod = 1
    let buckets = []

    while (maxLength > 0) {
        mod *= 10;

        for (let i = 0; i < len; i++) {
            let modValue = originArray[i] % mod;
            !buckets[modValue] && (buckets[modValue] = []);
            buckets[modValue].push(originArray[i]);
        }

        originArray.length = 0; // 将原数组清空
        for (let i = 0; i < buckets.length; i++) {
            if (buckets[i]) {
                for (let j = 0; j < buckets[i].length; j++) {
                    originArray.push(buckets[i][j]);
                }
            }
        }
        buckets = [];
        maxLength--;
    }
    return originArray;
}

/**
 * @description 计数排序
 * 
 * @param {Array<Integer>} originArray
 * @returns {Array<Integer>}
 */
function countSort(originArray) {
    let index = 0;
    let len = originArray.length;
    let min = Math.min.apply(null, arr); // 最小值
    let max = Math.max.apply(null, arr); // 最大值
    let buckets = []; // 结果数组

    // 向新数组中填充0
    for (let i = min; i <= max; i++) {
        buckets[i] = 0;
    }

    // 把各个数组中对应的元素计数加一
    for (let i = 0; i < len; i++) {
        buckets[originArray[i]]++;
    }
    // 按照计数的元素进行排序
    for (let i = min; i <= max; i++) {
        while (buckets[i]-- > 0) {
            originArray[index++] = i;
        }
    }
    return originArray;
}

// // 桶排序
// function bucketSort(arr, bucketSize) {
//     if (arr.length === 0) {
//         return arr;
//     }

//     var i;
//     var minValue = arr[0];
//     var maxValue = arr[0];
//     for (i = 1; i < arr.length; i++) {
//         if (arr[i] < minValue) {
//             minValue = arr[i];                // 输入数据的最小值
//         } else if (arr[i] > maxValue) {
//             maxValue = arr[i];                // 输入数据的最大值
//         }
//     }

//     //桶的初始化
//     var DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
//     bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
//     var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
//     var buckets = new Array(bucketCount);
//     for (i = 0; i < buckets.length; i++) {
//         buckets[i] = [];
//     }

//     //利用映射函数将数据分配到各个桶中
//     for (i = 0; i < arr.length; i++) {
//         buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
//     }

//     arr.length = 0;
//     for (i = 0; i < buckets.length; i++) {
//         insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
//         for (var j = 0; j < buckets[i].length; j++) {
//             arr.push(buckets[i][j]);
//         }
//     }

//     return arr;
// }

// // 桶排序 -- 不改变原数组
// function bucket(arr, size = 5) {
//     let len = arr.length;
//     if (len < 2) {
//         return arr;
//     }

//     // 获取最大值和最小值
//     const max = Math.max.apply(null, arr);
//     const min = Math.min.apply(null, arr);

//     // 计算出桶的数量  size是截距
//     const bucketCount = Math.floor((max - min) / size) + 1;
//     // 根据桶的个数创建指定长度的数组
//     const buckets = new Array(bucketCount);
//     // 将每个桶塞到大桶里面去
//     for (let i = 0; i < bucketCount; i++) {
//         buckets[i] = [];
//     }
//     // 利用映射函数将数据分配到各个桶里面去
//     for (let i = 0; i < arr.length; i++) {
//         // 逢size进1
//         let index = Math.floor((arr[i] - min) / size);
//         buckets[index].push(arr[i]);
//     }
//     //对每个桶中的数据进行排序--借助于快速排序算法
//     for (let i = 0; i < buckets.length; i++) {
//         buckets[i] = quick(buckets[i]);
//     }

//     // flatten数组--有点不足就是会将原数组中的String改变为Number
//     return buckets.join(',').split(',').filter(v => v !== '').map(Number);
// }




