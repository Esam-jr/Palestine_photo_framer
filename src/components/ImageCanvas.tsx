import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import type { Frame } from '../App';

interface ImageCanvasProps {
  imageUrl: string;
  frame: Frame | null;
}

const ImageCanvas = forwardRef<HTMLCanvasElement, ImageCanvasProps>(
  ({ imageUrl, frame }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !imageUrl) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        // Set canvas size to maintain aspect ratio
        const maxWidth = 800;
        const maxHeight = 600;
        
        let { width, height } = img;
        
        // Scale down if too large
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw the base image
        ctx.drawImage(img, 0, 0, width, height);

        // Apply frame if selected
        if (frame) {
          const frameImg = new Image();
          frameImg.onload = () => {
            // Draw frame on top of the image
            ctx.drawImage(frameImg, 0, 0, width, height);
          };
          frameImg.crossOrigin = 'anonymous';
          frameImg.src = frame.imageUrl;
        }
      };

      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
    }, [imageUrl, frame]);

    return (
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-xl shadow-2xl border border-gray-700"
          style={{ maxHeight: '600px' }}
        />
      </div>
    );
  }
);

ImageCanvas.displayName = 'ImageCanvas';

export default ImageCanvas;