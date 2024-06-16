import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Repository } from 'typeorm';
import { Board } from 'src/entity/board.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>; 
  const boardRepositoryToken = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,{
          provide: boardRepositoryToken,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ], 
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('should be defined', () => {
    expect(boardService).toBeDefined();
  });

  it('boardRepository should be defined', () => {
    expect(boardRepository).toBeDefined();
  });

  //게시글 조회에 대한 케이스 테스트
  describe('게시글 조회', () => {
    //게시글의 작성자 확인 테스트
    it('2번 게시글의 작성자는 fastcampus 다', async () => {
      //jest.spyOn: mock 데이터 설정
      jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
        id: 2,
        userId: 2,
        user: {
          id: 1,
          username: 'fakeuser',
          password: 'pw',
          name: 'fastcampus'
        },
        contents: '게시글'
      } as Board);
      const board = await boardService.getBoardById(2);

      expect(board.user.name).toBe('fastcampus');
    });
  });
});
