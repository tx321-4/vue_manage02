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
        <divider title="菜单信息"></divider>
        <el-form :model="form" :rules="rules" ref="form" label-width="85px" size="mini" status-icon>
          <el-form-item label="上级菜单" prop="parent_id" :inline-message="true">
            <el-input
              v-model.trim="form.parent_menu"
              placeholder="点击选择，为空则为顶级节点"
              readonly
              @click.native="openSelectMenuDialog"
            >
              <i
                style="cursor:pointer"
                v-show="form.parent_id"
                slot="suffix"
                @click.stop="form.parent_menu='';form.parent_id=null"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item label="菜单名称" prop="title">
            <el-input v-model.trim="form.title" placeholder></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" prop="path">
            <el-input v-model.trim="form.path" placeholder></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="order">
            <el-input v-model.number="form.order" style="width:20%"></el-input>
            <span style="font-size: 12px">值越小排越前</span>
          </el-form-item>
          <el-form-item label="API" prop="api">
            <el-input type="textarea" v-model.trim="form.api" rows="4" placeholder></el-input>
            <span style="font-size: 12px">* 调用这些api接口时会进行验证用户是否具有此菜单权限</span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" v-loading="loading">
        <el-button type="primary" @click="save()" :loading="loading">保存</el-button>
        <el-button @click="show=false">关 闭</el-button>
      </div>
    </el-dialog>
    <type-dialog :in-dialog="inDialog" ref="typeDialog">
      <template slot="right" slot-scope="{node, data}">
        <el-button :disabled="isDisable(data)" type="text" @click="selectType(data)">选择</el-button>
      </template>
    </type-dialog>
  </div>
</template>

<script>
import api from '@/api/sys/menu'
import typeDialog from './treeDialog'
const formInit = {
  model: '',
  parent_id: null,
  title: '',
  parent_menu: '',
  id: null,
  input_status: -1,
  order: 99,
  remarks: ''
}
export default {
  name: 'TreeList',
  components: {
    typeDialog
  },
  data () {
    return {
      resolve: null,
      show: false,
      loading: false,
      updated: false,
      form: { ...formInit },
      rules: {
        title: [{ required: true, message: '请填写菜单名称' }],
        path: [{ required: true, message: '请填写菜单路径' }],
        order: [{ type: 'number', message: '请输入数字' }]
      }
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
      let title = '菜单信息'
      if (this.isEdit) {
        title += ' [ 修改 ]'
      } else {
        title += ' [新增 ]'
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
    openSelectMenuDialog () {
      this.$refs.typeDialog.open().then(that => {
        that.initData()
      })
    },
    save () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          api.save(this.form).then(res => {
            this.form.id = res.data.id
            this.loading = false
            this.$message.success('保存成功')
            this.updated = true
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
    selectType (data) {
      this.form.parent_id = data.id
      this.form.parent_menu = data.title
      this.$refs.typeDialog.close()
    },
    isDisable (data) {
      const parentIds = (data.parent_ids || '').split(',')
      return this.isEdit && (data.id == this.form.id || parentIds.indexOf(this.form.id.toString()) >= 0)
    },
    assign (data) {
      // console.log(data)
      this.form = { ...this.form, ...data }
      this.form.order = Number(this.form.order)
      return this
    },
    open () {
      this.show = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
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
    },
    initData (data) {
      this.assign(data)
      this.clearValidate()
    }
  }

}
</script>

<style>
</style>
