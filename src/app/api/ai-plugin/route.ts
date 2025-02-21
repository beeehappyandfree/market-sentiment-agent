import { ACCOUNT_ID, PLUGIN_URL } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "Crypto Market Sentiment Analysis",
            description: "API for analyzing crypto market sentiment through various data sources including market data and trending news",
            version: "1.0.0",
        },
        servers: [
            {
                url: PLUGIN_URL,
            },
        ],
        "x-mb": {
            "account-id": ACCOUNT_ID,
            assistant: {
                name: "Market Sentiment Agent",
                description: "An assistant that analyzes crypto market sentiment using exchange data and trending news.",
                instructions: `You are an expert in crypto market sentiment analysis. You can analyze:
                1. Market data from various exchanges
                2. Fear and greed index
                value	
integer [ 0 .. 100 ]
The value of CMC Fear and Greed.

When the value is closer to 0, the market is in Extreme Fear, and investors have over-sold irrationally.

When the value is closer to 100, the market is in Extreme Greed, indicating a likely market correction.

 value_classification	
string
The value classication of CMC Fear and Greed.

1 ≤ x < 20: Extreme Fear
20 ≤ x < 40: Fear
40 ≤ x < 60: Neutral
60 ≤ x < 80: Greed
80 ≤ x ≤ 100: Extreme Greed

 update_time	
string <date>
Timestamp (ISO 8601) of the last time this record was updated.

For comprehensive analysis, these are the endpoints: [historical, latest]

                Use this information to provide comprehensive market sentiment analysis.
                `,
                tools: [{ type: "generate-transaction" }, { type: "generate-evm-tx" }, { type: "sign-message" }]
            },
        },
        paths: {
            "/api/tools/market-sentiment": {
                get: {
                    operationId: "getMarketData",
                    summary: "Get market data information",
                    description: "Retrieve detailed market data including exchange status, instrument mappings, and trading statistics",
                    parameters: [
                        {
                            name: "query",
                            in: "query",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            description: "Exhange name to search"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            Data: {
                                                type: "object",
                                                properties: {
                                                    TYPE: {
                                                        type: "string",
                                                        description: "Type of the message"
                                                    },
                                                    EXCHANGE_STATUS: {
                                                        type: "string",
                                                        description: "The status of the exchange",
                                                        default: "ACTIVE"
                                                    },
                                                    MAPPED_INSTRUMENTS_TOTAL: {
                                                        type: "integer",
                                                        description: "Total number of verified and mapped instruments"
                                                    },
                                                    UNMAPPED_INSTRUMENTS_TOTAL: {
                                                        type: "integer",
                                                        description: "Number of unverified instruments"
                                                    },
                                                    INSTRUMENT_STATUS: {
                                                        type: "object",
                                                        properties: {
                                                            ACTIVE: {
                                                                type: "integer",
                                                                description: "Number of active instruments"
                                                            },
                                                            IGNORED: {
                                                                type: "integer",
                                                                description: "Number of ignored instruments"
                                                            },
                                                            RETIRED: {
                                                                type: "integer",
                                                                description: "Number of retired instruments"
                                                            },
                                                            EXPIRED: {
                                                                type: "integer",
                                                                description: "Number of expired instruments"
                                                            }
                                                        }
                                                    },
                                                    TOTAL_TRADES_FUTURES: {
                                                        type: "integer",
                                                        description: "Total number of futures trades processed"
                                                    },
                                                    TOTAL_OPEN_INTEREST_UPDATES: {
                                                        type: "integer",
                                                        description: "Total number of futures open interest updates"
                                                    },
                                                    TOTAL_FUNDING_RATE_UPDATES: {
                                                        type: "integer",
                                                        description: "Total number of futures funding rate updates"
                                                    },
                                                    HAS_ORDERBOOK_L2_MINUTE_SNAPSHOTS_ENABLED: {
                                                        type: "boolean",
                                                        description: "Whether historical minute orderbook snapshots are enabled"
                                                    }
                                                }
                                            },
                                            Err: {
                                                type: "object",
                                                properties: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/tools/fear-and-greed": {
                get: {
                    operationId: "getFearAndGreed",
                    summary: "Get fear and greed index",
                    description: "Retrieve the latest fear and greed index from CoinMarketCap",
                    parameters: [
                        {
                            name: "type",
                            in: "query",
                            required: true,
                            schema: {
                                type: "string",
                                enum: ["latest", "historical"]
                            },
                            description: "Type of data to retrieve (latest or historical)"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean",
                                                description: "Indicates if the request was successful"
                                            },
                                            data: {
                                                type: "object",
                                                description: "The trending topics data from CoinMarketCap"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean",
                                                description: "Indicates request failure"
                                            },
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
    };

    return NextResponse.json(pluginData);
}