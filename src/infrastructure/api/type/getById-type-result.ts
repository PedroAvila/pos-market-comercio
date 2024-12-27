
export class GetByIdTypeResult {
    typeId: number;
    name: string

    constructor(
        typeId: number,
        name: string
    ) {
        this.typeId = typeId;
        this.name = name;
    }
} 