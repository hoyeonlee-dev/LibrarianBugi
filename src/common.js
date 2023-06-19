var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { KyoboSelector } from "./kyoboSelector";
const sites = ["kyobobook.co.kr"];
export function requestPageUsing(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield chrome.runtime.sendMessage({
            action: "fetchURL",
            data: url
        });
        const parser = new DOMParser();
        return parser.parseFromString(res.text, 'text/html');
    });
}
export function getSelector(url) {
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        if (url.includes(site)) {
            switch (i) {
                case 0: {
                    return new KyoboSelector();
                }
                default: {
                    throw new DOMException("Selector를 찾을 수 없습니다.");
                }
            }
        }
    }
    throw new DOMException("Selector를 찾을 수 없습니다.");
}
