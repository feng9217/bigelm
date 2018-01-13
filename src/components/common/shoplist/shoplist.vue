<template>
  <div class="shoplist-wrapper">
    <ul v-if="shopListArr.length">
      <router-link tag="li" class="shop-list" v-for="item in shopListArr" :key="item.id" :to="{path: 'shop', query: {geohash, id: item.id}}">
        <section>
          <img :src="imgBaseUrl + item.image_path" class="shop-img">
        </section>
        <hgroup class="shop-right">
          <header class="shop-detail-header">
            <h4 class="shop-title" :class="item.is_premium ? 'premium' : ''">{{item.name}}</h4>
            <ul class="shop-detail-wrapper">
              <li class="supports" v-for="item in item.supports" :key="item.id">{{item.icon_name}}</li>
            </ul>
          </header>
          <h5 class="rating-order-num">
            <section class="rating-section">星评区块</section>
            <section class="order-section">月售{{item.recent_order_num}}单</section>
            <section class="rating-order-num-right">
              <span class="delivery-style delivery-left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
              <span class="delivery-style delivery-right" v-if="zhunshi(item.supports)">准时达</span>
            </section>
          </h5>
          <h5 class="fee-distance">
            <p class="fee">¥{{item.float_minimum_order_amount}}起送<span class="segmentation">/</span>{{item.piecewise_agent_fee.tips}}</p>
            <p class="distance-time">
              <span v-if="Number(item.distance)">{{item.distance > 1000 ? (item.distance/1000).toFixed(2) + 'km' : item.distance + 'm'}}
                <span class="segmentation">/</span>
              </span>
              <span v-else>{{item.distance}}</span>
              <span class="segmentation">/</span>
              <span class="order-time">{{item.order_lead_time}}</span>
            </p>
          </h5>
        </hgroup>
      </router-link>
    </ul>
  </div>
</template>

<script type="text/javascript">
  // import {mapState} from 'vuex'
  import {imgBaseUrl} from '../../../config/env'
  import {getShoplist} from '../../../api/api'

  export default {
    data() {
      return {
        shopListArr: [],
        imgBaseUrl
      }
    },
    props: {
      geohash: {
        type: String
      },
      latitude: {
        type: String
      },
      longitude: {
        type: String
      }
    },
    mounted() {
      this.initData()
    },
    computed: {
      // ...mapState([
      //   'latitude',
      //   'longitude'
      // ])
    },
    methods: {
      async initData() {
        // console.log(this.geohash)
        try {
          let res = await getShoplist(this.latitude, this.longitude)
          // console.log(res)
          this.shopListArr = [...res.data]
          console.log(this.shopListArr)
        } catch (e) {
          console.log(e)
        }
      },
      zhunshi(supports) {
        let zhunStatus
        if ((supports instanceof Array) && supports.length) {
          supports.forEach((item) => {
            if (item.icon_name === '准') {
              zhunStatus = true
            }
          })
        } else {
          zhunStatus = false
        }
        return zhunStatus
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl'

  .shoplist-wrapper
    background-color: #fff
    margin-bottom: 2rem
    .shop-list
      display: flex
      border-bottom: 0.025rem solid #f1f1f1
      padding: 0.7rem 0.4rem
      .shop-img
        wh(2.7rem, 2.7rem)
        display: block
        margin-right: 0.4rem
      .shop-right
        flex: auto
        .shop-detail-header
          align-items: center
          display: flex
          justify-content: space-between
          .shop-title
            width: 8.5rem
            color: #333
            padding-top: 0.01rem
            font-weight: 700
            font-size: 0.65rem
            line-height: 0.65rem
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            &.premium::before
              content: '品牌'
              display: inline-block
              font-size: 0.5rem
              line-height: 0.6rem
              color: #333
              background-color: #ffd930
              padding: 0 0.1rem
              border-radius: 0.1rem
              margin-right: 0.2rem
          .shop-detail-wrapper
            display: flex
            transform: scale(0.8)
            margin-right: -0.3rem
            .supports
              font(0.5rem, #999)
              border: 0.025rem solid #f1f1f1
              padding: 0 0.04rem
              border-radius: 0.08rem
              margin-left: 0.05rem
      .rating-order-num
        display: flex
        justify-content: space-between
        height: 0.6rem
        margin-top: 0.52rem
        .rating-section
          display: flex
        .order-section
          transform: scale(0.8)
          margin-left: -0.2rem
          font(0.4rem, #666)
        .rating-order-num-right
          display: flex
          align-item: center
          transform: scale(0.7)
          min-width: 5rem
          justify-content: flex-end
          margin-right: -0.8rem
          font-size: 0
          .delivery-style
            font-size: 0.4rem
            padding: 0.04rem 0.08rem 0
            border: 1px
            border-radius: 0.08rem
            margin-left: 0.08rem
          .delivery-left
            color: #fff
            background-color: $color-blue
            border: 0.025rem solid $color-blue
          .delivery-right
            color: $color-blue
            border: 0.025rem solid $color-blue
      .fee-distance
        margin-top: 0.52rem
        font(0.5rem, #333)
        display: flex
        justify-content: space-between
        .fee
          transform: scale(0.9)
          font(0.5rem, #666)
          .segmentation
            color: #ccc
        .distance-time
          transform: scale(0.9)
          .segmentation
            color: #ccc
          .order-time
            color: $color-blue
</style>