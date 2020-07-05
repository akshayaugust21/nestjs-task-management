import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(
        @Query() taskFilter: GetTaskFilterDto
    ): Task[] {
        if (Object.keys(taskFilter).length) {
            return this.tasksService.getTaskByFilter(taskFilter);
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string
    ): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id') id: string
    ): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTask(id, status);
    }
}