<!--
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <!-- 查询条件 -->
    <div style="margin-bottom:2px">
      <div style="float:right;">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="query"></el-button>
          <el-tooltip content="重置查询条件" placement="top">
            <el-button icon="el-icon-refresh" @click="resetQuery"></el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <el-form
        ref="formQuery"
        :model="queryParams"
        class="c-form-condensed"
        label-width="68px"
        inline
        size="mini"
      >
        <el-form-item label="参数名称" prop="key">
          <el-input v-model="queryParams.key" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- / 查询条件 -->
    <!-- 数据表格 -->
    <el-table
      :data="list"
      ref="tableList"
      v-loading="loading"
      highlight-current-row
      border
      stripe
      row-key="id"
      :size="size"
      @selection-change="selectionChange"
      @sort-change="sortChange"
    >
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

  props: {
    size: {
      type: String,
      default: ''
    },
    params: {
      default: () => ({})
    },
    init: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: [],
      loading: false,

      dataTotal: 0,
      initParams: {},
      // 查询条件的字段
      queryParams: {
        key: ''
      }
    }
  },
  created () {

  },
  mounted () {
    if (this.init) {
      this.inited = true
      this.initData()
    }
  },
  methods: {
    // 初始化数据
    initData (params = {}) {
      this.initParams = { ...params }
      this.resetQuery()
    },
    // 获取数据
    getData () {
      this.loading = true
      api.getList(this.queryParams).then(res => {
        this.list = res.data.list
        this.dataTotal = res.data.total
        this.loading = false
      })
    },
    // 查询方法
    query () {
      this.getData()
    },
    // 重置查询条件
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.query()
    },
    selectionChange () {

    },
    sortChange () {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
