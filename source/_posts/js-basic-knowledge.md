---
title: js基础知识
date: 2018-11-08 16:43:23
tags: Javascript
categories: 笔记
---

## 疑问一：变量声明提升

*代码片段一*
```javascript
var a = "hello";
(function(){
    console.log(a);   //输出hello
})();
```
*代码片段二*
```javascript
var a = "hello";
(function(){
    console.log(a);   //输出undefined
    var a = "nima";
})();
```
在IIF函数（立即执行函数）的执行上下文中，由于变量声明的提升，沿着作用域链开始逐级向上回溯搜素时，在IIF函数内找到了a变量，上述代码相当于：
```javascript
var a = "hello";
(function(){
    var a;
    console.log(a);
    a = "nima";
})();
```

### 参考资料：
- [JavaScript中变量提升------Hoisting][1]

## 疑问二：函数声明和函数表达式

*代码片段一*
```javascript
// foo(); // 2
// 函数表达式
var foo = function() {
  console.log("1");
};

// foo(); // 1
// 函数声明
function foo() {
  console.log("2");
}
// foo();  // 1
```
由于函数声明提升总是优先于变量声明提升，因此即使将上述函数表达式和函数声明对调，输出的结果仍不变。上述代码相当于：

```javascript
function foo() {
  console.log("2");  
}
var foo;
// foo(); // 2

foo = function() {  // 覆盖了函数声明
  console.log("1");
};

// foo();  // 1
// foo();  // 1
```

注意：在代码开始执行之前，解析器就已经通过一个名为函数声明提升(function declaration hoisting)的过程，读取并将函数声明添加到执行环境中。而对于函数表达式，代码只会在函数所在语句之后，才能执行。

## 疑问三：带标识符的函数表达式
在segmentfault看到的一个问题，从这个问题又了解到了“词法记录器”：
*代码片段一：*
```javascript
b = c;
b();
console.log(a); //1
console.log(b); //2
console.log(c); //3
function c() {
    a = 1; b = 2; c = 3;
}
```
**解读：**这段代码关乎**声明提升（Hoisting）**，c函数内部的变量没有使用var声明，所以本来b和c为function c() {}，被分别覆盖为2和3了。


在代码片段一的基础上修改为以下：
*代码片段二：*
```javascript
b = function c() {
    a = 1; b = 2; c = 3;
};
b();
console.log(a); //1
console.log(b); //2
console.log(c); //Uncaught ReferenceError: c is not defined
```

众所周知，JS的变量和函数声明都会被存储到执行上下文的变量对象（或活动对象）中,即声明提前。

**解读：**
在JS中函数有两种定义方式：
    
    1. 函数声明：
        
        其中函数声明只有一种形式： 
        function 标识符(形参) {函数代码} 
        
    2. 函数表达式
        
        而函数表达式有两种形式：
        function 标识符(形参) {函数代码} 
        function (形参) {函数代码} 


**对于函数表达式的第一种写法，var bar = function foo() {};这个标识符标量只在函数的作用域内有效，并且不会被覆盖，在函数外围无效(在IE8及IE8以下浏览器却是可见的)。所以代码片段三，C输出为function c() {};而不是3**
 

在代码片段二的基础上修改为以下：
*代码片段三：*
```javascript
b = function c() {
    a = 1; b = 2; c = 3;
    console.log(a); //1
    console.log(b); //2
    console.log(c); //function c() {...}
};
b();
```

### 相关资料：
- [Javascript笔试题一则][2]
- [深入理解JavaScript系列（2）：揭秘命名函数表达式][3]

## 疑问四：js高级程序（闭包与变量）代码

闭包是指：当一个函数的返回值是另外一个函数，而返回的那个函数如果调用了其父函数内部的其它变量，如果返回的这个函数在外部被执行，就产生了闭包。——摘自[弄懂JavaScript的作用域和闭包][4]

### javascript高级程序设计（第三版） 7.2.1闭包与变量
```javascript
function createFunctions() {
    var result = new Array();
    for(var i = 0; i < 10; i++) {
        result[i] = function(num){
            //return function() {
                return num;
            //};
        }(i);
    }
    return result;
}
createFunctions();
```
原书上的代码似乎要改成这样，result数组里才会存放每一个i的值。如若像书本那样写，result的值将会是：
!["书本代码得到的result数组"][5]
经过修改后的代码的result的值：
!["修改后的代码的result数组"][6]

### 拓展：
- [javascript闭包和ie内存泄露原理][7]
- [js中即时函数和闭包的异同][8]

## 疑问五：事件委托机制

随着内存中的对象越多，性能越差，而且，添加到页面上的事件处理程序数量会直接关系到页面的整体性能。随后，便出现了事件委托机制。使用事件委托技术能让你避免对特定的每个节点添加事件监听器；相反，事件监听器是被添加到它们的父元素上。事件监听器会分析从子元素冒泡上来的事件，找到是哪个子元素的事件。

代码示例：

```html
<ul id="list">
    <li>列表1</li>
    <li>列表2</li>
    <li>列表3</li>
</ul>
```
```javascript
var list = document.getElementById("list");
list.addEventListener("click",function(){
    console.log(event.target.innerHTML);
},false);
```

## 疑问六：call函数
Chrome36控制台下执行下列代码，为何输出this的时候，不是基本类型值String？
```javascript
var a = function(){
    console.log(this);// String {0: "l", 1: "i", 2: "t", 3: "t", 4: "l", 5: "e", 6: "d", 7: "u", length: 8}
    console.log(typeof this); //  object
    console.log(this instanceof String);    // true
}
a.call('littledu');
```

## 疑问七：Array.prototype.slice.call/apply()
更多时候，该方法一般运用到array-like类数组上，因为这种数据没有数组所特有的属性和方法。类似：函数内部的arguments对象，它类似于数组，没有数组所特有的属性和方法，除了length。

**注意：**在MDN中，[对arguments运用Array.prototype.slice提出了警告][9]……不应在 arguments 对象上使用 slice 方法，这会阻碍 JavaScript 引擎的优化 (比如 V8 引擎)。作为替代，应通过遍历arguments对象的方式来构建一个新的数组。

### 相关资料：
- [DOM笔记][10]
- [Array.prototype.slice.call是如何运作的][11]
- [性能杀手][12]

## 疑问八：setTimeout(fn, 0)

### 基本概念
在HTML5规范之前，setTimeout和setInterval方法接受两个参数：要执行的代码和以毫秒表示的时间。以前，为了给要执行的代码传递参数，需要利用闭包来实现，比如：
```
// 一秒后在控制台输出1
var timer = setTimeout(function() {
    console.log(1);
}, 1000);

// 现要求1秒后，在控制台输出a的值
var a = 1;
var timer = setTimeout(function(a) {
    return function() {
        console.log(a);
    };
}(a), 1000);
```
在HTML5规范出来之后，setTimeout和setInterval除了第一、二个参数外，还可以接受其它参数传入要执行的代码中，例如：
```
var a = 1;
var timer = setTimeout(function() {
    console.log(arguments[0]);
}, 1000, a);
```

### setTimeout(fn, 0)
在segementfault平台头条里面看到了一篇比较有趣的文章：[Excuse me？这个前端面试在搞事！][13]。观察分析里面的每一个小示例：



#### 相关资料：
- https://zhuanlan.zhihu.com/p/25407758
- https://github.com/creeperyang/blog/issues/21
- http://www.ruanyifeng.com/blog/2014/10/event-loop.html
- https://github.com/creeperyang/blog/issues/21

  [1]: http://www.cnblogs.com/damonlan/archive/2012/07/01/2553425.html
  [2]: http://segmentfault.com/q/1010000003872849?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly "segmentfault Javascript笔试题一则"
  [3]: http://www.cnblogs.com/TomXu/archive/2011/12/29/2290308.html "深入理解JavaScript系列（2）：揭秘命名函数表达式"
  [4]: https://mp.weixin.qq.com/s?__biz=MzA5NTM2MTEzNw==&mid=2736711590&idx=1&sn=e823b0894a4ac501bc483771309ff9b0&chksm=b6aac6b881dd4fae838c156b4dd7494bea773f94ae5e62396dfaf03e4d386536fb4c63e6f7db&mpshare=1&scene=1&srcid=1201NAhimlyahliWhcpMqEri&pass_ticket=8xwIYPKn1mdm8j576Ja08PiX3az5CUxXPph6bY9xxXarK%2b4BkFW8TjN81wuF1omB#rd%20%E5%BC%84%E6%87%82JavaScript%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%92%8C%E9%97%AD%E5%8C%85
  [5]: http://static.oschina.net/uploads/space/2014/0915/141829_OBTa_1414404.png "书本代码得到的result数组"
  [6]: http://static.oschina.net/uploads/space/2014/0915/142053_nkwN_1414404.png "修改后的代码得到的result数组"
  [7]: http://www.cnblogs.com/blowfish/p/3323357.html "js闭包和ie内存泄露原理"
  [8]: http://segmentfault.com/q/1010000004140838?_ea=505260%20js%E4%B8%AD%E5%8D%B3%E6%97%B6%E5%87%BD%E6%95%B0%E5%92%8C%E9%97%AD%E5%8C%85%E7%9A%84%E5%BC%82%E5%90%8C%EF%BC%9F
  [9]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments
  [10]: https://www.zybuluo.com/winsycwen/note/237263#%E6%89%80%E6%9C%89%E8%8A%82%E7%82%B9%E5%9F%BA%E6%9C%AC%E5%B1%9E%E6%80%A7%E5%92%8C%E6%96%B9%E6%B3%95
  [11]: http://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
  [12]: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers
  [13]: https://zhuanlan.zhihu.com/p/25407758 "Excuse me？这个前端面试在搞事！"