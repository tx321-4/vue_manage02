<template>
  <div>
    <el-form ref="formQuery" :model="queryParams" inline sieze="mini">
      <el-form-item prop="keyword" style="max-width: 150px;">
        <el-input
          v-model="queryParams.keyword"
          placehoder="根据关键词查询"
          clearable
          prefix-icon="el-cion-search"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UpdateRecord',
  data () {
    return {
      loading: false,
      list: [],
      unreadTotal: 0,
      dataTotal: 0,
      queryParams: {
        keyword: ''
      },
      requestParams: {
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  created () {
    this.getDate()
  },
  methods: {
    getData () {
      this.loading = true
      // indexApi.getUpdateRecordList(this.requestParams).then(res => {
      //   this.list = res.list
      //   this.dataTotal = res.total
      //   this.loading = false
      // })
    },
    query () {
      this.requestParams = Object.assign({}, this.requestParams, this.queryParams)
      this.getData()
    },
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.query()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
