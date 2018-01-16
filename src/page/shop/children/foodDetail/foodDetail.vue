<template>
  <div class="rating-page">
    <head-bar></head-bar>
  </div>
</template>

<script type="text/javascript">
  import headBar from '../../../../components/header/head'
  import {imgBaseUrl} from '../../../../config/env'

  export default {
    data() {
      return {
        image_path: null,
        description: null,
        month_sales: null,
        name: null,
        rating: null,
        rating_count: null,
        satisfy_rate: null,
        foods: null,
        shopId: null,
        imgBaseUrl
      }
    },
    components: {
      headBar
    },
    created() {
      this.image_path = this.$route.query.image_path
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>