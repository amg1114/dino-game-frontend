import clsx from 'clsx';
import { ImagePlus, Replace, Trash } from 'lucide-react';
import { useState } from 'react';

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

function StyledFileLabel({
  file,
  id,
  handleDelete,
  handleReplace,
}: {
  file: File | null;
  id: string;
  handleDelete?: (filename: string) => void;
  handleReplace?: (filename: string) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="group hover:text-green absolute inset-0 flex cursor-pointer items-center justify-center text-2xl transition-colors"
    >
      <span
        className={clsx('relative z-10 flex justify-center gap-2', {
          'opacity-0 transition-opacity group-hover:text-white group-hover:opacity-100':
            !!file && file.type.startsWith('image/'),
        })}
      >
        {!file && <ImagePlus />}
        {file && !handleReplace && <Replace className="hover:text-yellow" />}
        {file && handleReplace && (
          <button
            type="button"
            className="hover:text-yellow cursor-pointer text-white transition-transform hover:scale-110"
            onClick={() => handleReplace && handleReplace(file.name)}
          >
            <Replace />
          </button>
        )}
        {file && (
          <button
            type="button"
            className="hover:text-red cursor-pointer text-white transition-transform hover:scale-110"
            onClick={() => handleDelete && handleDelete(file.name)}
          >
            <Trash />
          </button>
        )}
      </span>

      {file && (
        <span className="bg-placeholder/50 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"></span>
      )}
    </label>
  );
}

export function StyledFileInput({ className, file, name, id, acceptedFileTypes, onChange }: StyledFileInputProps) {
  const handleDelete = (filename: string) => {
    const dataTransfer = new DataTransfer();
    const newFiles = Array.from(file ? [file] : []).filter((file) => file.name !== filename);
    newFiles.forEach((file) => dataTransfer.items.add(file));
    onChange({ target: { files: dataTransfer.files, name: name } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      className={clsx('relative aspect-video h-auto w-full shrink-0 overflow-hidden rounded md:max-w-56', className, {
        'bg-green': file,
        'bg-placeholder': !file,
      })}
    >
      <input hidden type="file" name={name} id={id} onChange={(e) => onChange(e)} accept={acceptedFileTypes} />

      {file && file.type.startsWith('image/') && (
        <img src={URL.createObjectURL(file)} alt="Miniatura" className="h-auto w-full object-cover" />
      )}

      <StyledFileLabel file={file} id={id} handleDelete={handleDelete} />
    </div>
  );
}

export function StyledFileListInput({ files, name, id, max, onChange }: StyledFileListInputProps) {
  const [fileToBeReplaced, setFileToBeReplaced] = useState<string | null>(null);

  const handleDelete = (filename: string) => {
    console.log('handleDelete', filename);
    const newFiles = Array.from(files || []).filter((file) => file.name !== filename);
    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));
    onChange({ target: { files: dataTransfer.files, name: name } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newFiles = Array.from(files || []);
    const selectedFiles = Array.from(e.target.files || []);
    const dataTransfer = new DataTransfer();

    if (fileToBeReplaced && selectedFiles.length > 0) {
      const fileIndex = newFiles.findIndex((file) => file.name === fileToBeReplaced);
      if (fileIndex !== -1) {
        newFiles[fileIndex] = selectedFiles[0];
      }
      setFileToBeReplaced(null);
    } else {
      // Add new files if not replacing
      newFiles = newFiles.concat(selectedFiles);
    }

    newFiles.forEach((file) => dataTransfer.items.add(file));
    onChange({ target: { files: dataTransfer.files, name: name } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleReplace = (filename: string) => {
    setFileToBeReplaced(filename);
    const input = document.getElementById(id) as HTMLInputElement;
    input.value = ''; // Clear previous value so onChange always fires
    input.click();
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <input type="file" name={name} id={id} onChange={(e) => handleChange(e)} multiple hidden />
      {Array.from({ length: Math.max(files?.length || 0, max) }, (_, index) => (
        <div
          key={id + index}
          className="bg-placeholder relative aspect-video h-auto w-full shrink-0 overflow-hidden rounded md:max-w-56"
        >
          {files instanceof FileList && files.item(index) && (
            <img
              src={URL.createObjectURL(files.item(index)!)}
              alt={`Miniatura ${index + 1}`}
              className="h-auto w-full object-cover"
            />
          )}
          <StyledFileLabel
            file={files instanceof FileList && files.item(index) ? files.item(index) : null}
            id={id}
            handleDelete={handleDelete}
            handleReplace={handleReplace}
          />
        </div>
      ))}
    </div>
  );
}
