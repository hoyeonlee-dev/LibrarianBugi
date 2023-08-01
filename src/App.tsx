import React from 'react';
import {CollectionInfo} from "./types/CollectionInfo";

interface props {
    collectionInfo: CollectionInfo[];
    isbn: string;
}

export const App: React.FC<props> = (props) => {
    console.log(props.collectionInfo)
    let flag = false;
    return <>
        <div className="prod_guide_row">
            <div className="prod_guide_title">도서관 보유 정보<br/><br/>{`총 ${props.collectionInfo.length}권`}</div>
            <div className="prod_guide_cont">
                <table>
                    {props.collectionInfo.map((item: CollectionInfo) => {
                        item.status
                        let status = item.status.includes("대출가능")
                        console.log(status)
                        if (status) {
                            flag = true;
                        }
                        return <tr>
                            <td style={{display: "flex", flexDirection: "column", alignItems: "start"}}><p>청구기호
                                : {item.callNumber}</p>
                                <p>상태 : {item.status}</p>
                                <p>{item.dueDate.length < 3 ? "" : `반납예정일: ${item.dueDate}`}</p></td>
                        </tr>
                    })}
                </table>
            </div>
        </div>

        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div className="prod_guide_title">대출 {flag ? "가능" : "불가능"}</div>
            <a style={{color:"blue"}} href={`https://hsel.hansung.ac.kr/data_data_list.mir?search_keyword_type1=isbn&search_keyword1=${props.isbn}`}>{`<자세히
                보기>`}</a>
        </div>
    </>;
};

