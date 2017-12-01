
<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex" class="row-me">
      <Col :span="spanLeft" class="layout-menu-left">
      <Menu active-name="1" theme="dark" width="auto" @on-select="selectSomeone">
        <div class="layout-logo-left">
          <img src="" alt="">
        </div>

        <Submenu v-for="(item ,index) in routes" :key="index" :name="item.name">
          <template slot="title">
            <Icon type="ios-people" :size="iconSize"></Icon>
            <span v-if="spanLeft >= 4">{{item.meta.name}}</span>
          </template>
          <template v-if="item.children && item.children.length>0">
            <MenuItem v-for="(it ,i) in item.children " :key="i" :name="it.name">{{it.meta.name}}</MenuItem>
          </template>
        </Submenu>
      </Menu>
      </Col>
      <Col :span="spanRight">
      <div class="layout-header">
        <Button type="text" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
        </Button>
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
        2011-2016 &copy; TalkingData
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
      console.log(e)
      console.log(this.mianbaos)
      this.$router.push({ name: e })
      let a = this.$router.currentRoute.matched
      this.mianbaos = a
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
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  min-height: 100%;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main {
  padding: 20px;
  height: 1200px;
  width: auto;
  overflow: auto;
  margin-bottom: 100px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #464c5b;
  height: 1400px;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
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
</style>
