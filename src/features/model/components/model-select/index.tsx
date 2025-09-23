'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { chatModelGroups, providerLogo } from '@/lib/ai/models';
import { useModelStore } from '@/store';

export const ModelSelect = () => {
  const { model, setModel } = useModelStore();

  useEffect(() => {
    if (
      chatModelGroups?.length &&
      chatModelGroups[0].models?.length &&
      !model
    ) {
      setModel({
        provider: chatModelGroups[0].provider,
        modelKey: chatModelGroups[0].models[0].id,
      });
    }
  }, [setModel, model]);

  return (
    <Select
      onValueChange={(value) => {
        const providerItem = chatModelGroups?.find((item) =>
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
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent>
        {chatModelGroups?.map((group) => {
          return (
            <SelectGroup key={group.provider}>
              <SelectLabel className="flex items-center gap-2">
                {providerLogo[group.provider as keyof typeof providerLogo] && (
                  <Image
                    alt={group.provider}
                    height={16}
                    src={
                      providerLogo[group.provider as keyof typeof providerLogo]
                    }
                    width={16}
                  />
                )}
                {group.provider}
              </SelectLabel>
              {group.models.map((modelItem) => {
                return (
                  <SelectItem key={modelItem.id} value={modelItem.id}>
                    {modelItem.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
};
