<template>
	<div class="el-header">
		<div class="h-left">
			<img :src="seller.avatar">
		</div>
		<div class="h-right" >
			<p>{{seller.name}}</p>
			<span>{{seller.description}}/{{seller.deliveryTime}}分钟到达</span>
			<p v-if="seller.supports">
				<span><i :class="classMap[seller.supports[0].type]">满</i> {{seller.supports[1].description}}</span>
               <span @click="showDetail(true)">{{seller.supports.length}}个 <a > > </a></span>
			</p>
		</div>
		<p class="tips" @click="showDetail(true)"> 
			<i>公告</i>
			<span>{{seller.bulletin}}</span>
			<a> > </a>
		</p>
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper">
					<div class="detail-main">
						<div class="name">{{seller.name}}</div>
						<div class="start-wrapper">
							<star :score="seller.score" :size="48"></star>
						</div>
						<div class="title" >
				            <div class="line"></div>
				            <div class="text">优惠信息</div>
				            <div class="line"></div>
				        </div>
	                    <ul class="supports" v-if="seller.supports">
				            <li class="support" v-for="(support,index) in seller.supports" :key="index">
				              <span class="man" :class="classMap[support.type]"> ok </span>
				              <span class="text">{{support.description}}</span>
				            </li>
				        </ul>
	                    <div class="title">
				            <div class="line"></div>
				            <div class="text">商家公告</div>
				            <div class="line"></div>
				        </div>
				        <div class="content">
				            <p>{{seller.bulletin}}</p>
				        </div>

					</div>
					<div class="h-close" @click="showDetail(false)"> x </div>
				</div>
			</div>
		</transition>
		
	</div>
</template>

<script type="text/javascript">
	import star from "@/components/star/star.vue"
	export default{
		
        props:{
        	seller:Object
        },
        data (){
        	return {
                classMap:["red","green","yellow","blue","orange"],
                detailShow:false
        	}
        },
        methods:{
        	showDetail (isShow) {
        		this.detailShow=isShow
        	}
        },
        components:{
			star
		}
	}

</script>
<style lang="stylus" rel="stylesheet/stylus">
	.el-header 
	 		width 100%
	 		height 160px
	 		background pink
	 		position relative

	.h-left
	    	width 80px
	    	height 80px
	    	position absolute
	    	left 20px
	    	top 20px
	.h-left img
			display block
			width 100% 
			height 100%     	
	.h-right
			position absolute
			width 60%
			right 5%
			top 20px 
			color #000
			font-size 12px 
	 .red
	    	background red
	    	font-style normal
	    	color #fff

	    .green
		    	background green
		    	font-style normal
		    	color #fff
	    .yellow
		    	background yellow
		    	font-style normal
		    	color #fff

	    .blue
		    	background blue
		    	font-style normal
		    	color #fff
		.orange
				background orange
				font-style nomal
				color #fff		 
	.tips
			position absolute
			bottom 0	
			color #fff
			font-size 12px	
			width 100%
			background #000
			opacity 0.4
			overflow hidden
			white-space nowrap
			text-overflow ellipsis
			
	.tips span
	          display inline-block
	          width 86%
	.tips a 
	        color #fff
			         
	.tips i
			display inline-block
			padding 3px
			border 1px solid #ccc
			font-style normal
			border-radius 3px
	.detail
		width 100%
		height 100%
		position fixed
		background rgba(7,17,27,0.8)
		left 0
		top 0
		z-index 100
		overflow auto
		backrop-filter blur(10px)
		color #ccc
		text-align center
		&.fade-enter-active , &.fade-leave-active
			transtion opacity 1s

		&.fade-enter , &.fade-leave-to
			opacity 0
	.detail
	    	.detail-wrapper 
	    		width 80%
	    		margin 30px auto 0

	.detail    		
			.h-close 
		        	width 40px
		        	height 40px 
		        	border-radius 40px 
		        	border 1px solid #fff
		        	text-align center  
		        	font-size 20px
		        	line-height 40px 
		        	color #fff 
		        	position absolute 
		        	left 50%
		        	margin-left -20px
		        	bottom 10%
				
</style>