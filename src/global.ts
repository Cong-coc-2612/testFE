export enum COOKIES_TYPE {
  AUTH_TOKEN = 'AUTH_TOKEN',
}

export enum MATCH_STATUS {
  PLAYING = 'playing',
  FINISHED = 'finished',
  UNKNOWN = 'unknown',
  PENDING = 'pending',
}

export enum TOURNAMENT_STATUS {
  INITIALIZING = 'initializing',
  OPENING = 'opening',
  PROCESSING = 'processing',
  FINISHED = 'finished',
  STOPPED = 'stopped',
}

export const MATCH_CONTAINER_HEIGHT = 4 * 17;
export const PADDING_TOP = 20;