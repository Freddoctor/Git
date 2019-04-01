<style lang="scss">
.mar_20 {
  margin-right: 20px;
}
</style>

<template>
  <div class="wraper">
    <header class="header clearfix">
      <aside class="subtitle-h1 left">技术指标查询验证</aside>
      <section class="subtitle-filter left">
        行情选择：
        <el-select class="mar_20" v-model="quoteval" filterable placeholder="请选择">
          <el-option
            v-for="item in quotation"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>K线类型：
        <el-select class="mar_20" v-model="klineval" filterable placeholder="请选择">
          <el-option
            v-for="item in klinetype"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>K线数量：
        <el-select class="mar_20" v-model="klinebars" filterable placeholder="请选择">
          <el-option
            v-for="item in klinenum"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary">查询</el-button>
      </section>
    </header>
    <section class="main-wraper clearfix">
      <aside class="left-aside left">
        <el-menu
          default-active="MA"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="2">
            <template slot="title">
              <span>主图</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.key"
                :key="item.key"
                v-for="(item,index) in mainplot"
                @click="handleMainparm(item)"
                :disabled="isClick"
              >{{ item.key }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>附图</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.key"
                :key="item.key"
                v-for="(item,index) in attachplot"
                @click="handleMainparm(item)"
                :disabled="isClick"
              >{{ item.key }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </aside>
      <aside class="right-aside left clearfix" v-loading="isClick">
        <h1 v-if="settingOption.key">
          {{settingOption.title}}
          <el-button
            class="el-icon-setting"
            :disabled="isClick"
            @click="saveSetting()"
            v-if="settingOption.params"
          >
            <span>&nbsp;保存设置</span>
          </el-button>
        </h1>
        <section class="show-area left">
          <div class="settting" v-if="settingOption.params">
            <h3>参数设置:</h3>
            <div class="block" v-for="(item,key) in settingOption.params">
              <span class="demonstration">{{key}}</span>
              <span class="box-tag">
                <el-tag>{{item.value}}</el-tag>
              </span>
              <el-slider v-model="item.value" class="ls-control" :min="item.min" :max="item.max"></el-slider>
            </div>
          </div>
          <div class="canvas-highchart" :class="{'isZoom':isZoom}" @dblclick="settingSize()">
            <CalHighchart
              :emmitDeliver="emmitDeliver"
              :addtionDeliver="addtionDeliver"
              ref="CalHighchart"
            ></CalHighchart>
          </div>
          <div class="chart-table">
            <el-table class="chart-table-list" :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNo"
              background
              :page-sizes="[50, 100,150,200]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>
        </section>
        <article class="show-intro right">
          <h3>指标算法：</h3>
          <p v-if="settingOption.methods">{{settingOption.methods.content}}</p>
          <h3>指标介绍：</h3>
          <p v-if="settingOption.introduce">{{settingOption.introduce.content}}</p>
        </article>
      </aside>
    </section>
    <chart></chart>
    {{computedName}}
  </div>
</template>

<script>
import CalHighchart from "@/components/cal-highchart";
import chart from "@/components/chart";
export default {
  name: "HelloWorld",
  components: {
    CalHighchart,
    chart
  },
  data() {
    return {
      isZoom: false,
      isClick: false,
      quoteval: "",
      quotation: [
        {
          label: "上证指数",
          value: 3000
        },
        {
          label: "德豪润达",
          value: 4000
        }
      ],
      klineval: "",
      klinetype: [
        {
          label: "日线",
          value: "day"
        },
        {
          label: "周线",
          value: "week"
        }
      ],
      klinebars: "",
      klinenum: [
        {
          label: 60,
          value: 60
        },
        {
          label: 90,
          value: 90
        },
        {
          label: 120,
          value: 120
        }
      ],
      mainplot: [
        {
          //主图
          key: "MA",
          value: "MA（移动平均线） ",
          methods: {
            content: `MA1:MA(CLOSE,P1);
            MA2:MA(CLOSE,P2);
            MA3:MA(CLOSE,P3);`
          },
          introduce: {
            content: ` 葛氏八法则:
            1. 平均线从下降逐渐走平，当股价从平均线的下方突破平均线时是为买进信号。
            2. 股价连续上升远离平均线之上，股价突然下跌，但未跌破上升的平均线，股价又再度上升时，可以加码买进。
            3. 股价虽一时跌至平均线之下，但平均线仍在上扬且股价不久马上又恢复到平均线之上时，仍为买进信号。
            4. 股价跌破平均线之下，突然连续暴跌，远离平均线时，很可能再向平均线弹升，这也是买进信号。
            5. 股价急速上升远超过上升的平均线时，将出现短线的回跌，再趋向于平均线，这是卖出信号。
            6. 平均线走势从上升逐渐走平转弯下跌，而股价从平均线的上方，往下跌破平均线时，应是卖出信号。
            7. 股价跌落于平均线之下，然后向平均线弹升，但未突破平均线即又告回落，仍是卖出信号。
            8. 股价虽上升突破平均线，但立刻又恢复到平均线之下而此时平均线又继续下跌，则是卖出信号。 `
          },
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
        },
        {
          key: "BOLL",
          value: "BOLL（布林线）",
          methods: {
            content: `
              DIS:=STDP(CLOSE,SD);
              MID:MA(CLOSE,SD);
              UPPER:MID+WIDTH*DIS;
              LOWER:MID-WIDTH*DIS;
            `
          },
          introduce: {
            content: `
            BOLL由JOHN BOLLINGER所创，先计算股价的“标准差”，再求取股价的“信赖区间”而得，是一个路径型指标，由上限和下限两条线，构成一个带状的路径。股价超越上限时，代表超买，股价超越下限时，代表超卖。股价游走在“上限”和“下限”的带状间内，这条带状区的宽窄，随着股价波动幅度的大小而变化，股价涨跌幅度加大时，带状区会变宽，涨跌幅度狭小盘整时，带状区会变窄。 也就是说，布林线是属于变异性的，可以随着股性的变化而自动调整位置。
            计算方法 :
            MID=MA(CLOSE,PERIOD);
            UPPER=MID + TIMES*STD(CLOSE,PERIOD);
            LOWER=MID - TIMES*STD(CLOSE,PERIOD);
            应用法则:
            1.当布林线的带状区呈水平方向移动时，可以视为处于“常态范围”。此时，股价向上穿越“上限”时，将形成短期回档，为短线的卖出信号；股价向下穿越“下限”时，将形成短期反弹，为短线的买进时机。
            2.当带状区朝右上方和右下方移动时，则属于脱离常态。当股价连续穿越“上限”，暗示股价将朝上涨方向前进；当股价连续穿越“下限”，暗示股价将朝下跌方向前进;
            `
          },
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
            }
          }
        }
      ],
      attachplot: [
        {
          //附图
          key: "MACD",
          value: "MACD（指数平滑移动平均线）",
          methods: {
            content: `
            DIF:EMA(CLOSE,SHORT)-EMA(CLOSE,LONG);
            DEA:EMA(DIF,M);
            MACD:(DIF-DEA)*2;`
          },
          introduce: {
            content: `
            原名是Moving Average Convergence and Divergence。本指标是一个很流行又管用的指标，可以去除掉移动平均线频烦的假讯号缺陷又能确保移动平均线最大的战果。
            计算公式：
                MACD是利用两条不同速度（长期与中期）的平滑移动平均线 （EMA）来计算二者之间的差离状况作为研判行情的基础。在绘制的图形上，DIF与DEA形成了两条快慢移动平均线，买进卖出信号也就决定于这两条线的交叉点。很明显，MACD是一个中长期趋势的投资技术工具。
            DIF＝EMA（CLOSE，SHORT）－EMA（CLOSE，LONG）;
            DEA＝EMA（DIF，MID）;
            MACD＝（DIF－DEA）*2;
            其中LONG=26，SHORT=12，MID=9;
            缺省时，系统在副图上绘制SHORT=12，LONG=26， MID=9时的DIF线、DEA线、MACD线（柱状线）。
            用法：
              1.DIFF、DEA均为正，DIFF向上突破DEA，买入信号。
              2.DIFF、DEA均为负，DIFF向下跌破DEA，卖出信号。
              3.DEA线与K线发生背离，行情反转信号。
              4.分析MACD柱状线，由红变绿(正变负)，卖出信号；由绿变红，买入信号。
              5．MACD在0界限以上为多头市场，反之为空头市场。
              6．日线、周线、月线、分钟线配合运用效果会更好。
            `
          },
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
        },
        {
          key: "RSI",
          value: "RSI（相对强弱指标）",
          methods: {
            content: `
              LC:=REF(CLOSE,1);
              TEMP1:=MAX(CLOSE-LC,0);
              TEMP2:=ABS(CLOSE-LC);
              RSI1:SMA(TEMP1,P1,1)/SMA(TEMP2,P1,1)*100;
              RSI2:SMA(TEMP1,P2,1)/SMA(TEMP2,P2,1)*100;
              RSI3:SMA(TEMP1,P3,1)/SMA(TEMP2,P3,1)*100;
            `
          },
          introduce: {
            content: `
              原名是 Relative Strength Index是一个使用很普遍的指标，在一个正常的股市中，只有多空双方的力量取得均衡，股价才能稳定。
              计算公式
              LC＝REF(CLOSE,1);
              RSI1＝SUM(MAX(CLOSE-LC,0),N1)/SUM(ABS(CLOSE-LC),N1)*100;
              RSI2＝SUM(MAX(CLOSE-LC,0),N2)/SUM(ABS(CLOSE-LC),N2)*100;
              RSI3＝SUM(MAX(CLOSE-LC,0),N3)/SUM(ABS(CLOSE-LC),N3)*100;
              其中N1＝6，N2＝12，N3＝24
              缺省时，系统在副图上绘制三条线，分别为6日线RSI1，12日线RSI2，24 日线RSI3。
              RSI反应了股价变动的四个因素：上涨的天数、下跌的天数、上涨的幅度、下跌的幅度。它对股价的四个构成要素都加以考虑，所以在股价预测方面其准确度较为可信。
              根据正态分布理论，随机变数在靠近中心数值附近区域出现的机会最多，离中心数值越远，出现的机会就越小。
              在股市的长期发展过程中，绝大多数时间里相对强弱指数的变化范围介于30 和70之间，其中又以40和60之间的机会最多，超过80或者低于20的机会较少。 而出现机会最少的是高于90及低于10。
              应用法则
              1．RSI比K线、美国线更能看出其走势型态，因此可以利用切线划出支撑线或阻力线，以判定未来之走向。
              2．RSI可依头肩顶，头肩底，三角形等型态作买卖点的讯号。
              3．RSI在50以下弱势市场，50以上强势市场。
              4．RSI在50以下的准确性较高。
              5．6日RSI值85以上为超买，15以下为超卖。在85附近形成W底可以买进。
              6．盘整时，RSI一底比一底高，表示多头势强，後市可能再涨一段，反之一底比一底低是卖出时机。
              7．若股价尚在盘旋阶段，而RSI已整理完成，呈现型态，则价位将随之突破整理区：
              A．在股价创新高点，同时RSI也创新高点时，表示后市仍强若RSI未同时创新高点，则表示即将反转。
              B．在股价创新低点，同时RSI也创新低点，则後市仍弱，若RSI未创新低点，股价极可能反转。
              8．当股价三度创新高价，而RSI却呈现一峰比一峰高，则可视为天价，相对地股价创新低价，而RSI却呈现一底比一底低，显然地，可视为底价。
              9．虚弱回转：虚弱回转在70以上或0以下，是市场反转的强烈讯号。
              10．虽然RSI已被普遍使用，但仍有缺点，如果在大涨势或大跌势市场，RSI值进入超买区或超卖区时，可能出现价位持续大涨或大跌。而指标却只有微幅增减，因此为避免因它的渐形钝化，而使投资人过早卖出或买进，造成少赚或被套之风险，应配合其他技术分析的方法研判。
            `
          },
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
        },
        {
          key: "KDJ",
          value: "KDJ（随机指标）",
          methods: {
            content: `
              RSV:=(CLOSE-LLV(LOW,P1))/(HHV(HIGH,P1)-LLV(LOW,P1))*100;
              K:SMA(RSV,P2,1);
              D:SMA(K,P3,1);
              J:3*K-2*D;
            `
          },
          introduce: {
            content: `KDJ指标是由 Dr. George Lane所创造的，是欧美期货常用的一套技术分析工具。由于期货风险性波动较大，需要比较短期且敏感的指标工具，因此中短期股票的技术分析也颇为适用。随机指标综合了动量观念、强弱指标与移动平均线的优点。KD线的随机观念，远比移动平均线实用很多。移动平均线在习惯上其以收盘价来计算，因而无法表现出一段行情的真正波幅，换句话说当日或最近数日的最高价、最低价，无法表现在移动平均线。因而有些专家才慢慢开创出一些更进步的技术理论，将移动平均线的应用发挥得淋离尽致。KD线就是其中一个颇具代表性的杰作。
      　　   随机指标在图表上采用K％和D％两条线，在设计中综合了动量观念、强弱指标与移动平均线的优点，在计算过程中主要研究高低价位与收市价的关系，反映价格走势的强弱和超买超卖现象。它的主要理论依据是：当价格上涨时，收市价倾向于接近当日价格区间的上端；相反，在下降趋势中收市价趋向于接近当日价格区间的下端。在股市和期市中，因为市场趋势上升而未转向前，每日多数都会偏向于高价位收市，而下跌时收市价就常会偏于低位。随机指数在设计中充分考虑价格波动的随机振幅与中短期波动的测算，使其短期测市功能比移动平均线更加准确有效，在市场短期超买超卖的预测方面又比强弱指数敏感，因此，这一指标被投资者广泛采用。
            计算公式
            RSV＝(CLOSE-LLV(lOW,N1))/(HHV(HIGH,N1)-LLV（LOW,N1))*100;
            K＝MA（RSV，N2）;
            D＝MA（K，N3）;
            J=3*K-2*D;
            其中N1＝9，N2＝3，N3＝3;
            K与D值永远介于0与1之间。
            KD线中的RSV，随着9日中高低价、收盘价的变动而有所不同。如果行情是一个明显的涨势，会带动K线（快速平均值）与D线（慢速平均值）向上升。但如果涨势开始迟缓，便会慢慢反应到K值与D值，使K线跌破D线，此时中短期跌势确立。由于KD线本质上是一个随机波动的观念，对于掌握中短期的行情走势非常正确。
            缺省时，系统在副图上绘制三条线，分别为RSV值的三日平均线K，K值的三日平均线D，三倍K值减二倍D值所得的J线。
            应用法则
            1．D％值在70以上时，市场呈现超买现象。D％值在30以下时市场则呈现超卖现象。
            2．当Ｋ％线发生倾斜度趋于平缓时，是为警告讯号。
            3．当K％值大于D％值，显示目前是向上涨升的趋势，因此在图形上K％向上突破D％线时，即为买进的讯号。
            4．当D％值大于Ｋ％值，显示目前的趋势是向下跌落，因此在图形上K％向下跌破D％线，即为卖出讯号。
            5．K％线与D％线的交叉，须在80以下，20以下讯号才较为正确。K％与D％线在特性上与强弱指标一样，当Ｋ％值与D％值在70以上，已显示超买的现象，30以下出现超卖的现象。唯强弱指标不能明显的显示买卖时机，而KD线则可以达到此目的。
            6．背离讯号产生时，亦为非常正确的买进、卖出时机。
            7．发行量太小，交易量太小的股票不适用KD指标；加权指数以及热门大型股准确性极高。
            8．KD值在50左右交叉且为盘局时，此指标不能当成明显的买卖讯号。
            9．J％>100时为超买，J％<10时为超卖，反应较K％及D％为快。KD指标是计算ｎ日内买卖超情况，再加上平均线观念而求出的可设定计算期（即ｎ值），P1、P2、P3值。一般P1，P2都设成3，若P3设成0，表示不画J线。
            `
          },
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
        },
        {
          key: "W&R",
          value: "W&R（威廉指标）",
          methods: {
            content: `WR1:100*(HHV(HIGH,N)-CLOSE)/(HHV(HIGH,N)-LLV(LOW,N));
            WR2:100*(HHV(HIGH,N1)-CLOSE)/(HHV(HIGH,N1)-LLV(LOW,N1));`
          },
          introduce: {
            content: `威廉指标是一种兼具超买超卖和强弱分界的指标，同KDJ指标有相似之处，分别有一条天线和地线，以及一条以50为分隔的中界线，并且也波动于0-100之间。但是，其与RSI和KDJ有一点重要分别是，其以0为顶部，以100为底。
            计算公式：
            WR1:100*(HHV(HIGH,N)-CLOSE)/(HHV(HIGH,N)-LLV(LOW,N));
            WR2:100*(HHV(HIGH,N1)-CLOSE)/(HHV(HIGH,N1)-LLV(LOW,N1));
            应用法则：
            1.WMSR以0-20为顶部区域，以80-100为底部区域。
            2.WMSR曲线进入20以上天线超买区时不可立即动作，待其回头跌破20时才卖出。
            3.WMSR曲线进入80以下地线超卖区时不可立即动作，待WMSR曲线回头向上突破80时才买进。这样能有效克服WMSR指标超买再超买，超卖再超卖等讯号不准确现象。
            4.若WMSR向上碰触顶部4次，则第4次碰触时，是一个相当良好的卖点。
            5.若WMSR向下碰触底部4次，则第4次碰触时，是一个相当良好的买点。
            当然，这里提及的“4次”不要机械地使用，一切应以当时的情况来决定。另外，可以通过对WMSR指标和RSI指标配合使用，以加强讯号的准确性。
            其他参考标准:
            1.改进的WMSR指标超买超卖研判技巧：
            13日WMSR和34日WMSR和89日WMSR三条WMSR指标线全部低于-80，表示市场处于极端超卖状态，行情即将见长期底部。
            13日WMSR和34日WMSR和89日WMSR三条WMSR指标线全部高于-20，表示市场处于极端超买状态，行情即将见长期顶部。
            2.改进的WMSR指标趋势研判技巧：
            13日WMSR指标线较为敏感，反映在图形上常常剧烈波动，往往不具备趋势研判的作用。
            34日WMSR指标线可用于中期趋势的判断，当34日WMSR指标向上运行时，表示中期趋势向好。34日WMSR指标向下运行时，表示中期趋势向淡`
          },
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
        },
        {
          key: "DMI",
          value: "DMI（趋向指标）",
          methods: {
            content: `MTR:=EXPMEMA(MAX(MAX(HIGH-LOW,ABS(HIGH-REF(CLOSE,1))),ABS(REF(CLOSE,1)-LOW)),N);
            HD:=HIGH-REF(HIGH,1);
            LD:=REF(LOW,1)-LOW;
            DMP:=EXPMEMA(IFF(HD>0&&HD>LD,HD,0),N);
            DMM:=EXPMEMA(IFF(LD>0&&LD>HD,LD,0),N);
            PDI:DMP*100/MTR;
            MDI:DMM*100/MTR;
            ADX:EXPMEMA(ABS(MDI-PDI)/(MDI+PDI)*100,M);
            ADXR:EXPMEMA(ADX,M);`
          },
          introduce: {
            content: `DMI利用计量分析方法，以较客观性的态度，研判股价涨跌的趋势。在研判时，未掺杂个人主观性的判断，且能考虑股价每日的最高价、最低价及收盘价三者间的波动情形，可对股价的波动情形做完整性分析。
            定义：
            为美国投资专家华德(WELLS WILDER JR.)于1978年提出。借着每日最高价、最低价及收盘价三者间的波动情形，用统计学的计量分析法，探讨股价在涨跌中，藉创新高价或新低价的动量，研判多空买卖双方的力道，在其波动趋势的循环过程中，进而寻求双方力道的均衡点。
            趋向指针值为数字，因此可以较客观的态度来研判股价涨跌的趋势。属于中长期投资策略的技术指标。
            计算公式：
            MTR:=EXPMEMA(MAX(MAX(HIGH-LOW,ABS(HIGH-REF(CLOSE,1))),ABS(REF(CLOSE,1)-LOW)),N);
            HD:=HIGH-REF(HIGH,1);
            LD:=REF(LOW,1)-LOW;
            DMP:=EXPMEMA(IF(HD>0 && HD>LD,HD,0),N);
            DMM:=EXPMEMA(IF(LD>0 && LD>HD,LD,0),N);
            PDI:DMP*100/MTR;
            MDI:DMM*100/MTR;
            ADX:EXPMEMA(ABS(MDI-PDI)/(MDI+PDI)*100,M);
            ADXR:EXPMEMA(ADX,M);
            应用法则：
            1.正DI为上涨方向指标，正DI值愈高，代表涨势明确而强烈；负DI为下跌方向指标，负DI值愈高时，代表跌势明确而乏力。
            2.+DI线由下向上突破 -DI线时，两者交叉时，为买进讯号，若ADX线再上扬，则涨势更强。因股价上涨， +DI线会向上攀升，显示上升动量的增强， -DI线则会下跌，反映下跌动量的减弱。
            3.+DI线由上向下跌破 -DI线时，两者交叉时，为卖出讯号，若ADX线再走上扬，则跌势更凶。
            4.ADX为趋势动量指标，在涨势或跌势明显的阶段，ADX线会逐渐增加，代表上涨或下跌的力量已经增强。因此若ADX经常在低档徘徊时，表示行情处于涨升乏力的弱势市场中；若ADX经常在高档徘徊，则代表行情处于作多有利的强势市场中。
            5.+DI线与 -DI线经常接近甚至纠缠不清，此时若ADX值亦降至20以下时，代表行情处于盘整的牛皮阶段，作多或作空均不易获利。
            6.当股价到达高峰或谷底时，，ADX会在其前后达到最高点后反转，因此，当ADX从上升的走向转而为下降时，显示行情即将反转。故在涨势中，ADX在高档处由升转跌，表示涨势即将结束；反之，在跌势中，ADX也在高档处由升转跌，亦表示跌势将告结束。`
          },
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
        },
        {
          key: "DMA",
          value: "DMA（平行线差指标）",
          methods: {
            content: `DDD:MA(CLOSE,SHORT)-MA(CLOSE,LONG);
                    DDDMA:MA(DDD,M);`
          },
          introduce: {
            content: `用法、算法：
            1、DDD快线上穿AMA慢线，为买入信号提示，表示趋势将向上运行。
            2、DDD快线下穿AMA慢线，为卖出信号提示，表示趋势将向下运行。收盘价的短期平均与长期平均的差除以短期天数，得DMA；DMA的M日平均为AMA。
            参数：SHORT 短期天数  LONG 长期天数　M 计算移动平均的天数一般为10、50、10`
          },
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
        },
        {
          key: "CCI",
          value: "CCI（商品通道指标）",
          methods: {
            content: `TYP:=(HIGH+LOW+CLOSE)/3;
            CCI:(TYP-MA(TYP,N))/(0.015*AVEDEV(TYP,N));`
          },
          introduce: {
            content: `定义：
            CCI指标是专门衡量股价是否超出常态分布范围，属于超买超卖类指标的一种,但它与其他超买超卖型指标又有自己比较独特之处。象KDJ、WR%、等大多数超买超卖型指标都有“0——100”上下界限，因此，它们对待一般常态行情的研判比较适用，而对于那些短期内暴涨暴跌的股票的价格走势时，就可能会发生指标钝化的现象。而CCI指标却是波动于正无穷大到负无穷大之间，因此不会出现指标钝化现象，这样就有利于投资者更好地研判行情，特别是那些短期内暴涨暴跌的非常态行情。
            计算公式：
            CCI指标的计算方法和其他技术分析指标一样，由于选用的计算周期不同，顺势指标CCI也包括日CCI指标、周CCI指标、年CCI指标以及分钟CCI指标等很多种类型。经常被用于股市研判的是日CCI指标和周CCI指标。虽然它们计算时取值有所不同，但基本方法一样。
            TYP:=(HIGH+LOW+CLOSE)/3;
            CCI:(TYP-MA(TYP,N))/(0.015*AVEDEV(TYP,N));
            从上面的计算过程我们可以看出，相对于其他技术分析指标，CCI指标的计算是比较复杂的。由于现在股市技术分析软件的普及，对于投资者来说无需进行CCI值的计算，主要是通过对CCI指标的计算方法的了解，更加熟练地运用它来如何研判股市行情。
            应用法则 :
            CCI指标区间的判断:
            1.当CCI指标从下向上突破﹢100线而进入非常态区间时，表明股价脱离常态而进入异常波动阶段，中短线应及时买入，如果有比较大的成交量配合，买入信号则更为可靠。
            2.当CCI指标从上向下突破﹣100线而进入另一个非常态区间时，表明股价的盘整阶段已经结束，将进入一个比较长的寻底过程，投资者应以持币观望为主。
            3.当CCI指标从上向下突破﹢100线而重新进入常态区间时，表明股价的上涨阶段可能结束，将进入一个比较长时间的盘整阶段。投资者应及时逢高卖出股票。
            4.当CCI指标从下向上突破﹣100线而重新进入常态区间时，表明股价的探底阶段可能结束，又将进入一个盘整阶段。投资者可以逢低少量买入股票。
            5.当CCI指标在﹢100线——﹣100线的常态区间运行时，投资者则可以用KDJ、W&R等其他超买超卖指标进行研判。`
          },
          params: {
            n: {
              value: 14,
              min: 0,
              max: 100
            }
          }
        },
        {
          key: "OBV",
          value: "OBV（能量潮）",
          methods: {
            content: `SUM(IF(CLOSE>REF(CLOSE,1),VOL,IF(CLOSE<REF(CLOSE,1),-VOL,0)),0);`
          },
          introduce: {
            content: `能量潮
            算法：
                从上市第一天起，逐日累计股票总成交量，若当日收盘价高于昨收，则前OBV加当日成交量为当日OBV，否则减当日成交量为当日OBV。
            用法：
            1.股价上升，OBV线下降，显示买盘无力
            2.股价下跌，OBV线上升，显示买盘旺盛，反弹有望
            3.OBV缓慢上升，显示买盘渐强，买进信号
            4.OBV急速上升，显示买盘力量将尽，卖出信号
            5.OBV线由正转负，为下跌趋势，卖出信号；反之，买进信号
            6.OBV线长用于观察股价何时脱离盘局及突破后的未来走势`
          },
          params: null
        },
        {
          key: "CR",
          value: "CR（能量指标）",
          methods: {
            content: `MID:=REF(HIGH+LOW+CLOSE,1)/3;
            CR:SUM(MAX(0,HIGH-MID),N)/SUM(MAX(0,MID-LOW),N)*100;
            MA1:REF(MA(CR,M1),M1/2.5+1);
            MA2:REF(MA(CR,M2),M2/2.5+1);
            MA3:REF(MA(CR,M3),M3/2.5+1);
            MA4:REF(MA(CR,M4),M4/2.5+1);`
          },
          introduce: {
            content: `算法：
            在N日内，若某日最高价高于前一日中价(最高、最低价的均值)，将二者的差累加到强势和中；若某日最低价低于前中价，将前中价与最低价的差累加到弱势和中。强势和除以弱势和，再乘100，即得CR。
            同时绘制CR的M1日、M2日、M3日、M4日均线。
            参数：N 统计天数
          　M1、M2、M3、M4　计算移动平均的天数，一般为5、10、20、60
            该指标用于判断买卖时机。能够测量人气的热度和价格动量的潜能；显示压力带和支撑带，以辅助BRAR的不足。`
          },
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
        },
        {
          key: "ARBR",
          value: "ARBR（情绪指标）",
          methods: {
            content:`AR:SUM(HIGH-OPEN,N)/SUM(OPEN-LOW,N)*100;
            BR:SUM(MAX(0,HIGH-REF(CLOSE,1)),N)/SUM(MAX(0,REF(CLOSE,1)-LOW),N)*100;`
          },  
          introduce:{
            content:`人气指标和意愿指标都是以分析历史股价为手段的技术指标，其中人气指标较重视开盘价，从而反映市场买卖的人气，而意愿指标则重视收盘价格，反映的是市场买卖意愿的程度，两项指标分别从不同的角度对股价波动进行分析，达到追踪股价未来动向的目的。
          AR人气指标系以当天开盘价为基础与当天之最高、最低价比，依固定公式统计算出来的强弱指标，又可称为买卖气势指标。
          计算公式
          AR＝SUM(HIGH-OPEN,N)/SUM(OPEN-LOW,N)*100
          其中N＝26
          应用法则:
          1. AR指标值大约以100为中心，当介于80－120之间时，属于盘整行情，股价不会激烈的上升或下降。
          2. AR指标上升至150以上时，就必须注意股价将进入回档下跌。
          3. AR高表示行情很活泼，过度高时表示股价已达到最高的范围，需退出。而AR低时表示仍在充实气势之中，过低则暗示股价已达低点，可介入。
          4. AR指标具有股价达到顶峰或落至谷底的领先功能。
          5. AR路线可以看出某一时段的买卖气势。
          BR意愿指标:
          以昨天的收盘价为基础与今天的最高、最低价比较，依固定公式计算出来的强弱指标，又可称为买卖意愿指标。
          计算公式:
          BR=SUM(MAX(0,HIGH-REF(CLOSE,1)),N)/SUM(MAX(0,REF(CLOSE,1)-LOW),N)*100
          其中N＝26
          应用法则
          1．BR指标介于70～150间属于盘整行情。
          2．BR值高于400以上时，需注意股价回档行情。
          3．BR值低于50以下时，需注意股价的反弹行情。
          4．一般AR可以单独使用，而BR却需与AR并用，才能发挥BR的效用。
          5．AR、BR急速上升，意谓距股价高峰已近，持股应获利了结。
          6．若BR比AR低时，可逢低价买进。
          7．BR从高价跌幅达1/2时，就要趁低价买进。
          8．BR急速上升，而AR盘整或小回时，应逢高出货。
          AR人气指标:
          算法：最近N天内最高价与开盘价的差的和除以开盘价与最低价的差的和，所得的比值放大100。
          用法：介于80至100，盘整；过高，回落；过低，反弹。 
          BR意愿指标
          最近N日内，若某日的最高价高于前一天的收盘价，将该日最高价与前收的差累加到强势和中，若某日的最低价低于前收，则将前收与该日最低价的差累加到弱势和中。最后用强势和除以弱势和，所得比值放大100。
          用法：介于70至150，盘整；高于300，回档；低于50，反弹。
          参数：N  天数，一般取26`
          },
          params: {
            n: {
              value: 26,
              min: 0,
              max: 100
            }
          }
        },
        {
          key: "PSY",
          value: "PSY（心理线）",
          methods: {
            content:`PSY:COUNT(CLOSE>REF(CLOSE,1),N)/N*100;
                    PSYMA:MA(PSY,M);`
          },
          introduce:{
            content:`心理线可用来测试股市投资人看涨或看跌心态，使投资人能了解股市投资人的心理的倾向。测试投资人内心趋向于买方或卖方的心理现象，做为研判股市处于超买或超卖的指标
            定义：
            心理线为人气指标的一种，系利用一段时间内大盘指数收盘价涨跌天数的比率，藉以观察投资人心理趋向，以作为买卖参考。此种方法能准确的显示出大盘走势的波峰区或谷底区。
            计算公式：
            PSY:COUNT(CLOSE>REF(CLOSE,1),N)/N*100;
            PSYMA:MA(PSY,M);
            由于国内短线投资盛行，故一般采用13日PSY线，作为研判指标的基准。
            应用法则 :
            1.75以上是超买区；25以下为超卖区。
            2.25～75为合理的变动范围，属于常态分配区。
            3.10以下为严重超卖区，是抢反弹的好时机。
            4.90以上表示股市过于乐观呈现严重超买现象，是卖出讯号。
            5.当PSY值高于92.31(亦即连续上涨12日)，表示股市过度乐观呈现超买现象，为卖出讯号。
            6.当PSY值低于7.69(亦即连续下跌12日)，表示股市过度悲观而呈现超卖现象，为买进时机。
            特色 :
            1.心里线是以股价上涨天数的多垮，来测试股市投资人看涨或看跌心态，以研判股市是否呈现超满或掺卖现象，故心理线为人气指标的一种。
            2.国内股市在涨跌停板 7％的限制下，使股价上下震荡有一定范围可循，故心理线应用的准确性亦相对提高。
            3.将短、中期心理线一起合并使用，更能客观研判股市是否呈现超买超卖现象。如13日心理线25日心理线合并使用。
            4.心理线若与其它技术指标如『VR强弱指标』及『逆时钟曲线图』等配合使用，可观察股市中看涨看跌的人气及资金聚集或涣散的情形，对行情是否处于头部区或底部区的研判具有辅助作用。
            5.心理线设计条件过于简单，只考虑上涨与下跌两个变量，无法充分反映股价行情的变化。
            6.心理线没有明确的买卖讯号，仅能显示大盘走势的高低价区位置。
            7.在暴涨暴跌的情况下，涨跌天数无法迅速反映股价的激烈振荡，以致应用时较不准确。
            8.心理线若与K线股价走势图相互对照使用，更能从两者的变动中，显示股市超买或超卖的现象。`
          },
          params: {
            n: {
              value: 12,
              min: 0,
              max: 100
            }
          }
        },
        {
          key: "CJBS",
          value: "CJBS（CJBS）",
          methods:{
            content:`CJBS:TICKCOUNT,volstick`
          },
          introduce:{
            content:`本周期成交笔数。`
          },
          params: null
        }
      ],
      pageNo: 1,
      pageSize: 10,
      total: 100,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      key: "",
      settingOption: {
        //参数设置
        methods: {
          content: `MA1:MA(CLOSE,P1);
            MA2:MA(CLOSE,P2);
            MA3:MA(CLOSE,P3);`
        },
        introduce: {
          content: ` 葛氏八法则:
            1. 平均线从下降逐渐走平，当股价从平均线的下方突破平均线时是为买进信号。
            2. 股价连续上升远离平均线之上，股价突然下跌，但未跌破上升的平均线，股价又再度上升时，可以加码买进。
            3. 股价虽一时跌至平均线之下，但平均线仍在上扬且股价不久马上又恢复到平均线之上时，仍为买进信号。
            4. 股价跌破平均线之下，突然连续暴跌，远离平均线时，很可能再向平均线弹升，这也是买进信号。
            5. 股价急速上升远超过上升的平均线时，将出现短线的回跌，再趋向于平均线，这是卖出信号。
            6. 平均线走势从上升逐渐走平转弯下跌，而股价从平均线的上方，往下跌破平均线时，应是卖出信号。
            7. 股价跌落于平均线之下，然后向平均线弹升，但未突破平均线即又告回落，仍是卖出信号。
            8. 股价虽上升突破平均线，但立刻又恢复到平均线之下而此时平均线又继续下跌，则是卖出信号。 `
        }
      },
      emmitDeliver: {
        //子组件主图
        key: "MA",
        params: {
          p1: 5,
          p2: 10,
          p3: 30
        }
      },
      addtionDeliver: {
        //子组件附图
        key: "CJBS",
        params: null
      }
    };
  },
  computed: {
    computedName () {
      return this.$store.state.name;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    settingSize() {
      //缩放图表
      this.isZoom = !this.isZoom;
      this.$refs.CalHighchart.resizeHighchart(this.isZoom);
    },
    saveSetting() {
      //保存设置更新图表
      var option = null;
      var keys = null;
      var obj = new Object();
      if (this.key == "MA" || this.key == "BOLL") {
        option = this.settingOption.params;
        keys = Object.keys(option);
        for (let i = 0; i < keys.length; i++) {
          obj[keys[i]] = option[keys[i]].value;
        }
        this.emmitDeliver = {
          key: this.settingOption.key,
          params: obj
        };
      } else {
        option = this.settingOption.params;
        keys = option ? Object.keys(option) : [];
        for (let i = 0; i < keys.length; i++) {
          obj[keys[i]] = option[keys[i]].value;
        }
        this.addtionDeliver = {
          key: this.settingOption.key,
          params: obj
        };
      }
      this.$nextTick(() => {
        this.deliverSetting();
      });
    },
    deliverSetting() {
      //阻止多次提交
      this.isClick = true;
      if (!this.validateParams()) {
        return false;
      }
      this.$refs.CalHighchart.HighchartInit(
        this.emmitDeliver,
        this.addtionDeliver
      );
      setTimeout(() => {
        this.isClick = false;
      }, 650);
    },
    validateParams() {
      //验证参数
      if (this.addtionDeliver.key == "DMA") {
        if (this.addtionDeliver.params.s <= this.addtionDeliver.params.l) {
          return true;
        } else {
          this.$message.error("数值必须满足s <= l !");
          return false;
        }
      }
      if (this.addtionDeliver.key == "CR") {
        if (
          this.addtionDeliver.params.m1 <= this.addtionDeliver.params.m2 &&
          this.addtionDeliver.params.m2 <= this.addtionDeliver.params.m3
        ) {
          return true;
        } else {
          this.$message.error("数值必须满足 m1 <= m2 <= m3!");
          return false;
        }
      }
      return true;
    },
    handleMainparm(item) {
      //设置参数
      this.settingOption = {
        title: item.value,
        key: item.key == "W&R" ? "WR" : item.key,
        params: item.params,
        methods: item.methods,
        introduce: item.introduce
      };
      this.key = item.key;
      console.log(this.settingOption);
      this.saveSetting(); //更新
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
      this.$store.commit('SetName', "好人一生平安");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
