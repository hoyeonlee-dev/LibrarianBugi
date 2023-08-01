var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jquery from 'jquery';
import React from "react";
import ReactDOM from "react-dom";
import { getBookInfo, getRno, requestBookBorrowedInfo, requestBookSearchPage } from "./HansungLibrary";
import { getSelector } from "./common";
import { App } from "./App";
function index() {
    const hostname = location.hostname;
    const selector = getSelector(location.hostname);
    console.log(`ISBN : ${selector.getISBN()}`);
    let isbn = "";
    const findBookFromRemote = () => __awaiter(this, void 0, void 0, function* () {
        let resultDocument = yield requestBookSearchPage(selector.getISBN());
        if (resultDocument === undefined)
            return;
        isbn = selector.getISBN();
        const rno = getRno(resultDocument);
        resultDocument = yield requestBookBorrowedInfo(rno);
        if (resultDocument === undefined)
            return;
        return getBookInfo(resultDocument);
    });
    findBookFromRemote().then((bookInfo) => {
        if (location.hostname !== hostname)
            return;
        if (bookInfo === undefined)
            return;
        jquery('.prod_guide_wrap').append(String(`<div class="prod_guide_box"></div>`));
        ReactDOM.render(React.createElement(App, { collectionInfo: bookInfo, isbn: isbn }), jquery('.prod_guide_box')[2]);
    });
}
jquery(() => index()); //document가 로딩된 이후에 요청을 실행함
