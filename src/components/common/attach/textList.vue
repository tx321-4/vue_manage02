<!--
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData() 初始化数据
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行初始化数据
 -->
 <template>
  <div v-loading="loading">
    <span v-for="(item,index) in list" :key="item.id" style="margin-right: 5px">
      <el-tooltip placement="top">
        <div slot="content">
          附件大小:{{ Math.round(item.size/100)/10}} KB | 上传时间：{{$commonJs.formatDate(item.upload_time)}}
          <div v-show="showDel">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-delete"
              @click="delAttach(item, index)"
            >附件删除</el-button>
          </div>
        </div>
        <el-button icon="el-icon-document" type="text" @click="download(item)">{{item.name}}</el-button>
      </el-tooltip>
    </span>
  </div>
</template>

<script>
import attachApi from '@/api/attach'
export default {
  name: 'textList',
  props: {
    showDel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      list: [],
      dataTotal: 0
    }
  },
  created () {

  },
  methods: {
    initData (p) {
      this.initParams = { ...p }
      this.getData()
    },
    reload () {
      this.getData()
    },
    // 获取数据
    getData () {
      this.loading = true
      attachApi.getList({ ...this.requestParams, ...this.params, ...this.initParams }).then(res => {
        this.list = res.data.list
        this.dataTotal = res.data.total
        this.loading = false
      })
    },
    push (data) {
      this.list.push(data)
    },
    clear () {
      this.list = []
      this.dataTotal = 0
    },
    delAttach (item, index) {
      this.$confirm('此操作将删除该文件, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        attachApi.del(item.id, this.delUrl).then(res => {
          this.list.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.$emit('del')
        })
      })
    },
    download (item) {
      attachApi.down(item.id)
    }
  }
}
</script>

 <style lang="scss" scoped>
</style>
