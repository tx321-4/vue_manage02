<template>
  <div>
    <el-dialog :title="title" :visible.sync="show" @open="openDialog" @close="closeDialog">
      <div v-loading="loading">
        <divider title="参数信息"></divider>
        <el-form :model="form" :rules="rules" ref="form" label-width="85px" size="mini">
          <el-form-item label="参数名称" prop="key">
            <el-input v-model="form.key" placeholder="参数名称key" :disabled="isEdit"></el-input>
          </el-form-item>
          <el-form-item label="参数值" prop="value">
            <el-input v-model="form.value" placeholder="参数值"></el-input>
          </el-form-item>
          <el-form-item label="参数说明" prop="remarks">
            <el-input v-model="form.remarks" placeholder="参数说明"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" v-loading="loading">
          <el-button type="primary" @click="save" :loading="loading">保存</el-button>
          <el-button @click="show=false">关闭</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/sys/config'
const formInit = {
  isEdit: 0,
  key: '',
  value: '',
  remarks: ''
}
export default {
  name: 'EditDialog',
  data () {
    return {

      form: { ...formInit },
      show: false,
      loading: false,
      rules: {
        key: [
          { required: true, message: '请填写参数名称' }
        ],
        value: [
          { required: true, message: '请填写参数值' }
        ],
        remarks: [
          { required: true, message: '请填写参数说明' }
        ]
      },
      resolve: null,
      updated: false
    }
  },
  computed: {
    isEdit () {
      return !!this.form.isEdit
    },
    title () {
      let title = '参数信息'
      if (this.isEdit) {
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
    },
    save () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          api.save(this.form).then(res => {
            this.loading = false
            this.$message.success('保存成功')
            this.updated = true
            this.form.isEdit = 1
            this.show = false
          }).catch(res => {
            this.loading = false
            console.log(res)
          })
        } else {
          return false
        }
      })
    },
    open () {
      this.show = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
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
