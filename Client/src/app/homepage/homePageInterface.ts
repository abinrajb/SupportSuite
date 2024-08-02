export interface EditReqObjPayload {
    category: string,
    requestDescription: string,
    personId: number,
    ticketId: number
};

export interface Category {
    categoryCode: string;
    categoryName: string;
    description: string;
}


export interface Status {
    statusCode: string;
    statusDescription: string;
}
  
export interface Ticket {
    ticketId: number;
    category: Category | null;
    requestDescription: string;
    status: Status | null;
    assignedTo: string | null;
    createTimestamp: string;
    updateTimestamp: string;
    comment: string | null;
}
  
