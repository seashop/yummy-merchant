export function formatDate(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  // 年
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length) // 如果两位补0
      );
    }
  }
  return fmt;
}

export function throttle (fn, wait = 0) {
  let timerId;
  let lastInvoke = Number.MIN_SAFE_INTEGER; // 上次调用时间
  return function(...args) {
    // 当前时间
    const currTime = new Date().getTime();
    // 距离下次执行的剩余时间
    const remain = Math.max(lastInvoke + wait - currTime, 0);
    // 更新定时器，确保同一时间只有一个定时器在运行
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      lastInvoke = new Date().getTime();
      fn(...args);
    }, remain);
  }
}
