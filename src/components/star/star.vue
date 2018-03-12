<template>
	<div class="start" :class="'star-'+size">
		<span class="start-item" v-for="sc in starClass" :class="sc"></span>
	</div>
</template>

<script type="text/javascript">
const CLASS_ON='on'
const CLASS_HALF='half'
const CLASS_OFF='off'
	// 分数与星星之间的关系
	// 0-5 颗星
	export default{
		 props:{
		    size:Number,
		    score:Number
		  },
		  computed:{
		  	starClass(){
		  		const scs = []
                //添加const CLASS_ON='on'
                //Math.floor() 方法 是向下取整
                const scoreInteger = Math.floor(this.score)
                for( var i=0;i<scoreInteger;i++){
                	scs.push(CLASS_ON)
                }
				//添加const CLASS_HALF='half'
				if (this.score-this.scoreInteger >=0.5) {
					scs.push(CLASS_HALF)
				}
				//添加const CLASS_OFF='off'
				while(scs.length<5){
					scs.push(CLASS_OFF)
				}
				
		  		return scs
		  	}
		  }
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.start-item
		display inline-block
		width 10px
		height 10px
		background gray
		margin-left 5px

	.on
		background darkgoldenrod 

	.half
		background gold
		width 5px
	.off
		bacground gray	
		with 0
</style>