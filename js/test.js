window.onload = function (argument) {
  console.log(jingdong(1000));
}

function jingdong (n) {
  var numArr = [];
  var res = 1;
  // 建立数组
  for (var k = 1; k <= n; k++) {
    numArr.push(k)
  }

  if (n == 1) {
    return 1;
  } else {
    // 消除公约数
    for (var i = 2; i <=n; i++) {
      for (var j = i + 1; j <=n; j++) {
        if (j % i) {
          // 不能整除
        } else {
          numArr[i - 1] = 1;
        }
      }
    }
    console.log(numArr);
    // 计算最小的数
    for(var m = 0; m < n; m++) {
      res *= numArr[m];
      if (res % 987654321 == 0) {
        res = res / 987654321;
      }
    }
    return res;
  }
}