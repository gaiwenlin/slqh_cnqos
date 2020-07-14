//==本JS是加载Lodop插件及CLodop服务的综合示例，可直接使用，建议看懂后融进自己页面程序==

let CreatedOKLodopObject, CLodopIsLocal, CLodopJsState;

//==判断是否需要CLodop(那些不支持插件的浏览器):==
export function needCLodop() {
  try {
    const ua = navigator.userAgent;
    if (ua.match(/Windows\sPhone/i)) {
      return true;
    }
    if (ua.match(/iPhone|iPod|iPad/i)) {
      return true;
    }
    if (ua.match(/Android/i)) {
      return true;
    }
    if (ua.match(/Edge\D?\d+/i)) {
      return true;
    }

    const verTrident = ua.match(/Trident\D?\d+/i);
    const verIE = ua.match(/MSIE\D?\d+/i);
    let verOPR = ua.match(/OPR\D?\d+/i);
    let verFF = ua.match(/Firefox\D?\d+/i);
    const x64 = ua.match(/x64/i);
    if ((!verTrident) && (!verIE) && (x64)) {
      return true;
    }
    else if (verFF) {
      verFF = verFF[0].match(/\d+/);
      if ((verFF[0] >= 41) || (x64)) {
        return true;
      }
    }
    else if (verOPR) {
      verOPR = verOPR[0].match(/\d+/);
      if (verOPR[0] >= 32) {
        return true;
      }
    }
    else if ((!verTrident) && (!verIE)) {
      let verChrome = ua.match(/Chrome\D?\d+/i);
      if (verChrome) {
        verChrome = verChrome[0].match(/\d+/);
        if (verChrome[0] >= 41) {
          return true;
        }
      }
    }
    return false;
  }
  catch (err) {
    return true;
  }
}

// 下载loadLodop
export function loadLodop() {
  window.open('/CLodop_Setup_for_Win32NT.exe');
}

//==加载引用CLodop的主JS,用双端口8000和18000(以防其中一个被占):==
export function loadCLodop() {
  return new Promise((resolve, reject) => {
    if (CLodopJsState === 'loading' || CLodopJsState === 'complete') resolve();
    CLodopJsState = 'loading';
    const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    const JS1 = document.createElement('script');
    const JS2 = document.createElement('script');
    JS1.src = 'http://localhost:8000/CLodopfuncs.js?priority=1';
    JS2.src = 'http://localhost:18000/CLodopfuncs.js';
    JS1.onload  = JS2.onload = function() {
      CLodopJsState = 'complete';
      resolve();
    };
    JS1.onerror = JS2.onerror = function(evt) {
      CLodopJsState = 'complete';
      reject(evt);
    };
    head.insertBefore(JS1, head.firstChild);
    head.insertBefore(JS2, head.firstChild);
    CLodopIsLocal = !!((JS1.src + JS2.src).match(/\/\/localho|\/\/127.0.0./i));
  });
}

//==获取LODOP对象主过程,判断是否安装、需否升级:==
export function getLodop(oOBJECT, oEMBED) {
  const strHtmInstall = '<br>打印控件未安装!点击这里<a href=\'install_lodop32.exe\' target=\'_self\'>执行安装</a>,安装后请刷新页面或重新进入。';
  const strHtmUpdate = '<br>打印控件需要升级!点击这里<a href=\'install_lodop32.exe\' target=\'_self\'>执行升级</a>,升级后请重新进入。';
  const strHtm64_Install = '<br>打印控件未安装!点击这里<a href=\'install_lodop64.exe\' target=\'_self\'>执行安装</a>,安装后请刷新页面或重新进入。';
  const strHtm64_Update = '<br>打印控件需要升级!点击这里<a href=\'install_lodop64.exe\' target=\'_self\'>执行升级</a>,升级后请重新进入。';
  const strHtmFireFox = '<br><br>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）';
  const strHtmChrome = '<br><br>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>';
  const strCLodopInstall_1 = '<br>Web打印服务CLodop未安装启动，点击这里<a href=\'CLodop_Setup_for_Win32NT.exe\' target=\'_self\'>下载执行安装</a>';
  const strCLodopInstall_2 = '<br>若此前已安装过，可<a href=\'CLodop.protocol:setup\' target=\'_self\'>点这里直接再次启动</a>';
  const strCLodopInstall_3 = '，成功后请刷新本页面。</font>';
  const strCLodopUpdate = '<br>Web打印服务CLodop需升级!点击这里<a href=\'CLodop_Setup_for_Win32NT.exe\' target=\'_self\'>执行升级</a>,升级后请刷新页面。';
  let LODOP;
  return new Promise((resolve, reject) => {
    try {
      const ua = navigator.userAgent;
      const isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i));
      if (needCLodop()) {
        try {
          LODOP = window['getCLodop']();
        }
        catch (err) {
          console.log(err);
        }
        if (!LODOP && CLodopJsState !== 'complete') {
          if (CLodopJsState === 'loading') {
            reject('网页还没下载完毕，请稍等一下再操作.');
          }
          else {
            reject('没有加载CLodop的主js，请先调用loadCLodop过程.');
          }
          return;
        }
        if (!LODOP) {
          const message = strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : '') + strCLodopInstall_3;
          reject(message);
          return;
        }
        else {
          if (window.CLODOP.CVERSION < '3.0.9.3') {
            reject(strCLodopUpdate);
          }
          if (oEMBED && oEMBED.parentNode) {
            oEMBED.parentNode.removeChild(oEMBED);
          }
          if (oOBJECT && oOBJECT.parentNode) {
            oOBJECT.parentNode.removeChild(oOBJECT);
          }
        }
      }
      else {
        const is64IE = isIE && !!(ua.match(/x64/i));
        //==如果页面有Lodop就直接使用,否则新建:==
        if (oOBJECT || oEMBED) {
          if (isIE) {
            LODOP = oOBJECT;
          }
          else {
            LODOP = oEMBED;
          }
        }
        else if (!CreatedOKLodopObject) {
          LODOP = document.createElement('object');
          LODOP.setAttribute('width', 0);
          LODOP.setAttribute('height', 0);
          LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;');
          if (isIE) {
            LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA');
          }
          else {
            LODOP.setAttribute('type', 'application/x-print-lodop');
          }
          document.documentElement.appendChild(LODOP);
          CreatedOKLodopObject = LODOP;
        }
        else {
          LODOP = CreatedOKLodopObject;
        }
        //==Lodop插件未安装时提示下载地址:==
        if ((!LODOP) || (!LODOP.VERSION)) {
          if (ua.indexOf('Chrome') >= 0) {
            reject(strHtmChrome);
            return;
          }
          if (ua.indexOf('Firefox') >= 0) {
            reject(strHtmFireFox);
            return;
          }
          reject((is64IE ? strHtm64_Install : strHtmInstall));
          return;
        }
        resolve();
      }
      if (LODOP.VERSION < '6.2.2.6') {
        if (!needCLodop()) {
          reject((window.is64IE ? strHtm64_Update : strHtmUpdate));
          return;
        }
      }
      //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==

      //=======================================================
      resolve(LODOP);
    }
    catch (err) {
      reject('getLodop出错:' + err);
    }
  });
}
