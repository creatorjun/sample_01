// src/infrastructure/repositories/SkillRepository.js
import { ISkillRepository } from '../../domain/repositories/ISkillRepository'
import { skillsData } from '../data/skillsData'

export class SkillRepository extends ISkillRepository {
  getAll() {
    return skillsData
  }
}
