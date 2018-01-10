<template>
  <div>
    <head-bar signinUp="msite">
      <router-link :to="'/search/geohash'" class="link-search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite-title">
        <span class="title-text">{{msiteTitle}}</span>
      </router-link>
    </head-bar>
    <nav class="msite-nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide foodtypes-wrapper" v-for="(item,index) in foodTypes" :key="index">
            <router-link class="link-to-food" v-for="footItem in item" :key="foodItem.id" :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../images/31721477_1481118336126.gif" height="44" width="76" class="fl-back animation-opacity" v-else>
    </nav>
    <div class="shop-list-wrapper">
      <header class="shop-header">
        <svg class="shop-icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop-header-title">附近商家</span>
      </header>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script type="text/javascript">
  import {mapMutations} from 'vuex'
  import headBar from '../../components/header/head'
  import footGuide from '../../components/footer/footGuide'
  import {getCityType, msiteAddress, msiteFoodType} from '../../api/api'
  // import swiper from 'vue-awesome-swiper'
  // import 'swiper/dist/css/swiper.css'

  // Vue.use(swiper)

  export default {
    data() {
      return {
        geohash: '',
        msiteTitle: '请选择地址...',
        foodTypes: [],
        hasGetData: false,
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    created() {
    },
    mounted() {
      this.getbasicData()
      this.getFoodType()
    },
    components: {
      headBar,
      footGuide
    },
    methods: {
      ...mapMutations([
        'SAVE_GEOHASH',
        'RECORD_ADDRESS'
      ]),
      // 解码URL地址 返回去掉restaurant_category_id的值
      getCategoryId(url) {
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''))
        if (/restaurant_category_id/gi.test(urlData)) {
          return JSON.parse(urlData).restaurant_category_id.id
        } else {
          return ''
        }
      },
      getbasicData() {
        let address = null
        // 传过来的地址 没经纬就自己拼接 有就直接获取
        if (!this.$route.query.geohash) {
          getCityType('guess').then((res) => {
            address = res
          })
          console.log(address)
          this.geohash = address.data.latitude + ',' + address.data.longtitude
        } else {
          this.geohash = this.$route.query.geohash
        }
        // 将 geohash 存到 vuex 中
        console.log(this.geohash)
        this.SAVE_GEOHASH(this.geohash)
        msiteAddress(this.geohash).then((res) => {
          console.log(res, 333)
          this.msiteTitle = res.data.name
          console.log(this.msiteTitle, 444)
          this.RECORD_ADDRESS(res.data)
          // 标志位
          this.hasGetData = true
          console.log(this.hasGetData, 111001111)
        })
        // console.log(this.hasGetData)
      },
      getFoodType() {
        msiteFoodType(this.geohash).then((res) => {
          // console.log(res)
          let resLength = res.data.length
          let resArr = [...res.data]
          // console.log(resArr)
          let foodArr = []
          // 分两页做slider 每页8个内容
          for (let i = 0, j = 0; i < resLength; i += 8, j++) {
            foodArr[j] = resArr.splice(0, 8)
            // console.log(foodArr[j])
          }
          console.log(this.foodTypes.length, 555)
          this.foodTypes = foodArr
          console.log(this.foodTypes, 666)
        }).then(() => {
          // let swiperslider = new swiper()
          // console.log(swiperslider)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .link-search
    position: absolute
    top: 50%
    left: 0.8rem
    transform: translateY(-50%)
    wh(0.9rem, 0.9rem)
  .msite-title
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    width: 50%
    color: #fff
    text-align: center
    margin-left: -0.5rem
    .title-text
      font(0.8rem, #fff)
      text-align: center
      // display: block
  .msite-nav
    // position: absolute
    // top: 50%
    // left: 50%
    // transform: translate(-50%, -50%)
    padding-top: 2.1rem
    background-color: #fff
    border-bottom: 0.025rem solid $bgc
    .swiper-container
      wh(100%, auto)
      padding-bottom: 0.6rem
      .swiper-wrapper
        .foodtypes-wrapper
          display: flex
          flex-wrap: wrap
          .link-to-food
            width: 25%
            padding: 0.3rem 0rem
            display: flex
            justify-content: center
            figure
              img
                margin-bottom: 0.3rem
                wh(1.8rem, 1.8rem)
              figcaption
                text-align: center
                font(0.55rem, #666)
      .swiper-pagination
        bottom: 0.2rem
    .fl-back
      wh(100%, 100%)
    .animation-opacity
      animation: backOpacity 4s ease-in-out infinite
  .shop-list-wrapper
    margin-top: 0.4rem
    border-top: 0.025rem solid #bgc
    background-color: #ddd
    .shop-header
      .shop-icon
        fill: #999
        margin-left: 0.6rem
        vertical-align: middle
        wh(0.6rem, 0.6rem)
      .shop-header-title
        color: #999
        font-size: 0.55rem
        line-height: 1.6rem

  @keyframes backOpacity
    0%
      opacity: 1
    25%
      opacity: .8
    50%
      opacity: 1
    75%
      opacity: .8
    100%
      opacity: 1
</style>