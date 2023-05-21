import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardRequestDto } from './dto/createBoard.request.dto';
import { Board } from './board.entity';
import { BoardDetailDto } from './dto/board-detail.dto';
import { UpdateBoardRequestDto } from './dto/updateBoard.request.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createBoardRequestDto: CreateBoardRequestDto) {
    return await this.boardService.create(createBoardRequestDto);
  }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<Board[]> {
    return await this.boardService.getAll();
  }

  @Get('search')
  @HttpCode(200)
  async search(@Query('query') query: string): Promise<Board[]> {
    return await this.boardService.search(query);
  }

  @Get(':id')
  @HttpCode(200)
  async getDetail(@Param() boardDetailDto: BoardDetailDto): Promise<Board> {
    return await this.boardService.getDetail(boardDetailDto.id);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() updateBoardRequestDto: UpdateBoardRequestDto,
  ): Promise<Board> {
    return await this.boardService.update(id, updateBoardRequestDto);
  }

  @Delete(':id')
  @HttpCode(201)
  async delete(@Param('id') id: number): Promise<void> {
    await this.boardService.delete(id);
  }
}
