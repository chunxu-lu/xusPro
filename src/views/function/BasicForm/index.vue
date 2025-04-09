<template>
    <div class="container">
        <!-- 修改表单搜索区域 -->
        <el-form :inline="true" :model="searchForm" class="search-form">
            <el-form-item label="商品名称">
                <el-input v-model="searchForm.productName" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="商品编码">
                <el-input v-model="searchForm.productCode" placeholder="请输入商品编码" />
            </el-form-item>
            <el-form-item label="商品分类">
                <el-input v-model="searchForm.category" placeholder="请输入商品分类" />
            </el-form-item>
            <el-form-item label="供应商">
                <el-input v-model="searchForm.supplier" placeholder="请输入供应商" />
            </el-form-item>
            <el-form-item label="生产日期">
                <el-date-picker v-model="searchForm.productionDate" type="date" placeholder="选择生产日期" format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="最后更新时间">
                <el-date-picker v-model="searchForm.lastUpdatedRange" type="daterange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                    style="width: 100%;" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">搜索</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
                <el-button type="primary" @click="onCreat">新增</el-button>
                <el-button type="primary" @click="onDelete">删除</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" stripe border style="min-width: 100%;" max-height="1000" :row-style="rowStyle"
            class="custom-table" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column align="center" type="index" label="序号" width="80" />
            <el-table-column align="center" prop="id" label="商品id" width="180" />
            <el-table-column align="center" prop="productName" label="商品名称" />
            <el-table-column align="center" prop="productCode" label="商品编码" width="180" />
            <el-table-column align="center" prop="category" label="商品分类" width="180" />
            <el-table-column align="center" prop="currentStock" label="当前库存" width="180" />
            <el-table-column align="center" prop="price" label="单价" width="180" />
            <el-table-column align="center" prop="supplier" label="供应商" width="180" />
            <el-table-column align="center" prop="productionDate" label="生产日期" />
            <el-table-column align="center" prop="isActive" label="是否上架(1是 0否)" width="180" />
            <el-table-column align="center" prop="lastUpdated" label="最后更新时间" width="300" />
        </el-table>
        <div class="pagination-container">
            <el-pagination background v-model:current-page="pageObj.page" v-model:page-size="pageObj.size"
                layout="prev, pager, next, jumper,total" :total="pageObj.total" @change="getList" />
        </div>

        <!-- 新增弹窗 -->
        <el-dialog v-model="dialogVisible" title="新增商品" width="20%" :class="{ 'dark-theme': useThemeStore().theme }">
            <el-form :model="createForm" label-width="100px" style="margin-bottom: 20px;">
                <el-form-item label="商品名称">
                    <el-input v-model="createForm.productName" placeholder="请输入商品名称" />
                </el-form-item>
                <el-form-item label="商品编码">
                    <el-input v-model="createForm.productCode" placeholder="请输入商品编码" />
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-input v-model="createForm.category" placeholder="请输入商品分类" />
                </el-form-item>
                <el-form-item label="供应商">
                    <el-input v-model="createForm.supplier" placeholder="请输入供应商" />
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="createForm.currentStock" placeholder="请输入库存" />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="createForm.price" placeholder="请输入价格" />
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-date-picker v-model="createForm.productionDate" type="date" placeholder="选择生产日期"
                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" style="width: 100%;" />
                </el-form-item>
                <el-form-item label="是否上架">
                    <el-switch v-model="createForm.isActive" active-text="是" inactive-text="否" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSubmit">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
    import { getProductList, addProduct,deleteProducts } from '@/api/login'
    import { ref, reactive, onMounted } from 'vue'
    import { useThemeStore } from '@/pinia/modules/theme'

    const dialogVisible = ref(false)
    const tableData = ref([])
    const multipleSelection = ref([])
    const pageObj = reactive({
        page: 1,
        size: 10,
        total: 0
    })

    const initialFormState = {
        productName: '',
        productCode: '',
        category: '',
        supplier: '',
        productionDate: '',
        lastUpdatedRange: []
    };

    const initialCreateFormState = {
        productName: '',
        productCode: '',
        category: '',
        supplier: '',
        productionDate: '',
        currentStock: '',
        price: '',
        isActive: false
    };

    const createForm = reactive({
        ...initialCreateFormState
    })

    // 修改搜索条件的响应式变量
    const searchForm = reactive({
        ...initialFormState
    })

    onMounted(async () => {
        await getList()
    })

    function rowStyle() {
        return { height: '50px' } // 设置行高为50px
    }

    // 修改 getList 方法以支持搜索条件
    async function getList() {
        const params = {
            page: pageObj.page,
            size: pageObj.size,
            productName: searchForm.productName,
            productCode: searchForm.productCode,
            category: searchForm.category,
            supplier: searchForm.supplier,
            productionDate: searchForm.productionDate,
            lastUpdatedStart: searchForm.lastUpdatedRange ? searchForm.lastUpdatedRange[0] : '',
            lastUpdatedEnd: searchForm.lastUpdatedRange ? searchForm.lastUpdatedRange[1] : ''
        }
        const res = (await getProductList(params)).data
        tableData.value = res.list
        pageObj.total = res.total
    }

    // 新增搜索方法
    function onSearch() {
        pageObj.page = 1 // 搜索时重置页码
        getList()
    }

    function onReset() {
        Object.assign(searchForm, initialFormState);
        onSearch()
    }

    function onCreat() {
        dialogVisible.value = true
    }

    async function handleSubmit() {
        createForm.isActive = createForm.isActive ? 1 : 0
        await addProduct(createForm)
        ElMessage.success('新增成功')
        // 提交表单逻辑
        dialogVisible.value = false
        Object.assign(createForm, initialCreateFormState)
        onSearch()
    }

    function handleSelectionChange(val) {
        multipleSelection.value = val
    }

    async function onDelete() {
        const arr = multipleSelection.value.map(item => item.id)
        console.log("删除", arr.join(","))
        await deleteProducts({ ids: arr.join(",") })
        ElMessage.success('删除成功')
        onSearch()
    }
</script>

<style scoped lang="scss">
    .container {
        padding: 20px;
        background-color: var(--el-bg-color);
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
    }

    .search-form {
        margin-bottom: 20px;
        background-color: var(--el-bg-color);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
    }

    .custom-table {
        margin-top: 20px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--el-border-color);
        transition: border-color 0.3s ease;
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        background-color: var(--el-bg-color);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
    }
</style>