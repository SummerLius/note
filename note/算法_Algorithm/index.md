# 算法

## 临时

- 排序算法可以分为两类：
    - 原地排序算法：除了函数调用所需要的栈和固定数目的实例变量之外无需额外的内存
    - 非原地排序算法：
- 排序算法按稳定分类：
    - 稳定：冒泡、插入、归并、基数、计数、桶
    - 不稳定：选择、堆排、快排、希尔
        - 分析：
            - 简单选择排序不稳定：例如 “5 8 5 2 9”，第一次循环，第一个 5 会和 2 交换，此时两个 5 的相对顺序就改变了；
- 其它
    - 最高位优先（MSD，Most Significant Digit first）
    - 最低位优先（LSD）


|排序算法|平均复杂度|最好情况|最坏情况|空间复杂度|排序方式|稳定性|其它|
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|冒泡排序|O(n²)|O(n)|O(n²)|O(1)|in-place|稳定||
|选择排序|O(n²)|O(n²)|O(n²)|O(1)|in-place|不稳定||
|插入排序|O(n²)|O(n)|O(n²)|O(1)|in-place|稳定||
|快速排序||||||||
|堆排序||||||||
|希尔排序||||||||
|归并排序||||||||
|基数排序|O(n*k)|O(n*k)|O(n*k)|O(n)|out-place|稳定|k 为数组中最大数值的位数，所以该<br/>值不大，一般可控，例如 999 对应 k 为 3|
|计数排序|O(n + k)|O(n + k)|O(n + k)|O(k)|out-place|稳定|k 为桶的个数，该桶个数与数组长度<br/>相关，与数组里面最大值和最小值相关|
|桶排序||||||||
|||||||||



## 链接

- https://cuijiahua.com/blog/2018/01/alogrithm_9.html
- https://mp.weixin.qq.com/s/vn3KiV-ez79FmbZ36SX9lg
- https://blog.csdn.net/justloveyou_/article/details/72730597
- https://visualgo.net/zh
- [中文WIKI 算法](https://zh.wikipedia.org/wiki/%E7%AE%97%E6%B3%95)
- [中文WIKI | 排序算法](https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95)
- [英文WIKI | 排序算法](https://en.wikipedia.org/wiki/Sorting_algorithm)
- [排序算法动画](https://www.toptal.com/developers/sorting-algorithms)
- [算法基础 网易课程](https://www.coursera.org/learn/suanfa-jichu)
- [Github | Algorithms - Jeff Erickson](https://github.com/jeffgerickson/algorithms)
- [博客 | 算法范式](https://www.cnblogs.com/gaochundong/p/algorithmic_paradigms.html)