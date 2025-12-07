import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('positions')
export class PositionsController {
    constructor(private positionsService: PositionsService) {}

    // Get all users (protected)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        return this.positionsService.getAll();
    }

    // Get single user by id (protected)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.positionsService.findById(+id);
    }

    // Create user (open - fore demo)
    @Post()
    async create(@Body() body: { position_code: string; position_name: string;  position_type: string; department: string; id: number | string;}) {
        return this.positionsService.createPosition(body.position_code, body.position_name, body.poosition_type, body.department, body.id)
    }

    // Update user (protected)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: any) {
    await this.positionsService.updatePosition(+id, body);
    return { message: 'Position updated successfully' };
}


    // Delete user (protected)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.positionsService.deletePosition(+id);
    }
}
