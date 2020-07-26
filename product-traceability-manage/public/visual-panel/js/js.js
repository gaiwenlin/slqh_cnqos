
$(function () {
  // echarts_1();
  // echarts_2();
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  // 获取月度好评
  axios({
    method: 'post',
    url: 'http://slqh.cnqos.com/api/log/operate/monthDistribution',
    headers: {
      Authorization: location.search.replace('?token=', ''),
    }
  }).then(res => {
    let month = [];
    let count = [];
    if (res.data.data.items.length) {
      res.data.data.items.forEach(item => {
        month.push(item.month + '月')
        count.push(item.count)
      })
    }
    echarts_4(month, count);
  });
  // 产品类别销售数量分布
  axios({
    method: 'post',
    url: 'http://slqh.cnqos.com/api/log/scan/productCategory',
    // /log/operate/productDistribution
    // api/log/scan/distribution
    // api/log/scan/productCategory
    headers: {
      Authorization: location.search.replace('?token=', ''),
    }
  }).then(res => {
    let name = [];
    let count = [];
    
    if (res.data.data.items.length) {
      res.data.data.items.forEach(item => {
        name.push(item.name)
        count.push(item.count)
      })
    }
    echarts_5(name, count);
  });
  // 产品好评率
  axios({
    method: 'post',
    url: 'http://slqh.cnqos.com/api/log/operate/productDistribution',
    // /log/operate/productDistribution
    // api/log/scan/distribution
    // api/log/scan/productCategory
    headers: {
      Authorization: location.search.replace('?token=', ''),
    }
  }).then(res => {
    let name = [];
    let count = [];
    
    if (res.data.data.items.length) {
      res.data.data.items.forEach(item => {
        name.push(item.name)
        count.push(item.count)
      })
    }
    echarts_6(name, count);
  });
  // echarts_31();
  // echarts_32();
  // echarts_33();
  // echarts_5();
  // echarts_6();
  function echarts_1() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart1'));

    option = {
      //  backgroundColor: '#00265f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '0%',
        top: '10px',
        right: '0%',
        bottom: '4%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['商超门店', '教育培训', '房地产', '生活服务', '汽车销售', '旅游酒店', '五金建材'],
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 1,
            type: "solid"
          },
        },

        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          // rotate:50,
          show: true,
          splitNumber: 15,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        },
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          //formatter: '{value} %'
          show: true,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.1	)",
            width: 1,
            type: "solid"
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          }
        }
      }],
      series: [
        {
          type: 'bar',
          data: [200, 300, 300, 900, 1500, 1200, 600],
          barWidth: '35%', //柱子宽度
          // barGap: 1, //柱子之间间距
          itemStyle: {
            normal: {
              color: '#2f89cf',
              opacity: 1,
              barBorderRadius: 5,
            }
          }
        }

      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  function echarts_2() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart2'));

    option = {
      //  backgroundColor: '#00265f',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '0%',
        top: '10px',
        right: '0%',
        bottom: '4%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽'],
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 1,
            type: "solid"
          },
        },

        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          // rotate:50,
          show: true,
          splitNumber: 15,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        },
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          //formatter: '{value} %'
          show: true,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.1	)",
            width: 1,
            type: "solid"
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          }
        }
      }],
      series: [
        {

          type: 'bar',
          data: [1500, 1200, 600, 200, 300, 300, 900],
          barWidth: '35%', //柱子宽度
          // barGap: 1, //柱子之间间距
          itemStyle: {
            normal: {
              color: '#27d08a',
              opacity: 1,
              barBorderRadius: 5,
            }
          }
        }

      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  function echarts_5(name, count) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart5'));

    option = {
      //  backgroundColor: '#00265f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      grid: {
        left: '0%',
        top: '10px',
        right: '0%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: name,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 1,
            type: "solid"
          },
        },

        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          // rotate:50,
          show: true,
          splitNumber: 15,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        },
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          //formatter: '{value} %'
          show: true,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.1	)",
            width: 1,
            type: "solid"
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          }
        }
      }],
      series: [{
        type: 'bar',
        data: count,
        barWidth: '35%', //柱子宽度
        // barGap: 1, //柱子之间间距
        itemStyle: {
          normal: {
            color: '#2f89cf',
            opacity: 1,
            barBorderRadius: 5,
          }
        }
      }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_4(month, count) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart4'));

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#dddc6b'
          }
        }
      },
      // legend: {
      //   top: '0%',
      //   data: ['好评率'],
      //   textStyle: {
      //     color: 'rgba(255,255,255,.5)',
      //     fontSize: '12',
      //   }
      // },
      grid: {
        left: '10',
        top: '30',
        right: '10',
        bottom: '10',
        containLabel: true
      },

      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.2)'
          }
        },
        data: month

      }, {
        axisPointer: { show: false },
        axisLine: { show: false },
        position: 'bottom',
        offset: 20,
      }],
      yAxis: [{
        name: '%',
        nameTextStyle: {
          color: 'rgba(255,255,255,.6)'
        },
        type: 'value',
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        }
      }],
      series: [
        {
          name: '好评率',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: '#0184d5',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(1, 132, 213, 0.4)'
              }, {
                offset: 0.8,
                color: 'rgba(1, 132, 213, 0.1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
          itemStyle: {
            normal: {
              color: '#0184d5',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: count

        },
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  function echarts_6(name, count) {
    var myChart = echarts.init(document.getElementById('echart6'));

    option = {
      //  backgroundColor: '#00265f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      grid: {
        left: '0%',
        top: '30',
        right: '0%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: name,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 1,
            type: "solid"
          },
        },

        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          // rotate:50,
          show: true,
          splitNumber: 15,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        },
      }],
      yAxis: [{
        name: '%',
        nameTextStyle: {
          color: 'rgba(255,255,255,.6)'
        },
        type: 'value',
        axisLabel: {
          //formatter: '{value} %'
          show: true,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.1	)",
            width: 1,
            type: "solid"
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          }
        }
      }],
      series: [{
        type: 'line',
        data: count,
        barWidth: '35%', //柱子宽度
        // barGap: 1, //柱子之间间距
        itemStyle: {
          normal: {
            color: '#2f89cf',
            opacity: 1,
            barBorderRadius: 5,
          }
        }
      }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  function echarts_31() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb1'));
    option = {

      title: [{
        text: '年龄分布',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: '16'
        }

      }],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function (p) {   //其中p为当前鼠标的位置
          return [p[0] + 10, p[1] - 10];
        }
      },
      legend: {

        top: '70%',
        itemWidth: 10,
        itemHeight: 10,
        data: ['0岁以下', '20-29岁', '30-39岁', '40-49岁', '50岁以上'],
        textStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '12',
        }
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          center: ['50%', '42%'],
          radius: ['40%', '60%'],
          color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value: 1, name: '0岁以下' },
            { value: 4, name: '20-29岁' },
            { value: 2, name: '30-39岁' },
            { value: 2, name: '40-49岁' },
            { value: 1, name: '50岁以上' },
          ]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  function echarts_32() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb2'));
    option = {

      title: [{
        text: '职业分布',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: '16'
        }

      }],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function (p) {   //其中p为当前鼠标的位置
          return [p[0] + 10, p[1] - 10];
        }
      },
      legend: {

        top: '70%',
        itemWidth: 10,
        itemHeight: 10,
        data: ['电子商务', '教育', 'IT/互联网', '金融', '学生', '其他'],
        textStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '12',
        }
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          center: ['50%', '42%'],
          radius: ['40%', '60%'],
          color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value: 5, name: '电子商务' },
            { value: 1, name: '教育' },
            { value: 6, name: 'IT/互联网' },
            { value: 2, name: '金融' },
            { value: 1, name: '学生' },
            { value: 1, name: '其他' },
          ]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  function echarts_33() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb3'));
    option = {
      title: [{
        text: '兴趣分布',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: '16'
        }

      }],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function (p) {   //其中p为当前鼠标的位置
          return [p[0] + 10, p[1] - 10];
        }
      },
      legend: {
        top: '70%',
        itemWidth: 10,
        itemHeight: 10,
        data: ['汽车', '旅游', '财经', '教育', '软件', '其他'],
        textStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '12',
        }
      },
      series: [
        {
          name: '兴趣分布',
          type: 'pie',
          center: ['50%', '42%'],
          radius: ['40%', '60%'],
          color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value: 2, name: '汽车' },
            { value: 3, name: '旅游' },
            { value: 1, name: '财经' },
            { value: 4, name: '教育' },
            { value: 8, name: '软件' },
            { value: 1, name: '其他' },
          ]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }


})


















