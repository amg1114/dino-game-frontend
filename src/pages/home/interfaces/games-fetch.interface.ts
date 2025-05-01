import { VideoGame } from '../../../models/video-game.interface';
import { BaseFetch } from '../../../models/base-fetch.interface';

export interface VideoGamesFetchResponse extends BaseFetch {
  data: VideoGame[];
}
