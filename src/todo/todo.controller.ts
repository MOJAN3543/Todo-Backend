import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('Todo Api')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Todo 생성 API', description: 'Todo를 생성한다.' })
  @ApiResponse({ status: 201, description: 'Todo 생성 완료' })
  @ApiResponse({
    status: 400,
    description: 'Body에 충분한 데이터가 들어오지 않음',
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Todo 전체 조회 API',
    description: '데이터베이스에 존재하는 모든 Todo를 가져온다.',
  })
  @ApiResponse({ status: 200, description: 'Todo 조회 완료' })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Todo 조회 API',
    description: 'id의 값을 가진 1개의 Todo를 가져온다.',
  })
  @ApiResponse({ status: 200, description: 'Todo 조회 완료' })
  @ApiResponse({
    status: 404,
    description: '해당 ID를 가진 데이터가 존재하지 않음',
  })
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Todo 수정 API',
    description: 'id의 값을 가진 1개의 Todo를 수정한다.',
  })
  @ApiResponse({ status: 200, description: 'Todo 수정 완료' })
  @ApiResponse({
    status: 404,
    description: '해당 ID를 가진 데이터가 존재하지 않음',
  })
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Todo 삭제 API',
    description: 'id의 값을 가진 1개의 Todo를 삭제한다.',
  })
  @ApiResponse({ status: 200, description: 'Todo 삭제 완료' })
  @ApiResponse({
    status: 404,
    description: '해당 ID를 가진 데이터가 존재하지 않음',
  })
  remove(@Param('id') id: number) {
    return this.todoService.remove(+id);
  }
}
