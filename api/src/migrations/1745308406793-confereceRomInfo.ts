import { MigrationInterface, QueryRunner } from "typeorm";

export class ConfereceRomInfo1745308406793 implements MigrationInterface {
    name = 'ConfereceRomInfo1745308406793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conference_room" RENAME COLUMN "location" TO "officeLocationId"`);
        await queryRunner.query(`ALTER TABLE "conference_room" DROP COLUMN "officeLocationId"`);
        await queryRunner.query(`ALTER TABLE "conference_room" ADD "officeLocationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conference_room" ADD CONSTRAINT "FK_4658e9ae9d0288ad61361fee6d3" FOREIGN KEY ("officeLocationId") REFERENCES "office_location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conference_room" DROP CONSTRAINT "FK_4658e9ae9d0288ad61361fee6d3"`);
        await queryRunner.query(`ALTER TABLE "conference_room" DROP COLUMN "officeLocationId"`);
        await queryRunner.query(`ALTER TABLE "conference_room" ADD "officeLocationId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conference_room" RENAME COLUMN "officeLocationId" TO "location"`);
    }

}
