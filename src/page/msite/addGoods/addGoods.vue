<template>
    <div class="addGoods-container">
         <el-button class="return" v-if="active==1" style="margin-top: 12px;" @click="returnUpper" type="info" plain>返回上一步</el-button>
        <div class="addGoods-box">
            <el-steps :active="active" finish-status="success">
                <el-step title="填写首页商品信息"></el-step>
                <el-step title="填写详情页商品信息"></el-step>
                <el-step title="商品发布成功"></el-step>
            </el-steps>

            <!--==================  步骤1   =================== -->
            <el-form v-if="active==0" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="productName">
                    <el-input type="text" v-model="ruleForm2.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="salePrice">
                    <el-input type="text" v-model="ruleForm2.salePrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品动画" prop="direction">
                    <el-input type="text" v-model="ruleForm2.direction"></el-input>
                </el-form-item>
                <el-upload :disabled="disabled1"
                    class="upload-demo"
                    action="api/goods/test"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileList1"
                    list-type="picture">
                    <el-button @click="indexAdd" class="index-upload" size="small" type="primary" :disabled="disabled1">
                        点击上传(只需上传一张)
                    </el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-button class="nextStep" style="margin-top: 12px;" @click="submitForm('ruleForm2')">下一步</el-button>
                <!-- <el-button @click="addGoods" type="primary">保存</el-button> -->
            </el-form>

             <!--==================  步骤2   =================== -->
            <el-form v-if="active==1" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="productName">
                    <el-input type="text" v-model="ruleForm2.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="salePrice">
                    <el-input type="text" v-model="ruleForm2.salePrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品动画" prop="direction">
                    <el-input type="text" v-model="ruleForm2.direction" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品颜色" prop="colours">
                    <el-input type="text" v-model="ruleForm2.colours" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品尺寸" prop="sizes">
                    <el-input type="text" v-model="ruleForm2.sizes" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="搜索词语" prop="searchText">
                    <el-input type="text" v-model="ruleForm2.searchText" autocomplete="off"></el-input>
                </el-form-item>
                <el-upload
                    class="upload-demo1" :disabled="disabled2"
                    action="api/goods/test"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUploadDetails"
                    :file-list="fileList2"
                    list-type="picture">
                    <el-button size="small" type="primary" @click="detailsxAdd" :disabled="disabled2">点击上传详情小图</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-upload
                    class="upload-demo1" :disabled="disabled3"
                    action="api/goods/test"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUploadDetailsBag"
                    :file-list="fileList3"
                    list-type="picture">
                    <el-button size="small" type="primary" @click="detailsxAdd2" :disabled="disabled3">点击上传详情大图</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form>
            <el-button class="preservation" v-if="active==1" style="margin-top: 12px;" @click="submitForm1('ruleForm2')" type="success">保存</el-button>

            <!--==================  继续发布   =================== -->
            <div v-if="active==3" class="step3-container">
                <p>
                    <span  v-if="active==3" class="iconfont icon-ziyuanldpi"></span>
                    发布成功!
                </p>
                <el-button v-if="active==3" style="margin-top: 12px;" type="success" plain @click="returns">继续发布商品</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      var validateProductName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入商品名称'));
        } else {
          callback();
        }
      };
      var validateSalePrice = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入商品价格'));
        } else {
          callback();
        }
      };
      var checkDirection = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品进入动画不能为空'));
        }else{
            callback();
        }
      };
      var checkColours = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品颜色不能为空'));
        }else{
            callback();
        }
      };
      var checkSizes = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品尺寸不能为空'));
        }else{
            callback();
        }
      };
      var checkSearchText = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品搜索关键字不能为空'));
        }else{
            callback();
        }
      };
      return {
        ruleForm2: {
          productName: '',//商品名称
          salePrice: '',//商品价格
          direction: '',//商品进入动画
          colours:'',//商品颜色
          sizes: '',//商品尺寸,
          searchText:'',//商品搜索关键词
        },
        active: 0,  //步骤
        urlName:'', //图片前部分路径
        fileList1: [],  //首页图
        fileList2: [],  //详情小图
        fileList3: [],  //详情大图
        disabled1:false,
        disabled2:false,
        disabled3:false,
        rules2: {
            productName: [
                { validator: validateProductName, trigger: 'blur' }
            ],
            salePrice: [
                { validator: validateSalePrice, trigger: 'blur' }
            ],
            direction: [
                { validator: checkDirection, trigger: 'blur' }
            ],
            colours: [
                { validator: checkColours, trigger: 'blur' }
            ],
            sizes: [
                { validator: checkSizes, trigger: 'blur' }
            ],
            searchText: [
                { validator: checkSearchText, trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
        //返回上一步
        returnUpper(){
            this.active = 0;
        },
        //继续发布商品
        returns(){
            this.ruleForm2.productName = '';
            this.ruleForm2.salePrice = '';
            this.ruleForm2.direction = '';
            this.ruleForm2.colours = '';
            this.ruleForm2.sizes = '';
            this.ruleForm2.searchText = '';
            this.fileList1 = [];
            this.fileList2 = [];
            this.fileList3 = [];
            this.active = 0;
        },
        //判断首页图数量决定按钮是否能用
        indexAdd(){
            if(this.fileList1.length>0){
                this.disabled1 = true
            }
        },
        //判断详情小图数量决定按钮是否能用
        detailsxAdd(){
            if(this.fileList2.length>4){
                this.disabled2 = true
            }
        },
        //判断详情大图数量决定按钮是否能用
        detailsxAdd2(){
            if(this.fileList3.length>4){
                this.disabled3 = true
            }
        },
        //下一步按钮
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.active==0&&this.fileList1.length!=0){
                    this.next()
                }else{
                    this.$message({
                    message: '请上传首页商品图片',
                    type: 'warning'
                    });
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        submitForm1(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.addGoods()
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // },

        //下一步
        next() {
            if (this.active++ > 2) this.active = 0;
        },

        //删除对应的图片
        handleRemove(file, fileList) {
            console.log(file, fileList);
            for(var i=0;i<this.fileList1.length;i++){
                if(this.fileList1[i].uid == file.uid){
                    this.fileList1.splice(i, 1);
                }
            }
            for(var i=0;i<this.fileList2.length;i++){
                if(this.fileList2[i].uid == file.uid){
                    this.fileList2.splice(i, 1);
                }
            }
            for(var i=0;i<this.fileList3.length;i++){
                if(this.fileList3[i].uid == file.uid){
                    this.fileList3.splice(i, 1);
                }
            }
        },
        handlePreview(file) {
            console.log(file);
        },

        //首页商品图
        beforeAvatarUpload(file) {
            console.log(file.name)
            this.urlName = 'http://back.zhayanwang.com/yingwangkeji/studio_src/116514/'+file.name

            let obj={
            name : '首页图片',
            url : this.urlName + ''
            }
            
            this.fileList1.push(obj)

        },

         //上传商品
        addGoods(){
            // console.log(this.ruleForm2.productName)
            // console.log( this.ruleForm2.salePrice)
            // console.log( this.ruleForm2.direction)

            // console.log( this.fileList1)
            // console.log( this.fileList2)
            // console.log( this.fileList3)

            if(this.active!=0&&this.fileList2.length>4&&this.fileList3.length>4){
                axios.post('api/goods/addGoods', {
                    productName : this.ruleForm2.productName,
                    salePrice   : this.ruleForm2.salePrice,
                    direction   : this.ruleForm2.direction,

                    colours     : this.ruleForm2.colours,
                    sizes       : this.ruleForm2.sizes,
                    searchText  : this.ruleForm2.searchText,

                    fileList1   : this.fileList1,
                    fileList2   : this.fileList2,
                    fileList3   : this.fileList3
                    }).then((response) => {
                    let res = response.data;
                    if (res.status == '0') {
                        console.log('成功')

                        this.active = 2;
                        this.next()
                    } else {
                        console.log('失败' + res.msg)
                    }
                })
                    this.next()
            }else if(!this.ruleForm2.colours||!this.ruleForm2.sizes){
                this.submitForm1()
            }else{
                    this.$message({
                    message: '请上传首页商品图片和详情图不能少于5张',
                    type: 'warning'
                });
            }
        },

        //详情小图
        beforeAvatarUploadDetails(file){
                this.urlName = 'http://back.zhayanwang.com/yingwangkeji/studio_src/116514/'+file.name
                let detailsObj={
                    name : '详情小图',
                    url : this.urlName + ''
                }
            this.fileList2.push(detailsObj)
        },
        //详情大图
        beforeAvatarUploadDetailsBag(file){
                this.urlName = 'http://back.zhayanwang.com/yingwangkeji/studio_src/116514/'+file.name
                let detailsObj={
                    name : '详情大图',
                    url : this.urlName + ''
                }
            this.fileList3.push(detailsObj)
        }
    }
}
</script>

<style lang="scss" scoped>  
.addGoods-container{
    position: relative;
    background: #fff;
    padding: 50px 0px;
    min-height: 700px;
    .return{
        position: absolute;
        top: 0;
        left: 0;
        text-align: right;
        padding:10px 50px;
        border-radius: 0px;
        margin:0 0 20px 20px;
    }
    .addGoods-box{
        width:80%;
        margin: 0 auto;
        padding-top: 20px;
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
        .nextStep{
            padding:10px 50px;
            text-align: right;
            padding:10px 70px;
            border-radius: 0px;
            margin-left: 870px;
        }
        .preservation{
            text-align: right;
            padding:10px 70px;
            border-radius: 0px;
            margin-left: 870px;
        }
        .step3-container{
            width: 100%;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p{
                font-size: 20px;
                .iconfont{
                    font-size: 50px;
                    color: #67c23a;
                }
            }
            .el-button{
                border-radius: 0px;
                padding: 13px 50px;
                margin-top:20px;
            }
        }
    }
}
</style>

<style lang="scss">
.el-steps{
    margin-bottom:30px;
}
.el-form-item{
    color:#000;
}
.upload-demo{
    position: relative;
    width:100%;
    min-height: 200px;
    border:1px solid #ccc;
    padding:10px;
    .el-upload-list{
        display:flex;
        position: absolute;
        bottom:80px;
        .el-upload-list__item{
            width:360px;
        }
    }
    .el-upload__tip{
        position: absolute;
        bottom:55px;
    }
    .index-upload{
        position: absolute;
        bottom:10px;
        padding:10px 40px;
    }
}
.upload-demo1{
    position: relative;
    width:100%;
    min-height: 200px;
    border:1px solid #ccc;
    padding:10px;
    margin-bottom:10px;
    .el-upload-list{
        display:flex;
        position: absolute;
        bottom:80px;
    }
    .el-upload__tip{
        position: absolute;
        bottom:55px;
    }
    .el-button{
        position: absolute;
        bottom:10px;
        padding:10px 40px;
    }
}

</style>

