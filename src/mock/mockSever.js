// 使用mockjs 提供模拟接口

import  apiData from './data.json'
import Mock from 'mockjs'

Mock.mock('/api2/goods',{code:0,data:apiData.goods})
Mock.mock('/api2/ratings',{code:0,data:apiData.ratings})
Mock.mock('/api2/seller',{code:0,data:apiData.seller})
