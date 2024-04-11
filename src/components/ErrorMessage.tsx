type ErrorMessageProps = {
  error: string | undefined;
};

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return error && <p className="error-message">{error}</p>;
}
