import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {IexCloudService} from '../integration/http/IexCloudService';
import {Logger} from '../core/Logger';
import {CronJob} from 'cron';
import {getCronTimeForEarningsUpdater} from '../core/utils';

export class EarningsDataUpdater {
  private iexCloudService: IexCloudService;
  private assetRepository: AssetRepository;
  private readonly logger: Logger;

  constructor(
    iexCloudService: IexCloudService,
    assetRepository: AssetRepository,
    logger: Logger
  ) {
    this.iexCloudService = iexCloudService;
    this.assetRepository = assetRepository;
    this.logger = logger;
  }

  updateEarnings = async (stocksTickers: string[]) => {
    this.logger.logStatus('Start of loop');
    let counter = 0;
    for (const ticker of stocksTickers) {
      if (counter % 100 === 0) {
        this.logger.logStatus(`Earnings updated for ${counter} / ${stocksTickers.length} stocks`);
      }
      const earningsDate = await this.iexCloudService.getEarningsDate(ticker);
      const eps = await this.iexCloudService.getEps(ticker);
      await this.assetRepository.updateEarningsDate(ticker, earningsDate);
      await this.assetRepository.updateEps(ticker, eps);
      counter++;
    }
    this.logger.logStatus(`Earnings updated for ${stocksTickers.length} / ${stocksTickers.length} stocks`);
    this.logger.logStatus('End of loop');
  }

  loop = async (stocksTickers: string[], updatingTime?: string) => {
    const cronTime = updatingTime || getCronTimeForEarningsUpdater('09:00');
    const earningsUpdater = new CronJob(cronTime, () => this.updateEarnings(stocksTickers));
    earningsUpdater.start();
  }
}
