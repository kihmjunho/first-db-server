import { Injectable } from '@nestjs/common';
import { CreateBoardRequestDto } from './dto/createBoard.request.dto';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBoardRequestDto } from './dto/updateBoard.request.dto';

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

  async getAll() {
    return await this.boardRepository.find();
  }

  getDetail(id: number | null): Promise<Board> {
    return this.boardRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateBoardRequestDto: UpdateBoardRequestDto,
  ): Promise<Board> {
    const { title, description } = updateBoardRequestDto;
    const board = await this.boardRepository.findOne({ where: { id } });
    if (title) {
      board.title = title;
    }
    if (description) {
      board.description = description;
    }
    let updatedBoard;
    await this.boardRepository.manager.transaction(async (manager) => {
      updatedBoard = await manager.save(board);
    });
    return updatedBoard;
  }

  async delete(id: number): Promise<void> {
    await this.boardRepository.manager.transaction(async (manager) => {
      await manager.softDelete(Board, id);
    });
  }
}
