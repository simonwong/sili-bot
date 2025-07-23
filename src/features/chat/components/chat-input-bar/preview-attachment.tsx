import type { FileUIPart } from 'ai';

export const PreviewAttachment = ({ filePart }: { filePart: FileUIPart }) => {
  const url = filePart.url;
  const name = filePart.filename;
  const contentType = filePart.mediaType;

  return (
    <div className="flex flex-col gap-2" data-testid="input-attachment-preview">
      <div className="relative flex aspect-video h-16 w-20 flex-col items-center justify-center rounded-md bg-muted">
        {contentType ? (
          contentType.startsWith('image') ? (
            // NOTE: it is recommended to use next/image for images
            // eslint-disable-next-line @next/next/no-img-element
            <picture>
              <img
                alt={name ?? 'An image attachment'}
                className="size-full rounded-md object-cover"
                src={url as string}
              />
            </picture>
          ) : (
            <div className="" />
          )
        ) : (
          <div className="" />
        )}
      </div>
      <div className="max-w-16 truncate text-xs text-zinc-500">{name}</div>
    </div>
  );
};
