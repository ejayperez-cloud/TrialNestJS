import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // Get all users (protected)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        return this.usersService.getAll();
    }

    // Get single user by id (protected)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.usersService.findById(+id);
    }

    // Create user (open - fore demo)
    @Post()
    async create(@Body() body: { first_name: string; last_name: string; username: string;  email: string, 
        phone_number: string | null, password: string }) {
        return this.usersService.createUser(body.first_name, body.last_name, body.username, body.email, body.phone_number, body.password);
    }

    // Update user (protected)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        return this.usersService.updateUser(+id, body);
    }

    // Delete user (protected)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.deleteUser(+id);
    }
}