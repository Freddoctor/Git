### 资料内页详情
```
  data.json 格式
  label:{
    children:['label':'','value':'']
  },
  value:'Ag(T+D)'

```
#### 网站 ：https://www.sge.com.cn/cpfw/Product_service
#### data.json 代码来源:
```
  
  var label = new Array();
  $(".tdLeft").each(function(){label.push($(this).text())});

  var value = new Array();
  $(".tdRight").each(function(){value.push($(this).text())});

  var children = new Array();

  for (var i = 0; i < label.length; i++) {
    for(var j =0; j< value.length;j++) {
      if(i == j) {
        children.push({
          label:label[i],
          value:value[j]
        })
        continue;
      }
    }
  }

  $(".jzk_swhj_jyHead").find("li").text();
  
  var data = new Object();
  data.label = $(".jzk_swhj_jyHead").find("li").text(),
  data.value = children ;
  console.log(JSON.stringify(data))

```
