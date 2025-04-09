<template>
    <el-table :data="tableData" stripe border style="min-width: 100%" :row-style="rowStyle">
        <el-table-column align="center" label="网站用户信息表">
            <el-table-column>
                <el-table-column align="center" type="index" label="序号" width="80" />
            </el-table-column>
            <el-table-column>
                <el-table-column align="center" prop="id" label="用户id" width="180" />
            </el-table-column>
            <el-table-column>
                <el-table-column align="center" prop="userName" label="用户名" width="180" />
            </el-table-column>
            <el-table-column>
                <el-table-column align="center" prop="nickName" label="昵称" width="180">
                    <template #default="scope">
                        <el-input v-if="scope.row.editing" v-model="scope.row.nickName" />
                        <span v-else>{{ scope.row.nickName }}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="个人信息">
                <el-table-column align="center" prop="name" label="姓名" width="180">
                    <template #default="scope">
                        <el-input v-if="scope.row.editing" v-model="scope.row.name" />
                        <span v-else>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="age" label="年龄" width="180">
                    <template #default="scope">
                        <el-input v-if="scope.row.editing" v-model="scope.row.age" />
                        <span v-else>{{ scope.row.age }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mobile" label="手机号" width="180">
                    <template #default="scope">
                        <el-input v-if="scope.row.editing" v-model="scope.row.mobile" />
                        <span v-else>{{ scope.row.mobile }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="email" label="邮箱" width="180">
                    <template #default="scope">
                        <el-input v-if="scope.row.editing" v-model="scope.row.email" />
                        <span v-else>{{ scope.row.email }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="cardNumber" label="身份证号" width="180">
                    <template #default="scope">
                        <el-input v-if="scope.row.editing" v-model="scope.row.cardNumber" />
                        <span v-else>{{ scope.row.cardNumber }}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column>
                <el-table-column align="center" prop="registrationTime" label="注册时间" width="300" />
            </el-table-column>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="180">
            <template #default="scope">
                <el-button v-if="!scope.row.editing" @click="editRow(scope.row)">编辑</el-button>
                <el-button v-else @click="saveRow(scope.row)">保存</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
    import { getUserList } from '@/api/user'
    import { updateUser } from '@/api/login'
    import { ref } from 'vue'

    const tableData = ref([])

    onMounted(async () => {
        const res = await getUserList()
        tableData.value = res.data.map(item => ({ ...item, editing: false }))
    })

    function rowStyle() {
        return { height: '50px' } // 设置行高为50px
    }

    function editRow(row) {
        row.editing = true
    }

    async function saveRow(row) {
        const res = await updateUser({
            id: row.id,
            nickName: row.nickName,
            name: row.name,
            age: row.age,
            mobile: row.mobile,
            email: row.email,
            cardNumber: row.cardNumber
        })
        if (res?.code === 200) {
            ElMessage.success('操作成功！')
            row.editing = false
            await getUserList()
        }
    }
</script>

<style lang="less" scoped></style>