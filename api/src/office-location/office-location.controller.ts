import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OfficeLocationService } from './office-location.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from '../register/register.entity';

@ApiTags('Office Locations')
@ApiBearerAuth()
@Controller('office-locations')
@UseGuards(JwtAuthGuard, new RoleGuard(Role.FacilityAdmin)) // Restrict to Facility Admin
export class OfficeLocationController {
  constructor(private readonly officeLocationService: OfficeLocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new office location' })
  create(@Body() data: { name: string; floor: string }) {
    return this.officeLocationService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all office locations' })
  findAll() {
    return this.officeLocationService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an office location' })
  update(
    @Param('id') id: string,
    @Body() data: Partial<{ name: string; floor: string }>,
  ) {
    return this.officeLocationService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an office location' })
  delete(@Param('id') id: string) {
    return this.officeLocationService.delete(id);
  }
}
