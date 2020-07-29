<template>
  <div>
    <sidemenu/>
    <dash4 v-if="show == '1'"/>
    <dash6 v-if="show == '2'"/>
    <dash8 v-if="show == '3'"/>
    <dash12 v-if="show == '4'"/>
  </div>
</template>

<script>
import dash4 from '@/components/Dash4.vue'
import dash6 from '@/components/Dash6.vue'
import dash8 from '@/components/Dash8.vue'
import dash12 from '@/components/Dash12.vue'
import sidemenu from '@/components/SideMenu.vue'

export default {
  data () {
    return {
      show: 1
    }
  },
  
  components: {
    dash4,
    dash6,
    dash8,
    dash12,
    sidemenu
  }
}
</script>

<style scoped>

</style>