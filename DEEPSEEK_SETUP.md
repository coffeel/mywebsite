# DeepSeek API Integration Setup

This guide will help you set up the DeepSeek API integration for your website's AI chat feature.

## 🔑 Getting Your DeepSeek API Key

### Step 1: Sign Up for DeepSeek
1. Go to [DeepSeek's official website](https://www.deepseek.com/)
2. Create an account or sign in
3. Navigate to the API section

### Step 2: Get Your API Key
1. In your DeepSeek dashboard, find the API section
2. Generate a new API key
3. Copy the API key (it will look like `sk-...`)

## ⚙️ Configuration

### Step 1: Update API Key
1. Open `config.js` in your project
2. Replace `'your-deepseek-api-key-here'` with your actual API key:

```javascript
const DEEPSEEK_CONFIG = {
    API_KEY: 'sk-your-actual-api-key-here',
    // ... rest of config
};
```

### Step 2: Choose Your Model
DeepSeek offers different models. Update the `MODEL` in `config.js`:

```javascript
// For general chat
MODEL: 'deepseek-chat',

// For coding tasks
MODEL: 'deepseek-coder',

// For latest model
MODEL: 'deepseek-chat-v3',
```

## 🔒 Security Considerations

### For Production Use:
1. **Never expose API keys in client-side code**
2. **Use a backend proxy** to handle API calls
3. **Implement rate limiting** to prevent abuse
4. **Add user authentication** if needed

### Backend Proxy Example (Node.js):
```javascript
// server.js
const express = require('express');
const app = express();

app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'API call failed' });
    }
});
```

## 🧪 Testing the Integration

### Step 1: Test with Simple Questions
Try asking the AI:
- "Hello, how are you?"
- "Can you help me with CSS?"
- "What is responsive design?"

### Step 2: Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for any error messages
4. Verify API calls are being made

## 📊 API Usage Monitoring

### Track Your Usage:
1. Monitor API calls in DeepSeek dashboard
2. Set up usage alerts
3. Monitor response times
4. Track error rates

## 🚀 Advanced Configuration

### Customize AI Behavior:
Update the system message in `script.js`:

```javascript
let conversationHistory = [
    {
        role: "system",
        content: "You are DeepSeek AI, a helpful assistant specializing in web development, coding, design, and technical topics. You provide clear, practical advice and code examples when appropriate. Keep responses concise but informative."
    }
];
```

### Adjust Response Parameters:
Modify `DEFAULT_PARAMS` in `config.js`:

```javascript
DEFAULT_PARAMS: {
    max_tokens: 1000,        // Maximum response length
    temperature: 0.7,         // Creativity (0-1)
    top_p: 0.9,              // Response diversity
    frequency_penalty: 0,     // Reduce repetition
    presence_penalty: 0       // Encourage new topics
}
```

## 🛠️ Troubleshooting

### Common Issues:

1. **API Key Invalid**
   - Verify your API key is correct
   - Check if the key has proper permissions

2. **CORS Errors**
   - Use a backend proxy for production
   - Ensure proper headers are set

3. **Rate Limiting**
   - Implement request throttling
   - Add retry logic with exponential backoff

4. **Network Errors**
   - Check internet connection
   - Verify API endpoint is accessible

### Error Handling:
The current implementation includes fallback responses if the API fails, ensuring your chat always works even during API issues.

## 📈 Performance Optimization

### Best Practices:
1. **Cache responses** for common questions
2. **Implement request debouncing**
3. **Use streaming responses** for long answers
4. **Add loading states** for better UX

## 🔐 Environment Variables (Recommended)

For better security, use environment variables:

```javascript
// config.js
const DEEPSEEK_CONFIG = {
    API_KEY: process.env.DEEPSEEK_API_KEY || 'your-api-key',
    // ... rest of config
};
```

## 📞 Support

If you encounter issues:
1. Check DeepSeek's official documentation
2. Verify your API key and permissions
3. Test with simple requests first
4. Monitor browser console for errors

---

**Note**: This integration is for demonstration purposes. For production use, always implement proper security measures and use a backend proxy to protect your API keys. 