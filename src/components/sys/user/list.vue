<!--
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
 <template>
  <div>
    <!-- 查询条件 -->
    <div style="margin-bottom: 2px">
      <div style="float:right;">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="query"></el-button>
          <el-tooltip content="重置查询条件" placement="top">
            <el-button icon="el-icon-refresh" @click="resetQuery"></el-button>
          </el-tooltip>
          <el-tooltip content="导出Excel" placement="top">
            <el-button icon="el-icon-download" @click="exportExcel"></el-button>
          </el-tooltip>
          <el-tooltip content="显示更多查询条件" placement="top">
            <el-button @click="queryShowMore=!queryShowMore">
              <i :class="{'el-icon-arrow-up':queryShowMore,'el-icon-arrow-down':!queryShowMore}"></i>
            </el-button>
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
        <el-form-item label="登录用户" prop="login_name">
          <el-input v-model="queryParams.login_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="queryParams.name" clearable></el-input>
        </el-form-item>
        <div v-show="queryShowMore">
          <el-form-item label="企业号ID" prop="qywx_user">
            <el-input v-model="queryParams.qywx_user" clearable></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--/ 查询条件 -->
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
      :max-height="maxHeight"
      @selection-change="selectionChange"
      :summary-method="getSummaryData"
      @sort-change="sortChange"
    >
      <el-table-column fixed v-if="showSelection" type="selection" align="center" width="35" />
      <el-table-column prop="login_name" label="登录用户名" min-width="120" show-overflow-tooltip />
      <el-table-column prop="name" label="用户名称" min-width="120" show-overflow-tooltip />
      <el-table-column
        prop="qywx_user"
        label="企业号ID"
        sortable="custom"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="role_names"
        label="所属角色"
        sortable="custom"
        width="150"
        show-overflow-tooltip
      />
      <el-table-column align="center" label="菜单权限" width="80" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="c-link" @click="openMenuDialog(row)">查看</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    init: {
      type: Boolean,
      default: false
    },
    params: {
      default: () => ({})
    },
    showMore: {
      type: Boolean,
      default: false
    },
    showSelection: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inited: false,
      queryShowMore: this.showMore,
      queryParams: {
        login_name: '',
        name: '',
        qywx_user: ''
      },
      // 数据请求的参数
      requestParams: {
        page: 1, // 当前页
        limit: 20, // 分页大小
        sortProp: '',
        sortOrder: ''
      }
    }
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
    getData () {

    },
    // 查询方法
    query ({ key } = {}) {
      if (key) {
        const value = this.queryParams[key]
        this.requestParams = { ...this.requestParams, [key]: value }
      } else {
        this.requestParams = { ...this.requestParams, ...this.queryParams }
      }
      this.getData()
    },
    // 重置查询条件
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.requestParams.page = 1
      this.query()
    },
    exportExcel () {

    },
    openMenuDialog () {

    }
  }
}
</script>

 <style lang="scss" scoped>
</style>
