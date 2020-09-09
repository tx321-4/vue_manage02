<template>
  <div>
    <div style="margin: 10px 0;">
      <el-button-group>
        <el-button type="primary" @click="create" icon="el-icon-edit">创建角色</el-button>
      </el-button-group>
    </div>
    <list ref="list">
      <el-table-column slot="column" label="操作" fixed="right" align="center" width="70">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)"></el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            style="color:#f78989"
            @click="del(row,$index)"
          ></el-button>
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
  </div>
</template>

<script>

import list from '@/components/sys/role/list'
import editDialog from '@/components/sys/role/editDialog'
export default {
  name: 'Role',
  components: {
    list,
    editDialog
  },
  methods: {
    create () {
      this.$refs.editDialog.open().then(thata => {

      })
    },
    edit (row) {
      if (row.id == -1) {
        this.$message.error('该角色为系统超级角色，禁止修改！')
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

<style>
</style>
