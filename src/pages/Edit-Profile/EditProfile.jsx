import EditProfileHeader from "./components/EditProfileHeader";
import ProfileImageUploader from "./components/ProfileImageUploader";
import FormSection from "./components/FormSection";
import LinkField from "./components/LinkField";
import AddLinksButton from "./components/AddLinksButton";
import PhoneNumberInput from "./components/PhoneNumberInput";
import InputField from "../../common/InputField";
import TextareaField from "../../common/TextareaField";
import { useEditProfile } from "../../hooks/useEditProfile";
import LoadingProcess from "../../common/LoadingProcess";

const EditProfile = () => {
  const {
    selectedImage,
    handleChangeImage,
    register,
    handleSubmit,
    control,
    errors,
    fields,
    append,
    remove,
    onSubmit,
    getAvailableLinkTypes,
    maxLinksReached,
    isLoading,
  } = useEditProfile();

  if (isLoading) return <LoadingProcess />;

  return (
    <div className="w-[85%] mx-auto my-10 p-5 border border-[#878787] rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
        <EditProfileHeader />
        <div className="space-y-5">
          {/* image upload */}
          <ProfileImageUploader
            selectedImage={selectedImage}
            onChangeImage={handleChangeImage}
          />
          {/* first and last name */}
          <FormSection>
            <InputField
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
              isRequired
            />
            <InputField
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
              isRequired
            />
          </FormSection>
          {/* biography */}
          <TextareaField
            label="Biography"
            name="biography"
            register={register}
            error={errors.biography?.message}
          />
          {/* email & number */}
          <FormSection>
            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              isRequired
            />
            <PhoneNumberInput control={control} errors={errors} />
          </FormSection>
          {/* degree and university/school */}
          <FormSection>
            <InputField
              label="Degree"
              name="degree"
              register={register}
              error={errors.degree?.message}
            />
            <InputField
              label="School/University"
              name="school"
              register={register}
              error={errors.school?.message}
            />
          </FormSection>
          {/* Links */}
          <div className="space-y-5">
            {fields.map((field, index) => (
              <LinkField
                key={field.id}
                index={index}
                register={register}
                errors={errors}
                remove={remove}
                getAvailableLinkTypes={getAvailableLinkTypes}
              />
            ))}
            {/* Add a Link Button */}
            {!maxLinksReached && (
              <AddLinksButton
                append={append}
                maxLinksReached={maxLinksReached}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
