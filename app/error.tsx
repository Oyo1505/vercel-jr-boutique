'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h2>Erreur</h2>
      <button onClick={() => reset()}>Rééssayer</button>
    </div>
  );
}
