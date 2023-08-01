import jquery from 'jquery';
import React from "react";
import ReactDOM from "react-dom"
import {getBookInfo, getRno, requestBookBorrowedInfo, requestBookSearchPage} from "./HansungLibrary";
import {getSelector} from "./common";
import {App} from "./App";

function index() {
    const hostname = location.hostname;
    const selector = getSelector(location.hostname);
    console.log(`ISBN : ${selector.getISBN()}`);
    let isbn = ""
    const findBookFromRemote = async () => {
        let resultDocument = await requestBookSearchPage(selector.getISBN());
        if (resultDocument === undefined) return;
        isbn = selector.getISBN();
        const rno = getRno(resultDocument);
        resultDocument = await requestBookBorrowedInfo(rno);
        if (resultDocument === undefined) return;
        return getBookInfo(resultDocument);
    }
    findBookFromRemote().then(
        (bookInfo) => {
            if (location.hostname !== hostname) return
            if (bookInfo === undefined) return;
            jquery('.prod_guide_wrap').append(String(`<div class="prod_guide_box"></div>`));
            ReactDOM.render(<App collectionInfo={bookInfo} isbn={isbn}/>, jquery('.prod_guide_box')[2]);
        })
}

jquery(() => index()) //document가 로딩된 이후에 요청을 실행함