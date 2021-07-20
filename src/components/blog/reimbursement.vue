<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="search"
          class="search_name"
          size="mini"
          :placeholder="this.$t('message.searchInput')">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="text"
          @click="onSearch()"
          class="el-icon-search">{{$t('message.searchBtn')}}
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          class="el-icon-refresh"
          type="text"
          @click="refreshData">{{$t('message.shuaxinBtn')}}
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          class="el-icon-circle-plus-outline"
          type="text"
          @click="dialogVisible = true"
          :disabled="adminLevel === '1' ? false : true"
        >{{$t('message.addBtn')}}
        </el-button>
      </el-form-item>
      <!--      <el-form-item>-->
      <!--        <el-button-->
      <!--          id="download"-->
      <!--          class="el-icon-circle-plus-outline"-->
      <!--          type="text"-->
      <!--          @click="download()"-->
      <!--          download="download.csv">导出数据-->
      <!--        </el-button>-->
      <!--      </el-form-item>-->
    </el-form>
    <el-table
      :data="tableData"
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column
        :label="this.$t('message.number')">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="this.$t('message.phone')">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="this.$t('message.email')">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="this.$t('message.adminName')">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <p>性别：{{ scope.row.sex }}</p>
            <div slot="reference" class="name-wrapper">
              <el-button type="text">{{ scope.row.name }}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        :label="this.$t('message.address')">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="this.$t('message.password')" v-if="adminLevel==='1'">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="this.$t('message.authority')">
        <template slot-scope="scope">
          <span style="color: darkblue" v-if="scope.row.authority ===1">高级</span>
          <span style="color: green" v-if="scope.row.authority ===0">普通</span>
        </template>

      </el-table-column>
      <el-table-column
        :label="this.$t('message.operation')"
        fixed="right"
        width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            :disabled="adminLevel === '1' ? false : true"
          >{{$t('message.update')}}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            :disabled="adminLevel === '1' ? false : true"
          >{{$t('message.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
      <el-dialog
        :title="this.$t('message.addBtn')"
        :append-to-body='true'
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <el-input type="hidden" v-model="ruleForm.id"/>
        <!--        <el-form-item label="管理员姓名" prop="userName">-->
        <!--          <el-input v-model="ruleForm.userName"></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="住址" prop="userAddress">-->
        <!--          <el-input v-model="ruleForm.userAddress"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item :label="this.$t('message.adminName')" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.email')" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.address')" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.phone')" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.sex')" prop="sex">
          <el-radio-group  v-model="ruleForm.sex" size="medium">
            <el-radio border label="男">男</el-radio>
            <el-radio border label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="this.$t('message.password')" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.authority')" prop="authority">
          <el-radio-group  v-model="ruleForm.authority" size="medium">
            <el-radio border :label="1">高级</el-radio>
            <el-radio border :label="0">普通</el-radio>
          </el-radio-group>
        </el-form-item>

        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="addUser()" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>
    </el-form>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
      <el-dialog
        :title="this.$t('message.update')"
        :append-to-body='true'
        :visible.sync="dialogUpdate"
        width="80%"
        :before-close="handleClose"
      >

        <el-input type="hidden" v-model="ruleForm.id"/>
        <el-form-item :label="this.$t('message.adminName')"prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.email')" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.address')"prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.phone')" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.sex')" prop="sex">
          <el-radio-group  v-model="ruleForm.sex" size="medium">
            <el-radio border label="男">男</el-radio>
            <el-radio border label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="this.$t('message.pasword')" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('message.authority')" prop="authority">
          <el-radio-group  v-model="ruleForm.authority" size="medium">
            <el-radio border :label="1">高级</el-radio>
            <el-radio border :label="0">普通</el-radio>
          </el-radio-group>
        </el-form-item>

        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="updateAdmin()" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>
    </el-form>
    <br>
    <div class="pages">
      <el-pagination
        background
        :disabled = "disablePage"
        :current-page.sync="currentPage"
        small
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        sex: '',
        name: '',
        authority:''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入住址', trigger: 'blur' },
          { min: 5, message: '长度大于 5 个字符', trigger: 'blur' }
        ],
      },
      tableData: [],
      search: '',
      dialogVisible: false,
      dialogUpdate: false,
      pageSize: 5,
      currentPage: 1,
      total: 0,
      disablePage: false,
      adminLevel: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      this.dialogUpdate = true;
      this.ruleForm = Object.assign({}, row); //这句是关键！！！
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = this.qs.stringify({
          id: row.id,
        });
        this.axios({
          method: 'post',
          url:'/deleteAdmin',
          data:postData
        }).then(response =>
        {
          this.getPages();
          this.currentPage = 1;
          this.axios.post('/pageAdmin').then(response =>
          {
            this.tableData = response.data;
          }).catch(error =>
          {
            console.log(error);
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          console.log(response);
        }).catch(error =>
        {
          console.log(error);
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCurrentChange() {
      console.log(`当前页: ${this.currentPage}`);
      let postData = this.qs.stringify({
        page: this.currentPage
      });
      this.axios({
        method: 'post',
        url:'/pageAdmin',
        data:postData
      }).then(response =>
      {
        this.tableData = response.data;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    cancel() {
      this.dialogUpdate = false;
      this.dialogVisible = false;
      this.emptyUserData();
    },
    emptyUserData(){
      this.ruleForm = {
        userName: '',
        userDate: '',
        userAddress: ''
      }
    },
    addUser() {
      let postData = this.qs.stringify({
        email: this.ruleForm.email,
        password: this.ruleForm.password,
        phone: this.ruleForm.phone,
        address: this.ruleForm.address,
        sex: this.ruleForm.sex,
        name: this.ruleForm.name,
        authority: this.ruleForm.authority
      });
      this.axios({
        method: 'post',
        url:'/insertAdmin',
        data:postData
      }).then(response =>
      {
        this.axios.post('/pageAdmin').then(response =>
        {
          this.tableData = response.data;
          this.currentPage = 1;
          this.$message({
            type: 'success',
            message: '已添加!'
          });
        }).catch(error =>
        {
          console.log(error);
        });
        this.getPages();
        this.dialogVisible = false
        console.log(response);
      }).catch(error =>
      {
        console.log(error);
      });
    },
    updateAdmin() {
      let postData = this.qs.stringify({
        id: this.ruleForm.id,
        email: this.ruleForm.email,
        password: this.ruleForm.password,
        phone: this.ruleForm.phone,
        address: this.ruleForm.address,
        sex: this.ruleForm.sex,
        name: this.ruleForm.name,
        authority: this.ruleForm.authority
      });
      this.axios({
        method: 'post',
        url:'/updateAdmin',
        data:postData
      }).then(response =>
      {
        this.handleCurrentChange();
        this.cancel();
        this.$message({
          type: 'success',
          message: '更新成功!'
        });
        console.log(response);
      }).catch(error =>
      {
        this.$message({
          type: 'success',
          message: '更新失败!'
        });
        console.log(error);
      });
    },
    onSearch() {
      let postData = this.qs.stringify({
        userName: this.search
      });
      this.axios({
        method: 'post',
        url: '/ListByNameAdmin',
        data: postData
      }).then(response =>
      {
        this.tableData = response.data;
        this.disablePage = true;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    getPages() {
      this.axios.post('/rowsAdmin').then(response =>
      {
        console.log(response.data)
        this.total = response.data;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    refreshData() {
      location.reload();
    },
    // download: function() {
    //     console.log(this.tableData)
    //     var obj = document.getElementById('download');
    //     var str = "日期,姓名,住址\n";
    //     for (var i = 0; i < this.tableData.length; i++) {
    //         var item = this.tableData[i];
    //         str += item.userDate + ',' + item.userName + ',' + item.userAddress;
    //         str += "\n";
    //     }
    //     str = encodeURIComponent(str);
    //     obj.href = "data:text/csv;charset=utf-8,\ufeff" + str;
    //     obj.download = "学生数据.csv";
    // },
  },
  created() {
    /*this.axios.get('static/user.json').then(response =>
    {
        this.tableData = response.data.tableData;
        this.total = response.data.tableData.length;
        // console.log(JSON.parse(JSON.stringify(response.data))['tableData'])
    });*/
    this.adminLevel =  localStorage.getItem('authority');
    this.axios.post('/pageAdmin').then(response =>
    {
      this.tableData = response.data;
    }).catch(error =>
    {
      console.log(error);
    });

    this.axios.post('/rowsAdmin').then(response =>
    {
      this.total = response.data;
    }).catch(error =>
    {
      console.log(error);
    });

  },
}
</script>
<style scoped>
.search_name{
  width: 200px;
}
.pages{
  margin: 0px;
  padding: 0px;
  text-align: right;
}
</style>
