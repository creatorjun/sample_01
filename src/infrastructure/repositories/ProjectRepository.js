// src/infrastructure/repositories/ProjectRepository.js
import { IProjectRepository } from '../../domain/repositories/IProjectRepository'
import { projectsData } from '../data/projectsData'

export class ProjectRepository extends IProjectRepository {
  getAll() {
    return projectsData
  }
}
