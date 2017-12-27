<template>
  <div>
    <head-bar class="home">
      <span slot='logo' class="head-logo">ele.me</span>
    </head-bar>
    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市:</span>
        <span>定位不准时, 请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess-city">
        <span>{{guessCity}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>
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
          }
        })
      }
    },
    components: {
      headBar
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/stylus"></style>