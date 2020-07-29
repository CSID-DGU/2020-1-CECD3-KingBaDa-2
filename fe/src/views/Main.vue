<template>
  <div class = "main">
    <div class = "backimg">
      <img src = "../assets/backg.png" />
      <div class = "title">
        <h1>DIS</h1>
        <h3>Dashboard Integration System</h3></div>
        <br><br><br>
    </div>
    <div>
      <b-button 
      pill variant="info" 
      size = "lg"
      @click="$router.push('Dashboard')">
        <img 
        class = "icon-img" 
        src = "../assets/icon/dashboard.png" 
        /><br>
        대시보드 조회</b-button><br><br>
    </div>
    <div>
      <router-link to="/Notice">공지사항</router-link><br><hr>
      {{ 공지사항1 }}<br>
      {{ 공지사항2 }}<br>
      {{ 공지사항3 }}<br>
    </div>
    
  </div>
</template>

<script>
export default {
data () {
    return {
      공지사항1: '공지 사항1',
      공지사항2: '공지 사항2',
      공지사항3: '공지 사항3'
    }
  }
}
</script>

<style>
  .backimg{
    position: relative;
    background-size: cover;
  }
  .backimg .title{
    position: absolute;
     top:50%;
     left:50%;
     transform: translate(-50%, -50%);                                                                   
     font-size:5rem;
     color: white;
     z-index: 2;
     text-align: center;
  }
  .icon-img{
        width: auto; height: auto;
    max-width: 100px;
    max-height: 100px;
  }
  hr{
    width:10%
  }
</style>
