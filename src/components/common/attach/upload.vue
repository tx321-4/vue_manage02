<template>
  <div>
    <el-upload
      style="margin-bottom: 3px;"
      :list-type="type=='img'?'picture':'text'"
      ref="fileUpload"
      :data="params"
      :action="uploadUrl"
      :auto-upload="false"
      :limit="limit"
      :multiple="!single"
      :on-change="fileChange"
      :before-upload="beforeUpload"
      :disabled="disabled"
    >
      <el-button
        slot="trigger"
        size="mini"
        type="primary"
        :disabled="disabled"
      >选择{{type =='img' ?'图片':'文件'}}</el-button>
      <el-button
        size="mini"
        style="margin-left:5px"
        type="success"
        @click="upload"
        :disabled="disabled"
        v-if="!hideUploadButton"
      >上传</el-button>
      <span slot="tip" class="el-upload__tip">（请先修改好{{type == 'img' ? '图片': '文件'}}名再上传，大小不超过10MB）</span>
    </el-upload>
  </div>
</template>

<script>
import attachApi from '@/api/attach'
import lrz from 'lrz'
export default {
  name: 'Upload',
  props: {
    type: String,
    default: () => {
      'file'
    },
    url: {
      type: String,
      default: ''
    },

    limit: {
      type: Number
    },
    hideUploadButton: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024
    },
    params: {
      type: Object
    },
    imgCompress: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      resolve: null
    }
  },
  computed: {
    uploadUrl () {
      if (this.url) {
        return this.url
      } else {
        if (this.type == 'file') {
          return attachApi.uploadUrl
        } else {
          return attachApi.uploadImgUrl
        }
      }
    }
  },
  methods: {
    fileChange (file, fileList) {
      if (file.status == 'ready') {
        if (file.size > this.maxSize) {
          const index = fileList.indexOf(file)
          fileList.splice(index, 1)
          this.$message.error('文件[' + file.name + ']大小已超过10MB, 无法上传!')
        }
        if (this.type == 'img') {
          if (file.raw.type.indexOf('image/') == -1) {
            const index = fileList.indexOf(file)
            fileList.splice(index, 1)
            this.$message.error('文件[' + file.name + ']不是图片，无法上传!')
          }
        }
      } else if (file.status) {
        const index = fileList.indexOf(file)
        fileList.splice(index, 1)
        if (file.status == 'fail' || file.response.code != 0) {
          this.$norify.error({
            title: '上传失败',
            message: '文件[' + file.name + ']上传失败，请稍后重新上传!' + file.response.message || '',
            duration: 0
          })
        } else {
          this.$emit('uploaded', file.response.data)
        }
        if (fileList.length == 0) {
          if (this.resolve) {
            this.resolve(file.response.data)
            this.resolve = null
          }
          this.$emit('all-uploaded')
        }
      }
    },
    beforeUpload (file) {
      if (this.imgCompress) {
        return new Promise((resolve, reject) => {
          lrz(file).then(res => {
            resolve(res.file)
          })
        })
      } else {
        return true
      }
    },
    getUploadFiles () {
      return this.$refs.fileUpload.uploadFiles
    },
    upload () {
      return new Promise((resolve, reject) => {
        if (this.getUploadFiles().length > 0) {
          this.$refs.fileUpload.submit()
          this.resolve = resolve
        } else {
          resolve()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
