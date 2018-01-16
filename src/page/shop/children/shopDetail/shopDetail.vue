<template>
  <div class="rating-page">
    <head-bar headTitle="商家详情" :goBack="true"></head-bar>
    <section class="activities-wrapper" v-if="shopDetail.name">
      <header>活动与属性</header>
      <ul class="activities-ul">
        <li v-for="item in shopDetail.activities" :key="item.id">
          <span :style="{backgroundColor: '#' + item.icon_color}">{{item.icon_name}}</span>
          <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
      <ul class="activities-ul">
        <li v-for="item in shopDetail.supports" :key="item.id">
          <span :style="{backgroundColor: '#' + item.icon_color}">{{item.icon_name}}</span>
          <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
    </section>
    <section class="shop-status-wrapper">
      <router-link to="/shop/shopDetail/shopSafe" class="shop-status-header">
        <span class="shop-detail-title">食品监督安全公示</span>
        <div>
          <span class="identification-detail">企业认证详情</span>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
            <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
          </svg>
        </div>
      </router-link>
      <section class="shop-status-detail">
        <div>
          <svg class="shop-status" v-if="shopDetail.status === 1">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well"></use>
          </svg>
          <svg class="res-well" v-else>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad"></use>
          </svg>
        </div>
        <div class="check-date">
          <p>
            <span>监督检查结果: </span>
            <span class="shop-status-well" v-if="shopDetail.status === 1">良好</span>
            <span class="shop-status-bad" v-else>差</span>
          </p>
          <p>
            <span>检查日期: </span>
            <span>{{shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0]}}</span>
          </p>
        </div>
      </section>
    </section>
    <section class="shop-status-info">
      <header>商家信息</header>
      <p>{{shopDetail.name}}</p>
      <p>地址: {{shopDetail.address}}</p>
      <p>营业时间: [{{shopDetail.opening_hours[0]}}]</p>
      <p>
        <span>营业执照</span>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description-arrow" >
          <path d="M0 0 L8 7 L0 14" stroke="#bbb" stroke-width="1.5" fill="none"/>
        </svg>
      </p>
      <p @click="showlicenseImg(shopDetail.license.catering_service_license_image
)">
        <span>餐饮服务许可证</span>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
            <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
          </svg>
      </p>
    </section>
    <transition name="fade">
      <section class="license-wrapper" v-if="showlicenseImg" @click="showlicenseImg = false">
        <img :src="imgBaseUrl + licenseImg">
      </section>
    </transition>
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import headBar from '../../../../components/header/head'
  import {mapState} from 'vuex'
  // 取自 state 的数据 在刷新后不会留存, 所以页面刷新会直接废掉, 需要回到上级
  import {imgBaseUrl} from '../../../../config/env'
  // import {getStore} from '../../../../config/utils'

  export default {
    data() {
      return {
        imgBaseUrl,
        licenseImg: null,
        showlicenseImg: false
        // shopDetail: {}
      }
    },
    props: {
      // shopDetail: {
      //   type: Object,
      //   default: function() {
      //     return {}
      //   }
      // }
    },
    mounted() {
    //   this.shopDetail = getStore('shopDetail')
      console.log(this.shopDetail)
    },
    components: {
      headBar
    },
    computed: {
      ...mapState([
        'shopDetail'
      ])
    },
    methods: {
      showlicenseImg(img) {
        this.licenseImg = img
        this.showlicenseImg = true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../../common/stylus/mixin.styl'

  .rating-page
    // 刚开始设置了 z-index 热加载可能出现元素还是被覆盖的情况
    // 重新 npm run dev 在网页上重新打开项目即可
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    padding-top: 1.95rem
    background-color: #ebebeb
    z-index: 18
    .activities-wrapper
      background-color: #fff
      margin: 0.4rem 0
      padding-bottom: 0.6rem
      header
        font(0.75rem, #333)
        line-height: 1.8rem
        padding-left: 0.6rem
        border-bottom: 1px solid #f1f1f1
        margin-bottom: 0.3rem
      .activities-ul
        padding: 0 0.6rem
        li
          margin-bottom: 0.2rem
          span:nth-of-type(1)
            font(0.45rem, #fff)
            padding: 0.1rem 0.15rem
            border: 1px
            border-radius: 0.1rem
            margin-right: 0.2rem
          span:nth-of-type(2)
            font(0.55rem, #666)
    .shop-status-wrapper
      background-color: #fff
      margin-bottom: 0.4rem
      .shop-status-header
        display: flex
        justify-content: space-between
        align-items: center
        line-height: 1.8rem
        padding: 0.6rem 0.6rem 0.2rem
        border-bottom: 0.025rem solid #f1f1f1
        .shop-detail-title
          font(0.75rem, #333)
        .identification-detail
          font(0.7rem, #bbb)
          vertical-align: middle
        svg
          wh(0.6rem, 0.6rem)
          vertical-align: middle
      .shop-status-detail
        display: flex
        padding: 0.2rem 0.6rem 0.6rem
        svg
          wh(2rem, 2rem)
          margin-right: 0.6rem
        // .shop-status
        // .res-well
        .check-date
          span
            font(0.55rem, #666)
          .shop-status-well
            color: rgb(126, 211, 33)
          .shop-status-bad
            color: red
    .shop-status-info
      background-color: #fff
      margin-bottom: 0.4rem
      header
        line-height: 1.8rem
        padding: 0 0.6rem
        font(0.75rem, #333)
        border-bottom: 0.025rem solid #f1f1f1
      p
        font(0.6rem, #666)
        padding: 0.7rem 0.6rem 0.7rem 0
        margin-left: 0.6rem
        border-bottom: 0.025 solid #f5f5f5
        span
          color: #666
      p:nth-of-type(4), p:nth-of-type(5)
        display: flex
        justify-content: space-between
    .license-wrapper
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: rgba(0,0,0,0.5)
      z-index: 101
      img
        width: 100%
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)

  // fade
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  // router-slide
  .router-slide-enter-active, .router-slide-leave-active {
    transition: all 0.4s
  }
  .router-slide-enter, .router-slide-leave-active {
    transform: translate3d(2rem, 0, 0)
    opacity: 0
  }
</style>