import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getAll(): Promise<Board[]> {
    return await this.boardRepository.find({ take: 100 });
  }

  async getDetail(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글입니다');
    }
    return board;
  }

  async update(
    id: number,
    updateBoardRequestDto: UpdateBoardRequestDto,
  ): Promise<Board> {
    const { title, description } = updateBoardRequestDto;
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글입니다');
    }
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
