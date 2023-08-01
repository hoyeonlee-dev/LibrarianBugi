export enum Status {
    Reserved = "예약중", Available = "대출가능", Borrowed = " 대출중", Unknown = "알 수 없음"
}
export function getStatusWith(value: String): Status | undefined {
    const enumValues = Object.values(Status) as String[]
    if (enumValues.includes(value.trim()))
        return Status[value.trim() as keyof typeof Status]
    else
        return undefined;
}
