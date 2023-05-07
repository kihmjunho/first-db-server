import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardRequestDto } from './dto/createBoard.request.dto';

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
}
