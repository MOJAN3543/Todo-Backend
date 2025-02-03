import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({description: "Todo 제목", example: "title"})
    @IsString()
    title: string

    @ApiProperty({description: "Todo 내용", example: "content"})
    @IsString()
    content: string
}
