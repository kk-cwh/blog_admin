
<template>
  <div class="layout">
    <Row type="flex">
      <Col class="layout-menu-left" :style="{width:width}">
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
            <Icon :type="item.meta.icon"></Icon>
            <span>{{item.meta.name}}</span>
          </template>
          <template v-if="item.children && item.children.length>0">
            <MenuItem v-for="(it ,i) in item.children " :key="i" :name="it.name">{{it.meta.name}}</MenuItem>
          </template>
        </Submenu>
      </Menu>
      </Col>
      <Col class="layout-main-right" :style="{ marginLeft:width}">
      <div class="layout-header">

        <Button type="text" @click="toggleClick">
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
      <div class="layout-copy">
        2017-2018 &copy; iView
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import { menuRoutes } from '../router'
export default {
  data () {
    return {
      width: '180px',
      routes: menuRoutes,
      mianbaos: []
    }
  },
  computed: {},
  methods: {
    toggleClick () {
      if (this.width === '180px') {
        this.width = 0
      } else {
        this.width = '180px'
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
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  margin: 0;
  height: 100%;
  width: 100%;
}
.layout-menu-left {
  position: fixed;
  background: #464c5b;
  height: 100%;
  width: 180px;
  order: -1;
}
.layout-main-right {
  margin-left: 180px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}
.layout-header {
  position: fixed;
  height: 60px;
  width: 100%;
  flex: 0 0 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  z-index: 10002;
}
.layout-breadcrumb {
  margin-top: 68px;
  padding: 5px 0px 0px 20px;
  flex: 0 0 30px;
}
.layout-content {
  margin: 10px;
  background: #fff;
  border-radius: 4px;
  flex-grow: 1;
  overflow-x: hidden;
}
.layout-content-main {
  padding: 20px;
  overflow: auto;
  overflow-y: scroll;
}
.layout-copy {
  border-top: 1px solid #cfd8dc;
  text-align: center;
  color: #9ea7b4;
  flex: 1 0;
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.layout-ceiling-main a {
  color: #9ba7b5;
}
.layout-hide-text .layout-text {
  display: none;
}
.ivu-col {
  transition: width 0.2s ease-in-out;
}
.drop-down {
  padding-top: 10px;
  position: fixed;
  right: 50px;
  /* margin-right: 20%;
  float: right; */
}
</style>
