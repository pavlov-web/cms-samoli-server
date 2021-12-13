import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import * as Buffer from 'buffer';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';

type result = {
  originalname: string;
  buffer: Buffer;
};

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File) {
    if (!file.mimetype.includes('image')) return 'no images';
    const name = this.getName(file.originalname);

    const compress = await sharp(file.buffer).jpeg({
      chromaSubsampling: '4:4:4',
    });

    const buffer = await compress.toBuffer();

    const { width, height, size, format } = await compress
      .pipe(sharp())
      .metadata();

    const sizes = [1280, 768, 568, 100];
    for (const size of sizes) {
      const resized = await this.resizeImage(buffer, size);
      const webP = await this.convertToWebP(resized);
      await this.save(`${name}-${size}.${format}`, resized);
      await this.save(`${name}-${size}.webp`, webP);
    }

    await this.save(file.originalname, buffer);
    await this.save(`${name}-original.${format}`, file.buffer);

    return {
      name: file.originalname,
      type: file.mimetype,
      width,
      height,
      size,
      format,
    };
  }

  async save(name, buffer): Promise<any> {
    const folder = `${path}/uploads/images`;
    await ensureDir(folder);
    // return await writeFile(`${folder}/${name}`, buffer);
  }

  async resizeImage(buffer: Buffer, size: number): Promise<Buffer> {
    return await sharp(buffer).resize({ width: size }).toBuffer();
  }

  async convertToWebP(file: Buffer): Promise<Buffer> {
    return await sharp(file).webp().toBuffer();
  }

  getName(fullName: string) {
    const splitName = fullName.split('.');
    splitName.pop();
    return splitName.join('.');
  }
}
