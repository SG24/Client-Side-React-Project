// Config file for api calls to financial modelling
// Replace {ticker} with the ticker of the company to be searched

const FM_CONFIG = {

  all: {
    // List of all symbols in the database
    "Symbols List (All)": "https://financialmodelingprep.com/api/v3/company/stock/list",
  },

  init: {
    // Company Realtime stock price
    "Realtime Stock Price": "https://financialmodelingprep.com/api/v3/stock/real-time-price/{ticker}",
    // Company's daily ratings
    "Company Ratings": "https://financialmodelingprep.com/api/v3/company/rating/{ticker}",
    // Company Profile
    "Company Profile": "https://financialmodelingprep.com/api/v3/company/profile/{ticker}",
  },
  
  inDepth: {
    // Income Statements
    "Income Statement (Annual)": "https://financialmodelingprep.com/api/v3/financials/income-statement/{ticker}",
    "Income Statement (Quarter)": "https://financialmodelingprep.com/api/v3/financials/income-statement/{ticker}?period=quarter",
    // Balance Sheets
    "Balance Sheet (Annual)": "https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/{ticker}",
    "Balance Sheet (Quarter)": "https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/{ticker}?period=quarter",
    // Cash Flow Statements
    "Cash Flow Statement (Annual)": "https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/{ticker}",
    "Cash Flow Statement (Quarter)": "https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/{ticker}?period=quarter",
    // Financial Ratios
    "Financial Ratios": "https://financialmodelingprep.com/api/v3/financial-ratios/{ticker}",
    // Enterprise Value
    "Enterprise Value (Annual)": "https://financialmodelingprep.com/api/v3/enterprise-value/{ticker}",
    "Enterprise Value (Quarter)": "https://financialmodelingprep.com/api/v3/enterprise-value/{ticker}?period=quarter",
    // Company Key Metrics
    "Key Metrics (Annual)": "https://financialmodelingprep.com/api/v3/company-key-metrics/{ticker}",
    "Key Metrics (Quarter)": "https://financialmodelingprep.com/api/v3/company-key-metrics/{ticker}?period=quarter",
  },
  
  historical: {
    // Historical Stock Prices
    // Stock historical prices. Daily JSON
    coStockJSON_HistoricalDaily: "https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?serietype=line",
    // Historical price with change and volume //
    // Stock historical prices with change and volume. Daily JSON OHLCV
    coStockOHLCVJSON_HistoricalDaily: "https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}",
    // Historical price with change and volume interval //
    // Time series stock historical prices for a certain interval Daily JSON Range
    coTimeSeriesJSON_HistoricalDaily: "https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?from=2018-03-12&to=2019-03-12",  
    // Historical price with change and volume Time series //
    // Time series stock historical prices with change and volume for the last x days. Daily JSON Timeseries
    coTimeSeriesJSON_HistoricalSpecific: "https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?timeseries=5",
  },
};

export default FM_CONFIG;