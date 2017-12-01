<template>
 <div>
   <Button type="primary" :loading="loading" @click="toLoading">
        <span v-if="!loading">查询</span>
        <span v-else>Loading...</span>
    </Button>
    <br/><br/>
    <Table border :columns="columns" :data="data"></Table>

    <Page :total="total"  show-total class="page" @on-change="changPage"> </Page>

</div>
</template>
<script>
    export default {
      data () {
        return {
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
                        this.remove(params.index)
                      }
                    }
                  }, 'Delete')
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
  },
      methods: {
        show (index) {
          this.$Modal.info({
            title: 'User Info',
            content: `Name：${this.data[index].title}<br>Age：${this.data[index].content}<br>Address：${this.data[index].type}`
          })
        },
        remove (index) {
          this.data.splice(index, 1)
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
        }
      }
    }
</script>
