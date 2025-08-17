import { Action, IAgentRuntime, Provider, Plugin, Memory } from '@ai16z/eliza';

interface HivePluginConfig {
  apiKey: string;
}

/**
 * HiveProvider handles the actual API calls to Hive Intelligence.
 * It implements the Provider interface from @ai16z/eliza.
 */
class HiveProvider implements Provider {
  constructor(private config: HivePluginConfig) {
    if (!this.config.apiKey) {
      console.warn("Hive Intelligence API key is missing. API calls will be mocked.");
    }
  }

  /**
   * Fetches data from Hive Intelligence. Currently, this is a placeholder
   * due to external API key and IP restrictions in the sandbox environment.
   * @param runtime The agent runtime context.
   * @param message The message triggering the action, containing the query.
   * @returns A promise resolving to the API response or a mocked response.
   */
  async get(runtime: IAgentRuntime, message: Memory): Promise<any> {
    const API_URL = "https://api.hiveintelligence.xyz/v1/search";
    const API_KEY = this.config.apiKey;
    const queryPrompt = message.content.text;

    console.log(`HiveProvider: Attempting to query Hive Intelligence with prompt: "${queryPrompt}"`);

    if (!API_KEY) {
      console.error("Hive Intelligence API key not provided. Returning mocked data.");
      return { 
        status: "mocked",
        query: queryPrompt,
        result: "Mocked data: Due to API key and IP restrictions, actual Hive Intelligence data cannot be fetched. Please provide a valid API key and ensure network access.",
        data_sources: []
      };
    }

    const headers = {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "ElizaOS-HivePlugin/1.0" // Good practice to identify client
    };

    const payload = {
      prompt: queryPrompt,
      temperature: 0.5, // Default value, can be made configurable if needed
      include_data_sources: false, // Default value, can be made configurable if needed
    };

    console.log("HiveProvider: Making API call to", API_URL);
    console.log("HiveProvider: Request Headers (Authorization header truncated):");
    console.log({ ...headers, "Authorization": "Bearer [TRUNCATED]" });
    console.log("HiveProvider: Request Payload:", payload);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });

      console.log("HiveProvider: API Response Status:", response.status);
      const responseData = await response.json();
      console.log("HiveProvider: API Response Data:", responseData);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${responseData.error || JSON.stringify(responseData)}`);
      }

      return responseData;
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error calling Hive Intelligence API:", err);
      // Return a structured error response or re-throw based on desired behavior
      return { 
        status: "error",
        query: queryPrompt,
        error: `Failed to fetch data from Hive Intelligence: ${err.message}`,
        details: err.toString()
      };
    }
  }
}

/**
 * HivePlugin integrates Hive Intelligence functionality into ElizaOS agents.
 * It defines actions that agents can perform using the HiveProvider.
 */
class HivePlugin implements Plugin {
  name: string = 'hive';
  description: string = 'A plugin for integrating with Hive Intelligence API to query blockchain and market data.';
  providers: Provider[] = [];
  actions: Action[];

  constructor() {
    this.actions = [
      {
        name: 'queryBlockchainData',
        description: 'Queries blockchain or market data using Hive Intelligence. Provide a clear and concise question about the data you need.',
        similes: [
          'search blockchain data',
          'get crypto price',
          'analyze market data',
          'find blockchain information',
          'query hive intelligence'
        ],
        examples: [
          [
            { user: 'user', content: { text: 'What is the current price of Ethereum?' } },
            { user: 'agent', content: { text: 'queryBlockchainData(message: "What is the current price of Ethereum?")' } },
          ],
          [
            { user: 'user', content: { text: 'Tell me about the latest trends in DeFi.' } },
            { user: 'agent', content: { text: 'queryBlockchainData(message: "Latest trends in DeFi")' } },
          ],
          [
            { user: 'user', content: { text: 'What are the top 5 cryptocurrencies by market cap?' } },
            { user: 'agent', content: { text: 'queryBlockchainData(message: "Top 5 cryptocurrencies by market cap")' } },
          ],
        ],
        validate: async (runtime: IAgentRuntime, message: Memory) => {
          // Basic validation: ensure message content exists
          return !!message.content.text;
        },
        handler: async (runtime: IAgentRuntime, message: Memory) => {
          const provider = this.providers.find(p => p instanceof HiveProvider) as HiveProvider;
          if (!provider) {
            console.error("HiveProvider not initialized. Ensure HIVE_API_KEY is set in agent secrets.");
            return { error: "Hive Intelligence provider not available. Please check agent configuration." };
          }
          try {
            const result = await provider.get(runtime, message);
            // Process the result before returning to the agent
            if (result.status === "mocked") {
              return { response: result.result };
            } else if (result.status === "error") {
              return { response: `Error from Hive Intelligence: ${result.error}` };
            } else if (result.result) {
              return { response: `Hive Intelligence found: ${result.result}` };
            } else {
              return { response: "Hive Intelligence query completed, but no specific result was returned." };
            }
          } catch (error: unknown) {
            const err = error as Error;
            console.error("Error in HivePlugin handler:", err);
            return { error: `Failed to process Hive Intelligence query: ${err.message}` };
          }
        },
      },
    ];
  }

  /**
   * Initializes the HivePlugin with necessary configurations, typically from agent secrets.
   * This method is called by the ElizaOS runtime during agent setup.
   * @param agentConfig The full configuration of the agent.
   */
  initialize(agentConfig: any) {
    const apiKey = agentConfig.settings?.secrets?.HIVE_API_KEY;
    if (!apiKey) {
      console.warn("HIVE_API_KEY not found in agent secrets. Hive Intelligence plugin will operate in mocked mode.");
    }
    // Ensure only one provider is added if initialize is called multiple times
    if (this.providers.length === 0) {
      this.providers.push(new HiveProvider({ apiKey }));
    }
  }
}

export default HivePlugin;


