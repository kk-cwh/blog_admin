<template>
  <div class="app">
    <div class="header"><div class="layout-header">
        <Button type="text" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
        </Button>
        <Dropdown class="drop-down" @on-click="toLogout">
          <a href="javascript:void(0)">
            {{this.$store.state.name}}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="userinfo">个人信息</DropdownItem>
            <DropdownItem name="logout">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div></div>
    <div class="main">
      <div class="sider">
        <Menu active-name="1" theme="dark" width="auto" @on-select="selectSomeone">
        <div class="layout-logo-left">
          <img src="" alt="">
        </div>
        <MenuItem name="Home">
            <Icon type="home"></Icon>
            首页
        </MenuItem>
        <Submenu v-for="(item ,index) in routes" :key="index" :name="item.name">
          <template slot="title">
            <Icon :type="item.meta.icon" :size="iconSize"></Icon>
            <span v-if="spanLeft >= 5">{{item.meta.name}}</span>
          </template>
          <template v-if="item.children && item.children.length>0">
            <MenuItem v-for="(it ,i) in item.children " :key="i" :name="it.name" >{{it.meta.name}}</MenuItem>
          </template>
        </Submenu>
      </Menu></div>
      <div class="content">
      <div class="layout-breadcrumb">
        <Breadcrumb v-if="mianbaos && mianbaos.length>0">
          <BreadcrumbItem v-for="(item,index) in mianbaos" :key="index" :to="item.path">{{item.meta.name}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="layout-content">
        <div class="layout-content-main">
          <router-view></router-view>
        </div>
      </div>
      </div>

    </div>
 <div class="footer">footer</div>
  </div>

</template>
<script>
import { menuRoutes } from '../../router'
export default {
  data () {
    return {
      spanLeft: 5,
      spanRight: 19,
      routes: menuRoutes,
      mianbaos: []
    }
  },
  computed: {
    iconSize () {
      return this.spanLeft === 5 ? 14 : 24
    }
  },
  methods: {
    toggleClick () {
      if (this.spanLeft === 5) {
        this.spanLeft = 2
        this.spanRight = 21
      } else {
        this.spanLeft = 5
        this.spanRight = 19
      }
    },
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
.app{
display: flex;
min-height: 100vh;
background: #d2f9f9;
flex-direction: column;
}
.header {
   height: 60px;
  background: #494f5f;
    position: fixed;
    z-index: 1020;
    width: 100%;
}
.main {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  margin-top: 60px;
  overflow-x: hidden
}

.main .sider {
  position: fixed;
  flex: 0 0 180px;
  height: 100%;
  width: 180px;
  background: #494f5f;
  overflow: hidden;
  color: #fff;
  order: -1;
}
.main .content {
flex: 1;
margin-left: 180px;
min-width: 0;

}
.footer {
  flex:  0 0 50px;
  border-top: 1px solid #cfd8dc;
   margin-left: 180px;
}

</style>
