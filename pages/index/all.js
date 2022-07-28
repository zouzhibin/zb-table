export const column1 = [
    { type:'index', width:60 },
    { name: 'name', label: '姓名',width:80,emptyString:'--' },
    { name: 'age', label: '年纪',},
    { name: 'sex', label: '性别',filters:{0:'男',1:'女'}},
    { name: 'address', label: '地址' },
    { name: 'date', label: '日期', },
    { name: 'province', label: '省份' },
    { name: 'city', label: '城市' },
    { name: 'zip', label: '邮编' },
]
export const column2 = [
    { type:'selection', width:50 },
    { name: 'name', label: '姓名',width:80,emptyString:'--' },
    { name: 'age', label: '年纪',},
    { name: 'sex', label: '性别',filters:{0:'男',1:'女'}},
    { name: 'address', label: '地址' },
    { name: 'date', label: '日期', },
    { name: 'province', label: '省份' },
    { name: 'city', label: '城市' },
    { name: 'zip', label: '邮编' },
]

export const column3 = [
    { type:'selection', fixed:true,width:50 },
    { name: 'name', label: '姓名',fixed:true,width:80,emptyString:'--' },
    { name: 'age', label: '年纪',},
    { name: 'sex', label: '性别',filters:{0:'男',1:'女'}},
    { name: 'address', label: '地址' },
    { name: 'date', label: '日期', },
    { name: 'province', label: '省份' },
    { name: 'city', label: '城市' },
    { name: 'zip', label: '邮编' },
]

export const column4 = [
    { type:'selection', fixed:true,width:50 },
    { name: 'name', label: '姓名',fixed:true,width:80,emptyString:'--' },
    { name: 'age', label: '年纪',sorter:true},
    { name: 'sex', label: '性别',filters:{0:'男',1:'女'}},
    { name: 'address', label: '地址' },
    { name: 'date', label: '日期',sorter:true },
    { name: 'province', label: '省份' },
    { name: 'city', label: '城市' },
    { name: 'zip', label: '邮编' },
]


