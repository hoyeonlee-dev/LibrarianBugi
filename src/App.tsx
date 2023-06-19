import React from 'react';

interface props {
    bookInfo: string[];
}

export const App: React.FC<props> = (props) => {
    console.log(props.bookInfo)
    return (<>
        <div className="prod_guide_row">
            <div className="prod_guide_title">도서관 보유 정보</div>
            <div className="prod_guide_cont">
                {props.bookInfo.reduce((previousValue, currentValue) => previousValue + "\n" + currentValue)}
            </div>
            <div className="prod_guide_cont hsu_info"></div>
        </div>
        <div>대출 {props.bookInfo.filter(item =>
            item.includes("대출가능")
        ).length > 0 ? "가능" : "불가능"}</div>
    </>);
};

