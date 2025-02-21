import { NextResponse } from 'next/server';

const CMC_API_KEY = process.env.COINMARKETCAP_API_KEY;
const CMC_BASE_URL = 'https://pro-api.coinmarketcap.com';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!CMC_API_KEY) {
      console.error('CoinMarketCap API key is not configured');
      return NextResponse.json(
        { success: false, error: 'API configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${CMC_BASE_URL}/v3/fear-and-greed/${type}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': CMC_API_KEY,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('CoinMarketCap API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return NextResponse.json(
      { success: true, data: data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching trending topics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trending topics' },
      { status: 500 }
    );
  }
}
