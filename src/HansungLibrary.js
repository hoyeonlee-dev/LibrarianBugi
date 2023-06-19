var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { requestPageUsing } from "./common";
const BASE_URL = "https://hsel.hansung.ac.kr/";
const ISBN_LENGTH = 10;
export function requestBookSearchPage(ISBN) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = "data_data_list.mir?search_keyword_type1=isbn&search_keyword1=";
        if (ISBN == null)
            return;
        if (ISBN.length < ISBN_LENGTH)
            return;
        return requestPageUsing(BASE_URL + queryString + ISBN);
    });
}
export function requestBookBorrowedInfo(rno) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = "data_data_list_view.mir?rno=";
        if (rno == -1)
            return;
        return requestPageUsing(BASE_URL + queryString + rno);
    });
}
export function getRno(document) {
    const element = document.querySelector(".btn.btn_mir_search_view.btn-sm>span");
    if (element == null)
        return -1;
    const rno = Number(element.id.slice(10, element.id.length));
    console.log(`$rno is ${rno}`);
    if (rno === undefined || isNaN(rno))
        return -1;
    else
        return rno;
}
export function getBookInfo(document) {
    const texts = document.querySelectorAll(".text-center.hidden-xs.hidden-sm");
    let ary = Array.from([]);
    for (let i = 0; i < texts.length; i++) {
        ary.push(texts.item(i));
    }
    return ary.map(item => item.innerText.replace(/\t/g, "").replace(/\n/g, ""));
}
