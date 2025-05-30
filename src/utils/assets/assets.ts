import axios from 'axios';

export type AssetInputKey = 'thumb' | 'hero' | 'assets' | 'file';
export interface AssetInputEvent {
  file: File | null;
  name: AssetInputKey;
  type: 'delete' | 'add' | 'update';
  index?: number;
}

export async function fileFromUrl(url: string): Promise<File> {
  const proxiedUrl = `/api/assets/file?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxiedUrl);
  if (!response.ok) {
    throw new Error(`Error al descargar el archivo: ${response.statusText}`);
  }

  const blob = await response.blob();

  // Obtener el nombre del archivo desde la URL
  const urlParts = url.split('/');
  const filename = decodeURIComponent(urlParts[urlParts.length - 1].split('?')[0]);

  // Obtener el tipo MIME desde el header o desde el blob
  const mimeType = response.headers.get('Content-Type') || blob.type;

  return new File([blob], filename, {
    type: mimeType,
    lastModified: Date.now(),
  });
}

export async function fileListFromUrls(urls: string[]): Promise<FileList> {
  const dataTransfer = new DataTransfer();

  for (const url of urls) {
    const file = await fileFromUrl(url);
    dataTransfer.items.add(file);
  }

  return dataTransfer.files;
}

export async function uploadAsset(
  file: File,
  path: string,
  index?: number,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
) {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('index', index?.toString() || '0');

  try {
    const response = await axios({
      url: path,
      method: method,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading asset:', error);
    throw error;
  }
}
