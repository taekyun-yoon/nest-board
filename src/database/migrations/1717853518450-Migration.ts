import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717853518450 implements MigrationInterface {
    name = 'Migration1717853518450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "updateAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "updateAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
