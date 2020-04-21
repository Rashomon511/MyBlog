module.exports = {
  title: "二求",
  description: "求真、求知",
  head: [["link", { rel: "icon", href: "/logo.jpeg" }]],
  markdown: {
    lineNumbers: true,
  },
  plugins: ["@vuepress/back-to-top"],
  themeConfig: {
    lastUpdated: "最后更新时间",
    sidebarDepth: 4,
    nav: [
      { text: "主页", link: "/" },
      { text: "博客文章", link: "/article/" },
      // { text: '计算机网络', link: '/network/' },
      { text: "前端算法", link: "/algorithm/" },
      { text: "源码释界", link: "/sourceCode/" },
      // { text: '前端译界', link: '/translation/' },
      { text: "学习笔记", link: "/learnRecord/" },
      { text: "前端知识体系", link: "/interviewQuestions/" },
      { text: "每周阅读", link: "/weekRead/" },
      { text: "GitHub", link: "https://github.com/Rashomon511" },
      { text: "关于", link: "/about/" },
    ],
    sidebar: {
      "/article/": [
        {
          title: "Javascript",
          collapsable: true,
          children: [
            "/article/Javascript/如何理解服务端渲染",
            "/article/Javascript/AMD-CMD-COMMONJS浅析",
            "/article/Javascript/从头手写一个Promise",
            "/article/Javascript/函数柯里化",
            "/article/Javascript/call,apply,bind以及实现方式",
            "/article/Javascript/this",
            "/article/Javascript/Object.defineProperty实现双向绑定",
            "/article/Javascript/Proxy-与-Object-defineProperty的对比",
            "/article/Javascript/关于数组扁平化",
            "/article/Javascript/你不知道的类型转换",
          ],
        },
        {
          title: "CSS",
          children: [
            "/article/CSS/超详细常用css布局",
            "/article/CSS/26个常用易忘的css小技巧",
            "/article/CSS/图片实现滤境对三种方式",
          ],
        },
        {
          title: "React",
          children: [
            "/article/React/Next服务端渲染框架",
            "/article/React/React性能优化的8种方式了解一下？",
            "/article/React/Hooks模拟生命周期",
            "/article/React/react中的key值",
            "/article/React/react生命周期",
            "/article/React/ref和DOM操作",
            "/article/React/setFieldsValue",
            "/article/React/react16新特性",
            "/article/React/react的受控组件和非受控组件",
            "/article/React/React创建组件的三种方式",
            "/article/React/React的类型检查",
          ],
        },
        {
          title: "HTTP",
          children: ["/article/Http/前端必懂的HTTP缓存机制"],
        },
        {
          title: "浏览器",
          children: [
            "/article/浏览器/浏览器渲染机制",
            "/article/浏览器/彻底搞清楚Event-Loop",
          ],
        },
        {
          title: "Webpack",
          children: [
            "/article/Webpack/webpack热更新",
            "/article/Webpack/利用webpack搭建脚手架一套完整流程",
            "/article/Webpack/手撸loader和plugin全解析",
          ],
        },
        {
          title: "Typescript",
          children: [
            "/article/Typescript/TypeScript入门—类型一",
            "/article/Typescript/TypeScript入门二",
            "/article/Typescript/TypeScript入门三",
            "/article/Typescript/Typescript入门接口与类",
            "/article/Typescript/Typescript文件模块知多少",
          ],
        },
        {
          title: "数据流",
          children: [
            "/article/数据流/前端数据流管理方案之一",
            "/article/数据流/前端数据流管理方案之二",
            "/article/数据流/前端数据流管理方案之三",
            "/article/数据流/前端数据流管理方案之四",
          ],
        },
        {
          title: "Node",
          children: [],
        },
        {
          title: "其他",
          children: [
            "/article/other/发布npm包",
            "/article/other/利用nginx部署静态页面",
            "/article/other/install安装软件的路径",
            "/article/other/linux系统安装yum环境",
          ],
        },
      ],
      "/algorithm/": [
        "/algorithm/数据结构与算法简介",
        {
          title: "字符串",
          children: [
            "/algorithm/字符串/反转字符串中的单词 III",
            "/algorithm/字符串/计数二进制子串",
            "/algorithm/字符串/有效的括号",
            "/algorithm/字符串/实现strStr",
            "/algorithm/字符串/报数",
            "/algorithm/字符串/最后一个单词的长度",
            "/algorithm/字符串/最长公共前缀",
          ],
        },
        {
          title: "数组",
          children: [
            "/algorithm/数组/三个数最大乘积",
            "/algorithm/数组/第三大数",
            "/algorithm/数组/移动零",
            "/algorithm/数组/找到所有数组中消失的数字",
            "/algorithm/数组/两数之和",
            "/algorithm/数组/删除排序数组中的重复项",
            "/algorithm/数组/移除元素",
            "/algorithm/数组/加一",
            "/algorithm/数组/搜索插入位置",
            "/algorithm/数组/最大子序和",
            "/algorithm/数组/合并两个有序数组",
          ],
        },
        {
          title: "正则",
          children: [],
        },
        {
          title: "数学",
          children: [
            "/algorithm/数学/整数反转",
            "/algorithm/数学/回文数",
            "/algorithm/数学/罗马转数字",
          ],
        },
        {
          title: "栈",
          children: [],
        },
        {
          title: "队列",
          children: [],
        },
        {
          title: "堆",
          children: [],
        },
        {
          title: "图",
          children: [],
        },
        {
          title: "链表",
          children: ["/algorithm/链表/合并两个有序链表"],
        },
        {
          title: "二叉树",
          children: [],
        },
        {
          title: "排序",
          children: [],
        },
        {
          title: "递归",
          children: [],
        },
        {
          title: "二分查找",
          children: [],
        },
        {
          title: "搜索",
          children: [],
        },
        {
          title: "动态规划",
          children: ["/algorithm/动态规划/爬楼梯"],
        },
        {
          title: "哈希算法",
          children: [],
        },
        {
          title: "贪心算法",
          children: [],
        },
        {
          title: "分治算法",
          children: [],
        },
        {
          title: "回溯算法",
          children: [],
        },
      ],
      "/designMode/": [],
      "/sourceCode/": [
        {
          title: "Redux",
          collapsable: true,
          children: [
            "/sourceCode/redux/redux源码分析一",
            "/sourceCode/redux/redux源码分析二",
          ],
        },
        {
          title: "Redux-Saga",
          children: [
            "/sourceCode/Saga/redux-saga源码分析一",
            "/sourceCode/Saga/redux-saga源码分析二",
          ],
        },
        {
          title: "React",
          children: [],
        },
      ],
      "/translation/": [
        {
          title: "外文翻译",
          children: ["/translation/flat"],
        },
      ],
      "/learnRecord/": [
        {
          title: "webpack",
          children: [
            "/learnRecord/webpack/webpack4学习笔记一",
            "/learnRecord/webpack/webpack4学习笔记二",
            "/learnRecord/webpack/webpack4学习笔记三",
            "/learnRecord/webpack/webpack4学习笔记四",
            "/learnRecord/webpack/webpack4学习笔记五",
            "/learnRecord/webpack/webpack4学习笔记六",
            "/learnRecord/webpack/webpack4学习笔记七",
            "/learnRecord/webpack/webpack4学习笔记八",
            "/learnRecord/webpack/webpack4学习笔记九",
          ],
        },
        {
          title: "正则表达式迷你书",
          children: [
            "/learnRecord/正则小书/正则表达式学习总结一",
            "/learnRecord/正则小书/正则表达式学习总结二",
            "/learnRecord/正则小书/正则表达式学习总结三",
            "/learnRecord/正则小书/正则表达式学习总结四",
          ],
        },
        {
          title: "你所不知道的Javascript",
          children: [
            "/learnRecord/你不知道的js/你不知道的js上",
            "/learnRecord/你不知道的js/你不知道的js中",
            "/learnRecord/你不知道的js/你不知道的js下",
          ],
        },
        {
          title: "Javascript高级程序设计",
          children: [
            "/learnRecord/高程/javascript继承方式",
            "/learnRecord/高程/javascript创建对象方式",
          ],
        },
      ],
      "/interviewQuestions/": [
        "/interviewQuestions/Javascript",
        "/interviewQuestions/Javascript手写",
        "/interviewQuestions/Css",
        "/interviewQuestions/Html",
        "/interviewQuestions/浏览器相关",
        "/interviewQuestions/计算机网络",
        "/interviewQuestions/前端框架",
        "/interviewQuestions/前端工程",
        "/interviewQuestions/安全与性能",
        "/interviewQuestions/Node",
        "/interviewQuestions/版本控制",
        "/interviewQuestions/测试相关",
      ],
    },
  },
};
