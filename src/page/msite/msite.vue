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
        <swiper class="swiper-wrapper" ref="mySwiper" :options="swiperOption">
          <swiper-slide class="swiper-slide food-type-wrapper" v-for="(item, index) in foodTypes" :key="index">
            <div class="link-to-food" v-for="foodItem in item" :key="foodItem.id">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <img src="../../images/fl.svg" height="44" width="76" class="fl-back animation-opacity" v-else>
    </nav>
    <div class="shop-list-wrapper">
      <header class="shop-header">
        <svg class="shop-icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop-header-title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash" :latitude="latitude" :longitude="longitude"></shop-list>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script type="text/javascript">
  import {mapMutations} from 'vuex'
  import headBar from '../../components/header/head'
  import footGuide from '../../components/footer/footGuide'
  import shopList from '../../components/common/shoplist/shoplist'
  import {getCityType, msiteAddress, msiteFoodType} from '../../api/api'
  // import {imgBaseUrl} from '../../config/env'
  // import swiper from 'vue-awesome-swiper'
  // import 'swiper/dist/css/swiper.css'
  // Vue.use(swiper)
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  // 在main.js中引入了 swiper.css
  import 'swiper/dist/css/swiper.css'

  // 使用 vue-awesome-swiper 需要以下步骤:
  // 1.在main.js中导入并Vue.use(该插件)
  // 2.在要使用的组件中 引入{swiper, swiperSlide} 在组件中 swiper标签包裹整个swiper, swiperSlide包裹滑动的部分, 还有一个pagination没显示出来 and I don't know why
  // 3. 需要在 <swiper>中传入 :options 配置信息, autoplay设为true才会自动轮播, 设3000动都不动也是个迷
  // 4. 还有 传说中需要 npm install less-loader 才会正确加载样式 但目前对我的使用并没有产生什么变化 ???
  // 5. 解决了 回退到了 2.5.4的版本 autoplay: 5000, pagination 都解决了 之前是 3.1.0 fvck!!!
  // 6. 特别重要的一点 swiper的样式是在 mounted注入的 所以千万不要在组件的样式头中加入 scoped !!!!!!

  export default {
    data() {
      return {
        geohash: '',
        latitude: '',
        longitude: '',
        msiteTitle: '请选择地址...',
        hasGetData: false,
        foodTypes: [],
        imgBaseUrl: 'https://fuss10.elemecdn.com',
        swiperOption: {
          notNextTick: true,
          pagination: '.swiper-pagination',
          paginationType: 'bullets',
          autoplay: 4000,
          speed: 400,
          loop: true,
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          paginationClickable: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          onSlideChangeEnd: swiper => {
            // 这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1
            this.index = swiper.realIndex
          }
        }
      }
    },
    created() {
      this.getbasicData()
      this.getAddress()
    },
    mounted() {
      this.getFoodType()
      this.swiper.slideTo(3, 1000, false)
    },
    components: {
      headBar,
      footGuide,
      shopList,
      swiper,
      swiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
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
          this.geohash = address.data.latitude + ',' + address.data.longitude
        } else {
          this.geohash = this.$route.query.geohash
        }
        // 将 geohash 存到 vuex 中
        console.log(this.geohash)
        this.SAVE_GEOHASH(this.geohash)
      },
      async getAddress() {
        try {
          let res = await msiteAddress(this.geohash)
          console.log(res, 1)
          this.msiteTitle = res.data.name
          this.latitude = res.data.latitude
          this.longitude = res.data.longitude
          this.RECORD_ADDRESS(res.data)
          // 标志位
          this.hasGetData = true
          console.log(this.hasGetData, this.msiteTitle)
        } catch (e) {
          console.log(e)
        }
        // .then((res) => {
        //   console.log(res, 333)
        //   this.msiteTitle = res.data.name
        //   console.log(this.msiteTitle, 444)
        //   this.RECORD_ADDRESS(res.data)
        //   this.hasGetData = true
        //   console.log(this.hasGetData, 111001111)
        // })
        // console.log(this.hasGetData)
      },
      async getFoodType() {
        let res = await msiteFoodType(this.geohash)
        // .then((res) => {
        console.log(res, 1)
        let resLength = res.data.length
        let resArr = [...res.data]
        console.log(resArr[0], 2)
        let foodArr = []
        // 分两页做slider 每页8个内容
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8)
          // this.foodTypes.push(foodArr[j])
        }
        console.log(foodArr, 4)
        this.foodTypes = foodArr
        console.log(this.foodTypes, 5)
        // }).then(() => {
          // let swiperslider = new swiper()
          // console.log(swiperslider)
        // })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
        .food-type-wrapper
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
        bottom: 0
    .fl-back
      wh(100%, 100%)
    .animation-opacity
      animation: backOpacity 4s ease-in-out infinite
  .shop-list-wrapper
    margin-top: 0.4rem
    border-top: 0.025rem solid #bgc
    background-color: #fff
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