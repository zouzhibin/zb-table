export default {
    props:{
        scrollbarSize:{
            type:Number,
            default:0
        },
        fixedLeftColumns:{
            type:Array,
            default:()=>[]
        },
        data:{
            type:Array,
            default:()=>[]
        },
        transColumns:{
            type:Array,
            default:()=>[]
        },
        border:{
            type:Boolean,
            default:false
        },
        showSummary:{
            type:Boolean,
            default:false
        },
        summaryMethod:{
            type:Function
        },
        sumText:{
            type:String,
            default:'合计'
        },
        headerFooterTableLeft:{
            type:Number,
            default:0
        },
        handleFooterTableScrollLeft:Function,
    },
    data(){
        return{
            sums:[]
        }
    },
    watch:{
        'data':{
            deep:true,
            immediate:true,
            handler(newValue,oldValue){
                let sums = [];
                if (this.summaryMethod) {
                    sums = this.summaryMethod({ columns: this.transColumns, data: this.data });
                } else {
                    this.transColumns.forEach((column, index) => {
                        if (index === 0) {
                            sums[index] = this.sumText;
                            return;
                        }
                        const values = this.data.map(item => Number(item[column.name]));
                        const precisions = [];
                        let notNumber = true;
                        values.forEach(value => {
                            if (!isNaN(value)) {
                                notNumber = false;
                                let decimal = ('' + value).split('.')[1];
                                precisions.push(decimal ? decimal.length : 0);
                            }
                        });
                        const precision = Math.max.apply(null, precisions);
                        if (!notNumber) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return parseFloat((prev + curr).toFixed(Math.min(precision, 20)));
                                } else {
                                    return prev;
                                }
                            }, 0);
                        } else {
                            sums[index] = '';
                        }
                    });
                }
                this.sums = sums
            },
        }
    }
}
