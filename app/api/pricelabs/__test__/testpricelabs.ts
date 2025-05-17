import axios from 'axios';
import { fetchPriceLabsData } from '@/app/api/pricelabs/route';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchPriceLabsData', () => {
  it('should return pricing data for a valid listing ID', async () => {
    const mockData = { dynamicPrice: 100 };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchPriceLabsData('test-listing-id');
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.pricelabs.co/v1/pricing/test-listing-id',
      { headers: { Authorization: `Bearer ${process.env.PRICELABS_API_KEY}` } }
    );
  });

  it('should throw an error if the API key is missing', async () => {
    delete process.env.PRICELABS_API_KEY;

    await expect(fetchPriceLabsData('test-listing-id')).rejects.toThrow(
      'PriceLabs API key is missing.'
    );
  });

  it('should handle API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API error'));

    await expect(fetchPriceLabsData('test-listing-id')).rejects.toThrow(
      'Error fetching PriceLabs data:'
    );
  });
});