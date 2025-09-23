# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Ultracite linter for code quality checks
- `pnpm lint:fix` - Auto-fix code formatting and safe issues
- `pnpm lint:fix:unsafe` - Auto-fix including unsafe transformations

## Database Commands

- `pnpm db:generate` - Generate migration files from schema changes
- `pnpm db:migrate` - Apply migrations to database
- `pnpm db:push` - Push schema changes directly to database
- `pnpm db:studio` - Open Drizzle Studio for database management

## Architecture Overview

This is a Next.js 15 chat application using the App Router architecture with the following key technologies:

### Core Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict Ultracite linting
- **Styling**: Tailwind CSS 4.x
- **Package Manager**: pnpm
- **AI Integration**: Vercel AI SDK (@ai-sdk/react, @ai-sdk/google)
- **API Layer**: Next.js API Routes with React Query for client-server communication
- **Database**: Drizzle ORM with PostgreSQL (Supabase)
- **UI Components**: Radix UI primitives with shadcn/ui system
- **State Management**: Zustand for client state
- **Theme System**: next-themes with dark/light mode support

### Project Structure

- **`src/app/`** - Next.js App Router pages and API routes
  - **`api/chat/stream/route.ts`** - Streaming chat API endpoint using AI SDK's streamText
  - **`api/conversations/`** - Conversation management endpoints (CRUD operations)
  - **`api/messages/`** - Message retrieval endpoints
  - **`api/models/`** - Model list endpoint
- **`src/features/`** - Feature-based modules (chat, model, sidebar)
- **`src/components/`** - Reusable UI components
  - **`ui/`** - shadcn/ui base components
  - **`animate-ui/`** - Animated UI components
- **`src/lib/`** - Utility libraries and API client
  - **`api-client.ts`** - HTTP API client for server communication
  - **`api-hooks.ts`** - React Query hooks for API operations
  - **`react-query-provider.tsx`** - React Query provider configuration
- **`src/store/`** - Zustand state management
- **`src/db/`** - Database layer with Drizzle ORM
  - **`schema.ts`** - Database table definitions and types
  - **`index.ts`** - Database connection and client setup

### Key Patterns

#### API Integration

The app uses Next.js API routes with React Query for client-server communication:

- RESTful API endpoints in `src/app/api/` directory
- Client-side API client in `src/lib/api-client.ts` handles HTTP requests
- React Query hooks in `src/lib/api-hooks.ts` provide data fetching and caching
- Custom chat transport in `src/lib/api-chat-transport.ts` handles streaming responses

#### Database Layer with Drizzle ORM

- PostgreSQL database hosted on Supabase
- Type-safe database operations using Drizzle ORM
- Schema definitions in `src/db/schema.ts` with inferred TypeScript types
- Database client configured in `src/db/index.ts` with connection pooling
- All API endpoints use Drizzle for data persistence (conversations, messages, models)

#### AI Chat Implementation

- Uses Vercel AI SDK's `useChat` hook for streaming chat interactions
- Backend streaming via `streamText` API in `src/app/api/chat/stream/route.ts`
- Custom chat transport handles streaming responses from API
- Message state managed through AI SDK's built-in patterns

#### Component Architecture

- Features organized in `src/features/` with their own components and hooks
- UI components follow shadcn/ui patterns with Tailwind CSS styling
- Consistent use of Radix UI primitives for accessibility

#### Theme and Layout

- Root layout (`src/app/layout.tsx`) provides theme, React Query, and sidebar providers
- Sidebar-based layout using custom Radix components
- Geist Sans and Geist Mono fonts configured

### Development Guidelines

#### Code Quality

- Ultracite enforces strict TypeScript, accessibility, and React best practices
- No console statements, proper error handling required
- Use `export type` for types, `import type` for type imports
- Prefer arrow functions, avoid `var`, use `const` by default

#### Database Development

- Always define schema changes in `src/db/schema.ts` first
- Use `pnpm db:push` for development schema synchronization
- Use `pnpm db:generate` and `pnpm db:migrate` for production deployments
- Import database operations from `@/db` and schema types from `@/db/schema`
- Use Drizzle's `eq`, `desc`, `asc` functions for query conditions

#### File Naming

- Pages: `page.tsx` (App Router convention)
- API Routes: `route.ts` (App Router convention)
- Components: kebab-case (e.g., `chat-input-bar.tsx`)
- Feature modules: organized under `src/features/[feature-name]/`

#### Styling

- Tailwind CSS 4.x with `clsx` and `tailwind-merge` for conditional classes
- Dark/light theme support via `next-themes`
- Responsive design patterns

#### Testing and Quality

- Run `pnpm lint` before commits to ensure code quality
- Ultracite handles formatting, linting, and type checking
- Follow accessibility guidelines enforced by Ultracite rules

## Environment Setup

Required environment variables in `.env.local`:

- `GOOGLE_GENERATIVE_AI_API_KEY` - Google Gemini API key for AI chat
- `DATABASE_URL` - PostgreSQL connection string from Supabase

## UI Component Libraries

This project uses components from:

- [shadcn/ui](https://ui.shadcn.com/) - Core UI component system
- [Animate UI](https://animate-ui.com/docs/buttons/copy) - Animated components
- [Cult UI](http://cult-ui.com/) - Additional UI patterns

## AI Assistant Development

这个部分展示了，以 python 代码为例子的， AI Assistant 应用开发的架构。以此作为 Sili Bot 应该开发的指导。

Focus on creating production-ready AI assistants that provide real value through natural conversations, intelligent responses, and continuous learning from user interactions.

### 1. AI Assistant Architecture

Design comprehensive assistant architecture:

**Assistant Architecture Framework**

```python
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from abc import ABC, abstractmethod
import asyncio

@dataclass
class ConversationContext:
    """Maintains conversation state and context"""
    user_id: str
    session_id: str
    messages: List[Dict[str, Any]]
    user_profile: Dict[str, Any]
    conversation_state: Dict[str, Any]
    metadata: Dict[str, Any]

class AIAssistantArchitecture:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.components = self._initialize_components()
        
    def design_architecture(self):
        """Design comprehensive AI assistant architecture"""
        return {
            'core_components': {
                'nlu': self._design_nlu_component(),
                'dialog_manager': self._design_dialog_manager(),
                'response_generator': self._design_response_generator(),
                'context_manager': self._design_context_manager(),
                'integration_layer': self._design_integration_layer()
            },
            'data_flow': self._design_data_flow(),
            'deployment': self._design_deployment_architecture(),
            'scalability': self._design_scalability_features()
        }
    
    def _design_nlu_component(self):
        """Natural Language Understanding component"""
        return {
            'intent_recognition': {
                'model': 'transformer-based classifier',
                'features': [
                    'Multi-intent detection',
                    'Confidence scoring',
                    'Fallback handling'
                ],
                'implementation': '''
class IntentClassifier:
    def __init__(self, model_path: str):
        self.model = self.load_model(model_path)
        self.intents = self.load_intent_schema()
    
    async def classify(self, text: str) -> Dict[str, Any]:
        # Preprocess text
        processed = self.preprocess(text)
        
        # Get model predictions
        predictions = await self.model.predict(processed)
        
        # Extract intents with confidence
        intents = []
        for intent, confidence in predictions:
            if confidence > self.config['threshold']:
                intents.append({
                    'name': intent,
                    'confidence': confidence,
                    'parameters': self.extract_parameters(text, intent)
                })
        
        return {
            'intents': intents,
            'primary_intent': intents[0] if intents else None,
            'requires_clarification': len(intents) > 1
        }
'''
            },
            'entity_extraction': {
                'model': 'NER with custom entities',
                'features': [
                    'Domain-specific entities',
                    'Contextual extraction',
                    'Entity resolution'
                ]
            },
            'sentiment_analysis': {
                'model': 'Fine-tuned sentiment classifier',
                'features': [
                    'Emotion detection',
                    'Urgency classification',
                    'User satisfaction tracking'
                ]
            }
        }
    
    def _design_dialog_manager(self):
        """Dialog management system"""
        return '''
class DialogManager:
    """Manages conversation flow and state"""
    
    def __init__(self):
        self.state_machine = ConversationStateMachine()
        self.policy_network = DialogPolicy()
        
    async def process_turn(self, 
                          context: ConversationContext, 
                          nlu_result: Dict[str, Any]) -> Dict[str, Any]:
        # Determine current state
        current_state = self.state_machine.get_state(context)
        
        # Apply dialog policy
        action = await self.policy_network.select_action(
            current_state, 
            nlu_result, 
            context
        )
        
        # Execute action
        result = await self.execute_action(action, context)
        
        # Update state
        new_state = self.state_machine.transition(
            current_state, 
            action, 
            result
        )
        
        return {
            'action': action,
            'new_state': new_state,
            'response_data': result
        }
    
    async def execute_action(self, action: str, context: ConversationContext):
        """Execute dialog action"""
        action_handlers = {
            'greet': self.handle_greeting,
            'provide_info': self.handle_information_request,
            'clarify': self.handle_clarification,
            'confirm': self.handle_confirmation,
            'execute_task': self.handle_task_execution,
            'end_conversation': self.handle_conversation_end
        }
        
        handler = action_handlers.get(action, self.handle_unknown)
        return await handler(context)
'''
```

### 2. Natural Language Processing

Implement advanced NLP capabilities:

**NLP Pipeline Implementation**

```python
class NLPPipeline:
    def __init__(self):
        self.tokenizer = self._initialize_tokenizer()
        self.embedder = self._initialize_embedder()
        self.models = self._load_models()
    
    async def process_message(self, message: str, context: ConversationContext):
        """Process user message through NLP pipeline"""
        # Tokenization and preprocessing
        tokens = self.tokenizer.tokenize(message)
        
        # Generate embeddings
        embeddings = await self.embedder.embed(tokens)
        
        # Parallel processing of NLP tasks
        tasks = [
            self.detect_intent(embeddings),
            self.extract_entities(tokens, embeddings),
            self.analyze_sentiment(embeddings),
            self.detect_language(tokens),
            self.check_spelling(tokens)
        ]
        
        results = await asyncio.gather(*tasks)
        
        return {
            'intent': results[0],
            'entities': results[1],
            'sentiment': results[2],
            'language': results[3],
            'corrections': results[4],
            'original_message': message,
            'processed_tokens': tokens
        }
    
    async def detect_intent(self, embeddings):
        """Advanced intent detection"""
        # Multi-label classification
        intent_scores = await self.models['intent_classifier'].predict(embeddings)
        
        # Hierarchical intent detection
        primary_intent = self.get_primary_intent(intent_scores)
        sub_intents = self.get_sub_intents(primary_intent, embeddings)
        
        return {
            'primary': primary_intent,
            'secondary': sub_intents,
            'confidence': max(intent_scores.values()),
            'all_scores': intent_scores
        }
    
    def extract_entities(self, tokens, embeddings):
        """Extract and resolve entities"""
        # Named Entity Recognition
        entities = self.models['ner'].extract(tokens, embeddings)
        
        # Entity linking and resolution
        resolved_entities = []
        for entity in entities:
            resolved = self.resolve_entity(entity)
            resolved_entities.append({
                'text': entity['text'],
                'type': entity['type'],
                'resolved_value': resolved['value'],
                'confidence': resolved['confidence'],
                'alternatives': resolved.get('alternatives', [])
            })
        
        return resolved_entities
    
    def build_semantic_understanding(self, nlu_result, context):
        """Build semantic representation of user intent"""
        return {
            'user_goal': self.infer_user_goal(nlu_result, context),
            'required_information': self.identify_missing_info(nlu_result),
            'constraints': self.extract_constraints(nlu_result),
            'preferences': self.extract_preferences(nlu_result, context)
        }
```

### 3. Conversation Flow Design

Design intelligent conversation flows:

**Conversation Flow Engine**

```python
class ConversationFlowEngine:
    def __init__(self):
        self.flows = self._load_conversation_flows()
        self.state_tracker = StateTracker()
        
    def design_conversation_flow(self):
        """Design multi-turn conversation flows"""
        return {
            'greeting_flow': {
                'triggers': ['hello', 'hi', 'greetings'],
                'nodes': [
                    {
                        'id': 'greet_user',
                        'type': 'response',
                        'content': self.personalized_greeting,
                        'next': 'ask_how_to_help'
                    },
                    {
                        'id': 'ask_how_to_help',
                        'type': 'question',
                        'content': "How can I assist you today?",
                        'expected_intents': ['request_help', 'ask_question'],
                        'timeout': 30,
                        'timeout_action': 'offer_suggestions'
                    }
                ]
            },
            'task_completion_flow': {
                'triggers': ['task_request'],
                'nodes': [
                    {
                        'id': 'understand_task',
                        'type': 'nlu_processing',
                        'extract': ['task_type', 'parameters'],
                        'next': 'check_requirements'
                    },
                    {
                        'id': 'check_requirements',
                        'type': 'validation',
                        'validate': self.validate_task_requirements,
                        'on_success': 'confirm_task',
                        'on_missing': 'request_missing_info'
                    },
                    {
                        'id': 'request_missing_info',
                        'type': 'slot_filling',
                        'slots': self.get_required_slots,
                        'prompts': self.get_slot_prompts,
                        'next': 'confirm_task'
                    },
                    {
                        'id': 'confirm_task',
                        'type': 'confirmation',
                        'content': self.generate_task_summary,
                        'on_confirm': 'execute_task',
                        'on_deny': 'clarify_task'
                    }
                ]
            }
        }
    
    async def execute_flow(self, flow_id: str, context: ConversationContext):
        """Execute a conversation flow"""
        flow = self.flows[flow_id]
        current_node = flow['nodes'][0]
        
        while current_node:
            result = await self.execute_node(current_node, context)
            
            # Determine next node
            if result.get('user_input'):
                next_node_id = self.determine_next_node(
                    current_node, 
                    result['user_input'],
                    context
                )
            else:
                next_node_id = current_node.get('next')
            
            current_node = self.get_node(flow, next_node_id)
            
            # Update context
            context.conversation_state.update(result.get('state_updates', {}))
        
        return context
```

### 4. Response Generation

Create intelligent response generation:

**Response Generator**

```python
class ResponseGenerator:
    def __init__(self, llm_client=None):
        self.llm = llm_client
        self.templates = self._load_response_templates()
        self.personality = self._load_personality_config()
        
    async def generate_response(self, 
                               intent: str, 
                               context: ConversationContext,
                               data: Dict[str, Any]) -> str:
        """Generate contextual responses"""
        
        # Select response strategy
        if self.should_use_template(intent):
            response = self.generate_from_template(intent, data)
        elif self.should_use_llm(intent, context):
            response = await self.generate_with_llm(intent, context, data)
        else:
            response = self.generate_hybrid_response(intent, context, data)
        
        # Apply personality and tone
        response = self.apply_personality(response, context)
        
        # Ensure response appropriateness
        response = self.validate_response(response, context)
        
        return response
    
    async def generate_with_llm(self, intent, context, data):
        """Generate response using LLM"""
        # Construct prompt
        prompt = self.build_llm_prompt(intent, context, data)
        
        # Set generation parameters
        params = {
            'temperature': self.get_temperature(intent),
            'max_tokens': 150,
            'stop_sequences': ['\n\n', 'User:', 'Human:']
        }
        
        # Generate response
        response = await self.llm.generate(prompt, **params)
        
        # Post-process response
        return self.post_process_llm_response(response)
    
    def build_llm_prompt(self, intent, context, data):
        """Build context-aware prompt for LLM"""
        return f"""
You are a helpful AI assistant with the following characteristics:
{self.personality.description}

Conversation history:
{self.format_conversation_history(context.messages[-5:])}

User intent: {intent}
Relevant data: {json.dumps(data, indent=2)}

Generate a helpful, concise response that:
1. Addresses the user's intent
2. Uses the provided data appropriately
3. Maintains conversation continuity
4. Follows the personality guidelines

Response:"""
    
    def generate_from_template(self, intent, data):
        """Generate response from templates"""
        template = self.templates.get(intent)
        if not template:
            return self.get_fallback_response()
        
        # Select template variant
        variant = self.select_template_variant(template, data)
        
        # Fill template slots
        response = variant
        for key, value in data.items():
            response = response.replace(f"{{{key}}}", str(value))
        
        return response
    
    def apply_personality(self, response, context):
        """Apply personality traits to response"""
        # Add personality markers
        if self.personality.get('friendly'):
            response = self.add_friendly_markers(response)
        
        if self.personality.get('professional'):
            response = self.ensure_professional_tone(response)
        
        # Adjust based on user preferences
        if context.user_profile.get('prefers_brief'):
            response = self.make_concise(response)
        
        return response
```

### 5. Context Management

Implement sophisticated context management:

**Context Management System**

```python
class ContextManager:
    def __init__(self):
        self.short_term_memory = ShortTermMemory()
        self.long_term_memory = LongTermMemory()
        self.working_memory = WorkingMemory()
        
    async def manage_context(self, 
                            new_input: Dict[str, Any],
                            current_context: ConversationContext) -> ConversationContext:
        """Manage conversation context"""
        
        # Update conversation history
        current_context.messages.append({
            'role': 'user',
            'content': new_input['message'],
            'timestamp': datetime.now(),
            'metadata': new_input.get('metadata', {})
        })
        
        # Resolve references
        resolved_input = await self.resolve_references(new_input, current_context)
        
        # Update working memory
        self.working_memory.update(resolved_input, current_context)
        
        # Detect topic changes
        topic_shift = self.detect_topic_shift(resolved_input, current_context)
        if topic_shift:
            current_context = self.handle_topic_shift(topic_shift, current_context)
        
        # Maintain entity state
        current_context = self.update_entity_state(resolved_input, current_context)
        
        # Prune old context if needed
        if len(current_context.messages) > self.config['max_context_length']:
            current_context = self.prune_context(current_context)
        
        return current_context
    
    async def resolve_references(self, input_data, context):
        """Resolve pronouns and references"""
        text = input_data['message']
        
        # Pronoun resolution
        pronouns = self.extract_pronouns(text)
        for pronoun in pronouns:
            referent = self.find_referent(pronoun, context)
            if referent:
                text = text.replace(pronoun['text'], referent['resolved'])
        
        # Temporal reference resolution
        temporal_refs = self.extract_temporal_references(text)
        for ref in temporal_refs:
            resolved_time = self.resolve_temporal_reference(ref, context)
            text = text.replace(ref['text'], str(resolved_time))
        
        input_data['resolved_message'] = text
        return input_data
    
    def maintain_entity_state(self):
        """Track entity states across conversation"""
        return '''
class EntityStateTracker:
    def __init__(self):
        self.entities = {}
        
    def update_entity(self, entity_id: str, updates: Dict[str, Any]):
        """Update entity state"""
        if entity_id not in self.entities:
            self.entities[entity_id] = {
                'id': entity_id,
                'type': updates.get('type'),
                'attributes': {},
                'history': []
            }
        
        # Record history
        self.entities[entity_id]['history'].append({
            'timestamp': datetime.now(),
            'updates': updates
        })
        
        # Apply updates
        self.entities[entity_id]['attributes'].update(updates)
    
    def get_entity_state(self, entity_id: str) -> Optional[Dict[str, Any]]:
        """Get current entity state"""
        return self.entities.get(entity_id)
    
    def query_entities(self, entity_type: str = None, **filters):
        """Query entities by type and attributes"""
        results = []
        for entity in self.entities.values():
            if entity_type and entity['type'] != entity_type:
                continue
            
            matches = True
            for key, value in filters.items():
                if entity['attributes'].get(key) != value:
                    matches = False
                    break
            
            if matches:
                results.append(entity)
        
        return results
'''
```

### 6. Integration with LLMs

Integrate with various LLM providers:

**LLM Integration Layer**

```python
class LLMIntegrationLayer:
    def __init__(self):
        self.providers = {
            'openai': OpenAIProvider(),
            'anthropic': AnthropicProvider(),
            'local': LocalLLMProvider()
        }
        self.current_provider = None
        
    async def setup_llm_integration(self, provider: str, config: Dict[str, Any]):
        """Setup LLM integration"""
        self.current_provider = self.providers[provider]
        await self.current_provider.initialize(config)
        
        return {
            'provider': provider,
            'capabilities': self.current_provider.get_capabilities(),
            'rate_limits': self.current_provider.get_rate_limits()
        }
    
    async def generate_completion(self, 
                                 prompt: str,
                                 system_prompt: str = None,
                                 **kwargs):
        """Generate completion with fallback handling"""
        try:
            # Primary attempt
            response = await self.current_provider.complete(
                prompt=prompt,
                system_prompt=system_prompt,
                **kwargs
            )
            
            # Validate response
            if self.is_valid_response(response):
                return response
            else:
                return await self.handle_invalid_response(prompt, response)
                
        except RateLimitError:
            # Switch to fallback provider
            return await self.use_fallback_provider(prompt, system_prompt, **kwargs)
        except Exception as e:
            # Log error and use cached response if available
            return self.get_cached_response(prompt) or self.get_default_response()
    
    def create_function_calling_interface(self):
        """Create function calling interface for LLMs"""
        return '''
class FunctionCallingInterface:
    def __init__(self):
        self.functions = {}
        
    def register_function(self, 
                         name: str,
                         func: callable,
                         description: str,
                         parameters: Dict[str, Any]):
        """Register a function for LLM to call"""
        self.functions[name] = {
            'function': func,
            'description': description,
            'parameters': parameters
        }
    
    async def process_function_call(self, llm_response):
        """Process function calls from LLM"""
        if 'function_call' not in llm_response:
            return llm_response
        
        function_name = llm_response['function_call']['name']
        arguments = llm_response['function_call']['arguments']
        
        if function_name not in self.functions:
            return {'error': f'Unknown function: {function_name}'}
        
        # Validate arguments
        validated_args = self.validate_arguments(
            function_name, 
            arguments
        )
        
        # Execute function
        result = await self.functions[function_name]['function'](**validated_args)
        
        # Return result for LLM to process
        return {
            'function_result': result,
            'function_name': function_name
        }
'''
```

### 7. Testing Conversational AI

Implement comprehensive testing:

**Conversation Testing Framework**

```python
class ConversationTestFramework:
    def __init__(self):
        self.test_suites = []
        self.metrics = ConversationMetrics()
        
    def create_test_suite(self):
        """Create comprehensive test suite"""
        return {
            'unit_tests': self._create_unit_tests(),
            'integration_tests': self._create_integration_tests(),
            'conversation_tests': self._create_conversation_tests(),
            'performance_tests': self._create_performance_tests(),
            'user_simulation': self._create_user_simulation()
        }
    
    def _create_conversation_tests(self):
        """Test multi-turn conversations"""
        return '''
class ConversationTest:
    async def test_multi_turn_conversation(self):
        """Test complete conversation flow"""
        assistant = AIAssistant()
        context = ConversationContext(user_id="test_user")
        
        # Conversation script
        conversation = [
            {
                'user': "Hello, I need help with my order",
                'expected_intent': 'order_help',
                'expected_action': 'ask_order_details'
            },
            {
                'user': "My order number is 12345",
                'expected_entities': [{'type': 'order_id', 'value': '12345'}],
                'expected_action': 'retrieve_order'
            },
            {
                'user': "When will it arrive?",
                'expected_intent': 'delivery_inquiry',
                'should_use_context': True
            }
        ]
        
        for turn in conversation:
            # Send user message
            response = await assistant.process_message(
                turn['user'], 
                context
            )
            
            # Validate intent detection
            if 'expected_intent' in turn:
                assert response['intent'] == turn['expected_intent']
            
            # Validate entity extraction
            if 'expected_entities' in turn:
                self.validate_entities(
                    response['entities'], 
                    turn['expected_entities']
                )
            
            # Validate context usage
            if turn.get('should_use_context'):
                assert 'order_id' in response['context_used']
    
    def test_error_handling(self):
        """Test error scenarios"""
        error_cases = [
            {
                'input': "askdjfkajsdf",
                'expected_behavior': 'fallback_response'
            },
            {
                'input': "I want to [REDACTED]",
                'expected_behavior': 'safety_response'
            },
            {
                'input': "Tell me about " + "x" * 1000,
                'expected_behavior': 'length_limit_response'
            }
        ]
        
        for case in error_cases:
            response = assistant.process_message(case['input'])
            assert response['behavior'] == case['expected_behavior']
'''
    
    def create_automated_testing(self):
        """Automated conversation testing"""
        return '''
class AutomatedConversationTester:
    def __init__(self):
        self.test_generator = TestCaseGenerator()
        self.evaluator = ResponseEvaluator()
        
    async def run_automated_tests(self, num_tests: int = 100):
        """Run automated conversation tests"""
        results = {
            'total_tests': num_tests,
            'passed': 0,
            'failed': 0,
            'metrics': {}
        }
        
        for i in range(num_tests):
            # Generate test case
            test_case = self.test_generator.generate()
            
            # Run conversation
            conversation_log = await self.run_conversation(test_case)
            
            # Evaluate results
            evaluation = self.evaluator.evaluate(
                conversation_log,
                test_case['expectations']
            )
            
            if evaluation['passed']:
                results['passed'] += 1
            else:
                results['failed'] += 1
                
            # Collect metrics
            self.update_metrics(results['metrics'], evaluation['metrics'])
        
        return results
    
    def generate_adversarial_tests(self):
        """Generate adversarial test cases"""
        return [
            # Ambiguous inputs
            "I want that thing we discussed",
            
            # Context switching
            "Actually, forget that. Tell me about the weather",
            
            # Multiple intents
            "Cancel my order and also update my address",
            
            # Incomplete information
            "Book a flight",
            
            # Contradictions
            "I want a vegetarian meal with bacon"
        ]
'''
```

### 9. Continuous Improvement

Implement continuous improvement cycle:

**Improvement Pipeline**

```python
class ContinuousImprovement:
    def create_improvement_pipeline(self):
        """Create continuous improvement pipeline"""
        return {
            'data_collection': '''
class ConversationDataCollector:
    async def collect_feedback(self, session_id: str):
        """Collect user feedback"""
        feedback_prompt = {
            'satisfaction': 'How satisfied were you with this conversation? (1-5)',
            'resolved': 'Was your issue resolved?',
            'improvements': 'How could we improve?'
        }
        
        feedback = await self.prompt_user_feedback(
            session_id, 
            feedback_prompt
        )
        
        # Store feedback
        await self.store_feedback({
            'session_id': session_id,
            'timestamp': datetime.now(),
            'feedback': feedback,
            'conversation_metadata': self.get_session_metadata(session_id)
        })
        
        return feedback
    
    def identify_training_opportunities(self):
        """Identify conversations for training"""
        # Find low-confidence interactions
        low_confidence = self.find_low_confidence_interactions()
        
        # Find failed conversations
        failed = self.find_failed_conversations()
        
        # Find highly-rated conversations
        exemplary = self.find_exemplary_conversations()
        
        return {
            'needs_improvement': low_confidence + failed,
            'good_examples': exemplary
        }
''',
            'model_retraining': '''
class ModelRetrainer:
    async def retrain_models(self, new_data):
        """Retrain models with new data"""
        # Prepare training data
        training_data = self.prepare_training_data(new_data)
        
        # Validate data quality
        validation_result = self.validate_training_data(training_data)
        if not validation_result['passed']:
            return {'error': 'Data quality check failed', 'issues': validation_result['issues']}
        
        # Retrain models
        models_to_retrain = ['intent_classifier', 'entity_extractor']
        
        for model_name in models_to_retrain:
            # Load current model
            current_model = self.load_model(model_name)
            
            # Create new version
            new_model = await self.train_model(
                model_name,
                training_data,
                base_model=current_model
            )
            
            # Evaluate new model
            evaluation = await self.evaluate_model(
                new_model,
                self.get_test_set()
            )
            
            # Deploy if improved
            if evaluation['performance'] > current_model.performance:
                await self.deploy_model(new_model, model_name)
        
        return {'status': 'completed', 'models_updated': models_to_retrain}
''',
            'a_b_testing': '''
class ABTestingFramework:
    def create_ab_test(self, 
                      test_name: str,
                      variants: List[Dict[str, Any]],
                      metrics: List[str]):
        """Create A/B test for assistant improvements"""
        test = {
            'id': generate_test_id(),
            'name': test_name,
            'variants': variants,
            'metrics': metrics,
            'allocation': self.calculate_traffic_allocation(variants),
            'duration': self.estimate_test_duration(metrics)
        }
        
        # Deploy test
        self.deploy_test(test)
        
        return test
    
    async def analyze_test_results(self, test_id: str):
        """Analyze A/B test results"""
        data = await self.collect_test_data(test_id)
        
        results = {}
        for metric in data['metrics']:
            # Statistical analysis
            analysis = self.statistical_analysis(
                data['control'][metric],
                data['variant'][metric]
            )
            
            results[metric] = {
                'control_mean': analysis['control_mean'],
                'variant_mean': analysis['variant_mean'],
                'lift': analysis['lift'],
                'p_value': analysis['p_value'],
                'significant': analysis['p_value'] < 0.05
            }
        
        return results
'''
        }
```
