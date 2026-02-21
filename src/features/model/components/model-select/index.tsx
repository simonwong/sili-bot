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
import {
  chatModelGroups,
  imageModelGroups,
  providerLogo,
} from '@/lib/ai/models';
import { useModelStore } from '@/store';

export const ModelSelect = () => {
  const { chatModel, imageModel, type, setModel } = useModelStore();

  const modelGroups = type === 'chat' ? chatModelGroups : imageModelGroups;
  const model = type === 'chat' ? chatModel : imageModel;

  return (
    <Select
      onValueChange={(value) => {
        const providerItem = modelGroups?.find((item) =>
          item.models.some((modelItem) => modelItem.id === value)
        );
        if (providerItem) {
          setModel({
            provider: providerItem.provider,
            modelKey: value,
          });
        }
      }}
      value={model?.modelKey ?? undefined}
    >
      <SelectTrigger className='min-w-[180px]'>
        <SelectValue placeholder='Select Model' />
      </SelectTrigger>
      <SelectContent>
        {modelGroups?.map((group) => (
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
