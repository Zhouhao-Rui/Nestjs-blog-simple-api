import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose'

async function bootstrap() {
  // 连接数据库
  const conn = mongoose.connect('mongodb://localhost:27017/nest-blog-api',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Post example')
    .setDescription('The post API description')
    .setVersion('1.0')
    .addTag('posts')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 路径
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(5000);
}
bootstrap();
