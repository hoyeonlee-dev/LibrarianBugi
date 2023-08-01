//플러그인에서 직접 비동기로 네트워크 작업을 하는 것이 막혀있기 때문에 service-worker를 이용해서 처리해야 함
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const getPageFromURL = async (url: string) => {
        const response = await fetch(url)
        return await response.text()
    }
    if (message.action == 'fetchURL') {
        getPageFromURL(message.data).then((res) => {
            console.log(res)
            sendResponse({text:res})
        })
    }
    return true;
})
