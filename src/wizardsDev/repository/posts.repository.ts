import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostDocument, BlogPost } from "./posts.schema";
import { NotFoundException } from "./../../shared/exceptions/http-exceptions";

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(BlogPost.name) private postModel: Model<PostDocument>) {}

  public async findAll(): Promise<Array<BlogPost>> {
    return await this.postModel.find().exec();
  }

  public async findOne(ip: string): Promise<BlogPost> {
    return await this.postModel.findOne({ ip });
  }

  public async create(postDto: any): Promise<BlogPost> {
    const created = new this.postModel(postDto);
    return await created.save();
  }

  public async delete(postId: number): Promise<BlogPost> {
    return await this.postModel.findOneAndDelete({ postId }).orFail(() => {
      throw new NotFoundException('IP not found.');
    });
  }

  public async update(postId: number, postDto: any, options: any): Promise<BlogPost> {
    return await this.postModel.findOneAndUpdate({ postId }, postDto, options).orFail(() => {
      throw new NotFoundException('IP not found.');
    });
  }  
}
