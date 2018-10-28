import { getRepository } from "typeorm";
import { Analysis } from "../entity/Analysis";

export class AnalysisService {
  private analysisRepository = getRepository(Analysis, process.env.NODE_ENV);

  /**
   * Finds analysis by an analysis id
   * @param analysisId
   */
  public async findById(analysisId: number): Promise<Analysis> {
    return this.analysisRepository.findOne(analysisId);
  }

  /**
   * Gets the analysis by an
   * @param analysisId
   */
  public async getAnalysis(analysisId: number): Promise<Analysis> {
    return this.analysisRepository
      .createQueryBuilder("analysis")
      .select()
      .where("analysis.id = :id", { id: analysisId })
      .innerJoinAndSelect("analysis.user", "user")
      .innerJoinAndSelect("analysis.emotion", "emotion")
      .leftJoinAndSelect("analysis.accessories", "accessories")
      .innerJoinAndSelect("analysis.makeUp", "makeUp")
      .innerJoinAndSelect("analysis.facialHair", "facialHair")
      .innerJoinAndSelect("analysis.hair", "hair")
      .leftJoinAndSelect("hair.hairColor", "hairColor")
      .getOne();
  }

  /**
   * Inserts a single analysis into the database
   * @param analysis analysis object
   */
  public async store(analysis: Analysis): Promise<Analysis> {
    return this.analysisRepository.save(analysis);
  }

  /**
   * Removes a analysis object from the database
   * @param analysis object
   */
  public async remove(analysis: Analysis): Promise<Analysis> {
    return this.analysisRepository.remove(analysis);
  }
}
