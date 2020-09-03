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

  },
  data () {
    return {
      loading: false,
      list: []
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
    push () {

    },
    clear () {

    },
    delAttach () {

    },
    download () {

    }
  }
}
</script>

 <style lang="scss" scoped>
</style>
