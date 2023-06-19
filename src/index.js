var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBookInfo, getRno, requestBookBorrowedInfo, requestBookSearchPage } from "./HansungLibrary";
import { getSelector } from "./common";
import jquery from 'jquery';
function index() {
    const selector = getSelector(location.hostname);
    console.log(`ISBN : ${selector.getISBN()}`);
    const findBookFromRemote = () => __awaiter(this, void 0, void 0, function* () {
        let resultDocument = yield requestBookSearchPage(selector.getISBN());
        if (resultDocument === undefined)
            return;
        const rno = getRno(resultDocument);
        resultDocument = yield requestBookBorrowedInfo(rno);
        if (resultDocument === undefined)
            return;
        const bookInfo = getBookInfo(resultDocument);
        bookInfo.forEach((item) => console.log(item));
        return bookInfo;
    });
    findBookFromRemote().then((bookInfo) => {
        if (bookInfo === undefined)
            return;
        jquery('.btn_wrap.justify.overlap').after(`
        <div class="prod_guide_wrap">
            <div class="prod_guide_row">
                <div class="prod_guide_title">도서관 보유 정보</div>
                     <div class="prod_guide_cont">
                            ${bookInfo.reduce((previousValue, currentValue) => previousValue + "\n" + currentValue)}
                    </div>
                </div>
            </div>
        </div>
        `);
    });
}
index();
