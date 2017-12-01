<template>
  <div class="editor-content">
    <h4 class="intro-head">超赞的👍
      <a href="https://github.com/hinesboy/mavonEditor" target="_blank">mavonEditor</a>
    </h4>
     <Input v-model="title" placeholder="输入文章标题.." style="width: 280px"></Input>
     <Select v-model="type_id" style="width:120px">
        <Option v-for="item in types" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
     <Button type="primary" style="margin-left:10%" @click="AddArticle">发布文章</Button>
    <mavon-editor style="  margin-top: 30px;" v-model="mdString" placeholder="这里是文章内容.." @change="getChang"/>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'

import 'mavon-editor/dist/css/index.css'

export default {
  components: { mavonEditor },
  data () {
    return {
      title: '',
      mdString: '',
      content: '',
      type_id: '',
      types: []
    }
  },
  mounted () {
    this.$store.dispatch('TypeList').then((response) => {
      let data = response.data
      this.types = data.types ? data.types : []
    }).catch(err => {
      console.log(err)
      this.$Message.error('error')
    })
  },
  methods: {
    AddArticle () {
      let title = this.title
      let content = this.content
      let typeId = this.type_id
      if (!title || !content || !typeId) {
        this.$Message.error('param error')
        return
      }
      let article = {title, content, type_id: typeId}
      this.$store.dispatch('AddArticle', article).then((response) => {
        console.log(response)
        this.$Message.success('发布成功')
        this.$router.push({name: 'ArticleList'})
      }).catch(err => {
        console.log(err)
        this.$Message.error('error')
      })
    },
    getChang (value, html) {
      this.content = html
    }
  }
}
</script>

<style scoped>
.editor-content {
  height: 800px;
}
.intro-head {
  text-align: center;
  margin: 1px;
}
.v-note-wrapper {
  z-index: 1 !important;
}
</style>
