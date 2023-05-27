import {
  // BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardRequestDto } from './dto/createBoard.request.dto';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UpdateBoardRequestDto } from './dto/updateBoard.request.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(createBoardRequestDto: CreateBoardRequestDto): Promise<Board> {
    const { title, description } = createBoardRequestDto;
    const board = new Board();

    board.title = title;
    board.description = description;

    return await this.boardRepository.save(board);
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
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글입니다');
    }
    await this.boardRepository.manager.transaction(async (manager) => {
      await manager.softDelete(Board, board.id);
    });
  }

  async search(query: string): Promise<Board[]> {
    return await this.boardRepository.find({
      where: {
        title: Like(`%${query}`),
      },
      order: {
        createdAt: 'DESC',
      },
      take: 100,
    });
  }
}
