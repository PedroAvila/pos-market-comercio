
export class GetByIdCommerceResult {

    commerceId: number;
    typeId: number;
    name: string;

    constructor(
        commerceId: number, typeId: number, name: string
    ) {
        this.commerceId = commerceId;
        this.typeId = typeId;
        this.name = name;
    }
}