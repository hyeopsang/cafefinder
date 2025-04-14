import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { useInfiniteScroll } from "../profile/utils/useInfiniteScroll";
import { getReviewPhoto, useReviewPhoto } from "../api";
export default function Photo () {
  const { id } = useParams();
  const [photoList, setPhotoList] = useState<string[]>([]); // 리뷰 리스트 상태
  const [nextQuery, setNextQuery] = useState<any>(null); // 다음 쿼리 저장
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const placeId = id

  const { data: initialPhotos, isLoading, error } = useReviewPhoto(placeId);
  useEffect(() => {
    if (initialPhotos) {
      setPhotoList(initialPhotos.photos); // 첫 번째 페이지 로드
      setNextQuery(initialPhotos.nextQuery); // 다음 쿼리 설정
    }
  }, [initialPhotos]);
  console.log("Aa", initialPhotos);

  const loadMoreReviews = async () => {
    if (nextQuery && !loading) {
      setLoading(true);
      try {
        const { photos, nextQuery: newNextQuery } = await getReviewPhoto(placeId, nextQuery); // 더 많은 리뷰 요청
        setPhotoList((prev) => [...prev, ...photos]); // 기존 리뷰에 추가
        setNextQuery(newNextQuery); // 새로운 쿼리 설정
      } catch (err) {
        console.error("🚨 Error loading more reviews:", err);
      }
      setLoading(false);
    }
  };

  // 무한 스크롤 훅 사용
  const { setTarget } = useInfiniteScroll({
    rootMargin: "100px",
    onIntersect: loadMoreReviews,
    enabled: !!nextQuery && !loading,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    console.error("🚨 Error loading reviews: ", error);
    return <div>에러로 인해 사진을 불러오지 못했습니다.</div>;
  }
    return (
        <div className="p-4">
          <Link to={`/place/${placeId}`}></Link>
          <h1 className="text-lg font-semibold mb-2">전체 사진</h1>
          <div className="grid grid-cols-3 gap-2">
            {photoList.length > 0 ? (
              photoList.map((url, idx) => (
                            <img
                              ref={idx === photoList.length - 1 ? setTarget : null}
                              key={idx}
                              src={url}
                              alt={`photo-${idx}`}
                              className="w-full h-32 object-cover rounded-md"
                            />
                          ))
            ) : (
              <div>사진이 없어요</div>
            )
          }
            
          </div>
          {loading && <div>사진을 불러오는 중 ..</div>}
        </div>
      ); 
}
