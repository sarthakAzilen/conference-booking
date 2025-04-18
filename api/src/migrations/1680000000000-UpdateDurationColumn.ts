import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDurationColumn1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Make the duration column nullable
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "duration" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the duration column to not nullable
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "duration" SET NOT NULL`,
    );
  }
}
