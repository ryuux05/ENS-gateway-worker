export class userHistory {
    created_at: Date;
    name: string;
    price: number;
    oneShotUrl: string;
    project: string;
    constructor(props: userHistory) {
        Object.assign(this, props);
    }
}