import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WantController } from './controller/WantController';
import { wantSchema } from './want.schema';
import { WantRepositoryProvider, WantServiceProvider } from './want.provides';

@Module({
  imports: [MongooseModule.forFeature([wantSchema], 'dbmockterview')],
  controllers: [WantController],
  providers: [WantServiceProvider, WantRepositoryProvider],
})
export class WantModule {}
