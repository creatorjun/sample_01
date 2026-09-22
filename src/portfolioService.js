// Composition root: connect application use cases to the data adapters.
import { ProfileRepository } from './infrastructure/repositories/ProfileRepository'
import { CareerRepository } from './infrastructure/repositories/CareerRepository'
import { ProjectRepository } from './infrastructure/repositories/ProjectRepository'
import { SkillRepository } from './infrastructure/repositories/SkillRepository'
import { CoverLetterRepository } from './infrastructure/repositories/CoverLetterRepository'
import { GetProfileUseCase } from './application/useCases/GetProfileUseCase'
import { GetCareersUseCase } from './application/useCases/GetCareersUseCase'
import { GetProjectsUseCase } from './application/useCases/GetProjectsUseCase'
import { GetSkillsUseCase } from './application/useCases/GetSkillsUseCase'
import { GetCoverLetterUseCase } from './application/useCases/GetCoverLetterUseCase'

const getProfileUseCase = new GetProfileUseCase(new ProfileRepository())
const getCareersUseCase = new GetCareersUseCase(new CareerRepository())
const getProjectsUseCase = new GetProjectsUseCase(new ProjectRepository())
const getSkillsUseCase = new GetSkillsUseCase(new SkillRepository())
const getCoverLetterUseCase = new GetCoverLetterUseCase(new CoverLetterRepository())

export const portfolioService = {
  getProfile: () => getProfileUseCase.execute(),
  getCareers: () => getCareersUseCase.execute(),
  getProjects: () => getProjectsUseCase.execute(),
  getSkills: () => getSkillsUseCase.execute(),
  getCoverLetter: () => getCoverLetterUseCase.execute(),
}
