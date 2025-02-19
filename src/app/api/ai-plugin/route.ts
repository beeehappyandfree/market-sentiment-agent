import { ACCOUNT_ID, PLUGIN_URL } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "Boilerplate",
            description: "API for the boilerplate",
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
                description: "An assistant that can perform market sentiment analysis on crypto markets.",
                instructions: "You.",
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
        },
    };

    return NextResponse.json(pluginData);
}