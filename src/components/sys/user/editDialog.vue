<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="show"
      :append-to-body="inDialog"
      @open="openDialog"
      @close="closeDialog"
    >
      <div v-loading="loading">
        <divider title="用户信息"></divider>
        <el-form :model="form" :rules="rules" ref="form" label-width="85px" size="mini" status-icon>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="登录用户" prop="login_name">
                <el-input v-model.trim="form.login_name" placeholder="此用户登录系统的登录名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名称" prop="name">
                <el-input v-model.trim="form.name" placeholder="此用户的名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="isEdit">
              <el-form-item label="修改密码" prop="change_pwd">
                <el-switch v-model.trim="form.change_pwd" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="!isEdit || form.change_pwd">
              <el-form-item label="登录密码" prop="pwd">
                <el-input v-model.trim="form.pwd" type="password" placeholder="用户登录密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="企业号ID" prop="qywx_user">
            <el-input v-model.trim="form.qywx_user" placeholder></el-input>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="所属角色" prop="roleIds">
                <el-checkbox-group
                  v-model="form.roleIds"
                  style="display: flex;
    justify-content: space-between;
    flex-wrap: wrap;"
                >
                  <div v-for="item in roleList" :key="item.id" style="width:50%">
                    <el-checkbox :label="item.id+''">{{item.name}}</el-checkbox>
                    <el-button
                      type="text"
                      style="margin-left: 10px"
                      @click="openMenuDialog(item)"
                    >[菜单权限]</el-button>
                  </div>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" v-loading="loading">
        <el-button type="primary" @click="save()" :loading="loading">保存</el-button>
        <el-button @click="show=false">关闭</el-button>
      </div>
    </el-dialog>
    <menu-dialog :in-dialog="inDialog" ref="menuDialog"></menu-dialog>
  </div>
</template>

<script>
import api from '@/api/sys/user'
import roleApi from '@/api/sys/role'

import menuDialog from '@/components/sys/menu/treeDialog'
const formInit = {
  id: null,
  login_name: '',
  name: '',
  change_pwd: 0,
  pwd: '',
  qywx_user: '',
  roleIds: []
}
export default {
  name: 'EditDialog',
  components: { menuDialog },
  data () {
    const validator = (rule, value, callback) => {
      if (value) {
        api.checkLoginNameUnique(value, this.form.id).then(res => {
          if (res.data > 0) {
            callback(new Error('登录用户名已重复'))
          } else {
            callback()
          }
        })
      } else {
        callback()
      }
    }
    return {
      resolve: null,
      show: false,
      loading: false,
      updated: false,
      form: { ...formInit },
      rules: {
        login_name: [
          { required: true, message: '请填写登录用户' },
          { validator: validator, trigger: 'blur' }
        ],
        pwd: [{ required: true, message: '请填写登录密码' }],
        name: [{ required: true, message: '请填写用户名称' }]
      },
      roleList: []
    }
  },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }

  },
  computed: {
    isEdit () {
      return !!this.form.id
    },
    title () {
      let title = '登陆用户信息'
      if (this.isEdit) {
        title += ' [ 修改 ]'
      } else {
        title += ' [ 新增 ]'
      }
      return title
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    openDialog () {
      this.$nextTick(() => {
        if (this.resolve) {
          this.resolve(this)
        }
      })
    },
    open () {
      this.show = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
    },
    closeDialog () {
      if (this.updated) {
        this.$emit('updated', this.form)
      }
      this.resetFields()
    },
    openMenuDialog (row) {
      this.$refs.menuDialog.open().then(that => {
        that.initData({ ids: row.menu_ids, isIds: 1 })
      })
    },
    save () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.role_ids = this.form.roleIds.join(',')
          api.save(this.form).then(res => {
            this.form.id = res.data.id
            this.loading = false
            this.$message.success('保存成功')
            this.updated = true
          }).catch(res => {
            this.loading = false
            console.log(res)
          })
        } else {
          return false
        }
      })
    },
    getRoleList () {
      roleApi.getList({ page: 1 }).then(res => {
        console.log(res)
        this.roleList = res.data.list
      })
    },
    initData (data) {
      this.assign(data)
      this.clearValidate()
    },
    assign (data) {
      this.form = { ...this.form, ...data }
      if (this.form.role_ids) {
        this.form.roleIds = this.form.role_ids.split(',')
      }
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

<style lang="scss" scoped>
</style>
