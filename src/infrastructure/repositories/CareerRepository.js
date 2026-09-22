// src/infrastructure/repositories/CareerRepository.js
import { ICareerRepository } from '../../domain/repositories/ICareerRepository'
import { careersData } from '../data/careersData'

export class CareerRepository extends ICareerRepository {
  getAll() {
    return careersData
  }
}
