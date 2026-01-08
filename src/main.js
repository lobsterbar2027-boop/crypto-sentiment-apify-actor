import { Actor } from 'apify';

await Actor.main(async () => {
    console.log('🚀 Crypto Sentiment Tracker starting...');
    const input = await Actor.getInput();
    console.log('Input received:', input);
    const coinsToCheck = input.coin ? [input.coin] : (input.coins || ['BTC', 'ETH', 'SOL']);
    console.log(`Fetching sentiment for: ${coinsToCheck.join(', ')}`);
    const results = [];
    for (const coin of coinsToCheck) {
        try {
            console.log(`📊 Fetching ${coin}...`);
            const response = await fetch(
                `https://crypto-sentiment-api-production.up.railway.app/v1/sentiment/${coin}`,
                { method: 'GET', headers: { 'Content-Type': 'application/json' } }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            const sentimentData = await response.json();
            const result = {
                coin, signal: sentimentData.signal || 'NEUTRAL', score: sentimentData.score || 0,
                sentiment: sentimentData.sentiment || {}, confidence: sentimentData.confidence || 'MEDIUM',
                sources: sentimentData.sources || {}, sentiment_summary: generateSummary(coin, sentimentData),
                recommendation: getRecommendation(sentimentData), timestamp: new Date().toISOString()
            };
            results.push(result);
            console.log(`✅ ${coin}: ${result.signal} (score: ${result.score})`);
        } catch (error) {
            console.error(`❌ Error fetching ${coin}:`, error.message);
            results.push({ coin, error: error.message, timestamp: new Date().toISOString() });
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    await Actor.pushData(results);
    const summary = {
        total_coins: coinsToCheck.length, successful: results.filter(r => !r.error).length,
        failed: results.filter(r => r.error).length, bullish: results.filter(r => r.signal?.includes('BUY')).length,
        bearish: results.filter(r => r.signal?.includes('SELL')).length, neutral: results.filter(r => r.signal === 'NEUTRAL').length,
        overall_sentiment: calculateOverallSentiment(results), timestamp: new Date().toISOString()
    };
    await Actor.setValue('SUMMARY', summary);
    console.log('✅ Actor finished successfully!');
    console.log('Summary:', JSON.stringify(summary, null, 2));
});

function generateSummary(coin, data) {
    const score = data.score || 0;
    const signal = data.signal || 'NEUTRAL';
    const strength = Math.abs(score) > 0.7 ? 'strong' : Math.abs(score) > 0.4 ? 'moderate' : 'weak';
    return `${coin} shows ${signal} signal with ${strength} confidence (${score.toFixed(2)}) based on social media analysis.`;
}

function getRecommendation(data) {
    const score = data.score || 0;
    if (score > 0.7) return { action: 'STRONG BUY', confidence: 'HIGH', reasoning: 'Overwhelming positive sentiment across all sources' };
    else if (score > 0.4) return { action: 'BUY', confidence: 'MEDIUM', reasoning: 'Positive sentiment trending upward' };
    else if (score > 0.1) return { action: 'WEAK BUY', confidence: 'LOW', reasoning: 'Slight positive sentiment' };
    else if (score < -0.7) return { action: 'STRONG SELL', confidence: 'HIGH', reasoning: 'Overwhelming negative sentiment' };
    else if (score < -0.4) return { action: 'SELL', confidence: 'MEDIUM', reasoning: 'Negative sentiment detected' };
    else if (score < -0.1) return { action: 'WEAK SELL', confidence: 'LOW', reasoning: 'Slight negative sentiment' };
    else return { action: 'HOLD', confidence: 'LOW', reasoning: 'Mixed or neutral sentiment' };
}

function calculateOverallSentiment(results) {
    const validResults = results.filter(r => !r.error && r.score !== undefined);
    if (validResults.length === 0) return "Unable to determine - no valid data";
    const avgScore = validResults.reduce((sum, r) => sum + r.score, 0) / validResults.length;
    if (avgScore > 0.5) return "🟢 Bullish market sentiment overall";
    if (avgScore > 0.2) return "🟡 Slightly bullish sentiment";
    if (avgScore < -0.5) return "🔴 Bearish market sentiment overall";
    if (avgScore < -0.2) return "🟡 Slightly bearish sentiment";
    return "⚪ Mixed/Neutral market sentiment";
}
```
