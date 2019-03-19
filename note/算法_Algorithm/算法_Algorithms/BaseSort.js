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
    mergeSort,

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
function heapSort(originArray) {}

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
 */
function shellSort() {

}

/**
 * @description 归并排序
 */
function mergeSort() {}

/**
 * @description 基数排序
 */
function radixSort() { }

/**
 * @description 计数排序
 */
function countSort() { }




