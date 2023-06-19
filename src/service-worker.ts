chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const getPageFromURL = async (url: string) => {
        const response = await fetch(url)
        const text = await response.text()
        return text
    }
    if (message.action == 'fetchURL') {
        getPageFromURL(message.data).then((res) => {
            console.log(res)
            sendResponse({text:res})
        })
    }
    return true;
})
