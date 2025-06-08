'use client';

import { ChatInputBar, Messages } from '@/features/chat';
import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';
import { UIDataTypes, UIMessagePart } from 'ai';

export default function Chat() {
  const chatId = 'temporary-chat';

  const { messages, sendMessage, status, stop } = useChat({
    id: chatId,
    messages: [
      // {
      //   role: 'user',
      //   id: '1',
      //   parts: [
      //     {
      //       type: 'text',
      //       text: 'hi',
      //     },
      //   ],
      // },
      // {
      //   role: 'assistant',
      //   id: '2',
      //   parts: [{ type: 'text', text: 'hello' }],
      // },
      // {
      //   role: 'user',
      //   id: '3',
      //   parts: [{ type: 'text', text: 'give long text' }],
      // },
      // {
      //   role: 'assistant',
      //   id: '4',
      //   parts: [
      //     {
      //       type: 'text',
      //       text: `Okay, here is a long text for you. I'll describe a detailed scene, aiming for sensory immersion and a sense of calm reflection. *** The air, crisp and cool with the lingering breath of night, still held the scent of damp earth and distant woodsmoke. A faint, almost imperceptible tremor ran through the ground, the deep, resonant hum of the world slowly rousing from its slumber. Overhead, the last few stars, like scattered diamonds on black velvet, began to fade, outshone by the encroaching tide of pre-dawn light. The eastern horizon was painting itself in the softest hues imaginable: a whisper of rose, a smudge of lavender, and a deepening band of nascent gold. Below, the forest floor remained cloaked in a profound, hushed silence, broken only by the delicate drip of dew from unseen leaves. Towering pines, ancient and stoic, stood like silent sentinels, their dark silhouettes etched against the softening sky. Their needles, coated in a fine sheen of moisture, released a sharp, clean aroma that mingled with the richer, more complex smell of decaying leaves and loamy soil. Moss-covered rocks, rounded and smooth with untold centuries of weathering, emerged from the shadows like sleeping giants. As the light intensified, subtle details began to emerge. A single spiderweb, intricately spun between two dew-kissed fern fronds, shimmered with iridescence, each delicate strand a miniature rainbow catching the nascent light. Tiny droplets clung to every blade of grass, transforming the mundane undergrowth into a sparkling tapestry of liquid jewels. A plump robin, its breast a vibrant splash of rusty red, hopped cautiously onto a low branch, tilting its head, listening for the first stirrings of insects beneath the damp soil. Its sharp, clear chirp pierced the stillness, a solitary declaration that the day was truly beginning. Then, slowly at first, the forest began to breathe. A gentle breeze, cool and hesitant, rustled through the upper canopy, creating a soft, sighing whisper that traveled down to the forest floor. Leaves, previously still and heavy with dew, began to tremble and dance in a silent choreography. More birds joined the robin’s call, a chorus of chirps, trills, and melodic warbles swelling into a symphony of awakening. A squirrel chattered indignantly from a high branch, its bushy tail twitching like an exclamation mark as it surveyed its domain. Sunlight, no longer tentative, began to spill over the highest peaks, sending long, golden fingers stretching through the dense foliage. These shafts of light, thick with motes of dancing dust, illuminated pockets of the forest, creating ethereal spotlights on patches of wildflowers – delicate bluebells, vibrant violets, and the cheerful yellow of buttercups – that had been invisible moments before. The air warmed almost imperceptibly, and the earthy scent grew stronger, mixed now with the fainter, sweeter fragrance of blooming things. This transformation, from the deep, still darkness of night to the vibrant, bustling energy of day, unfolded with an unhurried grace that felt both ancient and utterly new. It was a reminder of continuity, of the world's ceaseless turning, and the quiet, persistent beauty that existed whether observed or not. To stand in the midst of it was to feel a profound sense of belonging, a small part of a vast, interconnected tapestry of life, breathing in sync with the pulse of the living earth. The peace that settled over the observer was not an absence of sound or movement, but rather a perfect harmony with it, a deep resonance with the timeless rhythm of nature’s grand, unfolding narrative.`,
      //     },
      //   ],
      // },
    ],
  });
  return (
    <div
      className={cn(
        'max-full h-screen flex flex-col m-auto px-4',
        messages.length === 0 && 'justify-center'
      )}
    >
      <Messages messages={messages} chatId={chatId} status={status} />
      <div className="mb-12">
        <div className="max-w-2xl mx-auto">
          <ChatInputBar
            status={status}
            stop={stop}
            sendMessage={async (data) => {
              const userParts: UIMessagePart<UIDataTypes>[] = [
                ...(data.fileParts ?? []),
                ...(data.textParts ?? []),
              ];
              return sendMessage({
                role: 'user',
                parts: userParts,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
