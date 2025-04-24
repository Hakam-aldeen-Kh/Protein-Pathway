import ImageUploading from "react-images-uploading";
// import { DEFAULT_PROFILE_IMAGE } from "../../../constants/assets";

const ProfileImageUploader = ({ selectedImage, onChangeImage }) => {
  return (
    <ImageUploading
      multiple={false}
      name="profileImageUrl"
      value={selectedImage ? [{ data_url: selectedImage }] : []}
      onChange={(imageList) => onChangeImage(imageList[0]?.data_url || null)}
      maxNumber={1}
      maxFileSize={1000000}
      dataURLKey="data_url"
      acceptType={["jpg", "jpeg", "png"]}
    >
      {({ onImageUpload, onImageRemove, isDragging, dragProps, errors }) => (
        <div className="w-[160px]">
          <p className="text-[14px] text-[#484848] mb-1">Your Photo</p>
          <div
            className={`w-full h-[160px] border-[2px] border-[#BBBBBB] border-dashed rounded-sm flex items-center justify-center ${
              isDragging ? "bg-gray-100" : ""
            } ${selectedImage ? "cursor-default" : "cursor-pointer"}`}
            onClick={selectedImage ? undefined : onImageUpload}
            {...(selectedImage ? {} : dragProps)}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Profile picture"
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <div className="px-5 py-[30px] space-y-5 text-center">
                <div className="space-y-2 text-xs">
                  <p>Drop Image here, or</p>
                  <div className="flex justify-center gap-x-1">
                    <img
                      src="/images/icons/document-upload-dark.svg"
                      alt="image-upload-icon"
                      className="w-[24px] h-[24px]"
                    />
                    <p className="text-sm">Select File</p>
                  </div>
                </div>
                <div className="text-[10px] text-[#878787]">
                  <p>
                    PNG, JPEG only <br /> Max file size is 1 MB
                  </p>
                </div>
              </div>
            )}
          </div>
          {errors && (
            <div className="mt-2 text-red-600 text-xs text-center">
              {errors.maxFileSize && <p>File size exceeds 1MB</p>}
              {errors.acceptType && <p>Only PNG or JPEG allowed</p>}
              {errors.maxNumber && <p>Only one image allowed</p>}
            </div>
          )}
          <button
            type="button"
            disabled={!selectedImage}
            onClick={() => onImageRemove(0)}
            className={`mt-2 w-full px-4 py-2 text-white rounded-sm transition-all duration-200 ${
              selectedImage
                ? "bg-[#57369E] hover:bg-[#00A7D3]"
                : "bg-[#BBBBBB] cursor-not-allowed"
            }`}
          >
            Remove
          </button>
        </div>
      )}
    </ImageUploading>
  );
};

export default ProfileImageUploader;
