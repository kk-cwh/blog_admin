
<template>

  <div class="app">
    <transition name="slide-fade">
    <div class="app-sider" v-show="show">
       <div class="sider-logo">
          <img src="" alt="">
        </div>
      <Menu active-name="1" theme="dark" width="auto" @on-select="selectSomeone">

        <MenuItem name="Home">
        <Icon type="home"></Icon>
        <span>首页</span>
        </MenuItem>
        <Submenu v-for="(item ,index) in routes" :key="index" :name="item.name">
          <template slot="title">
            <Icon :type="item.meta.icon"></Icon>
            <span>{{item.meta.name}}</span>
          </template>
          <template v-if="item.children && item.children.length>0">
            <MenuItem v-for="(it ,i) in item.children " :key="i" :name="it.name">{{it.meta.name}}</MenuItem>
          </template>
        </Submenu>
      </Menu>
    </div>
     </transition>
    <div class="app-main">
      <div class="main-header">

        <Button type="text" @click="show = !show">
          <Icon type="navicon" size="32"></Icon>
        </Button>

        <Dropdown class="drop-down" @on-click="toLogout">
          <a href="javascript:void(0)">
            {{this.$store.state.name}}
            <Avatar style="background-color: #87d068" icon="person" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="userinfo">个人信息</DropdownItem>
            <DropdownItem name="logout">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </div>
      <div class="main-breadcrumb">
        <Breadcrumb v-if="mianbaos && mianbaos.length>0">
          <BreadcrumbItem v-for="(item,index) in mianbaos" :key="index" :to="item.path">{{item.meta.name}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="main-content">
        <div class="layout-content-main">
          <router-view></router-view>
        </div>
      </div>
      <div class="main-footer">
        2017-2018 &copy; iView
      </div>
    </div>
  </div>

</template>
<script>
import { menuRoutes } from '../router'
export default {
  data () {
    return {
      show: true,
      routes: menuRoutes,
      mianbaos: []
    }
  },
  computed: {},
  methods: {
    selectSomeone (e) {
      this.$router.push({ name: e })
      let a = this.$router.currentRoute.matched
      this.mianbaos = a
    },
    toLogout (e) {
      if (e === 'logout') {
        this.$store
          .dispatch('Logout')
          .then(() => {
            this.$Message.success('Logout Success!')
            this.$router.push({ name: 'Login' })
          })
          .catch(() => {
            this.$Message.error('logout Fail!')
          })
      }
    }
  }
}
</script>
<style scoped>
.drop-down{
  margin: 8px 20px;
}
.sider-logo {
  width: 80%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
@media screen and (min-width: 900px) {
  .app {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  border-radius: 4px;
  display: flex;
  height: 100vh;
  overflow: hidden;
  }
  .app-sider {
    flex: 0 0 200px;
    background-color: #494f5f;
    height: 100vh;
  }
  .app-main {
    flex: 1 1;
    display: flex;
    flex-direction: column;
  }
  .main-header {
    flex: 0 0 50px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #d7dde4;
    display: flex;
    justify-content:space-between;
  }
  .main-breadcrumb {
    flex: 0 0 36px;
    padding: 10px 15px 5px;
    background-color: #f5f7f9;
  }
  .main-content {
    margin: 5px;
    padding: 15px;
    background-color: #fff;
    flex: 1;
    border: 1px solid #d7dde4;
    border-radius: 4px;
    overflow: scroll;
  }

  .main-footer {
    flex: 0 0 50px;
    margin: 1px 5px;
    background: #fff;
    text-align: center;
  }
}

@media screen and (min-width:600px) and (max-width:899px){
.app {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  border-radius: 4px;
  display: flex;
  height: 100vh;
  overflow: hidden;
  }
  .app-sider {
    flex: 0 0 150px;
    background-color: #494f5f;
    height: 100vh;
  }
  .app-main {
    flex: 1 1;
    display: flex;
    flex-direction: column;
  }
  .main-header {
    flex: 0 0 50px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #d7dde4;
    display: flex;
    justify-content:space-between;
  }
  .main-breadcrumb {
    flex: 0 0 36px;
    padding: 10px 15px 5px;
    background-color: #f5f7f9;
  }
  .main-content {
    margin: 5px;
    padding: 15px;
    background-color: #fff;
    flex: 1;
    border: 1px solid #d7dde4;
    border-radius: 4px;
    overflow: scroll;
  }

  .main-footer {
    flex: 0 0 50px;
    margin: 1px 5px;
    background: #fff;
    text-align: center;
  }
}
@media screen  and (max-width:599px){
.app {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  border-radius: 4px;
  display: flex;
  height: 100vh;
  overflow-x: hidden;
  flex-direction: column;
  }
  .app-sider {
    flex: 0 0 10%;
    background-color: #494f5f;
    height: 100vh;
  }
  .app-main {
    flex: 1 1;
    display: flex;
    flex-direction: column;
  }
  .main-header {
    flex: 0 0 50px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #d7dde4;
    display: flex;
    justify-content:space-between;
  }
  .main-breadcrumb {
    flex: 0 0 30px;
    padding: 10px 15px 5px;
    background-color: #f5f7f9;
  }
  .main-content {
    margin: 5px;
    padding: 15px;
    background-color: #fff;
    flex: 1;
    border: 1px solid #d7dde4;
    border-radius: 4px;
    overflow: scroll;
  }

  .main-footer {
    flex: 0 0 50px;
    margin: 1px 5px;
    background: #fff;
    text-align: center;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease-in;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

