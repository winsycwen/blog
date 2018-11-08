---
title: javascript可选的分号
date: 2018-11-08 14:22:51
tags: Javascript
categories: 笔记
---

笔记搬迁自之前的[笔记集][3]

---

第二个函数只因为return后的大括号换行了，导致它与预期返回的结果不一样：

```
function foo1(){
  return {
      bar: "hello"
  };
}

function foo2(){
  return
  {
      bar: "hello"
  };
}
console.log("foo1 returns:");
console.log(foo1());
console.log("foo2 returns:");
console.log(foo2());
```

```
// 最终结果
foo1 returns:
Object {bar: "hello"}
foo2 returns:
undefined
```

原因是：
浏览器在解析下述代码片段一时，会解析成类似代码片段二的形式，故函数返回的结果为undefined。
```
// 代码片段一
return
{
    bar: "hello"
};
// 代码片段二
return;{bar:"hello"};
```

### 相关资料

- [JavaScript可选的分号][1]
- [37个JavaScript基本面试问题和解答-第6题][2]


  [1]: https://blog.csdn.net/lvff66/article/details/72844752 "JavaScript可选的分号"
  [2]: https://mp.weixin.qq.com/s/hklhEpdVdKtLS2q831KhWQ "37个JavaScript基本面试问题和解答"
  [3]: https://zybuluo.com/winsycwen/note/1141923 "javascript可选的分号"