<template>
  <div class="profile-page">
    <head-bar :headTitle="profileTitle" :goBack="true"></head-bar>
    <section>
      <section class="profile-number">
        <router-link :to="userInfo&&userInfo.user_id ? '/profile/info' : '/login'" class="profile-link">
          <img v-if="userInfo&&userInfo.user_id" :src="imgBaseUrl + userInfo.avatar" class="privateImg">
          <span class="privateImg" v-else>
            <svg class="privateImage-svg">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
            </svg>
          </span>
          <div class="user-info">
            <p>{{username}}</p>
            <p>
              <span class="user-icon">
                <svg class="icon-mobile" fill="#fff">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                </svg>
              </span>
              <span class="icon-mobile-number">{{mobile}}</span>
            </p>
          </div>
          <span class="arrow">
            <svg class="arrow-svg" fill="#fff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </router-link>
      </section>
      <section class="info-data">
        <ul class="clear">
          <li class="info-data-link">
            <span class="info-data-top"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
            <span class="info-data-bottom">我的余额</span>
          </li>
          <li class="info-data-link">
            <span class="info-data-top"><b>{{parseInt(count)}}</b>个</span>
            <span class="info-data-bottom">我的优惠</span>
          </li>
          <li class="info-data-link">
            <span class="info-data-top"><b>{{parseInt(pointNumber)}}</b>分</span>
            <span class="info-data-bottom">我的积分</span>
          </li>
        </ul>
      </section>
      <section class="profile-order">
        <router-link to="/order" class="myorder-link">
          <aside>
            <svg fill="#4aa5f0" class="order">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
            </svg>
          </aside>
          <div class="myorder-box">
            <span>我的订单</span>
            <span class="box-svg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
        <a href='https://home.m.duiba.com.cn/#/chome/index' class="myorder-link">
          <aside>
            <svg fill="#fc7b53">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
            </svg>
          </aside>
          <div class="myorder-box">
            <span>积分商城</span>
            <span class="box-svg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </a>
        <router-link to="/vipcard" class="myorder-link">
          <aside>
            <svg fill="#ffc636">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
            </svg>
          </aside>
          <div class="myorder-box">
            <span>饿了么会员卡</span>
            <span class="box-svg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
      </section>
      <section class="profile-order">
        <router-link to="/service" class="myorder-link">
          <aside>
            <svg fill="#4aa5f0">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
            </svg>
          </aside>
          <div class="myorder-box">
            <span>服务中心</span>
            <span class="box-svg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
        <router-link to="/download" class="myorder-link">
          <aside>
            <svg fill="#3cabff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
            </svg>
          </aside>
          <div class="myorder-box">
            <span>下载APP</span>
            <span class="box-svg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
      </section>
    </section>
    <foot-guide></foot-guide>
    <transition name="router-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import headBar from '../../components/header/head'
  import footGuide from '../../components/footer/footGuide'
  import {imgBaseUrl} from '../../config/env'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        imgBaseUrl,
        profileTitle: '我的',
        username: '登陆/注册',
        resetname: '',
        mobile: '暂无绑定手机号',
        balance: 0,
        count: 0,  // 优惠券个数
        pointNumber: 0, // 积分数
        avatar: '' // 头像地址
      }
    },
    components: {
      headBar,
      footGuide
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    }
  }
</script>

<style scoped style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .profile-page
    .profile-number
      padding-top: 1.95rem
      .profile-link
        display: block
        display: flex
        box-align: center
        -webkit-box-align: center
        -ms-flex-align: center
        align-items: center
        background: #ccc
        padding: 0.666667rem 0.6rem
        .privateImg
          display: inline-block
          wh(2.5rem, 2.5rem)
          border-radius: 50%
          vertical-align: middle
          .privateImage-svg
            background: $fc
            border-radius: 50%
            wh(2.5rem, 2.5rem)
        .user-info
          margin-left: 0.48rem
          flex-grow: 1
          p
            font-weight: 700
            font(0.8rem, $fc)
            .user-icon
              wh(0.5rem, 0.75rem)
              display: inline-block
              vertical-align: middle
              line-height: 0.75rem
              .icon-mobile
                wh(100%, 100%)
            .icon-mobile-number
              display: inline-block
              font(0.57333rem, $fc)
          p:nth-of-type(2)
            margin-top: 0.1rem
        .arrow
          wh(0.46667rem, 0.98rem)
          display: inline-block
          svg
            wh(100%, 100%)
    .info-data
      width: 100%
      background: rgb(168,200,200)
      box-sizing: border-box
      ul
        display: flex
        .info-data-link
          // float: left
          // width: 33.33%
          flex: 1
          display: inline-block
          border-right: 1px solid #f1f1f1
          span
            display: block
            width: 100%
            text-align: center
          .info-data-top
            font(0.55rem, #333)
            padding: 0.853333rem 0 0.453333rem
            b
              display: inline-block
              font(1.2rem, #f90)
              font-weight: 700
              line-height: 1rem
              padding-right: 0.2rem
          .info-data-bottom
            font(0.57333rem, #666)
            font-weight: 400
            padding-bottom: 0.453333rem
        .info-data-link:nth-of-type(2)
          .info-data-top
            b
              color: #ff5f3e
        .info-data-link:nth-of-type(3)
          border: none
          .info-data-top
            b
              color: #6ac20b
    .profile-order
      margin-top: 0.4rem
      background: $fc
      .myorder-link
        padding-left: 1.6rem
        display: flex
        align-items: center
        height: 1.8rem
        line-height: 1.8rem
        aside
          wh(0.7rem, 0.7rem)
          margin-left: -0.866667rem
          margin-right: 0.266667rem
          display: flex
          align-items: center
          .order
            border: 0.025rem solid #333
          svg
            wh(100%, 100%)
        .myorder-box
          width: 100%
          border-bottom: 1px solid #f1f1f1
          padding: 0.433333rem 0.266667rem 0.433333rem 0
          font(0.7rem, #333)
          display: flex
          justify-content: space-between
          span
            display: block
          .box-svg
            wh(0.46667rem, 0.46667rem)
            svg
              wh(100%, 100%)
      .myorder-link:nth-of-type(3) .myorder-box
        border: none

  .router-slid-enter-active, .router-slid-leave-active
    transition: all .4s
  .router-slid-enter, .router-slid-leave-active
    transform: translate3d(2rem, 0, 0)
    opacity: 0
</style>