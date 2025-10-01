import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonCard = () =>  {
  return (
    <div className="card" style={{ width: 250, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
      {/* картинка */}
      <Skeleton height={200} width={220} />

      {/* input */}
      <div style={{ marginTop: 10 }}>
        <Skeleton height={30} width={150} />
      </div>

      {/* текстовые поля */}
      <div style={{ marginTop: 10 }}>
        <Skeleton width={`80%`} />
        <Skeleton width={`60%`} />
        <Skeleton width={`70%`} />
      </div>

      {/* кнопки */}
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <Skeleton height={30} width={60} />
        <Skeleton height={30} width={60} />
      </div>
    </div>
  );
}