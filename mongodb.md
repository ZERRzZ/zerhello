# MongoDB数据库
- 非关系数据库，能处理超大容量数据
- 采用BSON格式来存储数据，类似于JSON
- [数据模型](./img/mongoDB数据模型.png)
## 基本命令
- `show dbs`：查看有数据的库
- `use 库名`：切换库，没有会自动创建
- `db`：显示当前操作的库
- `db.runCommand({"dropDatabase": 1})`：删除当前数据库
## MongoDB认证
- 添加管理员：`ues admin`,`db.createUser({user: "root", pwd: "12345", roles: ["root"]})`
- 修改配置文件：`security: authorization: enabled`
- 重启并用用户名密码登录：`mongo -u user -p pwd`
## 集合操作
- `show collections`：显示库中的集合
- `db.createCollection("集合名字")`：创建集合
- `db.runCommand({"drop", "集合名"})`：删除集合
- `db.集合名.drop()`：删除集合
## 文档操作
- `db.集合名.insert(BSON格式数据)`：增加文档，会自动创建一个_id主键字段，有重复时报错
- `db.集合名.save(BSON格式数据`：增加文档，有重复时会更新该文档
- `db.集合名.find()`：查询集合中所有文档
- `db.集合名.update(BSON格式数据)`：第一个参数为条件，第二参数为修改内容，第三个参数为是否批量修改
```js
// 修改 age=21 的文档，只把 age 改为 20
db.getCollection('students').update(
  // query
  { "age": 21},
  // update
  // $set 为只修改该值
  { $set: {"age": 20}},
  // options
  { "multi" : false,  // update only one document
    "upsert" : false }  // insert a new document, if no existing document match the query
)
```
- `db.集合名.remove()`：删除文档，可以指定条件
## 高级查询
- 查询等于，大于，小于，不等于等逻辑语句的时候：
```js
// 假定列为 field, 值为 value, 查询都用 db.集合名.find()
({"field": value}) // field = value
({"field": {$gt: value}}) // field > value
({"field": {$lt: value}}) // field < value
({"field": {$gte: value}}) // field >= value
({"field": {$lte: value}}) // field <= value
({"field": {$gt: value1, $lt: value2}}) // field 在 value1,value2 之间
({"field": {$ne: value}}) // field != value
```
- 查询取模的情况 field % a == b：`{"field": {$mod: [a, b]}}`
- 查询等于或不等于多个值时
```js
{"field": {$in: [value1, value2, ...]}} // field 等于 value1，2，3，...时
{"field": {$nin: [value1, value2,...]}} // field 不等于 value1,2,3,...时
```
- 查询文档字段数量等于 num 时，前提该字段是数组：`{"field": {$size: num}}`
- 查询存在或不存在某个字段时：`{"field": {$exists: true/false}}`
- 模糊查询：`{"field": {$regex: /r/i}}`：正则表达式
## 高级查询2
- 查询多个字段条件时与或语法
```js
// 查询名字是张三或年龄是18的数据
db.集合名.find({$or: [{"name": "张三""name": "张三"}, {"age": 18}]})
// 查询名字是张三且年龄是18的数据
db.集合名.find({$and: [{"name": "张三""name": "张三"}, {"age": 18}]})
```
- 当字段的值是对象时
```js
// 查找语文成绩大于80的数据
db.集合名.find({"score.yw": {$gt: 80}})
```
- 排序查询：`db.集合名.find().sort({"age": 1/-1})`：按照年龄升/降序来显示
- 限制查询的个数：`db.集合名.find().limit(5)`：每次只查询5个
- 跳过多少条在查询：`db.集合名.find().skip(5)`：跳过5条再查询

# Mongoose包
- 用 node 链接 mongo 数据库并操作
- 下载与使用：`npm i mongoose`
## 连接数据库
```js
// 引入模块
const mongoose = require('mongoose')
// 利用 connect 方法链接数据库，有两个参数
// db_url 指定要连接的数据库路径，包含特有协议，服务器路径，数据库名
let db_url = 'mongodb://localhost/数据库名'
// obj 是权限信息，包括用户名，密码，用户数据库
let obj = {user: 'root', pass: '12345', authSource: 'admin'}
mongoose.connect(db_url, obj)
// 实践
mongoose.connect('mongodb://localhost/sadanya', {
  user: 'root',
  pass: '12345',
  authSource: 'admin',
  useUnifiedTopology: true, // 处理警告
  useNewUrlParser: true  // 处理警告
})
```
## connection常见事件
- 利用`mongoose.connection.on`绑定事件，有connected,error,disconnected等
```js
// 连接成功时
mongooose.connection.on('connected', () => console.log('succeed'))
// 连接失败时
mongooose.connection.on('error', (err) => console.log(err))
// 断开连接时
mongooose.connection.on('disconnected', () => console.log('disconnnected'))
```
## mongoose 中的异步

- connect 方法返回异步的 promise 对象, 可以用 then 与 catch 来判断是否连接成功
- disconnect 方法同上

```js
mongoose.disconnect().then(() => console.log("succeed")).catch((err) => console.log(err))
```

## 定义schema与model
- schema：映射 MongoDB 中的集合，并定义集合中文档的结构
- model：由 schema 生成的模型，负责查询，修改，删除文档
- MongoDB 数据类型：String, Number, Date, Boolean, Array, ObjectId, Buffer, Mixed, Decimal128, map
```js
// 利用 mongoose.Schema 类创建 shcema 实例
// 可以直接传一个对象，定义字段和字段类型
let testSchema = new mongoose.Schema({
  name: String,
  age: Number,
  score: Number
})
// 利用 mongoose.model() 方法创建一个 model 类
// 第一个参数是集合名，表示要操作的集合
// 第二个参数是 Schema
let Test = mongoose.model(集合名, testSchema)
```
## 创建文档document
- model 的实例即文档，并用 save 方法保存到数据库中
```js
// 创建 Student 模型
let Student = mongoose.model('students', sadanyaSchema)
// 创建一个学生实例，用 save() 方法
// save() 方法是异步方法
new Student({
  name: '李四',
  age: 22,
  sex: '女'
}).save((err, doc) => {})
```
## 文档的删改
- 修改文档
```js
// 通过 _id 来查找文档并修改
Model.findByIdAndUpdate(id[,update][,options][,callback])
// 通过条件来查询并修改
Model.updateOne(conditions,update[,options][,callback])
```
- 删除文档
```js
// 通过 _id 查找并删除
Model.findByIdAndRemove(id[,callback])
// 通过条件查找并删除
Model.findOneAndRemove(conditions[,callback])
// 删除所有
Model.remove(conditions[,callback])
```
## 文档的查询
```js
// 通过 _id 查询
Model.findById(id[,field][,opitons][,callback])
// 通过条件查询
Model.find(conditions[,field][,opitons][,callback])
// 查询满足条件的数量
Model.count(conditions[,callback])
```
- 链式操作，查询可以用链式来查询
```js
// find 是指定条件
// exec 是执行
Model.find(conditions).exec()
```
- 实现分页查询
```js
Model.find(conditions).sort().skip().limit().exec()
```