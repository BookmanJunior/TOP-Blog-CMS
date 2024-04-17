type FormInput = {
  children?: React.ReactNode;
  id?: string;
  title?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({ id, title, children, ...props }: FormInput) {
  return (
    <label htmlFor={id}>
      <input type="text" id={id} {...props} />
      {title && title}
      {children}
    </label>
  );
}
