<template>
  <div class="alert-wrapper">
    <section class="tip-text-wrapper">
      <div class="tip-icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip-text">{{alertText}}</p>
      <div class="confirm" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        positionY: 0,
        timer: null
      }
    },
    props: {
      alertText: {
        type: String,
        default: ''
      }
    },
    methods: {
      closeTip() {
        this.$emit('closeTipe')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl'

  // @keyframes tipMove{
  //   0%{
  //     transform: scale(1)
  //   }
  //   35%{
  //     transform: scale(0.8)
  //   }
  //   70%{
  //     transform: scale(1.1)
  //   }
  //   100%{
  //     transform: scale(1)
  //   }
  // }

  // .alert-wrapper
  //   position: fixed
  //   top: 0
  //   left: 0
  //   right: 0
  //   bottom: 0
  //   z-index: 100
  //   .tip-text-wrapper
  //     position: absolute
  //     top: 50%
  //     left: 50%
  //     margin-top: -6rem
  //     margin-left: :-6rem
  //     padding-top: 0.6rem
  //     width: 12rem
  //     animation: tipMove 0.4s
  //     background-color: rgba(255,255,255,1)
  //     border: 1px
  //     border-radius: 0.25rem
  //     // display: flex
  //     // justify-content: center
  //     // flex-direction: column
  //     align-items: center
  //     .tip-icon
  //       // display: flex
  //       // justify-content: center
  //       // flex-direction: column
  //       wh(3rem, 3rem)
  //       border: 0.15rem solid #f8cb86
  //       border-radius: 50%
  //       span:nth-of-type(1)
  //         wh(0.12rem, 1.5rem)
  //         background-color: #f8cb86
  //       span:nth-of-type(2)
  //         wh(0.2rem, 0.2rem)
  //         border: 1px
  //         border-radius: 50%
  //         margin-top: 0.2rem
  //         background-color: #f8cb86
  //     .tip-text
  //       font(0.7rem, #333)
  //       line-height: 0.9rem
  //       text-align: center
  //       margin-top: 0.8rem
  //       padding: 0 0.4rem
  //     .confirm
  //       font(0.8rem, #fff)
  //       font-weight: bold
  //       margin-top: 0.8rem
  //       background-color: #4cd964
  //       width: 100%
  //       text-align: center
  //       line-height: 1.8rem
  //       border: 1px
  //       border-bottom-left-radius: 0.25rem
  //       border-bottom-right-radius: 0.25rem
</style>