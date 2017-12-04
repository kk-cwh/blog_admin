<template>

<div>
   <Button type="primary" :loading="loading" @click="toLoading">
        <span v-if="!loading">查询</span>
        <span v-else>Loading...</span>
    </Button>
    <br/><br/>
    <Table border :columns="columns" :data="data"></Table>

    <Page :total="total" show-total class="page" @on-change="changPage"></Page>

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
              title: '姓名',
              key: 'name',
              render: (h, params) => {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'person'
                    }
                  }),
                  h('strong', params.row.name)
                ])
              }
            },
            {
              title: '邮箱',
              key: 'email'
            },

            {
              title: '是否管理员',
              key: 'is_admin'
            },
            {
              title: '个人简介',
              key: 'desc'
            },
            {
              title: '添加时间',
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
                  }, '删除')
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
            title: '用户信息',
            content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
          })
        },
        remove (index) {
          this.data.splice(index, 1)
        },
        changPage (page) {
          let data = {page}

          this.$store.dispatch('UserList', data).then((response) => {
            this.loading = false
            let data = response.data.users
            this.data = data.list
            this.total = data.total
          })
        },
        toLoading () {
          this.loading = true
          let data = {page: 1}
          this.$store.dispatch('UserList', data).then((response) => {
            this.loading = false
            let data = response.data.users
            this.data = data.list
            this.total = data.total
          })
        }
      }
    }
</script>
<style scoped>
.page{
  margin-top: 20px;
  margin-left:20px;

}
</style>
