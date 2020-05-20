import { Controller, Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostModel } from './entity/post.entity';
import { PostService } from './post.service'

@Controller('post')
@ApiTags('posts')
export class PostController {
    constructor(
        private postService: PostService
    ){}

    @Get('/')
    @ApiOperation({summary: '显示博客列表'})
    async index() {
        return await this.postService.get()
    }

    @Post('/create')
    @ApiOperation({summary: '创建帖子'})
    async create(@Body() createPostDto: CreatePostDto) {
        return await this.postService.create(createPostDto)
    }

    @Get('/:id')
    @ApiOperation({summary: '博客详情页'})
    async detail(@Param('id') id:string) {
        return await this.postService.getById(id)
    }

    @Put('/:id')
    @ApiOperation({summary: '编辑帖子'})
    async update(@Param('id') id:string, @Body() updatePostDto:UpdatePostDto) {
        return await this.postService.editPost(id, updatePostDto)
    }

    @Delete('/:id')
    @ApiOperation({summary: '删除帖子'})
    async remove(@Param('id') id:string) {
        return await this.postService.removePost(id)
    }
}
