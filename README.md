# Crypto Sentiment Tracker Pro

Real-time cryptocurrency sentiment analysis from Reddit, Twitter, and TikTok. Powered by GenVox AI.

## 🚀 Features

✅ Track sentiment for 10+ cryptocurrencies  
✅ BUY/SELL/NEUTRAL signals with confidence scores  
✅ Data from multiple social media sources (Reddit, Twitter, TikTok)  
✅ Real-time analysis updated hourly  
✅ Clean JSON output  
✅ Perfect for trading bots and AI assistants  
✅ MCP-enabled (works with Claude Desktop, ChatGPT)  

## 📊 How to Use

### Option 1: Single Coin
```json
{
  "coin": "BTC"
}
```

### Option 2: Multiple Coins
```json
{
  "coins": ["BTC", "ETH", "SOL", "DOGE", "ADA"]
}
```

## 📤 Output Format

```json
{
  "coin": "BTC",
  "signal": "STRONG_BUY",
  "score": 0.78,
  "confidence": "HIGH",
  "sentiment": {
    "positive": 78,
    "negative": 12,
    "neutral": 10
  },
  "sources": {
    "reddit": 0.82,
    "twitter": 0.75,
    "tiktok": 0.79
  },
  "sentiment_summary": "BTC shows STRONG_BUY signal with strong confidence (0.78) based on social media analysis.",
  "recommendation": {
    "action": "STRONG BUY",
    "confidence": "HIGH",
    "reasoning": "Overwhelming positive sentiment across all sources"
  },
  "timestamp": "2025-01-07T10:30:00Z"
}
```

## 🤖 Use with AI Assistants (MCP)

This actor works with Claude Desktop, ChatGPT, and other AI assistants via MCP!

### Example Queries:

> "Check the sentiment for Bitcoin"

> "What's the crypto sentiment for BTC, ETH, and SOL?"

> "Should I buy Ethereum based on social media sentiment?"

The AI will automatically call this actor and provide insights.

## 💡 Use Cases

- **Automated Trading Bots** - Get signals for entry/exit points
- **Market Research** - Understand market sentiment trends
- **Alert Systems** - Get notified on sentiment changes
- **Portfolio Management** - Make data-driven decisions
- **AI Assistants** - Natural language crypto insights

## 🔗 Powered By

- **GenVox API** - https://genvox.io
- **Data Sources** - Reddit, Twitter, TikTok
- **Payment** - x402 protocol on Base network

## 📞 Support

Questions? Reach out:
- Twitter: @BreakTheCubicle
- GitHub: github.com/lobsterbar2027-boop

## 📜 License

ISC License - Free for personal and commercial use
