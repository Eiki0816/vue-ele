<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menuDiv">
				<ul>
					<!-- current 代表当前的状态 -->
					<li class="menu-item" v-for="(good,index) in goods" :class="{current :currIndex == index}">
						<span class="text border-1px">
							<span v-if="good.type>=0" :class="classMap[good.type]" class="spc">满</span>{{good.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="menuFood">
				<ul >
					<li class="food-list food-list-hook" v-for="good in goods">
						<h1 class="title">{{ good.name}}</h1>
						<ul>
							<li class="food-item border-1px" v-for="food in good.foods">
								<div class="icon">
									<img :src="food.icon" width="57" height="57">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span>
										<span>好评率{{food.rating}}</span>
									</div>
									<div class="price">
										<span class="now">${{food.price}}</span>
										<span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										cartcontrol组件
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>


<script type="text/javascript">
import axios from 'axios'
import Bscroll from 'better-scroll'
	export default{
		data (){
			return {
				goods:[],
				classMap:["red","green","yellow","blue","orange"],
				scrollY:0,
				tops:[]
			}
		},
		mounted(){
			//ajax 请求获取goods 数据
			axios.get('/api2/goods')
				.then(response=>{
					const result = response.data
					console.log(result)
					if (result.code==0) {
						this.goods=result.data

						//创建scroll 对象
						this.$nextTick(()=>{
							this._initScroll() //初始化滚动条对象
							this._initTops()   //初始化top值
						})
						
					}
				})
		},
		methods:{

			_initScroll(){
              //创建左右对应的scroll 对应的列表
              new Bscroll(this.$refs.menuDiv)
              //创建右对应的scroll 对应的列表
              const foodScroller = new Bscroll(this.$refs.menuFood,{
              	 probeType :3  //标识分发scroll 事件 ----> 绑定的scroll事件才会调用
              })
              //监视foods列表的滚动
              foodScroller.on("scroll",(event)=>{
              	 //console.log(event.x,event.y)

              	 //Math.abs 获取绝对值
              	 this.scrollY=Math.abs(event.y)
              	 console.log(this.scrollY)
              })
			},
			_initTops(){
				//创建一个空数组
               // const  tops = [];
               // let top=0;
               // tops.push(top)
               // const lis = this.$refs.menuFood.getElementsByClassName("food-list-hook")
               // Array.prototype.slice.call(lis).forEach(li=>{
               // 		top+=li.clientHeight
               // 		tops.push(top)
               // })
               // //更新tops
               // this.tops = tops
               // console.log(tops+"------")
               const tops=[];
               let top = 0;
               tops.push(top);
               const lis= this.$refs.menuFood.getElementsByClassName("food-list-hook");
               Array.prototype.slice.call(lis).forEach(li =>{
               	 top+=li.clientHeight;
               	 tops.push(top)
               })
               this.tops=tops
			}
		},
        computed:{
           currIndex(){
           	const {tops,scrollY} = this
            //findIndex() ==> 返回每个true的回调所对应的index
            //scrollY >= 当前top值&&scrollY <=下一个top值
            return tops.findIndex((top,index) =>{
              return scrollY >=top && scrollY <= tops[index+1]
            })

           }
        }
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .goods
    	display: flex
	    position: absolute
	    top: 191px
	    bottom: 46px;
	    width: 100%
    	overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7


	    .menu-wrapper 
	    	ul
	    		border-right 1px solid #ccc
	    		background #b3b3f124
	    		font-size 12px
	    		text-align center
	 
	    		& .menu-item
	    			border-bottom 1px solid #ccc
	    			line-height 54px

	    		.current
	    		 	background #fff	
	    .spc
	    	width 10px
	    	height 10px    


	    .red
	    	background red
	    	font-style normal
	    	

		.green
	    	background green
	    	font-style normal
	    	
		.yellow
	    	background yellow
	    	font-style normal
	    	

		.blue
	    	background blue
	    	font-style normal
	    	
		.orange
			background orange
			font-style nomal

		.foods-wrapper
      		flex: 1

	       .title
		        padding-left: 14px
		        height: 26px
		        line-height: 26px
		        border-left: 2px solid #d9dde1
		        font-size: 12px
		        color: rgb(147, 153, 159)
		        background: #f3f5f7
		        margin: 0

		    .food-item
		        display: flex
		        margin: 18px
		        padding-bottom: 18px
		        border-bottom 1px solid #ccc

		        &:last-child
		          border-none()
		          margin-bottom: 0

		        .icon
		          flex: 0 0 57px
		          margin-right: 10px
		        .content
          			flex: 1
          			position: relative
          		.name
		            margin: 2px 0 8px 0
		            height: 14px
		            line-height: 14px
		            font-size: 14px
		            color: rgb(7, 17, 27)
		        .desc, .extra
		            line-height: 10px
		            font-size: 10px
		            color: rgb(147, 153, 159)
		        .desc
		            line-height: 12px
		            margin-bottom: 8px
    				
    			.extra
		            .count
		              margin-right: 12px
		        
		        .price
		            font-weight: 700
		            line-height: 24px
		            .now
              			margin-right: 8px
              			font-size: 14px
              			color: rgb(240, 20, 20)
              		.old
			              text-decoration: line-through
			              font-size: 10px
			              color: rgb(147, 153, 159)
			        .cartcontrol-wrapper
			            position: absolute
			            right: 0
			            bottom: 1px
			            font-size 12px
        
				


      
	

  
  

    

	
			 
        
</style>