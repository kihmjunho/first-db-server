import { Injectable } from '@nestjs/common';
import { CreateBoardRequestDto } from './dto/createBoard.request.dto';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(createBoardRequestDto: CreateBoardRequestDto) {
    const { title, description } = createBoardRequestDto;
    const board = new Board();
    board.title = title;
    board.description = description;
    const savedBoard = await this.boardRepository.save(board);
    return savedBoard;
  }
}
