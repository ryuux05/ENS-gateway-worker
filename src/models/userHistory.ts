export class userHistory {
    created_at: Date;
    name: string;
    price: number;
    oneShotUrl: string;

    constructor(props: userHistory) {
        Object.assign(this, props);
    }
}