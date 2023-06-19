/**
 * 교보문고의 상세페이지에 있는 ISBN를 가져오는 코드
 * @author MenaceOneFie
 */

import {ISBNSelector} from "./ISBNSelector";

export class KyoboSelector implements ISBNSelector {
    private static readonly selector = "#scrollSpyProdInfo > div.product_detail_area.basic_info > div.tbl_row_wrap > table > tbody > tr:nth-child(1) > td";
    getISBN() {
        const selected = document.querySelector(KyoboSelector.selector)
        if (!selected) {
            console.error("해당 페이지에서 ISBN을 찾을 수 없습니다")
            return "";
        }
        const isbn = selected.innerHTML
        return isbn;
    }

}