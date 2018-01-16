<template>
  <div class="rating-page">
    <head-bar :headTitle="name" :goBack="true"></head-bar>
    <section class="header-img">
      <img :src="imgBaseUrl + image_path" class="food-img">
      <div class="cover"></div>
    </section>
    <p class="description">{{description}}</p>
    <section class="detail-wrapper">
      <section class="detail-left">
        <p>{{name}}</p>
        <div class="rating-sale">
          <span>评分</span>
          <p>评分区块</p>
          <span>{{rating.toFixed(1)}}</span>
        </div>
        <p>
          <span>月售 {{month_sales}}单</span>
          <span>售价 ¥{{foods.specfoods[0].price}}</span>
          <span v-if="foods.specfoods.length">起</span>
        </p>
        <p>
          <span>评论数 {{rating_count}}</span>
          <span>好评率 {{satisfy_rate}}</span>
        </p>
      </section>
    </section>
  </div>
</template>

<script type="text/javascript">
  import headBar from '../../../../components/header/head'
  import {imgBaseUrl} from '../../../../config/env'

  export default {
    data() {
      return {
        image_path: null,
        description: null,
        month_sales: null,
        name: null,
        rating: null,
        rating_count: null,
        satisfy_rate: null,
        foods: null,
        shopId: null,
        imgBaseUrl
      }
    },
    components: {
      headBar
    },
    created() {
      this.image_path = this.$route.query.image_path
      this.description = this.$route.query.description
      this.month_sales = this.$route.query.month_sales
      this.name = this.$route.query.name
      this.rating = this.$route.query.rating
      this.rating_count = this.$route.query.rating_count
      this.satisfy_rate = this.$route.query.satisfy_rate
      this.foods = this.$route.query.foods
      this.shopId = this.$route.query.shopId
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../../common/stylus/mixin.styl'

  .rating-page
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: #fff
    z-index: 12
    padding-top: 1.95rem
    p, span
      font-family: Helvetica Neue,Tahoma,Arial;
    .header-img
      position: relative
      .food-img
        width: 100%
        display: block
      .cover
        wh(100%, 100%)
        position: absolute
        top: 0
        left: 0
    .description
      margin-top: 0.5rem
      padding: 0 0.5rem
      line-height: 0.8rem
      padding-bottom: 0.2rem
      font(0.6rem, #666)
    .detail-wrapper
      padding: 0.5rem
      display: flex
      justify-content: space-between
      align-items: center
      .detail-left
        p:nth-of-type(1)
          font(0.7rem, #333)
          margin-bottom: 0.2rem
        .rating-sale
          display: flex
          align-items: center
          span:nth-of-type(1)
            font(0.6rem, #666)
            margin-right: 0.2rem
          span:nth-of-type(2)
            font(0.55rem, #f60)
            margin-left: 0.2rem
          span:nth-of-type(3)
            font(0.6rem, #666)
            margin-left: 0.4rem
        p:nth-of-type(2)
          font-size: 0
          margin-top: 0.3rem
          span:nth-of-type(1)
            font(0.6rem, #666)
            margin-right: 0.4rem
          span:nth-of-type(2), span:nth-of-type(3)
            font(0.6rem, #f60)
            margin-right: 0.2rem
        p:nth-of-type(3)
          span
            font(0.6rem, #666)

</style>