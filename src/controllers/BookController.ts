import { BaseController } from './BaseController';
import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  BodyParam,
  NotFoundError,
} from 'routing-controllers';
import { PrismaClient } from '@prisma/client';

@JsonController('/books')
export class TodoController extends BaseController {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  @Get()
  public index() {
    return this.prisma.book.findMany();
  }

  @Post()
  public create(
    @BodyParam('title') title: string,
    @BodyParam('author') author: string,
    @BodyParam('description') description: string | null
  ) {
    return this.prisma.book.create({
      data: {
        title,
        author,
        description,
      },
    });
  }

  @Get('/:bookId')
  public async retrieve(@Param('bookId') bookId: number) {
    const item = await this.prisma.book.findOne({
      where: {
        id: Number(bookId),
      },
    });
    if (!item) {
      throw new NotFoundError();
    }
    return item;
  }

  @Put('/:bookId')
  public update(
    @Param('bookId') todoId: number,
    @BodyParam('title') title: string,
    @BodyParam('author') author: string,
    @BodyParam('description') description: string | null
  ) {
    return this.prisma.book.update({
      where: {
        id: Number(todoId),
      },
      data: {
        title,
        author,
        description,
      },
    });
  }

  @Delete('/:bookId')
  public delete(@Param('bookId') bookId: number) {
    return this.prisma.book.delete({
      where: {
        id: Number(bookId),
      },
    });
  }
}
