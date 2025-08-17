import HivePlugin from './src/plugins/hive/index';
import { Memory } from '@ai16z/eliza';

async function testHivePlugin() {
  console.log('Starting Hive Plugin test...');

  const hivePlugin = new HivePlugin();
  const config = {
    settings: {
      secrets: {
        HIVE_API_KEY: 'dev_21d98427bb9a617cd9ee1a29e22a8360',
      },
    },
  };
  hivePlugin.initialize(config as any);

  const mockRuntime: any = {}; // Mock IAgentRuntime
  const mockMessage: Memory = {
    userId: 'mock-user-id',
    agentId: 'mock-agent-id',
    roomId: 'mock-room-id',
    content: {
      text: 'What is the current price of Ethereum?',
    },
  };

  try {
    const result = await hivePlugin.actions[0].handler(mockRuntime, mockMessage);
    console.log('Hive Plugin test successful:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Hive Plugin test failed:', error);
  }
}

testHivePlugin();


