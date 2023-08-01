import {Status} from "./status";

export interface CurrentBookStatus {
    id: number
    callNumber: String
    location: String
    estimatedReturnDate: String
    status: Status
}