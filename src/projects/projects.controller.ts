import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Crud({
  model: {
    type: Project
  }
})
@Controller('projects')
export class ProjectsController implements CrudController<Project> {
  constructor(public service: ProjectsService) {}

  // To get request details
  // @Request() req:Request

  // To pass params
  // @Param('id') id: string

  // To pass payload body
  // @Body() payload: ProjectPayload

  // To add child path in the route
  // @Get('active')
  // Output: projects/active

  // @Get()
  // getProjects(): any {
  //   return 'list of projects';
  // }

  // @Get(':id')
  // getProjectById(@Param('id') id: string): any {
  //   return `project with id ${id}`;
  // }
}
