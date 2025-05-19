import clsx from 'clsx';
import { ImagePlus } from 'lucide-react';

interface StyledFileInputProps {
  acceptedFileTypes?: string;
  className?: string;
  file: File | null;
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
}
interface StyledFileListInputProps extends Omit<StyledFileInputProps, 'file'> {
  files: FileList | null;
  max: number;
}

function StyledFileLabel({ file, id }: { file: File | null; id: string }) {
  return (
    <label
      htmlFor={id}
      className="group hover:text-green absolute inset-0 flex cursor-pointer items-center justify-center text-2xl transition-colors"
    >
      <ImagePlus
        className={clsx('relative z-10', {
          'opacity-0 transition-opacity group-hover:text-white group-hover:opacity-100':
            !!file && file.type.startsWith('image/'),
        })}
      />

      {file && (
        <span className="bg-placeholder/50 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"></span>
      )}
    </label>
  );
}

export function StyledFileInput({ className, file, name, id, acceptedFileTypes, onChange }: StyledFileInputProps) {
  return (
    <div
      className={clsx('relative aspect-video h-auto w-full max-w-56 shrink-0 overflow-hidden rounded', className, {
        'bg-green': file,
        'bg-placeholder': !file,
      })}
    >
      <input hidden type="file" name={name} id={id} onChange={(e) => onChange(e)} accept={acceptedFileTypes} />

      {file && file.type.startsWith('image/') && (
        <img src={URL.createObjectURL(file)} alt="Miniatura" className="h-auto w-full object-cover" />
      )}

      <StyledFileLabel file={file} id={id} />
    </div>
  );
}

export function StyledFileListInput({ files, name, id, max, onChange }: StyledFileListInputProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <input type="file" name={name} id={id} onChange={(e) => onChange(e)} multiple hidden />
      {Array.from({ length: max }, (_, index) => (
        <div
          key={id + index}
          className="bg-placeholder relative aspect-video h-auto w-full max-w-56 shrink-0 overflow-hidden rounded"
        >
          {files instanceof FileList && files.item(index) && (
            <img
              src={URL.createObjectURL(files.item(index)!)}
              alt={`Miniatura ${index + 1}`}
              className="h-auto w-full object-cover"
            />
          )}
          <StyledFileLabel file={files instanceof FileList && files.item(index) ? files.item(index) : null} id={id} />
        </div>
      ))}
    </div>
  );
}
