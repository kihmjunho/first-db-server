import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  async create(@Body() createBoardRequestDto: CreateBoardRequestDto) {
    return await this.boardService.create(createBoardRequestDto);
  }

  @Get()
  async getAll(): Promise<Board[]> {
    return await this.boardService.getAll();
  }

  @Get(':id')
  async getDetail(@Param() boardDetailDto: BoardDetailDto): Promise<Board> {
    return await this.boardService.getDetail(boardDetailDto.id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBoardRequestDto: UpdateBoardRequestDto,
  ): Promise<Board> {
    return this.boardService.update(id, updateBoardRequestDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.boardService.delete(id);
  }
}
