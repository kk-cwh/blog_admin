<template>
  <div class="editor-content">
    <Form :label-width="48">
      <FormItem label="标题 :">
        <Input v-model="title" placeholder="输入文章标题.." style="width: 280px"></Input>
      </FormItem>
      <FormItem label="类别 :">
        <Select v-model="type_id" style="width:120px">
          <Option v-for="item in types" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="标签 :">
        <CheckboxGroup v-model="tagIds">
          <Checkbox v-for="item in tags" :label="item.id" :key="item.id +  '00' ">{{item.name}}</Checkbox>
        </CheckboxGroup>
      </FormItem>
    </Form>
    <mavon-editor style="  margin-top: 30px;" v-model="mdString" placeholder="这里是文章内容.." @change="getChang" />
    <br>
    <Button type="primary"  @click="AddArticle">发布文章</Button>

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
      types: [],
      tags: [],
      tagIds: []
    }
  },
  mounted () {
    this.$store
      .dispatch('TypeList')
      .then(response => {
        let data = response.data
        this.types = data.types ? data.types : []
        this.tags = data.tags ? data.tags : []
      })
      .catch(err => {
        console.log(err)
        this.$Message.error('error')
      })
  },
  methods: {
    AddArticle () {
      // console.log(this.tagIds)
      let title = this.title
      let content = this.content
      let typeId = this.type_id
      let tagIds = this.tagIds
      if (!title || !content || !typeId) {
        this.$Message.error('param error')
        return
      }
      let article = { title, content, tagIds, type_id: typeId }
      this.$store
        .dispatch('AddArticle', article)
        .then(response => {
          // console.log(response)
          this.$Message.success('发布成功')
          this.$router.push({ name: 'ArticleList' })
        })
        .catch(err => {
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
.intro-head {
  text-align: center;
  margin: 1px;
}
.v-note-wrapper {
  z-index: 1 !important;
}
</style>
