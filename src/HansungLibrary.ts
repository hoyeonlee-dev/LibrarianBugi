import {requestPageUsing} from "./common";

const BASE_URL = "https://hsel.hansung.ac.kr/"
const ISBN_LENGTH = 10;

export async function requestBookSearchPage(ISBN: string) {
    const queryString = "data_data_list.mir?search_keyword_type1=isbn&search_keyword1="

    if (ISBN == null)
        return;
    if (ISBN.length < ISBN_LENGTH)
        return;

    return requestPageUsing(BASE_URL + queryString + ISBN);
}

export async function requestBookBorrowedInfo(rno: number) {
    const queryString = "data_data_list_view.mir?rno="

    if (rno == -1) return;

    return requestPageUsing(BASE_URL + queryString + rno);
}

export function getRno(document: Document): number {
    const element = document.querySelector(".btn.btn_mir_search_view.btn-sm>span")

    if (element == null) return -1;

    const rno = Number(element.id.slice(10, element.id.length));
    console.log(`$rno is ${rno}`);

    if (rno === undefined || isNaN(rno)) return -1;
    else return rno;
}

export function getBookInfo(document: Document): string[] {
    const texts = document.querySelectorAll(".text-center.hidden-xs.hidden-sm")
    let ary = Array.from<Element>([])
    for (let i = 0; i < texts.length; i++) {
        ary.push(texts.item(i))
    }
    return ary.map(item => (item as HTMLTableCellElement).innerText.replace(/\t/g, "").replace(/\n/g, ""))
}
