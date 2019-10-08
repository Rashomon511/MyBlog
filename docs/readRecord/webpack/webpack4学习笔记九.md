# webpack4学习笔记(九)

<a name="7b5c5428"></a>
### 编写一个Bundler

基本结构

```javascript
const moduleAnalyser = (filename) => { // filename参数是引入的文件
}
const moduleInfo = moduleAnalyser('./src/index.js'); // 读取入口文件进行分析后返回一个值
```

利用fs读取文件

```javascript
const fs = require('fs');
const moduleAnalyser = (filename) => { 
	const content = fs.readFileSync(filename, 'utf-8');
}
```

利用@babel/parser对读取后对文件处理生成一个抽象语法树

```javascript
npm install @babel/parser --save-dev
```

bunlder

```javascript
const parser = require('@babel/parser'); 
const moduleAnalyser = (filename) => { 
	const content = fs.readFileSync(filename, 'utf-8');
	const ast = parser.parse(content, {// 接受两个参数，分析代码，生成一个抽象语法树
		sourceType: 'module'
	});
}
```

接下来可以对抽象语法树中分析出文件依赖

```javascipt
const traverse = require('@babel/traverse').default;
const path = require('path');
const moduleAnalyser = (filename) => { 
	const content = fs.readFileSync(filename, 'utf-8');
	const ast = parser.parse(content, {// 接受两个参数，分析代码，生成一个抽象语法树
		sourceType: 'module'
	});
	const dependencies = {};
	traverse(ast, { // 接受两个参数，一个是抽象语法树，一个是对象
		ImportDeclaration({ node }) { // 接收到抽象语法树中类型是ImportDeclaration的节点信息
			const dirname = path.dirname(filename); // 对路径进行处理,将相对路径转换为绝对路径
			const newFile = './' + path.join(dirname, node.source.value);
			dependencies[node.source.value] = newFile;  // 将分析得到依赖文件存入dependencies
		}
	});
}
```

借助bable对代码进行转换

```javascript
const babel = require('@babel/core');
const moduleAnalyser = (filename) => {
	const content = fs.readFileSync(filename, 'utf-8');
	const ast = parser.parse(content, {// 分析代码，生成一个抽象语法树
		sourceType: 'module'
	});
	const dependencies = {};
	traverse(ast, { // 接受两个参数，一个是抽象语法树，一个是对象
		ImportDeclaration({ node }) { // 接收到抽象语法树中类型是ImportDeclaration的节点信息
			const dirname = path.dirname(filename); // 对路径进行处理,将相对路径转换为绝对路径
			const newFile = './' + path.join(dirname, node.source.value);
			dependencies[node.source.value] = newFile; // 将分析得到依赖文件存入dependencies
		}
	});
	const { code } = babel.transformFromAst(ast, null, { // 将抽象语法树转换成浏览器可以运行对代码
		presets: ["@babel/preset-env"]
	});
	return {
		filename,
		dependencies,
		code
	}
}
```

上面是只对入口文件进行来分析，但是这是不够对，我们需要对所有文件进行分析，下一步就要对入口文件中对依赖文件进行分析，因此还需要一个函数来分析所有的文件的依赖关系并存在一个地方，这个地方名为依赖图谱。

```javascript
const makeDependenciesGraph = (entry) => { // 分析整个文件的依赖关系
	const entryModule = moduleAnalyser(entry); // 传入入口文件并分析入口文件的依赖
}
const graghInfo = makeDependenciesGraph('./src/index.js');
```

接下来利用循环递归来对整个文件进行依赖分析

```javascript
const makeDependenciesGraph = (entry) => { // 分析整个文件的依赖关系
	const entryModule = moduleAnalyser(entry);
	const graphArray = [ entryModule ];
	for(let i = 0; i < graphArray.length; i++) {
		const item = graphArray[i];
		const { dependencies } = item;
		if(dependencies) {
			for(let j in dependencies) {
				graphArray.push(
					moduleAnalyser(dependencies[j])
				);
			}
		}
	}
}
```

接下来遍历graphArray来对数据结构进行转换，生成一个键为文件路径，值为依赖文件，转换后代码组成的对象的一个对象，这个对象表示来整个文件的相互关系。

```javascript
const makeDependenciesGraph = (entry) => { // 分析整个文件的依赖关系
	const entryModule = moduleAnalyser(entry);
	const graphArray = [ entryModule ];
	for(let i = 0; i < graphArray.length; i++) {
		const item = graphArray[i];
		const { dependencies } = item;
		if(dependencies) {
			for(let j in dependencies) {
				graphArray.push(
					moduleAnalyser(dependencies[j])
				);
			}
		}
	}
	const graph = {};
	graphArray.forEach(item => {
		graph[item.filename] = {
			dependencies: item.dependencies,
			code: item.code
		}
	});
	return graph;
}
```

现在我们拿到了DependenciesGraph（即依赖图谱），接下来我们要生成浏览器真正可以运行的代码

```javascript
const generateCode = (entry) => {
	const graph = JSON.stringify(makeDependenciesGraph(entry)); // 将返回的数据转换成字符串
	return `  // 在闭包里执行代码
		(function(graph){
			function require(module) { 
				function localRequire(relativePath) { // 相对路径替换为绝对路径
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`;
}

const code = generateCode('./src/index.js');
```
