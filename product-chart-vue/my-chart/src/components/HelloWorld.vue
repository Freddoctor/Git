<style lang="scss">



</style>

<template>

<div class="wraper">
    <header class="header clearfix">
        <aside class="subtitle-h1 left">
            技术指标查询验证
        </aside>
        <section class="subtitle-filter left">
            行情选择：
            <el-select v-model="quoteval" filterable placeholder="请选择">
                <el-option v-for="item in quotation" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            K线类型：
            <el-select v-model="klineval" filterable placeholder="请选择">
                <el-option v-for="item in klinetype" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            K线数量：
            <el-select v-model="klinebars" filterable placeholder="请选择">
                <el-option v-for="item in klinenum" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary">查询</el-button>
        </section>
    </header>
    <section class="main-wraper clearfix">
        <aside class="left-aside left">
            <el-menu default-active="MA" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="2">
                    <template slot="title">
                        <span>主图</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item.key" :key="item.key" v-for="(item,index) in mainplot" @click="handleMainparm(item)">{{ item.key }}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <span>附图</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item.key" :key="item.key" v-for="(item,index) in attachplot" @click="handleMainparm(item)">{{ item.key }} </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </aside>
        <aside class="right-aside left clearfix">
            <h1 v-if="settingOption.key">
              {{settingOption.title}}
              <el-button class="el-icon-setting" @click="saveSetting()" v-if="settingOption.params"><span>&nbsp;保存设置</span></el-button>
            </h1>
            <section class="show-area left">
                <div class="settting" v-if="settingOption.params">
                    <h3>参数设置:</h3>
                    <div class="block" v-for="(item,key) in settingOption.params">
                        <span class="demonstration">{{key}}</span>
                        <span class="box-tag"><el-tag>{{item.value}}</el-tag></span>
                        <el-slider v-model="item.value" class="ls-control" :min="item.min" :max="item.max"></el-slider>
                    </div>
                </div>
                <div class="canvas-highchart" :class="{'isZoom':isZoom}" @dblclick="settingSize()">
                    <CalHighchart :emmitDeliver="emmitDeliver" :addtionDeliver="addtionDeliver" ref="CalHighchart"></CalHighchart>
                </div>
                <div class="chart-table">
                    <el-table class="chart-table-list" :data="tableData" border style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNo" background :page-sizes="[50, 100,150,200]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total">
                    </el-pagination>
                </div>
            </section>
            <article class="show-intro right">
                <h3>指标算法：</h3>
                <p>
                    MA1:MA(CLOSE,P1);
                </p>
                <h3>指标介绍：</h3>
                <p>
                    主图叠加指标
                </p>
            </article>
        </aside>
    </section>
</div>

</template>

<script>

import CalHighchart from '@/components/cal-highchart';
export default {
    name: 'HelloWorld',
    components: {
        CalHighchart
    },
    data() {
        return {
            isZoom: false,
            quoteval: "",
            quotation: [{
                label: '上证指数',
                value: 3000
            }, {
                label: '德豪润达',
                value: 4000
            }],
            klineval: "",
            klinetype: [{
                label: "日线",
                value: 'day'
            }, {
                label: "周线",
                value: 'week'
            }],
            klinebars: "",
            klinenum: [{
                label: 60,
                value: 60
            }, {
                label: 90,
                value: 90
            }, {
                label: 120,
                value: 120
            }],
            mainplot: [{ //主图
                key: "MA",
                value: "MA（移动平均线） ",
                params: {
                    p1: {
                        value: 5,
                        min: 0,
                        max: 100
                    },
                    p2: {
                        value: 10,
                        min: 0,
                        max: 100
                    },
                    p3: {
                        value: 30,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "BOLL",
                value: "BOLL（布林线）",
                params: {
                    p1: {
                        value: 26,
                        min: 0,
                        max: 100
                    },
                    t: {
                        value: 2,
                        min: 0,
                        max: 100
                    },
                }
            }],
            attachplot: [{ //附图
                key: "MACD",
                value: "MACD（指数平滑移动平均线）",
                params: {
                    l: {
                        value: 26,
                        min: 0,
                        max: 100
                    },
                    s: {
                        value: 12,
                        min: 0,
                        max: 100
                    },
                    m: {
                        value: 9,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "RSI",
                value: "RSI（相对强弱指标）",
                params: {
                    p1: {
                        value: 6,
                        min: 0,
                        max: 100
                    },
                    p2: {
                        value: 12,
                        min: 0,
                        max: 100
                    },
                    p3: {
                        value: 24,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "KDJ",
                value: "KDJ（随机指标）",
                params: {
                    n: {
                        value: 9,
                        min: 0,
                        max: 100
                    },
                    p1: {
                        value: 3,
                        min: 0,
                        max: 100
                    },
                    p2: {
                        value: 3,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "W&R",
                value: "W&R（威廉指标）",
                params: {
                    p1: {
                        value: 14,
                        min: 0,
                        max: 100
                    },
                    p2: {
                        value: 24,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "DMI",
                value: "DMI（趋向指标）",
                params: {
                    n: {
                        value: 14,
                        min: 0,
                        max: 100
                    },
                    m: {
                        value: 6,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "DMA",
                value: "DMA（平行线差指标）",
                params: {
                    s: {
                        value: 10,
                        min: 0,
                        max: 100
                    },
                    l: {
                        value: 50,
                        min: 0,
                        max: 100
                    },
                    m: {
                        value: 10,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "CCI",
                value: "CCI（商品通道指标）",
                params: {
                    n: {
                        value: 14,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "OBV",
                value: "OBV（能量潮）",
                params: null
            }, {
                key: "CR",
                value: "CR（能量指标）",
                params: {
                    n: {
                        value: 26,
                        min: 0,
                        max: 100
                    },
                    m1: {
                        value: 5,
                        min: 0,
                        max: 100
                    },
                    m2: {
                        value: 5,
                        min: 0,
                        max: 100
                    },
                    m3: {
                        value: 20,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "ARBR",
                value: "ARBR（情绪指标）",
                params: {
                    n: {
                        value: 26,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "PSY",
                value: "PSY（心理线）",
                params: {
                    n: {
                        value: 12,
                        min: 0,
                        max: 100
                    }
                }
            }, {
                key: "CJBS",
                value: "CJBS（CJBS）",
                params: null
            }],
            pageNo: 1,
            pageSize: 10,
            total: 100,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            key: "",
            settingOption: { //参数设置

            },
            emmitDeliver: { //子组件主图
                key: "MA",
                params: {
                    p1: 5,
                    p2: 10,
                    p3: 30
                }
            },
            addtionDeliver: { //子组件附图
                key: "CJBS",
                params: null
            },
        }
    },
    methods: {
        handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            settingSize() { //缩放图表
                this.isZoom = !this.isZoom;
                this.$refs.CalHighchart.resizeHighchart(this.isZoom);
            },
            saveSetting() { //保存设置更新图表
                var option = null;
                var keys = null;
                var obj = new Object();
                if (this.key == "MA" || this.key == "BOLL") {
                    option = this.settingOption.params;
                    keys = Object.keys(option);
                    for (let i = 0; i < keys.length; i++) {
                        obj[keys[i]] = option[keys[i]].value
                    }
                    this.emmitDeliver = {
                        key: this.settingOption.key,
                        params: obj
                    }
                } else {
                    option = this.settingOption.params;
                    keys = option ? Object.keys(option) : [];
                    for (let i = 0; i < keys.length; i++) {
                        obj[keys[i]] = option[keys[i]].value
                    }
                    this.addtionDeliver = {
                        key: this.settingOption.key,
                        params: obj
                    }
                }
                if (!this.validateParams()) {
                    return false;
                }
                this.$refs.CalHighchart.HighchartInit();
            },
            validateParams() { //验证参数
                if (this.addtionDeliver.key == 'DMA') {
                    if (this.addtionDeliver.params.s <= this.addtionDeliver.params.l) {
                        return true;
                    } else {
                        this.$message.error('数值必须满足s <= l !');
                        return false;
                    }
                }
                if (this.addtionDeliver.key == "CR") {
                    if (this.addtionDeliver.params.m1 <= this.addtionDeliver.params.m2 && this.addtionDeliver.params.m2 <= this.addtionDeliver.params.m3) {
                        return true;
                    } else {
                        this.$message.error('数值必须满足 m1 <= m2 <= m3!');
                        return false;
                    }
                }
                return true;
            },
            handleMainparm(item) { //设置参数
                this.settingOption = {
                    title: item.value,
                    key: (item.key == "W&R" ? "WR" : item.key),
                    params: item.params
                }
                this.key = item.key;
                this.saveSetting(); //更新
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
    }
}

</script>
