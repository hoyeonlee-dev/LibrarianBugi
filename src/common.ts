import {ISBNSelector} from "./ISBNSelector";
import {KyoboSelector} from "./kyoboSelector";

const sites = ["kyobobook.co.kr"]

export async function requestPageUsing(url: string): Promise<Document> {
    const res = await chrome.runtime.sendMessage({
        action: "fetchURL",
        data: url
    })
    const parser = new DOMParser();

    return parser.parseFromString(res.text, 'text/html');
}

export function getSelector(url: string): ISBNSelector {
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        if (url.includes(site)) {
            switch (i) {
                case 0: {
                    return new KyoboSelector();
                }
                default: {
                    throw new DOMException("Selector를 찾을 수 없습니다.")
                }
            }
        }
    }
    throw new DOMException("Selector를 찾을 수 없습니다.")
}
