<template>
  <div>
    <head-bar class="home">
      <span slot='logo' class="head-logo">ele.me</span>
    </head-bar>
    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市: </span>
        <span>定位不准时, 请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess-city">
        <span>{{guessCity}}</span>
        <svg class="arrow-right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>
    <section class="hot-city-wrapper">
      <h4 class="city-title">热门城市</h4>
      <ul class="citylist-wrapper">
        <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">{{item.name}}</router-link>
      </ul>
    </section>
    <section class="group-city-wrapper">
      <ul class="letter-classify">
        <li class="letter-classify-li" v-for="(value, key, index) in sortgroupcity" :key="key">
          <h4 class="city-title">
            {{key}}<span v-if="index === 0">(按字母排序) </span>
          </h4>
          <ul class="groupcity-name-wrapper citylist-wrapper">
            <router-link tag="li" v-for="item in value" :to="'/city' + item.id" :key="item.id">{{item.name}}</router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script type="text/javascript">
  import headBar from '../../components/header/head'
  // import {cityGuess} from '../../api/getData'
  import {getCityType} from '../../api/api.js'

  export default {
    data() {
      return {
        guessCity: '',
        guessCityid: '',
        hotcity: [],
        groupcity: {}
      }
    },
    mounted() {
      this.getCityGuess()
      this.getCityHot()
      this.getCityGroup()
    },
    methods: {
      getCityGuess() {
        let type = 'guess'
        getCityType(type).then((res) => {
          if (res.status === 200) {
            this.guessCity = res.data.name
            this.guessCityid = res.data.id
          }
        })
      },
      getCityHot() {
        let type = 'hot'
        getCityType(type).then((res) => {
          if (res.status === 200) {
            this.hotcity = res.data
          }
        })
      },
      getCityGroup() {
        let type = 'group'
        getCityType(type).then((res) => {
          if (res.status === 200) {
            this.groupcity = res.data
            // console.log(this.groupcity)
          }
        })
      }
    },
    computed: {
      // 将获取的数据按照A-Z字母开头排序
      // fromCharCode() 接受一个指定的 Unicode 值 然后返回一个字符串
      // 65~90 就是 A-Z
      sortgroupcity() {
        let sortobj = {}
        for (let i = 65; i <= 90; i++) {
          if (this.groupcity[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)]
          }
        }
        // console.log(sortobj)
        return sortobj
      }
    },
    components: {
      headBar
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  // 提取出来的公共部分样式
  .citylist-wrapper
    overflow: hidden
    zoom: 1
    li
      float: left
      text-align: center
      color: $color-blue
      border-bottom: 0.025rem solid $bgc
      border-right: 0.025rem solid $bgc
      wh(24.8%, 1.75rem)
      font-size: 0.6rem
      line-height: 1.75rem
    li:nth-of-type(4n)
      border-right: none

  .city-title
    color: #666
    font-weight: 400
    text-indent: 0.45rem
    border-top: 2px solid $bgc
    border-bottom: 1px solid $bgc
    font-size: 0.55rem
    line-height: 1.45rem
    font-family: 'Helvetica Neue'
    span
      font(0.475rem, #999)

  .head-logo
    left: 0.4rem
    font-weight: 400
    font(0.7rem, #fff)
    wh(2.3rem, 0.7rem)
    center-ud()

  .city-nav
    padding-top: 2.35rem
    border-top: 1px solid #bgc
    background-color: #fff
    margin-bottom: 0.4rem
    .city-tip
      flx(space-between)
      line-height: 1.45rem
      padding: 0 0.45rem
      span:nth-of-type(1)
        font(0.55rem, #666)
      span:nth-of-type(2)
        font-weight: 900
        font(0.475rem, #9f9f9f)
    .guess-city
      flx(space-between)
      align-item: center
      height: 1.8rem
      line-height: 1.8rem
      padding: 0 0.45rem
      border-top: 1px solid $bgc
      border-bottom: 2px solid $bgc
      font-size: 0.75rem
      span:nth-of-type(1)
        color: $color-blue
      .arrow-right
        wh(0.6rem, 0.6rem)
        fill: #999
  .hot-city-wrapper
    background-color: #fff
    margin-bottom: 0.4rem

  .group-city-wrapper
    .letter-classify
      .letter-classify-li
        margin-bottom: 0.4rem
        background-color: #fff
        border-bottom: 1px solid $bgc
        .groupcity-name-wrapper
          overflow: hidden
          zoom: 1
          li
            color: #666
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
</style>