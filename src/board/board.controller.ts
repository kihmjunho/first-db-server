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
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({
    summary: '게시물 생성 API',
    description: '게시물을 생성한다.',
  })
  @ApiCreatedResponse({
    description: '게시물이 생성되었다.',
    type: CreateBoardRequestDto,
  })
  @HttpCode(201)
  async create(@Body() createBoardRequestDto: CreateBoardRequestDto) {
    return await this.boardService.create(createBoardRequestDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: '전체 게시물 조회 API',
    description: '전체 게시물을 조회한다.',
  })
  @ApiCreatedResponse({
    description: '전체 게시물이 조회되었다.',
  })
  async getAll(): Promise<Board[]> {
    return await this.boardService.getAll();
  }

  @Get('search')
  @HttpCode(200)
  @ApiOperation({
    summary: '게시물 검색 API',
    description: '검색된 게시물을 조회한다.',
  })
  @ApiCreatedResponse({
    description: '검색한 게시물이 조회되었다.',
  })
  async search(@Query('query') query: string): Promise<Board[]> {
    return await this.boardService.search(query);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: '개별 게시물 검색 API',
    description: '개별 게시물을 조회한다.',
  })
  @ApiCreatedResponse({
    description: '개별 게시물이 조회되었다.',
    type: BoardDetailDto,
  })
  async getDetail(@Param() boardDetailDto: BoardDetailDto): Promise<Board> {
    return await this.boardService.getDetail(boardDetailDto.id);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: '게시물 수정 API',
    description: '게시물을 수정한다.',
  })
  @ApiCreatedResponse({
    description: '게시물이 수정되었다.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateBoardRequestDto: UpdateBoardRequestDto,
  ): Promise<Board> {
    return await this.boardService.update(id, updateBoardRequestDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: '게시물 삭제 API',
    description: '게시물을 삭제한다.',
  })
  @ApiCreatedResponse({
    description: '게시물이 삭제되었다.',
  })
  async delete(@Param('id') id: number): Promise<void> {
    await this.boardService.delete(id);
  }
}
