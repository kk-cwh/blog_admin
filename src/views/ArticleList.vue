
<template>
   <div v-if="showList">
   <Button type="primary" :loading="loading" @click="toLoading">
        <span v-if="!loading">查询</span>
        <span v-else>Loading...</span>
    </Button>
    <br/><br/>
    <Table border :columns="columns" :data="data"></Table>

    <Page :total="total"  show-total class="page" @on-change="changPage"> </Page>
    </div>
    <div class="editor-content" v-else>
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
    <mavon-editor style="  margin-top: 30px;" v-model="content_md" placeholder="这里是文章内容.." @change="getChang" />
    <br>
    <Button type="primary"  @click="updateArticle">更新文章</Button>
  </div>
</template>



<script>
import { mavonEditor } from 'mavon-editor'

import 'mavon-editor/dist/css/index.css'
export default {
  components: { mavonEditor },
  data () {
    return {
      id: '',
      title: '',
      content_md: '',
      content: '',
      type_id: '',
      types: [],
      tags: [],
      tagIds: [],
      showList: true,
      loading: false,
      total: 0,
      columns: [
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '文章标题',
          key: 'title'

        },
        {
          title: '类别',
          key: 'type'
        },
        {
          title: '是否显示',
          key: 'is_show'
        },
        {
          title: '创建时间',
          key: 'created_at'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      data: [
      ]
    }
  },
  mounted () {
    this.toLoading()
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
    show (index) {
      let id = this.data[index].id
      window.open(`articles/${id}`)
      // this.$Modal.info({
      //   title: 'User Info',
      //   content: `Name：${this.data[index].title}<br>Age：${this.data[index].content}<br>Address：${this.data[index].type}`
      // })
    },
    edit (index) {
      let id = this.data[index].id
      let data = {id}
      this.showList = false
      this.$store.dispatch('GetArticleDetail', data).then((response) => {
        let article = response.data.article
        this.id = article.id
        this.title = article.title
        this.type_id = article.type_id
        this.content_md = article.content_md
        this.tagIds = article.tags.map(item => item.id)
      })
      // this.data.splice(index, 1)
    },
    changPage (page) {
      let data = {page}
      this.$store.dispatch('ArticleList', data).then((response) => {
        this.loading = false
        let data = response.data.articles
        this.total = data.total
        let list = []
        for (let i = 0; i < data.list.length; i++) {
          list[i] = {
            id: data.list[i].id,
            title: data.list[i].title,
            type: data.list[i].type.name,
            is_show: data.list[i].is_show ? '是' : '否',
            created_at: data.list[i].created_at
          }
        }
        this.data = list
      })
    },
    toLoading () {
      this.loading = true
      let data = {page: 1}
      this.$store.dispatch('ArticleList', data).then((response) => {
        this.loading = false
        let data = response.data.articles
        let list = []
        for (let i = 0; i < data.list.length; i++) {
          list[i] = {
            id: data.list[i].id,
            title: data.list[i].title,
            type: data.list[i].type.name,
            is_show: data.list[i].is_show ? '是' : '否',
            created_at: data.list[i].created_at
          }
        }
        this.data = list
        this.total = data.total
      })
    },
    updateArticle () {
      // console.log(this.tagIds)
      let id = this.id
      let title = this.title
      let content = this.content
      let typeId = this.type_id
      let tagIds = this.tagIds
      let contentMd = this.content_md
      if (!title || !content || !typeId) {
        this.$Message.error('param error')
        return
      }
      let article = { id, title, content, tagIds, type_id: typeId, content_md: contentMd }
      this.$store
        .dispatch('UpdateArticle', article)
        .then(response => {
          // console.log(response)
          this.$Message.success('修改成功')
          this.$router.push({ name: 'ArticleList' })
          this.showList = true
          this.toLoading()
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
