'use strict';


class BaseSort {
    /**
     * @description 交换排序>冒泡排序
     *
     *  两种方式，这里采用第一种方式：
     *      1. 按数组索引正序循环，将较大的数冒泡交换到数组的后面；
     *      2. 按数组索引逆序循环，将较小的数冒泡交换到数组的前面；
     *
     *
     * @param {Array<Integer>}
     * @returns {Array<Integer>} 返回原数组
     */
    static bubbleSort(originArray) {
        for (let i = 0; i < originArray.length; i++) {
            
            for (let j = 0; j < originArray.length - i; j++) {}
        }
    }

    /**
     * @description 交换排序>快速排序
     */
    static quickSort() {}

    /**
     * @description 选择排序>简单选择排序
     */
    static selectSort() {}

    /**
     * @description 选择排序>堆排序
     */
    static heapSort() {}

    /**
     * @description 插入排序>直接插入排序
     */
    static insertSort() {}

    /**
     * @description 插入排序>希尔排序
     */
    static shellSort() {}

    /**
     * @description 归并排序
     */
    static mergeSort() {}

    /**
     * @description 基数排序
     */
    static radixSort() {}

    /**
     * @description 计数排序
     */
    static countSort() {}
}




