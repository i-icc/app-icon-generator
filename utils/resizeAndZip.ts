import JSZip from 'jszip';

type IconSpec = {
  name: string;
  size: number;
};

const iconSpecs: IconSpec[] = [
  { name: 'Icon-App-20x20@3x.png', size: 60 },
  { name: 'Icon-App-40x40@1x.png', size: 40 },
  { name: 'Icon-App-60x60@3x.png', size: 180 },
  { name: 'Icon-App-1024x1024@1x.png', size: 1024 },
  { name: 'Icon-App-29x29@1x.png', size: 29 },
  { name: 'Icon-App-40x40@2x.png', size: 80 },
  { name: 'Icon-App-76x76@1x.png', size: 76 },
  { name: 'Icon-App-20x20@1x.png', size: 20 },
  { name: 'Icon-App-29x29@2x.png', size: 58 },
  { name: 'Icon-App-40x40@3x.png', size: 120 },
  { name: 'Icon-App-76x76@2x.png', size: 152 },
  { name: 'Icon-App-20x20@2x.png', size: 40 },
  { name: 'Icon-App-29x29@3x.png', size: 87 },
  { name: 'Icon-App-60x60@2x.png', size: 120 },
  { name: 'Icon-App-83.5x83.5@2x.png', size: 167 },
];

export async function generateIconsAndZip(file: File): Promise<Blob> {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  const zip = new JSZip();

  for (const spec of iconSpecs) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = spec.size;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, spec.size, spec.size);
      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob((b) => res(b), 'image/png')
      );
      if (blob) {
        zip.file(spec.name, blob);
      }
    }
  }

  return zip.generateAsync({ type: 'blob' });
}
