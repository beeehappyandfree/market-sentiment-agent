import { NextResponse } from 'next/server';

// https://data-api.coindesk.com/futures/v1/markets?market=binance
const COINDESK_API_URL = 'https://data-api.coindesk.com/futures/v1/markets';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return new NextResponse(
        JSON.stringify({ error: 'Query parameter is required' }), 
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    const endpoint = `${COINDESK_API_URL}?market=${query}`;
    console.log(endpoint);

    const response = await fetch(endpoint, {
        headers: {
            'Accept': 'application/json',
        },
        method: 'GET',
    });
    
    if (!response.ok) {
      const errorMessage = `Coindesk API returned ${response.status}: ${response.statusText}`;
      console.error(errorMessage);
      return new NextResponse(
        JSON.stringify({ error: errorMessage }),
        { 
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    const data = await response.json();
    return new NextResponse(
      JSON.stringify(data),
      { 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
        }
      }
    );
    
  } catch (error) {
    console.error('Error fetching Coindesk data:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch Coindesk data' }),
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}