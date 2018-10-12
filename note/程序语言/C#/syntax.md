
<!-- TOC -->

- [数据类型](#数据类型)
- [类](#类)
    - [class类型](#class类型)

<!-- /TOC -->

## 数据类型

- 数字
    - sbyte：8
    - byte：8
    - short：16
    - ushort：16
    - int：32
    - uint：32
    - long：64
    - ulong：64
    - float：32
    - double：64
    - decimal：128
- bool：8
- char：16
- string
- object

## 类

### class类型
- 功能上：
    - `普通类`
    - `静态类`
        - static
        - 其类的所有成员必须也是静态static的
        - 可以有静态构造函数，不能有实例构造函数
        - 不能创建该类的实例
        - 该类是隐式密封的，不能被继承
    - `密封类`
        - sealed
        - 不能被继承
    - `抽象类`
        - abstract
        - 不能创建抽象类的实例
        - 其内可含：抽象成员和非抽象成员
        - 抽象类的派生类必须使用override关键字实现所有抽象成员，除非派生类也是抽象类
- 访问权限上：
    - `public`
    - `internal`
