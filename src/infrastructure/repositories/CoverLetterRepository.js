// src/infrastructure/repositories/CoverLetterRepository.js
import { ICoverLetterRepository } from '../../domain/repositories/ICoverLetterRepository'
import { coverLetterData } from '../data/coverLetterData'

export class CoverLetterRepository extends ICoverLetterRepository {
  get() {
    return coverLetterData
  }
}
