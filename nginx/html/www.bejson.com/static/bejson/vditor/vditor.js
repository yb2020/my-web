const addScript = (path, callback) => {
    const scriptElement = document.createElement('script')
    scriptElement.src = path
    scriptElement.async = true
    document.head.appendChild(scriptElement)
    scriptElement.onload = () => {
        callback()
    }
}
const addStyle = (url) => {
    const styleElement = document.createElement('link')
    styleElement.rel = 'stylesheet'
    styleElement.type = 'text/css'
    styleElement.href = url
    document.getElementsByTagName('head')[0].appendChild(styleElement)
}
const updateCode = (btnElement, code) => {
    if (btnElement.classList.contains('btn--red')) {
        return
    } else {
        const redBtnElement = document.querySelector('.btn--red')
        if (redBtnElement) {
            redBtnElement.classList.remove('btn--red')
        }
        btnElement.classList.add('btn--red')
    }
    const demoCodeElement = document.getElementById('vditorDemoCode')
    demoCodeElement.firstElementChild.innerHTML = `<code>${code}
</code>`
    Vditor.highlightRender({lineNumber: true, enable: true}, demoCodeElement)
    Vditor.codeRender(demoCodeElement)
}


addStyle('/static/bejson/vditor/index.css')
document.addEventListener('DOMContentLoaded', function () {

    if (document.getElementById('vditorComments')) {
        addScript('/static/bejson/vditor/index.min.js', () => {
            const demoCodeElement = document.getElementById('vditorDemoCode')
            if (demoCodeElement) {
                Vditor.highlightRender({lineNumber: true, enable: true}, demoCodeElement)
                Vditor.codeRender(demoCodeElement)
            }
            if (typeof vditorScript !== 'undefined') {
                vditorScript()
            }

        })
    }

})