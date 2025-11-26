// // pages/place/photo-tab.tsx
// import {useParams} from 'react-router';
// import {useState, useEffect} from 'react';
// import {useInfiniteScroll} from '../../profile/utils/useInfiniteScroll';
// import {getReviewPhoto, useReviewPhoto} from '../../api';
// import {Ban} from 'lucide-react';

// export default function PhotoTab() {
//   const {id: placeId} = useParams();
//   const [photoList, setPhotoList] = useState<string[]>([]);
//   const [nextQuery, setNextQuery] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const {data: initialPhotos, isLoading, error} = useReviewPhoto(placeId);

//   useEffect(() => {
//     if (initialPhotos?.photos) {
//       setPhotoList(initialPhotos.photos);
//       setNextQuery(initialPhotos.nextQuery);
//     }
//   }, [initialPhotos]);

//   const loadMoreReviews = async () => {
//     if (nextQuery && !loading) {
//       setLoading(true);
//       try {
//         const {photos, nextQuery: newNextQuery} = await getReviewPhoto(
//           placeId,
//           nextQuery
//         );
//         setPhotoList((prev) => [...prev, ...photos]);
//         setNextQuery(newNextQuery);
//       } catch (err) {
//         console.error('🚨 Error loading more photos:', err);
//       }
//       setLoading(false);
//     }
//   };

//   const {setTarget} = useInfiniteScroll({
//     rootMargin: '100px',
//     onIntersect: loadMoreReviews,
//     enabled: !!nextQuery && !loading,
//   });

//   if (isLoading) return <div className="p-4">사진을 불러오는 중입니다...</div>;
//   if (error)
//     return <div className="p-4 text-red-500">에러가 발생했습니다.</div>;

//   return (
//     <div className="bg-neutral-300">
//       {Array.isArray(photoList) && photoList.length > 0 ? (
//         <div className="grid grid-cols-3 gap-1 p-1">
//           {photoList.map((url, idx) => (
//             <img
//               key={idx}
//               ref={idx === photoList.length - 1 ? setTarget : null}
//               src={url}
//               alt={`photo-${idx}`}
//               className="w-full h-32 object-cover rounded shadow-inner bg-white"
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="flex justify-center items-center gap-2 text-sm bg-white text-neutral-900 py-8 w-full text-center">
//           <Ban className="w-4 h-4 text-red-500" />
//           <p>사진이 존재하지 않아요</p>
//         </div>
//       )}
//       {loading && (
//         <div className="text-center mt-2 text-sm">사진을 불러오는 중 ..</div>
//       )}
//     </div>
//   );
// }
