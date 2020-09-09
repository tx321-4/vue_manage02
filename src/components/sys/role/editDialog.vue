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
        <divider title="角色信息"></divider>
        <el-form :model="form" :rules="rules" ref="form" label-width="85px" size="mini" status-icon>
          <el-form-item label="角色名称" prop="name">
            <el-input v-model.trim="form.name" placeholder="此角色的名称"></el-input>
          </el-form-item>
          <el-form-item label="角色说明" prop="remarks">
            <el-input type="textarea" v-model.trim="form.remarks" placeholder="此角色的说明"></el-input>
          </el-form-item>
          <el-form-item label="菜单权限" prop="menu_ids">
            <menu-list height="350px" show-checkbox ref="menuList"></menu-list>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" v-loading="loading">
        <el-button type="primary" @click="save" :loading="loading">保存</el-button>
        <el-button @click="show=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/sys/role'
import menuList from '@/components/sys/menu/treeList'
const formInit = {
  id: null,
  name: '',
  remarks: ''
}
export default {
  name: 'EditDialog',
  components: {
    menuList
  },
  data () {
    return {
      resolve: null,
      show: false,
      loading: false,
      form: { ...formInit },
      rules: {
        name: [{ required: true, message: '请填写角色名称' }],
        remarks: [{ required: true, message: '请填写角色说明' }]
      },
      updated: false,
      initMenu: false
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
      let title = '角色信息'
      if (this.isEdit) {
        title += ' [修改 ]'
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
          this.initMenuList()
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
          this.form.menu_ids = this.$refs.menuList.getCheckedKeys(true).join(',')
          this.loading = true
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
    open () {
      this.show = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
    },
    initMenuList () {
      if (!this.initMenu) {
        this.$refs.menuList.initData()
        this.initMenu = true
      }
    },
    initData (data) {
      this.assgin(data)
      this.clearValidate()
    },
    assgin (data) {
      this.form = { ...this.form, ...data }
      if (this.form.menu_ids) {
        const menuIds = this.form.menu_ids.split(',')
        this.$refs.menuList.setCheckedKeys(menuIds)
      }
    },
    clearValidate () {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },
    resetFields () {
      this.updated = false
      this.form = { ...formInit }
      this.$refs.menuList.setCheckedKeys([])
      this.clearValidate()
      return this
    }
  }
}
</script>

<style>
</style>
