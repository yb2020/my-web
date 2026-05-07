function convertCoordinates() {
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);

    if (!isNaN(latitude) && !isNaN(longitude)) {
        const latDeg = Math.floor(latitude);
        const latMin = Math.floor((latitude - latDeg) * 60);
        const latSec = ((latitude - latDeg - (latMin / 60)) * 3600).toFixed(2);

        const lonDeg = Math.floor(longitude);
        const lonMin = Math.floor((longitude - lonDeg) * 60);
        const lonSec = ((longitude - lonDeg - (lonMin / 60)) * 3600).toFixed(2);

        const result = `经度: ${lonDeg}° ${lonMin}' ${lonSec}"<br>纬度: ${latDeg}° ${latMin}' ${latSec}"`;

        document.getElementById('result').innerHTML = result;
    } else {
        msgError('请输入有效的纬度和经度。');
    }
}

function copyToClipboard1() {
    const resultText = document.getElementById('result').textContent;

    if (resultText) {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = resultText;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);

        msgSuccess('已复制到剪贴板: ' + resultText);
    } else {
        msgError('没有可复制的结果。');
    }
}

function convert123(){
    const degrees = parseFloat(document.getElementById('degrees').value);
    const minutes = parseFloat(document.getElementById('minutes').value);
    const seconds = parseFloat(document.getElementById('seconds').value);

    const decimalDegrees = degrees + (minutes / 60) + (seconds / 3600);

    document.getElementById('result2').textContent = `经度/纬度：${decimalDegrees.toFixed(6)}`;
}

function copyToClipboard2() {
    const resultText = document.getElementById('result2').textContent;

    if (resultText) {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = resultText;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);

        msgSuccess('已复制到剪贴板: ' + resultText);
    } else {
        msgError('没有可复制的结果。');
    }
}