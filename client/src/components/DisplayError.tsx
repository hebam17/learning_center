export default function DisplayError({ error }: { error: string }) {
  return <p className="text-red-600 text-lg text-center">{error}</p>;
}
