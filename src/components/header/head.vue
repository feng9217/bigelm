<template>
  <header class="head-top">
    <!-- 设置name 就会插入对应slot -->
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <section class="head-goback" @click="$router.go(-1)">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>
    <router-link :to="userInfo? '/profile':'/login'" class="head-login">
      <svg class="user_avatar" v-if="userInfo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span class="login" v-else>登录|注册</span>
    </router-link>
    <section class="title-head ellipsis">
      <span class="text">headTitle</span>
    </section>
    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changeLogin"></slot>
  </header>
</template>

<script type="text/javascript">
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    mounted() {
      this.getUserInfo()
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .head-top
    background: $color-blue
    position: fixed
    z-index: 100
    left: 0
    top: 0
    wh(100%, 1.95rem)
    .head-goback
      left: 0.4rem
      wh(0.6rem, 1rem)
      light-height: 2.2rem
      margin-left: 0.4rems
    .head-login
      right: 0.55rem
      font(0.65rem, #fff)
      center-ud()
      .login
        color: #fff
    .title-head
      center-all()
</style>