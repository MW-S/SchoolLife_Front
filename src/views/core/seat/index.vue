<template>
  <div class="app-container">
    <el-button style="margin-bottom: 10px;" @click="handleCreate">添加</el-button>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!-- <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="座位号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在教室"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作为状态"  align="center" >
        <template slot-scope="{row}">
          <span>{{ stateText[row.state] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button  type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button  type="primary" size="mini" @click="handleModifyStatus(row.id, row.state)">
            {{row.state == "false"?"占用":"空闲" }}
          </el-button>
          <el-button  size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="display: flex-direction: column;align-items: center;justify-content: center;">
        <el-form-item label="座位号" prop="code">
          <el-input v-model="temp.code" type="text" />
        </el-form-item>
        <el-form-item label="所属教室" prop="location">
          <el-input v-model="temp.location" type="text" />
        </el-form-item>
        <el-form-item label="状态" prop="code">
          <el-select v-model="temp.state" >
            <el-option key="false" label="空闲" value="false"></el-option>
            <el-option key="true" label="占用" value="true"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <!--    <el-dialog title="文件上传" :visible.sync="false" width="500px" style="padding:0;" @close="resetAdd()">
      文件名称：<el-input v-model="addFileName" autocomplete="off" size="small" style="width: 300px;" />
      <div class="add-file-right" style="height:70px;margin-left:100px;margin-top:15px;">
        <div class="add-file-right-img" style="margin-left:70px;">上传文件：</div>
        <input ref="clearFile" type="file" multiple="multiplt" class="add-file-right-input" style="margin-left:70px;" accept=".docx,.doc,.pdf" @change="getFile($event)">
        <span class="add-file-right-more">支持扩展名：.doc .docx .pdf </span>
      </div>
      <div class="add-file-list">
        <ul>
          <li v-for="(item, index) in addArr" :key="index"><a>{{ item.name }}</a></li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="submitAddFile()">开始上传</el-button>
        <el-button size="small" @click="resetAdd()">全部删除</el-button>
      </div>
    </el-dialog> -->
    <el-dialog title="文件上传" :visible.sync="dialogAddFile">
      <upload :id="temp.id" @child-event="uploadSuccess" />
    </el-dialog>

  </div>
</template>

<script>
import { getList, getById, save, delByIds } from '@/api/common'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Upload from '@/components/Upload'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'Seat',
  components: { Pagination, Upload },
  directives: { waves },
  filters: {
    statusCOntent(status) {
      const statusMap = ['Starting', 'Finished']
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      stateText:{ "false" : "空闲", "true" : "已占用"},
      target: "seat",
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        isAdmin: false,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        name: '',
        location: '',
        pictures: undefined
      },
      tempRow: '',
      users: [],
      dialogAddFile: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'change' }],
        type: [{ required: true, message: 'type is required', trigger: 'change' }]
      },
      downloadLoading: false,
      addArr: [],
      addType: '',
      addId: '',
      addFileName: ''
    }
  },
  created() {
    this.listQuery.isAdmin = this.$store.state.user.isAdmin
    this.getList()
  },
  methods: {
    uploadSuccess(data) {
      console.log(data)
      this.dialogAddFile = data
      this.$notify({
        title: 'Success',
        message: 'Upload Successfully',
        type: 'success',
        duration: 2000
      })
      const tempData = Object.assign({}, this.temp)
      updateTask(tempData).then(() => {
        const index = this.list.findIndex(v => v.id === tempData.id)
        this.list.splice(index, 1, tempData)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    /*    getFile(event) {
      var file = event.target.files
      for (var i = 0; i < file.length; i++) {
      //    上传类型判断
        var imgName = file[i].name
        var idx = imgName.lastIndexOf('.')
        if (idx != -1) {
          var ext = imgName.substr(idx + 1).toUpperCase()
          ext = ext.toLowerCase()
          if (ext != 'pdf' && ext != 'doc' && ext != 'docx') {
          } else {
            this.addArr.push(file[i])
          }
        }
      }
    },
    submitAddFile() {
      return new Promise((resolve, reject) => {
        if (this.addArr.length == 0) {
          this.$message({
            type: 'info',
            message: '请选择要上传的文件'
          })
          return
        }
        var formData = new FormData()
        formData.append('num', this.addType)
        formData.append('linkId', this.addId)
        formData.append('rfilename', this.addFileName)
        for (var i = 0; i < this.addArr.length; i++) {
          formData.append('fileUpload', this.addArr[i])
        }
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': this.token
          }
        }
        this.axios.post('', formData, config)
          .then((response) => {
            if (response.data.info == 'success') {
              this.$message({
                type: 'success',
                message: '附件上传成功!'
              })
            }
          })
      })
    }, */
    resetAdd() {
      this.addArr = []
    },
    getList() {
      this.listLoading = true
      getList(this.target, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.size
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(id, state) {
       this.resetTemp();
      this.temp.id = id;
      this.temp.state = (state == "false"? "true":"false");
      save(this.target, this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        type: '',
        descript: '',
        state: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    saveData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          save(this.target, this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(obj){
      this.dialogFormVisible = true;
      this.temp = Object.assign({},obj);
    },
    handleDelete(row, index) {
      delByIds(this.target, {ids: [row.id]} ).then(() => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
