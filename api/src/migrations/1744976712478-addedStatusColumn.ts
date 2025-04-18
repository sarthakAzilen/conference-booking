import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStatusColumn1744976712478 implements MigrationInterface {
    name = 'AddedStatusColumn1744976712478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "status"`);
    }

}
