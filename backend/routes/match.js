import express from 'express';
const router = express.Router();
import Product from '../models/Product.js';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { query, filters } = req.body;
    
    // 1. Build hard filters
    let dbQuery = {};
    if (filters) {
      if (filters.category && filters.category !== 'All') {
        dbQuery.category = filters.category;
      }
      if (filters.maxPrice) {
        dbQuery.$or = [
          { pricePerSqm: { $lte: Number(filters.maxPrice) } },
          { pricePerUnit: { $lte: Number(filters.maxPrice) } }
        ];
      }
      if (filters.thickness) {
        dbQuery.thickness = { $lte: Number(filters.thickness) };
      }
    }

    const candidates = await Product.find(dbQuery);

    if (candidates.length === 0) {
      return res.json({ results: [], query });
    }

    // 2. Prepare Groq Prompt
    const systemPrompt = `You are a glass industry expert matching engine for AmalGus marketplace. Given a buyer's requirement and a list of glass products, analyze each product and return a JSON array with match scores and explanations. Be precise about glass specifications — thickness, certifications, coatings, and use cases matter.`;
    
    const userPrompt = `
Buyer requirement: "${query}"

Products to evaluate (JSON):
${JSON.stringify(candidates.map(p => ({
  id: p._id,
  name: p.name,
  category: p.category,
  thickness: p.thickness,
  description: p.description,
  tags: p.tags,
  supplier: p.supplier
})))}

Return ONLY a valid JSON array (no markdown, no explanation outside JSON):
[
  {
    "productId": "...",
    "matchScore": 0-100,
    "explanation": "2-3 sentence explanation of why this product matches or partially matches the requirement",
    "matchedAttributes": ["attribute1", "attribute2"]
  }
]

Rank by matchScore descending. Include top 5 only. Be accurate about glass specs.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'llama3-70b-8192',
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    let matchResults = [];
    try {
      const content = chatCompletion.choices[0].message.content;
      const parsed = JSON.parse(content);
      matchResults = Array.isArray(parsed) ? parsed : (parsed.matches || parsed.results || []);
    } catch (e) {
      console.error('Failed to parse Groq response:', e);
      matchResults = candidates.slice(0, 5).map(c => ({
        productId: c._id,
        matchScore: 70,
        explanation: "Matches basic filter criteria.",
        matchedAttributes: [c.category]
      }));
    }

    // 3. Merge with full product data
    const finalResults = matchResults.map(match => {
      const product = candidates.find(p => p._id.toString() === match.productId.toString());
      return {
        product,
        matchScore: match.matchScore,
        explanation: match.explanation,
        matchedAttributes: match.matchedAttributes
      };
    }).filter(res => res.product);

    res.json({ results: finalResults, query });

  } catch (err) {
    console.error('Match error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
