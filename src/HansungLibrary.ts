import {requestPageUsing} from "./common";
import {CollectionInfo} from "./types/types";
import {Status} from "./types/status";

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


export function getBookInfo(document: Document): CollectionInfo[] {
    const tables = document.querySelectorAll(".table.table-condensed.table_data_view")
    tables.forEach(item => {
        console.log(tableToCurrentStatus(item))
    })
    const texts = document.querySelectorAll(".text-center.hidden-xs.hidden-sm")
    //#\31 345189 > div > table > tbody > tr:nth-child(3)
    const tableRows = [...document.querySelectorAll("div>table>tbody>tr")]
    // let ary = Array.from<Element>([])
    // for (let i = 0; i < texts.length; i++) {
    //     ary.push(texts.item(i))
    // }
    // return ary.map(item => (item as HTMLTableCellElement).innerText.replace(/\t/g, "").replace(/\n/g, ""))
    return tableRows.map(item => {
        const cells = [...document.querySelectorAll(".text-center.hidden-xs.hidden-sm")].map(cell => {
            const span = cell as HTMLSpanElement
            return span.innerText.replace(/\t/g, "").replace(/\n/g, "")
        })
        console.log(`cell:${cells}`)
        return {location: cells[0], callNumber: cells[2], status: cells[3], dueDate: cells[4]}
        // return cells.reduce((acc, item) => acc + " " + item);
    })


}



export interface CurrentStatus {
    id: number
    callNumber: String
    location: String
    estimatedReturnDate: String
    status: Status
}

function tableToCurrentStatus(element: Element) {
    if (element instanceof HTMLTableElement) {
        let tds = [...element.querySelectorAll('td span')].map((item) => item as HTMLSpanElement)
        //tds[0] as HTMLSpanElement
        var status = Status.Unknown
        switch (tds[4].innerText) {
            case Status.Available:
                status = Status.Available
                break;
            case Status.Reserved:
                status = Status.Reserved
                break;
            case Status.Borrowed:
                status = Status.Borrowed
                break;
            case Status.Unknown:
                status = Status.Unknown
                break;
            default:
                status = Status.Unknown
                break;
        }
        console.log(tds)
        return {
            id: Number(tds[0].innerText),
            location: tds[1].innerText,
            callNumber: tds[3].innerText,
            estimatedReturnDate: tds[5].innerText,
            status: status
        } as CurrentStatus
    } else {
        return undefined
    }
}
