// try {
//     var url = window.location.href;
//     var pathname = window.location.pathname;
//     var host = window.location.host;
//     if (url.indexOf('http://www.') > -1 || url.indexOf('https://www.') > -1) {
//         if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
//             host = host.replace('www.', '');
//             window.location.href = '//m.' + host + pathname;
//         }
//     } else {
//         if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
//         } else {
//             if (url.indexOf('http://m.') > -1 || url.indexOf('https://m.') > -1) {
//                 host = host.replace('m.', '');
//                 window.location.href = '//www.' + host + pathname;
//             }
//             else{
//                 window.location.href = '//www.' + getMainHost() + pathname;
//             }
//         }
//     }
// } catch (e) {

// }

function getMainHost() {
    let key  = `mh_${Math.random()}`;
    let keyR = new RegExp( `(^|;)\\s*${key}=12345` );
    let expiredTime = new Date( 0 );
    let domain = document.domain;
    let domainList = domain.split( '.' );

    let urlItems   = [];
    // 主域名一定会有两部分组成
    urlItems.unshift( domainList.pop() );
    // 慢慢从后往前测试
    while( domainList.length ) {
        urlItems.unshift( domainList.pop() );
        let mainHost = urlItems.join( '.' );
        let cookie   = `${key}=${12345};domain=.${mainHost}`;

        document.cookie = cookie;

        //如果cookie存在，则说明域名合法
        if ( keyR.test( document.cookie ) ) {
            document.cookie = `${cookie};expires=${expiredTime}`;
            return mainHost;
        }
    }
}