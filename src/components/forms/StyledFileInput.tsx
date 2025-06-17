import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FileCheck, ImageUp, Replace, Trash } from 'lucide-react';

import { AssetInputEvent, AssetInputKey } from '@utils/assets/assets';
import { Asset } from '@models/asset.interface';
import { useAlert } from '@hooks/useAlert';

function AssetPreview({ file, isImage }: { file: File | Asset; isImage?: boolean }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    let objectUrl: string | undefined;

    if (file instanceof File) {
      setLoading(true); // Always set loading to true on file change
      setName(file.name);

      objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
    } else if (file) {
      setLoading(true);
      setName(file.title);
      // Add a cache-busting param to force reload if the URL is the same but the image changed
      setUrl(file.url + (file.url.includes('?') ? '&' : '?') + 't=' + Date.now());
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  return (
    <figure
      className={clsx('aspect-video w-full rounded', {
        'animate-place-holder bg-placeholder': loading,
      })}
    >
      {isImage ? (
        <img src={url} alt={`Preview of ${name}`} onLoad={() => setLoading(false)} />
      ) : (
        <div className="bg-blue absolute inset-0 flex flex-col items-center justify-center gap-2">
          <FileCheck className="text-2xl" />
          <span>{name}</span>
        </div>
      )}
    </figure>
  );
}

function InputControls({
  id,
  name,
  file,
  uploadedAsset,
  index,
  disableDelete,
  disableReplace,
  acceptedFileTypes,
  onChange,
}: {
  index?: number;
  id: string;
  name: AssetInputKey;
  file: File | null;
  uploadedAsset?: Asset;
  acceptedFileTypes: string;
  disableDelete?: boolean;
  disableReplace?: boolean;
  onChange: (e: AssetInputEvent) => void;
}) {
  const { showAlert, showToast } = useAlert();

  const confirmReplace = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    showAlert({
      type: 'warning',
      title: '¿Estás seguro?',
      message: `¿Quieres reemplazar esta imágen? Esta acción es irreversible.`,
      isConfirm: true,
      onClose(confirm) {
        if (confirm) {
          const input = document.getElementById(id) as HTMLInputElement;
          input.click();
          return;
        }
        showToast({
          type: 'info',
          message: 'No se ha reemplazado la imágen.',
        });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files.item(0) : null;

    const event = {
      name,
      file: selectedFile,
      type: (!file && !uploadedAsset ? 'add' : 'update') as AssetInputEvent['type'],
      index,
    };

    onChange(event);
  };

  const onRemove = () => {
    showAlert({
      type: 'warning',
      title: '¿Estás seguro?',
      message: `¿Quieres reemplazar esta imágen? Esta acción es irreversible.`,
      isConfirm: true,
      onClose(confirm) {
        if (!confirm) {
          showToast({
            type: 'info',
            message: 'No se ha reemplazado la imágen.',
          });

          return;
        }
        onChange({
          name,
          file: null,
          type: 'delete',
          index,
        });
      },
    });
  };

  return (
    <div
      className={clsx('absolute inset-0 flex cursor-pointer items-center justify-center gap-4 text-2xl', {
        'bg-placeholder-2/70 opacity-0 transition-opacity group-hover:opacity-100': file || uploadedAsset,
      })}
    >
      <input type="file" id={id} name={name} accept={acceptedFileTypes} onChange={handleChange} hidden />

      {!file && !uploadedAsset && (
        <label
          htmlFor={id}
          className="hover:bg-green/30 cursor-pointer rounded bg-transparent p-2 transition-colors after:absolute after:inset-0"
        >
          <ImageUp />
        </label>
      )}

      {(file || uploadedAsset) && !disableReplace && (
        <button
          className="hover:bg-yellow/70 cursor-pointer rounded bg-transparent p-2 transition-colors"
          onClick={(e) => confirmReplace(e)}
        >
          <Replace />
        </button>
      )}

      {(file || uploadedAsset) && !disableDelete && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:bg-red/70 cursor-pointer rounded bg-transparent p-2 transition-colors"
        >
          <Trash />
        </button>
      )}
    </div>
  );
}

interface StyledFileInputProps {
  index?: number;
  file: File | null;
  uploadedAsset?: Asset;
  id: string;
  name: AssetInputKey;
  acceptedFileTypes: string;
  disableDelete?: boolean;
  disableReplace?: boolean;
  className?: string;
  errors?: string[];
  onChange: (e: AssetInputEvent) => void;
}
export function StyledFileInput({
  file,
  uploadedAsset,
  index,
  id,
  name,
  className,
  acceptedFileTypes,
  disableDelete,
  disableReplace,
  errors,
  onChange,
}: StyledFileInputProps) {
  return (
    <div
      className={clsx(
        'group bg-placeholder relative aspect-video w-full overflow-hidden rounded md:max-w-56',
        className,
        {
          'border-red border': errors && errors.length > 0,
        }
      )}
    >
      {file && <AssetPreview file={file} isImage={acceptedFileTypes.split(', ').every((t) => t.includes('image/'))} />}
      {!file && uploadedAsset && (
        <AssetPreview file={uploadedAsset} isImage={acceptedFileTypes.split(', ').every((t) => t.includes('image/'))} />
      )}
      <InputControls
        index={index}
        id={id}
        name={name}
        file={file}
        disableDelete={disableDelete}
        disableReplace={disableReplace}
        uploadedAsset={uploadedAsset}
        acceptedFileTypes={acceptedFileTypes}
        onChange={onChange}
      />
    </div>
  );
}

interface StyledFileListInputProps extends Omit<StyledFileInputProps, 'file' | 'uploadedAsset' | 'index'> {
  files: File[] | null;
  uploadedAssets?: Asset[] | null;
  length: number;
}
export function StyledFileListInput({
  files,
  uploadedAssets,
  id,
  name,
  acceptedFileTypes,
  disableDelete,
  disableReplace,
  onChange,
}: StyledFileListInputProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <StyledFileInput
          index={index}
          uploadedAsset={uploadedAssets?.[index]}
          key={`${id}-${index}`}
          file={files ? files[index] || null : null}
          id={`${id}-${index}`}
          name={name}
          acceptedFileTypes={acceptedFileTypes}
          onChange={onChange}
          disableDelete={disableDelete}
          disableReplace={disableReplace}
        />
      ))}
    </div>
  );
}
