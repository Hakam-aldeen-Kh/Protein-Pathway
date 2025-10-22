import { FileImage, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

// GlycanImageDisplay Component
const GlycanImageDisplay = ({ imageUrl, glycanText }) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setImageError(false);
        setIsLoading(true);
    }, [imageUrl]);

    if (!imageUrl) {
        return (
            <div className="flex items-center justify-center w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="text-center">
                    <FileImage className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">No figure</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center w-[100px] h-[100px] border border-gray-300 rounded-lg bg-white overflow-hidden relative">
            {imageError ? (
                <div className="text-center p-2">
                    <FileImage className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">No figure available</p>
                </div>
            ) : (
                <>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-5 w-5 animate-spin text-[#57369E]" />
                        </div>
                    )}
                    <img
                        src={imageUrl}
                        alt={glycanText || "Glycan structure"}
                        className="max-w-full max-h-full object-contain"
                        onError={() => {
                            setImageError(true);
                            setIsLoading(false);
                        }}
                        onLoad={() => setIsLoading(false)}
                        style={{ display: isLoading ? 'none' : 'block' }}
                    />
                </>
            )}
        </div>
    );
};

export default GlycanImageDisplay;