import { Image } from '@/store'
import React from 'react'
type Size = "Large" | "Small"
interface ImageGridProps {
    images: Image[]
    size?: Size
}
const ImageGrid: React.FC<ImageGridProps> = ({ images, size = "Small" }) => {
    return (
        <>
            {size == "Small" && (

                <div className="grid grid-cols-4 gap-5" >
                    {images && images.map((image, index) => (
                        <div key={index}>
                            <img className="rounded-lg shadow-lg col-span-1  h-full" width={140} height={50} src={image.url} alt={image.caption} />
                        </div>
                    ))}
                </div>
            )}
            {size == "Large" && (

                <div className="grid grid-cols-2 gap-5" >
                    {images && images.map((image, index) => (
                        <div className='w-full' key={index}>
                            <img className="rounded-lg shadow-lg col-span-1 w-full h-full" width={300} height={200} src={image.url} alt={image.caption} />
                            <div className='text-sm font-light text-gray-500 text-center'>{image.caption}</div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ImageGrid
