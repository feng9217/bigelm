<template>
  <div>
    <section class="shop-container" v-if="hasGetData">
      <nav class="goback" @click="goback">
        <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
        </svg>
      </nav>
      <header class="shop-detail-header">
        <img :src="imgBaseUrl + shopDetailInfo.image_path
" class="header-bgimg">
        <section class="descript-header">
          <router-link to="/shop/shopDetail" class="descript-top">
            <section class="descript-left">
              <img :src="imgBaseUrl + shopDetailInfo.image_path">
            </section>
            <section class="descript-right">
              <h4 class="descript-title">{{shopDetailInfo.name}}</h4>
              <p class="descript-text">商家配送 / {{shopDetailInfo.order_lead_time}}分钟到达 / 配送费¥{{shopDetailInfo.float_delivery_fee}}</p>
              <p class="descript-promotion">公告: {{promotionInfo}}</p>
            </section>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description-arrow" >
              <path d="M0 0 L8 7 L0 14"   stroke="#fff" stroke-width="1" fill="none"/>
            </svg>
          </router-link>
          <footer class="descript-bottom" v-if="shopDetailInfo.activities.length" @click="showActivitiesFun">
            <p class="dian">
              <span class="tip-icon" :style="{backgroundColor: '#' + shopDetailInfo.activities[0].icon_color, borderColor: '#' + shopDetailInfo.activities[0].icon_color}">{{shopDetailInfo.activities[0].icon_name}}</span></span>{{shopDetailInfo.activities[0].description}} (APP专享)</span>
            </p>
            <p>{{shopDetailInfo.activities.length}}个活动</p>
            <svg class="footer-arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
            </svg>
          </footer>
        </section>
      </header>
      <transition name="fade">
        <section class="activities-details" v-if="showActivities">
          <h2 class="activities-shoptitle">{{shopDetailInfo.name}}</h2>
          <h3 class="activities-ratingstar">星评区块</h3>
          <section class="activities-list">
            <header class="activities-title-style"><span>优惠信息</span></header>
            <ul>
              <li v-for="item in shopDetailInfo.activities" :key="item.id">
                <span class="activities-icon" :style="{backgroundColor: '#' + shopDetailInfo.activities[0].icon_color, borderColor: '#' + shopDetailInfo.activities[0].icon_color}">{{item.icon_name}}</span>
                <span>{{item.description}} (APP专享)</span>
              </li>
            </ul>
          </section>
          <section class="activities-shopinfo">
            <header class="activities-title-style"><span>商家公告</span></header>
            <p>{{promotionInfo}}</p>
          </section>
          <svg width="60" height="60" class="close-activities" @click.stop="showActivitiesFun">
            <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
            <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
            <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
          </svg>
        </section>
      </transition>
      <section class="change-show-type" ref="chooseType">
        <div @click="changeShowType = 'food'">
          <span :class="{'activity-show': changeShowType === 'food'}">商品</span>
        </div>
        <div @click="changeShowType = 'rating'">
          <span :class="{'activity-show': changeShowType === 'rating'}">评价</span>
        </div>
      </section>
      <transition name="fade-choose">
       <!-- v-show="changeShowType === 'food'" -->
        <section class="food-wrapper">
          <section class="menu-wrapper">
            <section class="menu-left" ref="menuWrapper">
              <ul>
                <li class="menu-left-list" v-for="(item, index) in foodMenu" :key="index" :class="{'activity-menu': index === menuIndex}" @click="chooseMenu(index)">
                  <img v-if="item.icon_url" :src="getImgPath(item.icon_url)">
                  <span>{{item.name}}</span>
                  <span class="category-num" v-if="categoryNum[index] && item.type === 1">{{categoryNum[index]}}</span>
                </li>
              </ul>
            </section>
            <section class="menu-right" ref="menuFoodList">
              <ul>
                <li v-for="(item, index) in foodMenu" :key="index">
                  <header class="menu-detail-header">
                    <section class="menu-detail-header-left">
                      <strong class="menu-item-title">{{item.name}}</strong>
                      <span class="menu-item-description">{{item.description}}</span>
                    </section>
                    <span class="menu-detail-header-right" @click="showTitleDetail(index)"></span>
                    <p class="description-tip" v-if="index === TitleDetailIndex">
                      <span>{{item.name}}</span>{{item.description}}
                    </p>
                  </header>
                  <section class="menu-detail-list" v-for="(foods, foodindex) in item.foods">
                    <router-link :to="{path: '/shop/foodDetail', query: {image_path: foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" class="menu-detail-link">
                      <section class="menu-food-img">
                        <img :src="imgBaseUrl + foods.image_path">
                      </section>
                      <section class="menu-food-description">
                        <h3 class="food-description-head">
                          <strong class="description-foodname">{{foods.name}}</strong>
                          <ul v-if="foods.attributes.length" class="attributes-ul">
                            <li v-for="(attribute, foodindex) in foods.attributes" :key="foodindex" :style="{color: '#' + attribute.icon_color, borderColor: '#' + attribute.icon_color}" :class="{'attribute-new': attribute.icon_name === '新'}">
                              <p :style="{color: attribute.icon_name === '新' ? '#fff' : '#' +attribute.icon_color}">{{attribute.icon_name === '新' ? '新品' : attribute.icon_name}}</p>
                            </li>
                          </ul>
                        </h3>
                        <p class="food-description-content">{{foods.description}}</p>
                        <p class="food-description-rating">
                          <span>月售{{foods.month_sales}}份</span>
                          <span>好评率{{foods.satisfy_rate}}%</span>
                        </p>
                        <p class="food-activity" v-if="foods.activity">
                          <span :style="{color: '#' + foods.activity.image_text_color, borderColor: '#' + foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                        </p>
                      </section>
                    </router-link>
                    <footer class="menu-detail-footer">
                      <section class="food-price">
                        <span>¥</span>
                        <span>{{foods.specfoods[0].price}}</span>
                        <span v-if="foods.specifications.length">起</span>
                      </section>
                      <div>购物车组件</div>
                    </footer>
                  </section>
                </li>
              </ul>
            </section>
          </section>
          <section class="buy-cart-wrapper">
            <section class="cart-icon-num">
              <div class="cart-icon-wrapper">
                <span class="cart-list-length" v-if="totalNum">{{totalNum}}</span>
                <svg class="cart-icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                </svg>
              </div>
              <div class="cart-num">
                <div>¥{{totalPrice}}</div>
                <div>配送费¥{{deliveryFee}}</div>
              </div>
            </section>
            <section class="gotopay" :class="{'gotopay-activity': minimumOrderAmount <= 0}">
              <span class="gotopay-button" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
              <router-link :to="{path: 'confirmOrder', query: {geohash, shopId}}" class="gotopay-button" v-else>去结算</router-link>
            </section>
          </section>
        </section>
      </transition>
    </section>
    <transition name="router-slide" mode="out-in">
      <!-- 没有 router-view 页面中的 router-link都只会跳转 不会渲染 -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import {msiteAddress, shopDetails, foodMenu, getRatingList, ratingScores} from '../../api/api'
  import {mapState, mapMutations} from 'vuex'
  import {imgBaseUrl} from '../../config/env'
  import {setStore} from '../../config/utils'

  export default {
    data() {
      return {
        geohash: '', // 位置经纬信息
        shopId: null, // 店铺id
        shopDetailInfo: null, // 商铺详情
        imgBaseUrl, // 你懂的
        hasGetData: false, // 获取数据flag
        showActivities: false, // 展示商铺详情flag
        changeShowType: 'food', // 切换显示内容 'food' or 'rating'
        foodMenu: [], // 食品列表
        ratingList: [], // 评价列表
        ratingOffset: 0, // 评价获取offset值
        ratingScoresData: null, // 评价分数
        categoryNum: [], // 商品类型右上角已加入购物车的数量
        menuIndex: 0, // 选择的菜单分类
        menuIndexChange: false, // flag 控制listenScroll
        TitleDetailIndex: null, // 点击展示列表头部详细
        cartFoodList: [], // 购物车商品列表
        totalPrice: 0 // 总共价格
      }
    },
    created() {
      this.geohash = this.$route.query.geohash
      this.shopId = this.$route.query.id
      // console.log(this.geohash, this.shopId)
    },
    mounted() {
      this.initData()
    },
    computed: {
      ...mapState([
        'latitude', 'longitude'
      ]),
      promotionInfo() {
        return this.shopDetailInfo.promotion_info || '商户公告没信息噢 我是字数补丁'
      },
      totalNum() {
        let num = 0
        this.cartFoodList.forEach((item) => {
          num += item.num
        })
        return num
      },
      // 配送费
      deliveryFee() {
        if (this.shopDetailInfo) {
          return this.shopDetailInfo.float_delivery_fee
        } else {
          return null
        }
      },
      minimumOrderAmount() {
        if (this.shopDetailInfo) {
          return this.shopDetailInfo.float_minimum_order_amount - this.totalPrice
        } else {
          return null
        }
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS', 'RECORD_SHOPDETAIL'
      ]),
      async initData() {
        if (!this.latitude) {
          let res = await msiteAddress(this.geohash)
          console.log(res.data)
          this.RECORD_ADDRESS(res.data)
        }
        // console.log(this.latitude, this.longitude)
        // 获取商铺信息
        let res = await shopDetails(this.shopId)
        // console.log(info)
        this.shopDetailInfo = res.data
        console.log(this.shopDetailInfo, 1)
        // 获取商铺食品列表
        let menu = await foodMenu(this.shopId)
        this.foodMenu = menu.data
        console.log(this.foodMenu, 2)
        // 评论列表
        let list = await getRatingList(this.shopId, this.ratingOffset)
        this.ratingList = list.data
        console.log(this.ratingList, 3)
        // 商铺评论详情
        let score = await ratingScores(this.shopId)
        this.ratingScoresData = score.data
        console.log(this.ratingScoresData, 4)
        // 评论 tag 列表
        this.RECORD_SHOPDETAIL(this.shopDetailInfo)
        setStore('shopDetail', this.shopDetailInfo)
        this.hasGetData = true
      },
      goback() {
        this.$router.go(-1)
      },
      getFoodListHeight() {
        // const listContainer = this.$refs.menuFoodList
      },
      showActivitiesFun() {
        this.showActivities = !this.showActivities
      },
      chooseMenu(index) {
        this.menuIndex = index
        this.menuIndexChange = false
      },
      showTitleDetail(index) {
        let timer = null
        clearTimeout(timer)
        if (this.TitleDetailIndex === index) {
          this.TitleDetailIndex = null
        } else {
          this.TitleDetailIndex = index
        }
        timer = setTimeout(() => {
          this.TitleDetailIndex = null
        }, 2000)
      },
      getImgPath(path) {
        let suffix
        if (!path) {
          return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
        }
        // console.log(path)
        if (path.indexOf('jpeg') !== -1) {
          suffix = '.jpeg'
        } else {
          suffix = '.png'
        }
        let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix
        // console.log(url)
        return 'https://fuss10.elemecdn.com' + url
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .shop-container
    display: flex
    flex-direction: column
    position: absolute
    left: 0
    right: 0
    height: 100%
    .goback
      position: fixed
      top: 0
      left: 0
      width: 2rem
      height: 2rem
      z-index: 12
      padding-top: 0.2rem
      padding-left: 0.2rem
    .shop-detail-header
      // 用内容撑开
      // height: 5rem
      overflow: hidden
      position: relative
      .header-bgimg
        width: 100%
        filter: blur(10px)
        position: absolute
        top: 0
        left: 0
        z-index: 9
      .descript-header
        position: relative
        z-index: 10
        background-color: rgba(119, 103, 137, 0.45)
        padding: 0.4rem 0 0.4rem 0.4rem
        width: 100%
        overflow: hidden
        .descript-top
          display: flex
          .descript-left
            margin-right: 0.3rem
            img
              wh(2.9rem, 2.9rem)
              display: block
              border-radius: 0.15rem
          .descript-right
            flex: 1
            .descript-title
              font(0.8rem, #fff)
              font-weight: bold
              width: 100%
              margin-bottom: 0.3rem
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
            .descript-text
              font(0.5rem, #fff)
              margin-bottom: 0.3rem
              margin-top: 0.5rem
            .descript-promotion
              font(0.5rem, #fff)
              width: 11.5rem
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              margin-top: 0.5rem
          .description-arrow
            position: absolute
            top: 50%
            transform: translateY(-50%)
            right: 0.5rem
            z-index: 11
            &::before
              content: ''
              position: absolute
              top: -10px
              left: -10px
              right: -10px
              bottom: -10px
        .descript-bottom
          display: flex
          justify-content: space-between
          margin-top: 0.5rem
          padding-right: 1rem
          p
            font(0.5rem, #fff)
            span
              color: #fff
            .tip-icon
              padding: 0.04rem
              border: 0.025rem solid #fff
              border-radius: 0.1rem
              font-size: 0.4rem
              display: inline-block
          &.dian
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            width: 80%
          p:nth-of-type(2)
            margin-right: 0.3rem
          .footer-arrow
            wh(0.45rem, 0.45rem)
            position: absolute
            right: 0.5rem
    .activities-details
      position: fixed
      top: 0
      left: 0
      bottom: 0
      right: 0
      background-color: #262626
      z-index: 200
      padding: 1.25rem
      .activities-shoptitle
        text-align: center
        font(0.8rem, #fff)
      .activities-ratingstar
        display: flex
        justify-content: center
        transform: scale(2.2)
        margin-top: 0.7rem
        color: #fff
      .activities-list
        margin-top: 1.5rem
        margin-bottom: 1rem
        font(0.5rem, #fff)
        li
          margin-bottom: 0.2rem
          margin-top: 0.2rem
          .activities-icon
            padding: 0 0.2rem
            display: inline-block
            border: 0.025rem solid #fff
            border-radius: 0.1rem
          span
            color: #fff
            line-height: 0.6rem
      .activities-shopinfo
        p
          line-height: 0.7rem
          font(0.5rem, #fff)
        .activities-title-style
          text-align: center
          margin-bottom: 1rem
          span
            font(0.6rem, #fff)
            border: 0.025rem solid #555
            padding: 0.2rem 0.4rem
            border-radius: 0.5rem
      .close-activities
        position: absolute
        bottom: 1rem
        // left + transform: 居中
        left: 50%
        transform: translateX(-50%)
    .change-show-type
      display: flex
      background-color: #fff
      padding: 0.3rem 0 0.6rem
      border-bottom: 1px solid #ebebeb
      div
        flex: 1
        text-align: center
        span
          font(0.65rem, #666)
          padding: 0.2rem 0.1rem
          border-bottom: 0.12rem solid #fff
          &.activity-show
            color: #3190e8
            border-color: #3190e8
    .food-wrapper
      display: flex
      flex: 1
      padding-bottom: 2rem
      .menu-wrapper
        display: flex
        flex: 1
        overflow-y: hidden
        position: relative
        .menu-left
          width: 3.8rem
          .menu-left-list
            padding: 0.7rem 0.3rem
            border-bottom: 0.025rem solid #ededed
            box-sizing: border-box
            border-left: 0.15rem solid #f8f8f8
            position: relative
            img
              wh(0.5rem, 0.6rem)
            span
              font(0.6rem, #666)
            .category-num
              position: absolute
              top: 0.1rem
              right: 0.1rem
              background-color: #ff461d
              line-height: 0.6rem
              text-align: center
              border-radius: 50%
              border: 0.025rem solid #ff461d
              min-width: 0.6rem
              height: 0.6rem
              font(0.5rem, #fff)
            &.activity-menu
              border-left: 0.15rem solid #3190e8
              background-color: #fff
              span:nth-of-type(1)
                font-weight: bold
        .menu-right
          flex: 1
          overflow-x: hidden
          overflow-y: auto
          .menu-detail-header
            width: 100%
            padding: 0.4rem
            display: flex
            // justify-content: space-between
            align-items: center
            position: relative
            .menu-detail-header-left
              width: 11rem
              white-space: nowrap
              overflow: hidden
              .menu-item-title
                font(0.7rem, #666)
                font-weight: bold
              .menu-item-description
                font(0.5rem, #999)
                width: 30%
                overflow: hidden
            .menu-detail-header-right
              wh(0.5rem, 1rem)
              display: block
              bg-image('../../images/icon_point.png')
              background-size: 100% 0.4rem
              background-position: left center
              position: absolute
              top: 50%
              transform: translateY(-40%)
              right: 1.2rem
            .description-tip
              background-color: #39373a
              opacity: 0.95
              font(0.5rem, #fff)
              position: absolute
              top: 1.5rem
              right: 0.5rem
              padding: 0.5rem 0.4rem
              border: 1px
              border-radius: 0.2rem
              span
                color: #fff
                line-height: 0.6rem
                font-size: 0.55rem
            .description-tip::after
              content: ''
              position: absolute
              wh(0.4rem, 0.4rem)
              background-color: #39373a
              top: 0.5rem
              right: 1.7rem
              transform: rotate(-45deg) translateY(0.41rem)
          .menu-detail-list
            background-color: #fff
            padding: 0.6rem 0.4rem
            border-bottom: 1px solid #c8c8c8
            .menu-detail-link
              display: flex
              .menu-food-img
                margin-right: 0.4rem
                img
                  display: block
                  wh(2rem, 2rem)
              .menu-food-description
                width: 100%
                .food-description-head
                  display: flex
                  justify-content: space-between
                  margin-bottom: 0.2rem
                  .description-foodname
                    font(0.7rem, #333)
                  .attributes-ul
                    display: flex
                    li
                      font-size: 0.3rem
                      height: 0.6rem
                      line-height: 0.35rem
                      padding: 0.1rem
                      p
                        white-space
                    .attribute-new
                      position: absolute
                      top: 0
                      left: 0
                      background-color: #4cd964
                      wh(0.2rem, 0.2rem)
                      display: flex
                      align-items: flex-end
                      transform: rotate(-45deg) translate(-0.1rem, -1.5rem)
                      border: none
                      border-radius: 0
                      p
                        font(0.4rem, #fff)
                        text-align: center
                        flex: 1
                .food-description-content
                  font(0.5rem, #999)
                  line-height: 0.6rem
                .food-description-rating
                  line-height: 0.8rem
                  span
                    font(0.5rem, #333)
                .food-activity
                  line-height: 0.4rem
                  span
                    font-size: 0.3rem
                    border: 1px solid currentColor
                    border-radius: 0.3rem
                    padding: 0.08rem
                    display: inline-block
                    transform: scale(0.8)
                    margin-left: -0.35rem
            .menu-detail-footer
              margin-left: 2.4rem
              font-size: 0
              margin-top: 0.3rem
              display: flex
              justify-content: space-between
              .food-price
                span
                  font-family: 'Helvetica Neue', Tahoma,Arial
                span:nth-of-type(1)
                  font(0.5rem, #f60)
                  margin-right: 0.05rem
                span:nth-of-type(2)
                  font(0.7rem, #f60)
                  font-weight: bold
                  margin-right: 0.3rem
                span:nth-of-type(3)
                  font(0.5rem, #666)
      .buy-cart-wrapper
        position: absolute
        background-color: #3d3d3f
        bottom: 0
        left: 0
        z-index: 13
        display: flex
        wh(100%, 2rem)
        .cart-icon-num
          flex: 1
          .cart-icon-wrapper
            display: flex
            background-color: #3d3d3f
            padding: 0.4rem
            border: 0.18rem solid #444
            border-radius: 50%
            position: absolute
            left: 0.5rem
            top: -0.7rem
            .cart-icon
              wh(1.2rem, 1.2rem)
            .cart-list-length
              position: absolute
              top: -0.25rem
              right: -0.25rem
              background: #ff461d
              line-height: 0.7rem
              text-align: center
              border: 0.025rem solid #ff461d
              border-radius: 50%
              min-width: 0.7rem
              height: 0.7rem
              font(0.5rem, #fff)
          .cart-num
            position: absolute
            top: 50%
            transform: translateY(-50%)
            left: 3.5rem
            div
              color: #fff
            div:nth-of-type(1)
              font-size: 0.8rem
              font-weight: bold
              margin-bottom: 0.2rem
            div:nth-of-type(2)
              font-size: 0.4rem
        .gotopay
          position: absolute
          right: 0
          background-color: #a1a1a9
          wh(5rem, 100%)
          text-align: center
          display: flex
          align-items: center
          justify-content: center
          .gotopay-button
            font(0.7rem, #fff)
            font-weight: bold
          &.gotopay-activity
            background-color: #4cd964

  // transition动画

  // fade
  .fade-enter-active, .fade-leave-active{
    transition: opacity 0.5s
  }
  .fade-enter, .fade-leave-active{
    opacity: 0
  }

  // fade-choose
  .fade-choose-enter-active, .fade-choose-leave-active{
    transition: opacity 0.5s
  }
  .fade-choose-leave, .fade-choose-leave-active {
        display: none;
    }
  .fade-choose-enter, .fade-choose-leave-active{
    opacity: 0
  }

  // router-slide
  .router-slide-enter-active, .router-slide-leave-active {
    transition: all .4s
  }
  .router-slide-enter, .router-slide-leave-active {
    transform: translate3d(2rem, 0, 0)
    opacity: 0
  }

  // 帧动画
  @keyframes move
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(0.8)
    }
    50% {
      transform: scale(1.1)
    }
    75% {
      transform: scale(0.9)
    }
    100% {
      transform: scale(1)
    }
</style>