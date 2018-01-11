<template>
  <div class="shoplist-wrapper">
    <ul v-if="shopListArr.length">
      <li class="shop-list" v-for="item in shopListArr" :key="item.id">
        <section>
          <img :src="imgBaseUrl + item.image_path" class="shop-img">
        </section>
        <hgroup class="shop-right">
          <header class="shop-detail-header">
            <h4 class="shop-title">elli{{item.name}}</h4>
            <ul class="shop-detail-wrapper">
              <li class="supports" v-for="item in item.supports" :key="item.id">{{item.icon_name}}</li>
            </ul>
          </header>
          <h5 class="rating-order-num">
            <section class="rating-section"></section>
            <section class="order-section">月售{{item.recent_order_num}}单</section>
            <section class="rating-order-num-right">
              <span class="delivery-style delivery-left"></span>
              <span class="delivery-style delivery-right">准时达</span>
            </section>
          </h5>
          <h5 class="fee-distance">
            <p class="fee">¥{{item.float_minimum_order_amount}}起送<span class="segmentation"></span>{{item.piecewise_agent_fee.tips}}</p>
            <p class="distance-time">
              <span>
                <span class="segmentation">/</span>
              </span>
              <span class="segmentation">/</span>
              <span class="order-time">{{item.order_lead_time}}</span>
            </p>
          </h5>
        </hgroup>
      </li>
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
</style>