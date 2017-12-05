<template>

  <div class="login-container">

    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login-form">
      <FormItem prop="username">
        <Input type="text" v-model="formInline.username" placeholder="Email" autoComplete="on" size="large">
        <Icon type="email" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password" size="large">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <br>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')" long  size="large">登 录</Button>
      </FormItem>
    </Form>

  </div>

</template>
<script>
export default {
  data () {
    return {
      formInline: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: 'Please fill in the email',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 5,
            message: 'The password length cannot be less than 5 bits',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('Login', this.formInline)
            .then(() => {
              this.$store.dispatch('GetUserInfo').then(() => {
                this.$Message.success('Success!')
                this.$router.push({ name: 'Home' })
              })
            })
            .catch(() => {
              this.$Message.error('Login Fail!')
            })
        } else {
          this.$Message.error('Login Fail!')
        }
      })
    }
  }
}
</script>

  <style scoped>


.login-container {
  height: 100vh;
  background-color: rgba(40, 90, 144, 0.91);
}

.login-form {
  position: absolute;
  left: 0;
  right: 0;
  width: 400px;
  padding: 35px 35px 15px 35px;
  margin: 180px auto;
  background: #fff;
  box-sizing:border-box;
  border: 1px solid #fff;
  border-radius: 4%;
}
</style>
