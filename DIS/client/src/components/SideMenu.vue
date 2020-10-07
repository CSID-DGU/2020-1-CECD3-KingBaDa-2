<template>
  <div>
    <div>
      <b-sidebar
        id="sidebar-no-header"
        aria-labelledby="sidebar-no-header-title"
        :width = "sideBarWidth"
        visible
        no-header
        shadow
        no-close-on-esc
        no-close-on-route-change
      >
        <div>
          <div class="sideMenuFrame">
            <nav>
              <b-nav vertical>
                <b-nav-item>
                  <div @click="slimize" :class="sizeButton">{{foldingAction}}</div>
                </b-nav-item>
                <div>
                  <b-avatar variant="primary" src size="4rem"></b-avatar>
                </div>
                <br />
                <div :class="listFont">{{userName}}</div>
                <div :class="listFont">{{userDomain}}</div>
                <b-nav-item>
                  <b-button @click="logout" variant="info" class="logoutBtn">
                    <img src="../assets/logout.png" />
                    <div :class="logoutFont">로그아웃</div>
                  </b-button>
                </b-nav-item>
              </b-nav>
            </nav>
          </div>
          <nav id="all" class="navItems">
            <b-nav vertical>
              <div>
                <b-nav-item
                  id="home"
                  class="listItem selected"
                  @click="select('home'); $router.push('Main');"
                >
                  <div>
                    <img src="../assets/home.png" />
                  </div>
                  <div :class="listFont">홈</div>
                </b-nav-item>
                <hr />
                <b-nav-item
                  id="notice"
                  class="listItem"
                  @click="select('notice'); $router.push('Notice');"
                >
                  <div>
                    <img src="../assets/notice.png" />
                  </div>
                  <div :class="listFont">공지사항</div>
                </b-nav-item>
                <hr />
                <b-nav-item
                  id="dashboard"
                  class="listItem"
                  @click="select('dashboard'); $router.push('Dashboard');"
                >
                  <div>
                    <img src="../assets/dashboard.png" />
                  </div>
                  <div :class="listFont">대시보드</div>
                </b-nav-item>
                <hr />
                <b-nav-item
                  id="control"
                  class="listItem"
                  @click="select('control'); $router.push('Control');"
                >
                  <div>
                    <img src="../assets/control.png" />
                  </div>
                  <div :class="listFont">제어</div>
                </b-nav-item>
                <hr />
                <b-nav-item id="data" class="listItem" @click="select('data'); $router.push('Data');">
                  <div>
                    <img src="../assets/data.png" />
                  </div>
                  <div :class="listFont">데이터</div>
                </b-nav-item>
                <hr />
                <b-nav-item
                  id="setting"
                  class="listItem"
                  @click="select('setting'); $router.push('Setting');"
                >
                  <div>
                    <img src="../assets/setting.png" />
                  </div>
                  <div :class="listFont">설정</div>
                </b-nav-item>
              </div>
            </b-nav>
          </nav>
        </div>
      </b-sidebar>
    </div>
    <div :class="pageConfig">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "SideMenu",

  data() {
    return {
      slimized: true,
      foldingAction: ">>",
      sideBarWidth: "100px",
      pageConfig: "foldedPageConfig",
      sizeButton: "sideButtons",
      listFont: "slimizedListFont",
      TargetID: "",
      userName: "차민형",
      userDomain: "시설관리팀",
      logoutFont: "slimizedLogoutFont"
    };
  },
  created() {
    this.$EventBus.$on("Dashboard", () => {
      document.getElementById("home").classList.remove("selected");
      document.getElementById("notice").classList.remove("selected");
      document.getElementById("dashboard").classList.add("selected");
      document.getElementById("control").classList.remove("selected");
      document.getElementById("data").classList.remove("selected");
      document.getElementById("setting").classList.remove("selected");
    }),
      this.$EventBus.$on("Notice", () => {
        document.getElementById("home").classList.remove("selected");
        document.getElementById("notice").classList.add("selected");
        document.getElementById("dashboard").classList.remove("selected");
        document.getElementById("control").classList.remove("selected");
        document.getElementById("data").classList.remove("selected");
        document.getElementById("setting").classList.remove("selected");
      });
  },
  methods: {
    slimize() {
      if (!this.slimized) {
        this.slimized = true;
        this.foldingAction = ">>";
        this.listFont = "slimizedListFont";
        this.logoutFont = "slimizedLogoutFont";
        this.pageConfig = "foldedPageConfig";
        this.sideBarWidth = "100px";
      } else {
        this.slimized = false;
        this.foldingAction = "<<";
        this.listFont = "defaultListFont";
        this.logoutFont = "defaultLogoutFont";
        this.pageConfig = "unfoldedPageConfig";
        this.sideBarWidth = "200px";
      }
    },
    logout() {
      this.$router.push("/");
    },
    select(clickedID) {
      this.TargetID = document.getElementById(clickedID);
      document.getElementById("home").classList.remove("selected");
      document.getElementById("notice").classList.remove("selected");
      document.getElementById("dashboard").classList.remove("selected");
      document.getElementById("control").classList.remove("selected");
      document.getElementById("data").classList.remove("selected");
      document.getElementById("setting").classList.remove("selected");
      this.TargetID.classList.add("selected");
    }
  }
};
</script>
<style scope>
.foldedPageConfig{
  margin: 0px 0px 0px 100px;
}
.unfoldedPageConfig{
  margin: 0px 0px 0px 200px;
}
.logoutBtn {
  font-size: 15px;
  color: white;
  font-weight: bold;
}
.body {
  position: absolute;
  left: 130px;
  right: 0px;
}
.sideMenuFrame {
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(
    180deg,
    rgba(111, 194, 220, 1) 0%,
    rgba(174, 229, 236, 1) 60%,
    rgba(239, 250, 251, 1) 100%
  );
}
.navItems {
  position: relative;
  top: 50px;
}
.listItem {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  height: 80px;
  margin-bottom: -18px;
  margin-top: -18px;
}
.defaultListFont {
  color: #000000;
  font-size: 20px;
}
.slimizedListFont {
  display: none;
}
.defaultLogoutFont{
  font-size: 20px;
  color: #FFFFFF;
}
.slimizedLogoutFont{
  display: none;
}
.selected {
  background-color: #dddddd;
}
.sideButtons {
  background-color: none;
  font-size: 30px;
  color: #ffffff;
  font-weight: bold;
  border: 0px solid;
  width: 60px;
  margin: auto;
  text-align: center;
}

</style>
