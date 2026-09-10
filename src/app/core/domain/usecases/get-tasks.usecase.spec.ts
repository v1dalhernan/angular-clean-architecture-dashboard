import { of } from 'rxjs';
import { Task } from '../entities/task.entity';
import { TaskPriority } from '../entities/task-priority.enum';
import { TaskStatus } from '../entities/task-status.enum';
import { TaskRepository } from '../repositories/task.repository';
import { GetTasksUseCase } from './get-tasks.usecase';

describe('GetTasksUseCase', () => {
  let useCase: GetTasksUseCase;
  let mockRepository: jasmine.SpyObj<TaskRepository>;

  const mockTasks: Task[] = [
    {
      id: 'task-1',
      title: 'Angular Signals Showcase',
      description: 'Clean Architecture with Signals',
      priority: TaskPriority.HIGH,
      status: TaskStatus.IN_PROGRESS,
      category: 'Frontend',
      dueDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('TaskRepository', ['getTasks']);
    useCase = new GetTasksUseCase(mockRepository);
  });

  it('should return tasks from the repository', (done) => {
    mockRepository.getTasks.and.returnValue(of(mockTasks));

    useCase.execute().subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Angular Signals Showcase');
      expect(mockRepository.getTasks).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
