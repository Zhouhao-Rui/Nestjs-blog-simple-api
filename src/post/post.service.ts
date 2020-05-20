import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostModel } from './entity/post.entity';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
    async get() {
        return await PostModel.find()
    }

    async create(createPostDto: CreatePostDto) {
        return await PostModel.create(createPostDto)
    }

    async getById(id: string) {
        return await PostModel.findById(id)
    }

    async editPost(id:string, updatePostDto: UpdatePostDto) {
        return await PostModel.findByIdAndUpdate(id, updatePostDto)
    }

    async removePost(id:string) {
        return await PostModel.findByIdAndDelete(id)
    }
}
