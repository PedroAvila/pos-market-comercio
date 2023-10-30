import { StatusTable } from '../enums/status-table.enum';

export class CreateTableDto {
  CommerceId: number;
  Name: string;
  Status: StatusTable;
}
