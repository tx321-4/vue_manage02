<template>
  <div v-loading="loading">
    <div style="margin-bottom: 5px">
      <el-input placeholder="输入菜单关键字" clearable v-model.trim="filterText"></el-input>
    </div>
    <div :style="treeStyle">
      <el-tree
        node-key="id"
        :show-checkbox="showCheckbox"
        :expand-on-click-node="false"
        highlight-current
        default-expand-all
        :data="data"
        :props="{label: 'title'}"
        ref="treeList"
        :filter-node-method="filterNode"
        @node-click="nodeClick"
        @check="check"
      >
        <span class="_tree-node" slot-scope="{node,data}">
          <span style="font-size: 14px">
            {{data.title}}
            <span v-if="showPath">[{{data.path}}]</span>
          </span>
          <span>
            <slot name="right" :data="data" :node="node"></slot>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import api from '@/api/sys/menu'
export default {
  name: 'TreeList',
  data () {
    return {
      filterText: '',
      loading: false,
      data: [],
      initParams: {},
      requestParams: {
      }
    }
  },
  props: {
    showCheckbox: {
      type: Boolean,
      default: false
    },
    showPath: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    treeStyle () {
      if (this.height == 'auto') {
        return {}
      } else {
        return {
          height: this.height,
          paddingRight: '15px',
          overflow: 'auto'
        }
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.treeList.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    nodeClick (data, node, component) {
      // console.log(node.data)
      this.$emit('node-click', data, node, component)
    },
    check () {

    },
    initData (params = {}) {
      this.initParams = { ...params }
      this.getTreeList()
    },
    getTreeList () {
      this.loading = true
      // console.log(this.initParams)
      api.getTreeList({ ...this.requestParams, ...this.initParams }).then(res => {
        this.data = this.$commonJs.toTreeData(res.data.list)
        this.loading = false
      })
    },
    filter (value) {
      this.filterText = value
    },
    clear () {
      this.data = []
    },
    del (node, data) {
      if (!node.isLeaf) {
        this.$message.error('此类型下有子菜单，无法删除！')
        return false
      }
      const confirmText = '确定删除此菜单吗？'
      this.$confirm(confirmText, '提示', {
        type: 'warning'
      }).then(() => {
        api.del(data.id).then(res => {
          this.$refs.treeList.remove(node)
          this.$message.success('删除成功')
          this.$emit('del')
        })
      })
    },
    getCheckedKeys (leafOnly = false) {
      return this.$refs.treeList.getCheckedKeys(leafOnly)
    },
    setCheckedKeys (keys, leafOnly) {
      return this.$refs.treeList.setCheckedKeys(keys, leafOnly)
    }
  }
}
</script>

<style lang='scss' scoped>
._tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}
</style>
