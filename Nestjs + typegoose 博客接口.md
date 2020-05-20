# Nestjs + typegoose 博客接口

### 1. Swagger

```shell
npm install --save @nestjs/swagger swagger-ui-express
```

main.ts下

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const options = new DocumentBuilder()
    .setTitle('Post example')
    .setDescription('The post API description')
    .setVersion('1.0')
    .addTag('posts')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 路径
  SwaggerModule.setup('api-docs', app, document);
```

控制器下添加@ApiTags('')就可以对文档进行分类



## 2. 使用Typegoose

1. 安装

```shell
npm i -s @typegoose/typegoose # install typegoose itself 
 
npm i -s mongoose # install peer-dependencie mongoose 
npm i -D @types/mongoose # install all types for mongoose - this is required for typegoose to work in typescript
```

2. 使用

- 首先main.ts全局注册，创建数据库连接

  ```typescript
  import * as mongoose from 'mongoose'
  
  const conn = mongoose.connect('mongodb://localhost:27017/nest-blog-api',
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  ```

- 然后创建数据库模型，创建entity包，下面创建模型类

  post.entity.ts

  ```typescript
  import { getModelForClass, prop } from '@typegoose/typegoose'
  
  export class Post {
      @prop()
      title: string
      
      @prop()
      content: string
  }
  
  export const PostModel = getModelForClass(Post)
  
  ```

  prop可以对类型进行一些约束，详情参考官网

  https://github.com/szokodiakos/typegoose

- 最后在Controller和service中进行调用，最好使用service，避免未来Controller过于臃肿。

  controller.ts

  ```typescript
  @Post('/create')
      @ApiOperation({summary: '创建帖子'})
      async create(@Body() createPostDto: CreatePostDto) {
          return await this.postService.create(createPostDto)
      }
  ```

  service.ts

  ```typescript
  @Injectable()
  export class PostService {
    async create(createPostDto: CreatePostDto) {
        return await PostModel.create(createPostDto)
    }
  }
  
  ```

  