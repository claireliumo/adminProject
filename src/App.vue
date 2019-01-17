<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '../static/UnityProgress.js'
import {ReceiveUnityMsg} from '../static/webgl/UnityLoader.js'
export default {
  name: "app",
  beforeCreate() {
    // var gameInstance = UnityLoader.instantiate(
    //   "gameContainer",
    //   "Build/B5WebGLDemo.json",
    //   { onProgress: UnityProgress }
    // );

    // function ReceiveUnityMsg(arge) {
    //   console.log(arge);
    //   sessionStorage.setItem("arge", arge);
    //   // sessionStorage.arge = arge;
    //   console.log(sessionStorage.arge);
    //   //alert(arge);
    //   //gameInstance.SendMessage('DataManager', 'SendStringMsgToUnity', test_json);
    // }
  }
};
</script>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
</style>
