import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { AdminDashboardService } from './admin-dashboard.service';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { Role } from 'src/common/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
@Controller('admin-dashboard')
export class AdminDashboardController {
  constructor(private adminDashboardService: AdminDashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/is-admin')
  isAdmin(@CurrentUser() user: { role: Role }) {
    return {
      success: true,
      isAdmin: user.role === Role.ADMIN,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/dashboard')
  async getDashboardData() {
    try {
      const dashboardData = await this.adminDashboardService.getDashboardData();
      return { success: true, dashboardData };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/all-shows')
  async getAllShows() {
    try {
      const shows = await this.adminDashboardService.getAllShows();
      return { success: true, shows };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/all-bookings')
  async getAllBookings() {
    try {
      const bookings = await this.adminDashboardService.getAllBookings();
      return { success: true, bookings };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
