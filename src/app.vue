<template>
  <div id="app">
    
    <ele-header :seller="seller"></ele-header>
  
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
        <router-link to="/ratings">评价</router-link>
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller = "seller"></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import header from "./components/header/head"

export default  {
  
  data (){
    return {
      seller:{}
    }
  },
  mounted () {  
   axios.get('/api2/seller')
    .then(response => {
      const result= response.data
      console.log('axios result',result)

      //更新 
      if(result.code ==0){
        this.seller = result.data
      }
      
    })

  },
  components : {
    "ele-header" :header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body 
    margin 0
  a 
    text-decoration none
    color #000
  .tab 
    border-bottom 1px solid #ddd
    line-height 30px
  .tab-item
    display flex

  .tab-item a
    flex 1
    -webkit-flex 1
    text-align center
    color #ccc
   .tab
     .tab-item
       .router-link-active
          color red
  
  ul
    padding-left 0
    margin 0
  ul
    li
      list-style none
      margin-top 0
    
  
</style>
