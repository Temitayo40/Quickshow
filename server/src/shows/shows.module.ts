import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShowSchema } from './schema/show.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Show', schema: ShowSchema }])],
  controllers: [ShowsController],
  providers: [ShowsService],
})
export class ShowsModule {}
