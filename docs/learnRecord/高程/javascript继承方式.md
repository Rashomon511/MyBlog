# javascript继承方式

原型链继承：基本思想是利用原 型让一个引用类型继承另一个引用类型的属性和方法, 实现的本质是重写原型对象

```javascript
function SuperType(){
        this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}

//继承了 SuperType

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function (){

    return this.subproperty;

}

var instance = new SubType();

alert(instance.getSuperValue());//true
```

存在的问题：<br />第一：通过原型来实现继承时，原 型实际上会变成另一个类型的实例，<br />第二：在创建子类型的实例时，不能向超类型的构造函数中传递参数

构造函数继承：在子类型构造函数的内部调用超类型构造函数

```javascript
function SuperType(){
    this.colors = ["red", "blue", "green”];
}

function SubType(){
		//继承了 SuperType
    SuperType.call(this);

}

var instance1 = new SubType();

instance1.colors.push("black");

alert(instance1.colors);    //"red,blue,green,black"

var instance2 = new SubType();

alert(instance2.colors);    //"red,blue,green”
```

组合继承：使用原型链实现对原型属性和方 法的继承，而通过借用构造函数来实现对实例属性的继承

```javascript
function SuperType(name){
        this.name = name;
        this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
        alert(this.name);
};

function SubType(name, age){

//继承属性

SuperType.call(this, name);
    this.age = age;
}

//继承方法

SubType.prototype = new SuperType(); 

SubType.prototype.constructor = SubType;

 SubType.prototype.sayAge = function(){

    alert(this.age);

};

var instance1 = new SubType("Nicholas", 29);

instance1.colors.push("black");

    
alert(instance1.colors);//"red,blue,green,black"

instance1.sayName();//"Nicholas";

instance1.sayAge();//29


var instance2 = new SubType("Greg", 27);

alert(instance2.colors);//"red,blue,green"

instance2.sayName();//"Greg";

instance2.sayAge();//27
```

寄生式继承: 创建一个仅用于封装继承过程的函数，该 函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象

```javascript
function createAnother(original){ 
	var clone=object(original); //通过调用函数创建一个新对象
	clone.sayHi = function(){ ////以某种方式来增强这个对象
  alert("hi");
  };
	return clone; //返回这个对象
}
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

寄生组合式继承: 即通过借用构造函数来继承属性，通过原型链的混成形式来继承

```javascript
function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
function inheritPrototype(subType, superType){
    var prototype = object(superType.prototype); //创建对象
    prototype.constructor = subType; //增强对象
    subType.prototype = prototype; //指定对象
}

inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
}
var p1 = new SubType('Jack', 20);
p1.colors.push('white');
alert(p1.colors) //["red", "blue", "green", "white"]
var p2 = new SubType('Mark', 18); 
alert(p2.age) //18
```
