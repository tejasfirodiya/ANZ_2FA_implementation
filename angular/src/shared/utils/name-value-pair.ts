export class NameValuePair {

    name!: string | undefined;
    value!: string | undefined;

    constructor(data?: any) {
        if (!data) {
            return;
        }

        this.name = data.name;
        this.value = data.value;
    }

}
