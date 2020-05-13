---
title: 学习React
tags: React
categories: 笔记
date: 2020-05-13 14:06:43
---


## 了解React

React是一个用于构建UI的Javascript库（A JavaScript library for building user interfaces）。
它具备声明式（Declarative）、组件化（Component-Based）、一次学习随处编写（Learn Once, Write Anywhere）的特点。

## JSX

JSX是Javascript语法的延伸。

### 为什么使用JSX呢？
React将标记和逻辑放在松散耦合单元（组件），实现[关注点分离](https://en.wikipedia.org/wiki/Separation_of_concerns)，而不是将标记和逻辑人为分离到不同文件中。

> 相关内容：https://www.youtube.com/watch?reload=9&v=x7cQ3mrcKaY

### 注意事项
- 使用括号()包裹内容为了避免[自动插入分号](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)问题。
- 当在属性内使用大括号时，且大括号内包含Javascript表达式，则不需要给大括号{}外层增加引号。
  ```
  const element = <img src={user.avatarUrl}></img>
  ```
- 属性名称使用驼峰式命名（camelCase），比如class属性则应该使用className、tabindex则应该使用tabIndex。

## Elements & Components