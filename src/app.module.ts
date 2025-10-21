import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PositionsModule } from './positions/positions.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [DatabaseModule, UsersModule, AuthModule, PositionsModule],
})
export class AppModule {}