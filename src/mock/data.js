import Mock from 'mockjs';

// 使用Mock.mock方法模拟数据
Mock.mock('/users', 'get', {
  'users|5-10': [{
    'id|+1': 1,
    'name': '@name', // 随机生成姓名
    'age|18-32': 25, // 随机生成年龄
  }]
});