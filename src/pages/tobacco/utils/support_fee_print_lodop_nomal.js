import lodopFuncs from './LodopFuncs.js';
import receiptApi from '../api/tsell/api_receipt';
//import temp from '@/resources/support_fee';
const print = {};

var LODOP; //声明为全局变量
print.Preview = function(dataJson) {
    CreateFullBill(dataJson);
    LODOP.PREVIEW();
};

print.Design = function(dataJson) {
    CreateFullBill(dataJson);
    LODOP.PRINT_DESIGN();
};

/* print.PreviewData = function (dataJson) {
  CreateDataBill(dataJson);
  LODOP.PREVIEW();
}; */

print.RealPrint = function(dataJson) {
    CreateFullBill(dataJson);
    if (LODOP.PRINTA());
    else
        //  alert("已发出实际打印命令！");
        alert('放弃打印！');
};
/* const ajaxUrl =
  env === 'development' ? 'http://127.0.0.1:8888' : env.production ? 'https://www.url.com' : 'https://debug.url.com';
print.ajax = axios.create({
  baseURL: ajaxUrl,
  contentType: 'application/x-www-form-urlencoded; charset=utf-8',
  //contentType: 'application/html; charset=utf-8',
  timeout: 30000
  //responseType: 'text'
}); */

function CreateFullBill(dataJson) {
    alert(dataJson);
    Promise.all([receiptApi.getHtmlFile()])
        .then(([response]) => {
            console.log(response.data);
            LODOP = lodopFuncs.getLodop(
                document.getElementById('LODOP_OB'),
                document.getElementById('LODOP_EM')
            );
            console.log(LODOP);
            LODOP.PRINT_INITA(
                '2.65mm',
                '2.65mm',
                '218.02mm',
                '103.72mm',
                '什邡市晒烟生产扶持费支付凭单'
            );
            LODOP.ADD_PRINT_TEXT(
                '4mm',
                '39mm',
                '92.6mm',
                '10.58mm',
                '什邡市晒烟生产扶持费支付凭单'
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
            LODOP.SET_PRINT_STYLEA(0, 'PreviewOnly', 1);
            LODOP.ADD_PRINT_TEXT(
                '16.01mm',
                '20mm',
                '60.6mm',
                '8.47mm',
                FormatDate(dataJson['date'])
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
            LODOP.ADD_PRINT_TEXT(
                '16.01mm',
                '139.99mm',
                '29.9mm',
                '8.47mm',
                dataJson['number']
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
            LODOP.SET_PRINT_STYLEA(0, 'PreviewOnly', 1);
            LODOP.ADD_PRINT_TABLE(
                '24mm',
                '15mm',
                '156.63mm',
                '59.64mm',
                response.data
            );
            LODOP.SET_PRINT_STYLEA(0, 'PreviewOnly', 1);
            LODOP.ADD_PRINT_TEXT(
                '30.43mm',
                '31.75mm',
                '26.46mm',
                '5.82mm',
                dataJson['farmerName']
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
            LODOP.ADD_PRINT_TEXT(
                '33.07mm',
                '58.21mm',
                '34.13mm',
                '10.85mm',
                dataJson['farmerAddress']
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
            LODOP.ADD_PRINT_TEXT(
                '33.07mm',
                '93.66mm',
                '44.45mm',
                '6.88mm',
                dataJson['farmerIdentity']
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
            LODOP.ADD_PRINT_TEXT(
                '37.04mm',
                '144.46mm',
                '23.81mm',
                '5.29mm',
                dataJson['serial']
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
            LODOP.ADD_PRINT_TEXT(
                '61.15mm',
                '16.67mm',
                '20.9mm',
                '5.29mm',
                dataJson['desc']
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
            LODOP.ADD_PRINT_TEXT(
                '61.15mm',
                '40.22mm',
                '17.2mm',
                '5.29mm',
                dataJson['weight'].toFixed(2)
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
            LODOP.ADD_PRINT_TEXT(
                '61.15mm',
                '64.03mm',
                '26.46mm',
                '5.29mm',
                dataJson['money'].toFixed(2)
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
            LODOP.ADD_PRINT_TEXT(
                '61.15mm',
                '95.51mm',
                '9.26mm',
                '5.29mm',
                '17'
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
            LODOP.ADD_PRINT_TEXT(
                '61.15mm',
                '113.51mm',
                '26.46mm',
                '5.29mm',
                dataJson['allowance'].toFixed(2)
            );
            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
            var money = dataJson['allowance'];
            if (money > 10000) {
                LODOP.ADD_PRINT_TEXT(
                    '72.44mm',
                    '44mm',
                    '124.62mm',
                    '9mm',
                    convertCurrency(dataJson['allowance'])
                );
            } else {
                LODOP.ADD_PRINT_TEXT(
                    '72.44mm',
                    '44mm',
                    '124.62mm',
                    '9mm',
                    numberToCurrency(dataJson['allowance'])
                );
            }

            LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
        })
        .catch(error => {});
    //axios.get('zuul/tobacco/support_fee.html')
    /* axios.get('zuul/tobacco/support_fee.html').then(function (res) {
  }.catch(function (err) {
    console.log(err);
  })); */
    /* print.ajax.get({
    async: false,
    url: 'static/support_fee.html',
    scriptCharset: 'utf-8',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    //contentType: 'application/html; charset=utf-8',
    success: function (result) {
      console.log(result);
      LODOP = lodopFuncs.getCLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
      LODOP.PRINT_INITA('2.65mm', '2.65mm', '218.02mm', '103.72mm', '什邡市晒烟生产扶持费支付凭单');
      LODOP.ADD_PRINT_TEXT('4mm', '39mm', '92.6mm', '10.58mm', '什邡市晒烟生产扶持费支付凭单');
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
      LODOP.SET_PRINT_STYLEA(0, 'PreviewOnly', 1);
      LODOP.ADD_PRINT_TEXT('16.01mm', '20mm', '60.6mm', '8.47mm', FormatDate(dataJson['date']));
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.ADD_PRINT_TEXT('16.01mm', '139.99mm', '29.9mm', '8.47mm', dataJson['number']);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.SET_PRINT_STYLEA(0, 'PreviewOnly', 1);
      LODOP.ADD_PRINT_TABLE('24mm', '15mm', '156.63mm', '59.64mm', result);
      LODOP.SET_PRINT_STYLEA(0, 'PreviewOnly', 1);
      LODOP.ADD_PRINT_TEXT('30.43mm', '31.75mm', '26.46mm', '5.82mm', dataJson['farmerName']);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.ADD_PRINT_TEXT('33.07mm', '58.21mm', '34.13mm', '10.85mm', dataJson['farmerAddress']);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
      LODOP.ADD_PRINT_TEXT('33.07mm', '93.66mm', '44.45mm', '6.88mm', dataJson['farmerIdentity']);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10);
      LODOP.ADD_PRINT_TEXT('37.04mm', '144.46mm', '23.81mm', '5.29mm', dataJson['serial']);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.ADD_PRINT_TEXT('61.15mm', '16.67mm', '20.9mm', '5.29mm', dataJson['desc']);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.ADD_PRINT_TEXT('61.15mm', '40.22mm', '17.2mm', '5.29mm', dataJson['weight'].toFixed(2));
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.ADD_PRINT_TEXT('61.15mm', '64.03mm', '26.46mm', '5.29mm', dataJson['money'].toFixed(2));
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.ADD_PRINT_TEXT('61.15mm', '95.51mm', '9.26mm', '5.29mm', '17');
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.ADD_PRINT_TEXT('61.15mm', '113.51mm', '26.46mm', '5.29mm', dataJson['allowance'].toFixed(2));
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      var money = dataJson['allowance'];
      if (money > 10000) {
        LODOP.ADD_PRINT_TEXT('72.44mm', '44mm', '124.62mm', '9mm', convertCurrency(dataJson['allowance']));
      } else {
        LODOP.ADD_PRINT_TEXT('72.44mm', '44mm', '124.62mm', '9mm', numberToCurrency(dataJson['allowance']));
      }

      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    }
  }); */
}

function convertCurrency(money) {
    //汉字的数字
    //var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    //基本单位
    //var cnIntRadice = new Array('', '拾', '佰', '仟');
    const cnIntRadice = ['', '拾', '佰', '仟'];
    //对应整数部分扩展单位
    //var cnIntUnits = new Array('', '万', '亿', '兆');
    const cnIntUnits = ['', '万', '亿', '兆'];
    //对应小数部分单位
    //var cnDecUnits = new Array('角', '分', '毫', '厘');
    const cnDecUnits = ['角', '分', '毫', '厘'];
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money === '') {
        return '';
    }
    money = parseFloat(money);
    if (money >= maxNum) {
        //超出最大处理数字
        return '';
    }
    if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') === -1) {
        integerNum = money;
        decimalNum = '';
    } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n === '0') {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                //归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m === 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum !== '') {
        var decLen = decimalNum.length;
        for (var j = 0; j < decLen; j++) {
            var nn = decimalNum.substr(j, 1);
            if (nn !== '0') {
                chineseStr += cnNums[Number(nn)] + cnDecUnits[j];
            }
        }
    }
    if (chineseStr === '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === '') {
        chineseStr += cnInteger;
    }
    return chineseStr;
}

function numberToCurrency(money) {
    //var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var integerNum;
    var decimalNum;
    money = money.toString();
    if (money.indexOf('.') === -1) {
        integerNum = ('0000' + money).slice(-4);
    } else {
        var parts = money.split('.');
        integerNum = ('0000' + parts[0]).slice(-4);
        decimalNum = (parts[1] + '00').substr(0, 2);
    }
    var newStr = integerNum + decimalNum;
    var newStrCount = newStr.length;
    var cnStr = '';

    for (var i = 0; i < newStrCount; i++) {
        var tn = newStr.charAt(i);

        cnStr += cnNums[parseInt(tn)] + '     ';
    }
    return cnStr;
}

function FormatDate(strTime) {
    var date = new Date(strTime);
    return (
        date.getFullYear() +
        '     ' +
        (date.getMonth() + 1) +
        '     ' +
        date.getDate()
    );
}
export default print;
