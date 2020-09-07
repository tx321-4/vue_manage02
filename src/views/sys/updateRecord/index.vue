<template>
  <div>
    <div style="margin:10px 0;">
      <el-button-group>
        <el-button type="primary" @click="create" icon="el-icon-edit">创建更新记录</el-button>
      </el-button-group>
    </div>
    <list ref="list">
      <el-table-column slot="column" label="操作" fixed="right" align="center" width="70">
        <template slot-scope="{row, $index}">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)"></el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            style="color:#f78989"
            @click="del(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
  </div>
</template>

<script>
import list from '@/components/sys/updateRecord/list'
import editDialog from '@/components/sys/updateRecord/editDialog'
export default {
  name: 'UpdateRecord',
  components: { list, editDialog },
  data () {
    return {

    }
  },
  methods: {
    create () {
      this.$refs.editDialog.open().then(that => {
        that.create()
      })
    },
    edit (row) {
      this.$refs.editDialog.open().then(that => {
        that.initData(row)
      })
    },
    del (row, index) {
      this.$refs.list.del(row)
    },
    reload (form) {
      form.input_status = 1 // 1:修改：0 ： 添加
      if (form.input_status) {
        const index = this.$refs.list.list.findIndex(v => v.id === form.id)
        this.$refs.list.list.splice(index, 1, form)
        console.log('修改成功')
      } else {
        // this.$refs.list.reload()  线上
        this.$refs.list.list.unshift(form)
        console.log('添加成功')
      }
    }
  }
}
</script>

<style>
</style>
