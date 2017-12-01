<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" style="width: 400px">
    <FormItem label="邮箱" prop="email">
      <Input v-model="formValidate.email" placeholder="Enter your e-mail"></Input>
    </FormItem>
     <FormItem label="密码" prop="password">
      <Input type="password" v-model="formValidate.password" placeholder="Enter your password"></Input>
    </FormItem>
    <FormItem label="姓名" prop="name">
      <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
    </FormItem>

    <FormItem label="生日">
      <Row>
        <Col span="11">
        <FormItem prop="date">
          <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
        </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="性别" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="male">Male</Radio>
        <Radio label="female">Female</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="兴趣爱好" prop="interest">
      <CheckboxGroup v-model="formValidate.interest">
        <Checkbox label="Eat"></Checkbox>
        <Checkbox label="Sleep"></Checkbox>
        <Checkbox label="Run"></Checkbox>
        <Checkbox label="Movie"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="简要描述" prop="desc">
      <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem>
      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>

      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>

    </FormItem>
  </Form>
</template>
<script>

export default {
  data () {
    return {
      formValidate: {
        name: '',
        password: '',
        email: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        desc: ''
      },
      ruleValidate: {
        email: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: 'password cannot be empty',
            trigger: 'blur'
          }

        ],
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: 'Choose at least one hobby',
            trigger: 'change'
          },
          {
            type: 'array',
            max: 2,
            message: 'Choose two hobbies at best',
            trigger: 'change'
          }
        ],
        date: [
          {
            required: true,
            type: 'date',
            message: 'Please select the birthday ',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: false,
            message: 'Please enter a personal introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 5,
            message: 'Introduce no less than 5 words',
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
          this.$store.dispatch('AddUser', this.formValidate).then(response => {
            if (response.data) {
              this.$Message.success('Success!')
              this.formValidate = {
                name: '',
                password: '',
                email: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                desc: ''
              }
              this.$router.push({name: 'UserList'})
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
