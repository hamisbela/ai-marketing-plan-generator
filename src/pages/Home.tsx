import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Coffee, Sparkles, BarChart2, Star, Copy, Check } from 'lucide-react';
import { genAI } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Home() {
  const [description, setDescription] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generatePlan = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Create a comprehensive marketing plan based on this information: ${description}. 
      Format the response in markdown with proper headings, bullet points, and sections.
      
      Include these sections with proper markdown formatting:
      
      # Executive Summary
      Brief overview of the marketing plan
      
      # Target Audience Analysis
      - Demographics
      - Psychographics
      - Pain points
      - Buying behavior
      
      # Marketing Objectives
      Clear, measurable goals
      
      # Strategy
      ## Digital Marketing Channels
      - Social media
      - Content marketing
      - Email marketing
      - SEO
      - Paid advertising
      
      ## Content Strategy
      - Content types
      - Publishing schedule
      - Key messages
      
      # Budget Allocation
      Breakdown of marketing spend
      
      # KPIs and Metrics
      - Key performance indicators
      - Success metrics
      - Monitoring plan
      
      # Timeline
      Implementation schedule
      
      # Action Items
      Specific next steps`;
      
      const result = await model.generateContent(prompt);
      setPlan(result.response.text());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the marketing plan');
      setPlan('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(plan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 py-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text leading-tight">
            AI Marketing Plan Generator ✨
          </h1>
          <p className="text-xl text-gray-600">
            Create data-driven marketing plans that deliver results! 📈
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <Textarea
                placeholder="✍️ Describe your business, target audience, goals, budget range, timeline, and any specific marketing objectives..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] text-lg border-2 focus:border-purple-400"
              />
              
              <Button 
                onClick={generatePlan}
                disabled={loading || !description.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Creating Your Plan...
                  </>
                ) : (
                  <>
                    <BarChart2 className="mr-2 h-5 w-5" />
                    Generate Marketing Plan ✨
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {plan && (
          <Card className="p-6 mb-12 hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h3 className="text-xl font-semibold">Your Marketing Plan</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2 hover:bg-purple-50"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {plan}
              </ReactMarkdown>
            </div>
          </Card>
        )}

        <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 mb-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-purple-500" />
            <h2 className="text-2xl font-bold">Support Our Work 🚀</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Help us maintain and improve our AI tools by supporting our API & hosting costs. 
              Your contribution helps keep this tool free for everyone! 🙏
            </p>
            <a
              href="https://roihacks.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                <Coffee className="mr-2 h-5 w-5" />
                Buy Us a Coffee ☕
              </Button>
            </a>
          </div>
        </Card>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text">
              Free AI Marketing Plan Generator: Create Strategic Plans in Seconds ⚡
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Our Free AI Marketing Plan Generator helps you create comprehensive, data-driven 
                marketing strategies that deliver results. Perfect for marketers, entrepreneurs, 
                and businesses of all sizes.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-purple-500" />
                  The #1 AI Marketing Plan Generator 📈
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">🎯</span>
                    <span>Comprehensive marketing strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤖</span>
                    <span>AI-powered insights and recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span>Generate plans in seconds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>Data-driven marketing strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💎</span>
                    <span>Free to use with unlimited generations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Perfect For Every Business 🏢</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI marketing plan generator is perfect for:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• Marketing professionals and teams</li>
                  <li>• Small businesses and startups</li>
                  <li>• Digital marketing agencies</li>
                  <li>• E-commerce businesses</li>
                  <li>• Brand managers</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Marketing Plan Best Practices ✍️</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Define clear marketing objectives</li>
                  <li>Understand your target audience</li>
                  <li>Choose the right marketing channels</li>
                  <li>Set measurable KPIs</li>
                  <li>Monitor and optimize performance</li>
                </ol>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}