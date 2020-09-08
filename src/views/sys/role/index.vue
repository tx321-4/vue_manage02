<template>
  <div>
    <div style="margin: 10px 0;">
      <el-button-group>
        <el-button type="primary" @click="create" icon="el-icon-edit">创建角色</el-button>
      </el-button-group>
    </div>
    <list ref="list"></list>
  </div>
</template>

<script>
import list from '@/components/sys/role/list'

export default {
  name: 'Role',
  components: {
    list
  },
  methods: {
    create () {

    }
  }
}
</script>

<style>
</style>
