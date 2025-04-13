const FormSection = ({ children, className = "grid grid-cols-2 gap-x-4" }) => (
  <div className={className}>{children}</div>
);

export default FormSection;
