# javascript创建对象方式

工厂模式：用函数来封装以特定接口创建对象

```javascript
function createPerson(name, age, job){
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function(){
            alert(this.name);
        };
        return o;
 }

var person1 = createPerson("Nicholas", 29, "Software Engineer");

var person2 = createPerson("Greg", 27, "Doctor");
```

缺点：没有解决对象识别的问题



构造函数模式：ECMAScript 中的构造函数可用来创建特定类型的对象

```javascript
function Person(name, age, job){

        this.name = name;

        this.age = age;

        this.job = job;

        this.sayName = function(){

            alert(this.name);
        }; 
}

    var person1 = new Person("Nicholas", 29, "Software Engineer");

    var person2 = new Person("Greg", 27, "Doctor");
```

以这种方式调用构造函数实际上会经历以下 4 个步骤:<br />(1) 创建一个新对象;<br />(2) 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象);<br />(3) 执行构造函数中的代码(为这个新对象添加属性);<br />(4) 返回新对象。<br />缺点：使用构造函数的主要问题，就是每个方法都要在每个 实例上重新创建一遍

原型模式：不必在构造函数中定义对象实例的信息，而是 可以将这些信息直接添加到原型对象

```javascript
function Person(){}

    Person.prototype.name = "Nicholas";

    Person.prototype.age = 29;

    Person.prototype.job = "Software Engineer";

    Person.prototype.sayName = function(){

        alert(this.name);

    };

    var person1 = new Person();

    person1.sayName();   //"Nicholas"

    var person2 = new Person();

    person2.sayName(); //"Nicholas"

  alert(person1.sayName == person2.sayName);  //true
```

缺点：实例没是要有属于自己的全部属性的

组合模式：组合使用构造函数模式与原型模式。构造函数模式用于定义实 例属性，而原型模式用于定义方法和共享的属性

```javascript
function Person(name, age, job){

    this.name = name;

    this.age = age;

    this.job = job;

    this.friends = ["Shelby", "Court”];

}

Person.prototype = {

    constructor : Person,

    sayName : function(){

        alert(this.name);

    }

}

var person1 = new Person("Nicholas", 29, "Software Engineer");

var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");

alert(person1.friends);    //"Shelby,Count,Van"

alert(person2.friends);    //"Shelby,Count"

alert(person1.friends === person2.friends);//false

alert(person1.sayName === person2.sayName);//true
```

寄生构造函数模式:创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象

```javascript
function Person(name, age, job){

        var o = new Object();

        o.name = name;

        o.age = age;

        o.job = job;

        o.sayName = function(){
            alert(this.name);
        };
        return o;
 }

    var friend = new Person("Nicholas", 29, "Software Engineer");

    friend.sayName();  //"Nicholas"
```
