<template>
  <div>
    <el-dialog :title="title" :visible.sync="show" @open="openDialog" @close="closeDialog">
      <div v-loading="loading">
        <divider title="系统更新记录信息"></divider>
        <el-form :model="form" :rules="rules" ref="form" label-width="85px" size="mini" status-icon>
          <el-form-item label="更新标题" prop="title">
            <el-input v-model.trim="form.title" placeholder></el-input>
          </el-form-item>
          <el-form-item label="更新内容" prop="update_date">
            <el-date-picker
              v-model.trim="form.update_date"
              value-format="yyyy-MM-dd"
              style="width: 30%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="更新内容" prop="content">
            <el-input type="textarea" v-model.trim="form.content" row="5" placeholder></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" v-loading="loading">
        <el-button type="primary" @click="save()" :loading="loading">保存</el-button>
        <el-button @click="show=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/sys/updateRecord'

const formInit = {
  title: '',
  update_date: '',
  content: '',
  input_status: -1
}
export default {
  name: 'EditDialog',
  data () {
    return {
      form: { ...formInit },
      show: false,
      loading: false,
      updated: false,
      rules: {
        title: [{ required: true, message: '请填写更新记录的标题' }],
        content: [{ required: true, message: '请填写更新记录的内容' }],
        update_date: [{ required: true, message: '请填写更新记录的日期' }]
      },

      resolve: null
    }
  },
  computed: {
    editdialog_status () {
      if (this.form.input_status >= 0) {
        return 0
      } else {
        return 1
      }
    },
    title () {
      let title = '系统更新记录信息'
      if (this.form.input_status >= 0) {
        title += ' [ 修改 ]'
      } else {
        title += ' [ 新增 ]'
      }
      return title
    }
  },
  methods: {
    openDialog () {
      this.$nextTick(() => {
        if (this.resolve) {
          this.resolve(this)
        }
      })
    },
    closeDialog () {
      if (this.updated) {
        this.$emit('updated', this.form)
      }
      this.resetFields()
    },
    save () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.action = status
          this.update()
        } else {
          return false
        }
      })
    },
    update () {
      this.loading = true
      const messageText = this.editdialog_status ? '提交成功' : '保存成功'
      api.update(this.form).then(res => {
        this.form.input_status = res.data.input_status
        this.loading = false
        this.$message.success(messageText)
        this.updated = true
      }).catch(res => {
        this.loading = false
        console.log(res)
      })
    },
    open () {
      this.show = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
    },
    create () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.create().then(res => {
          this.initData(res.data)
          this.loading = false
          resolve()
        })
      })
    },
    initData (data) {
      this.assign(data)
      this.clearValidate()
    },
    assign (data) {
      this.form = { ...this.form, ...data }
      return this
    },
    clearValidate () {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },
    resetFields () {
      this.updated = false
      this.form = { ...formInit }
      this.clearValidate()
      return this
    }
  }
}
</script>

<style>
</style>
