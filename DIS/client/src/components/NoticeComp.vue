<template>
  <div>
    <b-card bg-variant="light" style="max-width: 70rem; margin: 0 auto;">
      <div class="search">
        <b-form inline>
          <b-form-select v-model="selected" :options="options"></b-form-select>
          <b-form-input v-model="text"></b-form-input>
          <b-button>검색</b-button>
        </b-form>
      </div>
      <b-table
        striped
        hover
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
        @row-clicked="rowClick"
      ></b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
      ></b-pagination>
      <!-- <b-button @click="writeContent">글쓰기</b-button> -->
    </b-card>
  </div>
</template>

<script>
import data from "@/data/index.js";

export default {
  name: "NoticeComp",
  data() {
    // 정렬 : https://blog.naver.com/haskim0716n/221681695401
    let contentItems = data.Content.sort((a, b) => {
      return a.content_id - b.content_id;
    }); // 내림차순

    // User 와 Content 의 user_id 의 같은 번호를 찾아 Content 에 기존자료 + 'user_name' 으로 추가한다.
    let items = contentItems.map(contentItem => {
      return {
        ...contentItem,
        user_name: data.User.filter(userItem => {
          return contentItem.user_id === userItem.user_id;
        })[0].name
      };
    });

    return {
      currentPage: 1, // 현재 페이지
      perPage: 10, // 페이지당 보여줄 갯수
      // bootstrap 'b-table' 필드 설정
      fields: [
        {
          key: "title",
          label: "제목"
        },
        {
          key: "user_name",
          label: "글쓴이"
        },
        {
          key: "created_at",
          label: "작성일"
        }
      ],
      items: items,
      selected: "",
      text: "",
      options: [
        { value: "a", text: "제목" },
        { value: "b", text: "글쓴이" },
        { value: "c", text: "작성일" }
      ]
    };
  },
  methods: {
    rowClick() {}
    // calcToday() {
    //   let date = new Date();

    //   for (var i = 0; i < data.Content.length; i++) {
    //     data.Content[i].created_at = date;
    //   }
    //   console.log(data.Content[2].created_at - 1);
    // }
    // writeContent() {
    //   this.$router.push({
    //     path: `/board/create`
    //   });
    // }
  },
  computed: {
    rows() {
      return this.items.length;
    }
  }
};

/*
[예제] map --------------------
const objArr = [{ a: "a" }, { b: "b" }];

  0: {a: "a"}
  1: {b: "b"}

const altered = objArr.map(item => {
  return {
    ...item, // 기존자료 모두 추가
    c: "c" // 신규추가
  };
});

  0: {a: "a", c: "c"}
  1: {b: "b", c: "c"}s

[예제] filter--------------------
const onlyA = altered.filter(item => {
  return item.a === "a"; // 'a' 인 값만 리턴
});

  0: {a: "a", c: "c"}
*/
</script>

<style scoped>
.search {
  float: right;
  /* width: 200px;
   display: inline; */
}
</style>
