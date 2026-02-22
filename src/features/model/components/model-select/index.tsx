'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useModelStore } from '@/features/model';
import { chatModelGroups, providerLogo } from '@/lib/ai/models';

export const ModelSelect = () => {
  const { chatModel, setModel } = useModelStore();

  return (
    <Select
      onValueChange={(value) => {
        if (!value) {
          return;
        }

        const providerItem = chatModelGroups.find((item) =>
          item.models.some((modelItem) => modelItem.id === value)
        );
        if (providerItem) {
          setModel({
            provider: providerItem.provider,
            modelKey: value,
          });
        }
      }}
      value={chatModel?.modelKey ?? undefined}
    >
      <SelectTrigger className='min-w-[180px]'>
        <SelectValue placeholder='Select Model' />
      </SelectTrigger>
      <SelectContent>
        {chatModelGroups.map((group) => (
          <SelectGroup key={group.provider}>
            <SelectLabel className='flex items-center gap-2'>
              {providerLogo[group.provider as keyof typeof providerLogo] && (
                <picture>
                  <img
                    alt={group.provider}
                    height={16}
                    src={
                      providerLogo[group.provider as keyof typeof providerLogo]
                    }
                    width={16}
                  />
                </picture>
              )}
              {group.provider}
            </SelectLabel>
            {group.models.map((modelItem) => (
              <SelectItem key={modelItem.id} value={modelItem.id}>
                {modelItem.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
