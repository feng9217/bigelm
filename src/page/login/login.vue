<template>
  <div class="login-wrapper">
    <head-bar :headTitle="loginWay ? '登录' : '密码登录'" :goBack="true"></head-bar>
    <form class="loginForm" v-if="loginWay">
      <section class="input-wrapper phone-number">
        <input type="text" name="phone" placeholder="账号(手机号)" maxlength="11" v-model="phoneNumber">
        <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
        <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>
      <section class="input-wrapper">
        <input type="text" name="textCode" maxlength="6" v-model="textCode" placeholder="验证码">
      </section>
    </form>
    <form class="loginForm" v-else>
      <section class="input-wrapper">
        <input type="text" placeholder="账号" v-model.lazy="userAccount">
      </section>
      <section class="input-wrapper">
        <input v-if="!showPassword" type="password" placeholder="密码" v-model="password">
        <input v-else type="text" placeholder="密码" v-model="password">
        <div class="button-switch" :class="{'change-to-text': showPassword}">
          <div class="circle-button" :class="{'trans-to-right': showPassword}" @click="changePassWordType"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input-wrapper captcha-code-wrapper">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img-change">
          <img v-show="captchaCodeImg" :src="captchaCodeImg">
          <div class="change" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="login-tips">
      温馨提示: 未注册过的账号, 登录时将自动注册
    </p>
    <p class="login-tips">
      注册过的用户可凭账号密码登录
    </p>
    <div class="log-wrapper">登录</div>
    <router-link to="/forget" class="to-forget" v-if="!loginWay">重置密码?</router-link>
    <alert-tip v-if="showAlert" @closeTip="closeTip"></alert-tip>
  </div>
</template>

<script type="text/javascript">
  import headBar from '../../components/header/head'
  import alertTip from '../../components/common/alertTip/alertTip'
  import {mapMutations} from 'vuex'
  import {getCaptchas} from '../../api/api'

  export default {
    data() {
      return {
        loginWay: false, // 登录方式 默认短信登录
        showPassword: false, // 输入时是否显示密码明文
        phoneNumber: '', // 手机号码
        textCode: null, // 验证短信
        userAccount: null, // 账号
        password: null, // 密码
        codeNumber: null, // 验证码
        validate_token: null, // 获取短信时返回的token
        computedTime: 0, // 倒计时
        userInfo: null, // 用户信息
        captchaCode: null, // 验证码地址
        captchaCodeImg: null, // 验证图片
        showAlert: false, // 提示组件
        alertText: null // 提示内容
      }
    },
    created() {
      this.getCaptchaCode()
    },
    components: {
      headBar,
      alertTip
    },
    computed: {
      rightPhoneNumber: function() {
        return /^1\d{10}$/gi.test(this.phoneNumber)
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      closeTip() {
        this.showAlert = false
      },
      // 改变登录方式
      changeLoginWay() {
        this.loginWay = !this.loginWay
      },
      changePassWordType() {
        this.showPassword = !this.showPassword
        console.log(this.showPassword)
      },
      getCaptchaCode() {
        getCaptchas().then((res) => {
          // console.log(res)
          this.captchaCodeImg = res.data.code
        })
      }
      // getVerifyCode() {
      //   if (this.rightPhoneNumber) {
      //     this.computedTime = 30
      //     this.timer = setInterval(() => {
      //       this.computedTime --
      //       if (this.computedTime === 0) {
      //         clearInterval(this.timer)
      //       }
      //     }, 1000)

      //     let exsis = checkExsis(this.phoneNumber, 'mobile')
      //     if (exsis.message) {
      //       this.showAlert = true
      //       this.alertText = exsis.message
      //       return
      //     } else if (!exsis.is_exists) {
      //       this.showAlert = true
      //       this.alertText = '输入的手机号尚未绑定'
      //       return
      //     }

      //     let res = await mobileCode(this.phoneNumber)
      //     if (res.message) {
      //       this.showAlert = true
      //       this.alertText = res.message
      //       return
      //     }
      //     this.validate_token = res.validate_token
      //   }
      // }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .login-wrapper
    padding-top: 1.95rem
    p, span, input
      font-family: Helvetica Neue,Tahoma,Arial
    .loginForm
      background-color: #fff
      margin-top: 0.6rem
      .input-wrapper
        display: flex
        justify-content: space-between
        padding: 0.6rem 0.8rem
        border-bottom: 1px solid #f1f1f1
        input
          font(0.7rem, #666)
        button
          padding: 0.28rem 0.4rem
          border: 1px
          border-radius: 0.15rem
          font(0.65rem, #666)
        .right-phone-number
          background-color: #4cd964
      .phone-number
        padding: 0.3rem 0.8rem
      .captcha-code-wrapper
        height: 2.2rem
        .img-change
          display: flex
          align-items: center
          img
            wh(3.5rem, 1.5rem)
            margin-right: 0.2rem
          .change
            display: flex
            flex-direction: 'column'
            flex-wrap: wrap
            width: 2rem
            justify-content: center
            p
              font(0.55rem, #666)
            p:nth-of-type(2)
              color: #3b95e9
              margin-top: 0.2rem
      .button-switch
        background-color: #ccc
        display: flex
        justify-content: center
        wh(2rem, 0.7rem)
        padding: 0 0.2rem
        border: 1px
        border-radius: 0.5rem
        position: relative
        extend-click()
        // stylus的CSS 要按层级一层层写进来 不然渲染不出的
        &.change-to-text
          background-color: #4cd964
        .circle-button
          position: absolute
          transition: all 0.3s
          top: -0.2rem
          left: -0.3rem
          z-index: 1
          wh(1.2rem, 1.2rem)
          box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, 0.1)
          background-color: #f1f1f1
          border-radius: 50%
          &.trans-to-right
            transform: translateX(1.55rem)
        span
          font(0.45rem, #fff)
          transform: translateY(0.05rem)
          line-height: 0.6rem
        span:nth-of-type(2)
          transform: translateY(-0.08rem)
    .login-tips
      font(0.5rem, red)
      padding: 0.4rem 0.6rem
      line-height: 0.5rem
      a
        color: #3b95e9
    .log-wrapper
      margin: 0.5rem 1rem
      font(0.7rem, #fff)
      background-color: #4cd964
      padding: 0.5rem 0
      border: 1px
      border-radius: 0.15rem
      text-align: center
    .to-forget
      float: right
      font(0.6rem, #3b95e9)
      margin-right: 0.3rem
</style>