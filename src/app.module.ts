import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WizardsDevModule } from './wizardsDev/wizardsDev.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.production'],
    }),
    DatabaseModule,
    HealthModule,
    WizardsDevModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
