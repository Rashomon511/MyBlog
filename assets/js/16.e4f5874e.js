(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{306:function(n,s,t){"use strict";t.r(s);var r=t(0),e=Object(r.a)({},(function(){var n=this,s=n.$createElement,t=n._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h1",{attrs:{id:"从前序与中序遍历序列构造二叉树-中等"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#从前序与中序遍历序列构造二叉树-中等","aria-hidden":"true"}},[n._v("#")]),n._v(" 从前序与中序遍历序列构造二叉树-中等")]),n._v(" "),t("p",[t("br"),n._v("难度：中等"),t("br"),n._v(" "),t("br"),n._v(" "),t("br"),n._v("题目描述："),t("br"),n._v("根据一棵树的前序遍历与中序遍历构造二叉树。"),t("br"),t("strong",[n._v("注意:")]),t("br"),n._v("你可以假设树中没有重复的元素。"),t("br"),n._v(" "),t("br"),n._v("示例：")]),n._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[n._v("前序遍历 preorder "),t("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("9")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("20")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("15")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("7")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),n._v("\n中序遍历 inorder "),t("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("9")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("15")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("20")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("7")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),n._v("\n "),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),n._v("\n   "),t("span",{pre:!0,attrs:{class:"token operator"}},[n._v("/")]),n._v(" \\\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("9")]),n._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("20")]),n._v("\n    "),t("span",{pre:!0,attrs:{class:"token operator"}},[n._v("/")]),n._v("  \\\n   "),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("15")]),n._v("   "),t("span",{pre:!0,attrs:{class:"token number"}},[n._v("7")]),n._v("\n")])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br"),t("span",{staticClass:"line-number"},[n._v("5")]),t("br"),t("span",{staticClass:"line-number"},[n._v("6")]),t("br"),t("span",{staticClass:"line-number"},[n._v("7")]),t("br")])]),t("br"),n._v(" "),t("br"),n._v("解题思路：\n```javascript\nvar buildTree = function(preorder, inorder) {\n      if (inorder.length === 0) return null;\n      let root = new TreeNode(preorder[0]);\n      let index = inorder.indexOf(preorder[0]);\n      root.left = buildTree(\n        preorder.slice(1, index + 1),\n        inorder.slice(0, index)\n      );\n      root.right = buildTree(\n        preorder.slice(index + 1),\n        inorder.slice(index + 1)\n      );\n      return root;\n};\n```\n")])}),[],!1,null,null,null);s.default=e.exports}}]);