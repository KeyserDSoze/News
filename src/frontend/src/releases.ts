import releases from './releases.json';
import type { Locale } from './types';
export const RELEASES = releases.releases;
export const APP_VERSION: string = RELEASES[0].version;
export function releaseDate(date:string, locale:Locale) {
  return new Intl.DateTimeFormat(locale==='it'?'it-IT':'en-GB',{dateStyle:'long',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
}
