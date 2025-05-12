import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decreators/roles.decreator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller({
  path: 'u',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findOne(@Request() req) {
    return { msg: 'User profile', user: req.user };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return { msg: 'user dlees', id };
  }
}
