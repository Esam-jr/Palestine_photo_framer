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

    // Helper function to determine if frame is circular
    const isCircularFrame = (frameId: string): boolean => {
      return frameId === 'frame1' || frameId === 'frame3';
    };

    // Helper function to determine if frame should be bottom-left aligned
    const isBottomLeftFrame = (frameId: string): boolean => {
      return ['frame2', 'frame5', 'frame6'].includes(frameId);
    };

    // Function to draw circular cropped image
    const drawCircularImage = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      canvasWidth: number,
      canvasHeight: number
    ) => {
      // Make canvas square for profile picture format
      const size = Math.min(canvasWidth, canvasHeight);
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2 - 20; // Leave some padding for the frame

      // Calculate scaling to fill the circle while maintaining aspect ratio
      const imgAspect = img.width / img.height;
      let drawWidth, drawHeight;

      if (imgAspect > 1) {
        // Image is wider than tall
        drawHeight = radius * 2;
        drawWidth = drawHeight * imgAspect;
      } else {
        // Image is taller than wide or square
        drawWidth = radius * 2;
        drawHeight = drawWidth / imgAspect;
      }

      // Center the image
      const drawX = centerX - drawWidth / 2;
      const drawY = centerY - drawHeight / 2;

      // Save context state
      ctx.save();

      // Create circular clipping path
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      // Draw the image within the circular clip
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      // Restore context state
      ctx.restore();

      return size;
    };

    // Function to draw bottom-left frame (Frame 2 - full size)
    const drawBottomLeftFrame = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      frameImg: HTMLImageElement,
      canvasWidth: number,
      canvasHeight: number
    ) => {
      // Draw the full image first
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      // Frame 2 takes full canvas size and positions at bottom-left
      const frameWidth = canvasWidth;
      const frameHeight = canvasHeight;
      const frameX = 0; // Bottom-left positioning
      const frameY = 0;

      // Draw the frame at full size
      ctx.drawImage(frameImg, frameX, frameY, frameWidth, frameHeight);
    };

    // Function to draw bottom-center frames (Frame 4, 5, 6 - larger size)
    const drawBottomCenterFrame = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      frameImg: HTMLImageElement,
      canvasWidth: number,
      canvasHeight: number
    ) => {
      // Draw the full image first
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      // Calculate frame dimensions - make them larger and maintain aspect ratio
      const frameAspect = frameImg.width / frameImg.height;
      
      // Use 70% of canvas width or maintain original size if smaller
      const maxFrameWidth = Math.min(canvasWidth * 0.7, frameImg.width);
      const frameWidth = maxFrameWidth;
      const frameHeight = frameWidth / frameAspect;

      // Position frame at bottom center with minimal padding
      const frameX = (canvasWidth - frameWidth) / 2;
      const frameY = canvasHeight - frameHeight - 10; // Only 10px padding from bottom

      // Draw the frame
      ctx.drawImage(frameImg, frameX, frameY, frameWidth, frameHeight);
    };

    // Function to draw bottom-left large frames (Frame 5, 6)
    const drawBottomLeftLargeFrame = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      frameImg: HTMLImageElement,
      canvasWidth: number,
      canvasHeight: number
    ) => {
      // Draw the full image first
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      // Calculate frame dimensions - make them larger and maintain aspect ratio
      const frameAspect = frameImg.width / frameImg.height;
      
      // Use 70% of canvas width or maintain original size if smaller
      const maxFrameWidth = Math.min(canvasWidth * 0.7, frameImg.width);
      const frameWidth = maxFrameWidth;
      const frameHeight = frameWidth / frameAspect;

      // Position frame at bottom left with minimal padding
      const frameX = 10; // Small left padding
      const frameY = canvasHeight - frameHeight - 10; // Only 10px padding from bottom

      // Draw the frame
      ctx.drawImage(frameImg, frameX, frameY, frameWidth, frameHeight);
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !imageUrl) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        let canvasWidth, canvasHeight;

        // Determine canvas dimensions based on frame type
        if (frame && isCircularFrame(frame.id)) {
          // For circular frames, use square canvas (profile picture format)
          const maxSize = Math.min(600, Math.max(img.width, img.height));
          canvasWidth = canvasHeight = maxSize;
        } else {
          // For other frames, maintain original aspect ratio with max dimensions
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

          canvasWidth = width;
          canvasHeight = height;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        if (frame && isCircularFrame(frame.id)) {
          // Handle circular frames
          const actualSize = drawCircularImage(ctx, img, canvasWidth, canvasHeight);
          
          // Update canvas size to the actual square size used
          if (actualSize !== canvasWidth) {
            canvas.width = actualSize;
            canvas.height = actualSize;
            ctx.clearRect(0, 0, actualSize, actualSize);
            drawCircularImage(ctx, img, actualSize, actualSize);
          }

          // Load and draw the circular frame
          const frameImg = new Image();
          frameImg.onload = () => {
            ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
          };
          frameImg.crossOrigin = 'anonymous';
          frameImg.src = frame.imageUrl;
        } else {
          // Handle regular frames - draw image first
          ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

          if (frame && isBottomLeftFrame(frame.id)) {
            // Frames 2, 5, 6 - bottom-left positioning
            const frameImg = new Image();
            frameImg.onload = () => {
              if (frame.id === 'frame2') {
                // Frame 2 - full size coverage
                drawBottomLeftFrame(ctx, img, frameImg, canvasWidth, canvasHeight);
              } else {
                // Frames 5, 6 - large size, bottom-left
                drawBottomLeftLargeFrame(ctx, img, frameImg, canvasWidth, canvasHeight);
              }
            };
            frameImg.crossOrigin = 'anonymous';
            frameImg.src = frame.imageUrl;
          } else if (frame && isBottomCenterFrame(frame.id)) {
            // Frame 4 - bottom-center, larger size
            const frameImg = new Image();
            frameImg.onload = () => {
              drawBottomCenterFrame(ctx, img, frameImg, canvasWidth, canvasHeight);
            };
            frameImg.crossOrigin = 'anonymous';
            frameImg.src = frame.imageUrl;
          } else if (frame) {
            // Fallback for any other frame types - overlay on top
            const frameImg = new Image();
            frameImg.onload = () => {
              ctx.drawImage(frameImg, 0, 0, canvasWidth, canvasHeight);
            };
            frameImg.crossOrigin = 'anonymous';
            frameImg.src = frame.imageUrl;
          }
        }
      };

      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
    }, [imageUrl, frame]);

    return (
      <div className="flex justify-center w-full">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-xl shadow-2xl border border-gray-700"
          style={{ 
            maxHeight: '70vh',
            width: 'auto',
            height: 'auto'
          }}
        />
      </div>
    );
  }
);

ImageCanvas.displayName = 'ImageCanvas';

export default ImageCanvas;