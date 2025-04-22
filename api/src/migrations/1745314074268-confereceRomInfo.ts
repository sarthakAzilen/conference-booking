import { MigrationInterface, QueryRunner } from "typeorm";

export class ConfereceRomInfo1745314074268 implements MigrationInterface {
    name = 'ConfereceRomInfo1745314074268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "projectId" character varying`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "project"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "project" uuid`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_fb4b54e44de324600c2f9b8698f" FOREIGN KEY ("project") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_fb4b54e44de324600c2f9b8698f"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "project"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "project" character varying`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "projectId"`);
    }

}
