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
import { useModelStore } from '@/store';
import { api } from '@/trpc/react';
import Image from 'next/image';
import React, { useEffect } from 'react';

// logo: '/providers-logo/google.svg',

const providerLogo = {
  Gemini: '/providers-logo/google.svg',
};

export const ModelSelect = () => {
  const { data } = api.model.list.useQuery();
  const { model, setModel } = useModelStore();

  useEffect(() => {
    if (data?.length && data[0].models?.length && !model) {
      setModel({
        provider: data[0].provider,
        modelKey: data[0].models[0].modelKey,
      });
    }
  }, [data, setModel, model]);

  return (
    <Select
      value={model?.modelKey ?? undefined}
      onValueChange={(value) => {
        const providerItem = data?.find((item) =>
          item.models.some((model) => model.modelKey === value)
        );
        if (providerItem) {
          setModel({
            provider: providerItem.provider,
            modelKey: value,
          });
        }
      }}
    >
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((item) => {
          return (
            <SelectGroup key={item.provider}>
              <SelectLabel className="flex items-center gap-2">
                {providerLogo[item.provider as keyof typeof providerLogo] && (
                  <Image
                    src={providerLogo[item.provider as keyof typeof providerLogo]}
                    alt={item.provider}
                    width={16}
                    height={16}
                  />
                )}
                {item.provider}
              </SelectLabel>
              {item.models.map((model) => {
                return (
                  <SelectItem key={model.modelKey} value={model.modelKey}>
                    {model.modelName}
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
