export const createFilterQuery = (filters: FilterOptions): string => {
  const queryParams: string[] = [];

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null) {
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return queryParams.join('&');
};

export interface FilterOptions {
  episode?: number;
  season?: number;
  showName?: string;
  language?: string;
  filler?: boolean;
  order?: string;
}