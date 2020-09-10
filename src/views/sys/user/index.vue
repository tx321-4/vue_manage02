<template>
  <div>
    <div style="margin:10px 0px">
      <el-button-group>
        <el-button type="primary" @click="create" icon="el-icon-edit">创建用户</el-button>
      </el-button-group>
    </div>
    <list ref="list">
      <el-table-column slot="column" label="操作" fixed="right" align="center" width="70">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
          <el-button
            size="mini"
            type="text"
            style="color:#f78989"
            icon="el-icon-delete"
            @click="del(row, $index)"
          />
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
  </div>
</template>

<script>
import list from '@/components/sys/user/list'
import editDialog from '@/components/sys/user/editDialog'
export default {
  name: 'User',
  components: {
    list,
    editDialog
  },
  data () {
    return {

    }
  },
  methods: {
    create () {
      this.$refs.editDialog.open().then(that => {

      })
    },
    edit (row) {
      console.log(row.id)
      if (row.id == -1) {
        this.$message.error('该用户为系统超级用户, 禁止修改！')
        return false
      }
      this.$refs.editDialog.open().then(that => {
        that.initData(row)
      })
    },
    del (row, index) {
      this.$refs.list.del(row, index)
    },
    reload () {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
