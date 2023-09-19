import { Estate } from "./estate";

export interface SearchResult {
  count: number;
  records: Estate[];
  limit: number;
  page: number;
}
