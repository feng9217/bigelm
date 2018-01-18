<template>
  <div class="map-page">
    <head-bar :headTitle="'附近的售货机'" :goBack="true"></head-bar>
    <div class="amap-wrapper">
      <el-amap id="amap-page" :vid="amap-vue"ref="map">
      </el-amap>
    </div>
  </div>
</template>

<script type="text/javascript">
  import headBar from '../../components/header/head'

  // 使用高德原生SDK
  // 1.在webpack.base.conf.js 的 module.exports 中加入 externals: {'AMap': 'AMap', 'AMapUI': 'AMapUI'}字段
  // 2.在入口文件 main.js 中导入高德地图 3种方式
  // 3.在需要使用的组件中 import AMap from 'AMap'
  // 或者使用 使用 elemeEF封装的高德地图组件 vue-amap
  // 直接 npm install

  export default {
    data() {
      return {}
    },
    mounted() {},
    components: {
      headBar
    },
    methods: {
      // init() {
      //   var map = new AMap.Map('amap-wrapper', {
      //     resizeEnable: true,
      //     zoom: 15
      //   })
      //   AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation'], function() {
      //     map.addControl(new AMap.ToolBar())
      //     map.addControl(new AMap.Scale())
      //     map.addControl(new AMap.Geolocation())
      //   })
      // }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .amap-wrapper
    height: 28.3rem;
    width: 100%;
    #amap-page
      height: 100%;
      width: 100%;
</style>