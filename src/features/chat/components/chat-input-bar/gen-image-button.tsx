import { Album02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { useModelStore } from '@/features/model';

export const GenImageButton: React.FC = () => {
  const modelStore = useModelStore();

  const isGenImageMode = modelStore.type === 'image';

  return (
    <div className="h-6">
      <Button
        className="h-6 min-w-6 p-0"
        onClick={() => {
          if (isGenImageMode) {
            modelStore.setType('chat');
          } else {
            modelStore.setType('image');
          }
        }}
        size={isGenImageMode ? 'default' : 'icon'}
        variant={isGenImageMode ? 'default' : 'ghost'}
      >
        <HugeiconsIcon icon={Album02Icon} size={6} />
        {isGenImageMode ? '图片' : ''}
      </Button>
    </div>
  );
};
