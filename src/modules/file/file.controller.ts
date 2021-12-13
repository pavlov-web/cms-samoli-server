import {
  Controller,
  Post,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.fileService.upload(file);
  }
}
