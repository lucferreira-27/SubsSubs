import axios from 'axios';
import { createFilterQuery, FilterOptions } from '../utils/utils';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getSubtitles = async (page = 1, limit = 10, filters: FilterOptions = {}) => {
  const filterQuery = createFilterQuery(filters);
  const queryString = `page=${page}&limit=${limit}${filterQuery ? `&${filterQuery}` : ''}`;
  const response = await api.get(`/subtitles?${queryString}`);
  return response.data;
};

export const getSubtitleById = async (id: string) => {
  const response = await api.get(`/subtitles/${id}`);
  return response.data;
};

export const searchSubtitles = async (query: string, page = 1, limit = 10) => {
  const response = await api.get(`/dialogs/search?query=${query}&page=${page}&limit=${limit}`);
  return response.data;
};