import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransaction1623278881072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "account_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "card_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "value",
            type: "numeric",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_user",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_account",
            referencedTableName: "accounts",
            referencedColumnNames: ["id"],
            columnNames: ["account_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FK_card",
            referencedTableName: "card",
            referencedColumnNames: ["id"],
            columnNames: ["card_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
