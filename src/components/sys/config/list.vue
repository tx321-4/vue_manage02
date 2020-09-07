<template>
  <div>
    <!-- 查询条件 -->
    <div style="margin-bottom: 2px">
      <div style="float:right">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="query"></el-button>
          <el-tooltip content="重置查询条件" placement="top">
            <el-button icon="el-icon-refresh" @click="resetQuery"></el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <el-form ref="formQuery" :model="queryParams" label-width="68px" inline size="mini">
        <el-form-item label="参数名称" prop="key">
          <el-input v-model="queryParams.key" clearable @keyup.enter.native="query"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- / 查询条件 -->
    <!-- 数据表格 -->
    <el-table :data="list" ref="tableList" v-loading="loading" highlight-current-row border stripe>
      <el-table-column prop="key" label="参数名称" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="value" label="参数值" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remarks" label="参数说明" min-width="120" show-overflow-tooltip></el-table-column>
      <!-- slot[column] -->
      <slot name="column"></slot>
      <!-- / slot[column] -->
    </el-table>
    <!-- / 数据表格 -->
  </div>
</template>

<script>
import api from '@/api/sys/config'
export default {
  name: 'List',
  data () {
    return {
      queryParams: {
        key: ''
      },
      list: [],
      loading: false
    }
  },
  mounted () {
    this.resetQuery()
  },
  methods: {
    query () {
      this.getData()
    },
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.query()
    },
    // 获取数据
    getData () {
      this.loading = true
      api.getList(this.queryParams).then(res => {
        this.list = res.data.list
        this.loading = false
      })
    }
  }
}
</script>

<style>
</style>
