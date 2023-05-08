import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardRequestDto } from './dto/createBoard.request.dto';
import { Board } from './board.entity';
import { BoardDetailDto } from './dto/board-detail.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardRequestDto: CreateBoardRequestDto) {
    return await this.boardService.create(createBoardRequestDto);
  }

  @Get()
  async getAll() {
    return await this.boardService.getAll();
  }

  @Get(':id')
  async getDetail(@Param() boardDetailDto: BoardDetailDto): Promise<Board> {
    return await this.boardService.getDetail(boardDetailDto.id);
  }
}
