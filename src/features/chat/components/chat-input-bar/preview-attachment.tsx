import type { FileUIPart } from 'ai';

export const PreviewAttachment = ({ filePart }: { filePart: FileUIPart }) => {
  const url = filePart.url;
  const name = filePart.filename;
  const contentType = filePart.mediaType;

  if (!url) {
    return null;
  }
  if (!contentType.startsWith('image')) {
    return null;
  }
  return (
    <div className='flex flex-col gap-2' data-testid='input-attachment-preview'>
      <div className='relative flex aspect-video h-16 w-20 flex-col items-center justify-center rounded-md bg-muted'>
        <picture>
          {/** biome-ignore lint/nursery/useImageSize: use image */}
          <img
            alt={name ?? 'An image attachment'}
            className='size-48 rounded-md object-cover'
            src={url as string}
          />
        </picture>
      </div>
      <div className='max-w-16 truncate text-xs text-zinc-500'>{name}</div>
    </div>
  );
};
