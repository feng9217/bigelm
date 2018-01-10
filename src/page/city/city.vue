<template>
  <div class="city-wrapper">
    <head-bar :headTitle="cityname" :goBack="true">
      <router-link to="/home" slot="changecity" class="change-city">切换城市</router-link>
    </head-bar>
    <form class="city-form" @submit.prevent>
      <div>
        <input class="city-input input-style" type="search" name="city" placeholder="输入学校、商务楼、地址" required="required" v-model="inputValue"></input>
      </div>
      <div>
        <input class="city-submit input-style" type="submit" name="submit" value="提交" @click="postLocation"></input>
      </div>
    </form>
    <header class="search-history" v-if="historyTitle">搜索历史</header>
    <ul class="getloca-wrapper">
      <li v-for="(item, index) in placelist" :key="index" @click="nextpage(index, item.geohash)">
        <h4 class="loca-name">{{item.name}}</h4>
        <p class="loca-address">{{item.address}}</p>
      </li>
    </ul>
    <footer v-if="historyTitle && placelist.length" class="clear-all">清空所有</footer>
    <div class="search-none" v-if="placeNone">很抱歉, 无搜索结果!! 换个试试??</div>
  </div>
</template>

<script type="text/javascript">
// <!-- 提交事件不再重载页面 -->
// <form v-on:submit.prevent></form>
// input 中 required 表示表单字段必填
  import headBar from '../../components/header/head'
  import {currentcity, searchAddress} from '../../api/api'
  import {getStore, removeStore, setStore} from '../../config/utils'

  export default {
    data() {
      return {
        cityname: '',
        cityid: '',
        inputValue: '',
        placelist: [],
        placeHistory: [],
        historyTitle: true,
        placeNone: false
      }
    },
    mounted() {
      this.cityid = this.$route.params.cityid
      console.log(this.$route)
      console.log(`来自: <router-link :to="'/city/' + guessCityid">`)
      currentcity(this.cityid).then((res) => {
        console.log(res)
      })
      this.initData()
    },
    components: {
      headBar
    },
    methods: {
      initData() {
        if (getStore('placeHistory')) {
          this.placelist = JSON.parse(getStore('placeHistory'))
        } else {
          this.placelist = []
        }
        console.log(this.placelist)
      },
      // post搜索信息 inputValue
      postLocation() {
        if (this.inputValue) {
          searchAddress(this.cityid, this.inputValue).then((res) => {
            console.log(res.data)
            this.historyTitle = false
            this.placelist = res.data
            this.placeNone = res.data.length ? false : true // eslint-disable-line
          })
        }
      },
      clearAll() {
        removeStore('placeHistory')
      },
      nextpage(index, geohash) {
        let history = getStore('placeHistory')
        let choosePlace = this.placelist[index]
        if (history) {
          let checkrepeat = false
          this.placeHistory = JSON.parse(history)
          this.placeHistory.forEach((item) => {
            if (item.geohash === geohash) {
              checkrepeat = true
            }
          })
          if (!checkrepeat) {
            this.placeHistory.push(choosePlace)
          }
        } else {
          this.placeHistory.push(choosePlace)
        }
        console.log(this.placeHistory)
        setStore('placeHistory', this.placeHistory)
        this.$router.push({path: '/msite', query: {geohash}})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .city-wrapper
    padding-top: 2.35rem
    .change-city
      right: 0.4rem
      font(0.6rem, #fff)
      center-ud()
    .city-form
      padding-top: 0.4rem
      background-color: #fff
      border-top: 1px solid $bgc
      border-bottom: 1px solid $bgc
      div
        width: 90%
        margin: 0 auto
        text-align: center
        .input-style
          margin-bottom: 0.4rem
          border-radius: 0.1rem
          wh(100%, 1.4rem)
        .city-input
          padding: 0 0.3rem
          border: 1px solid $bgc
          font(0.65rem, #333)
        .city-submit
          background-color: $color-blue
          font(0.65rem, #fff)
          width: 3.4rem
    .search-history
      border-top: 1px solid $bgc
      border-bottom: 1px solid $bgc
      padding-left: 0.5rem
      font-size: 0.475rem
      line-height: 0.8rem
    .getloca-wrapper
      background-color: #fff
      border-top: 1px solid $bgc
      li
        margin: 0 auto
        padding-top: 0.65rem
        border-bottom: 1px solid $bgc
        .loca-name
          margin: 0 auto 0.35rem
          width: 90%
          font(0.65rem, #333)
          ellipsis()
        .loca-address
          margin: 0 auto 0.55rem
          width: 90%
          font(0.45rem, #999)
          ellipsis()
    .clear-all
      font(0.7rem, #666)
      text-align: center
      line-height: 2rem
      background-color: #fff
    .search-none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-indent: 0.5rem
      font-size: 0.65rem
      line-height: 1.75rem
</style>