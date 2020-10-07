<template>
  <div>
    <div class="title">
      공지사항
    </div>
    <NoticeComp />
  </div>
</template>

<script>
import NoticeComp from "@/components/NoticeComp.vue";

export default {
  name: "Notice",
  components: {
    NoticeComp
  }
};
</script>
<style scope>
.title{
  color: #6FCEDC;
  font-size: 30px;
  font-weight: bold;
}
</style>
