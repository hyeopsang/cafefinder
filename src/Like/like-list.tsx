import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useInfiniteScroll } from "../profile/utils/useInfiniteScroll";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSavedPlaces, useUserSavedPlace } from "../api";
import { Like, Place } from "../types";
import LikeItem from "./like-item";
interface User {
    [key: string]: any;
  }
  interface StateType {
    isAuthenticated: boolean;
    user: User | null;
    auth: {
      user: User | null;
    };
  }
  interface AuthState {
    user: User | null;
  }


export default function LikeList () {
  const [savePlaceList, setSavePlaceList] = useState<Like[]>([]); // 리뷰 리스트 상태
  const [nextQuery, setNextQuery] = useState<any>(null); // 다음 쿼리 저장
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userId = auth.user?.id;
console.log(userId)
  const { data: initialReviews, isLoading, error } = useUserSavedPlace(userId);

  useEffect(() => {
    if (initialReviews) {
      setSavePlaceList(initialReviews.savedPlaces); // 첫 번째 페이지 로드
      setNextQuery(initialReviews.nextQuery); // 다음 쿼리 설정
    }
  }, [initialReviews]);

  const loadMoreReviews = async () => {
    if (nextQuery && !loading) {
      setLoading(true);
      try {
        const { savedPlaces, nextQuery: newNextQuery } = await getSavedPlaces(userId, nextQuery); // 더 많은 리뷰 요청
        setSavePlaceList((prev) => [...prev, ...savedPlaces]); // 기존 리뷰에 추가
        setNextQuery(newNextQuery); // 새로운 쿼리 설정
      } catch (err) {
        console.error(err);
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
    console.error(error);
    return <div>에러로 인해 북마크를 불러오지 못했습니다.</div>;
  }

  console.log(savePlaceList)
    return (
      <div className="w-full h-screen px-8 pt-4 text-neutral-900">
      <Link to={"/"}>
        <ChevronLeft className="text-neutral-900" />
      </Link>
      <h2 className="text-center font-semibold text-base">즐겨찾기</h2>
      <div className="flex flex-col gap-4 pt-4">
        {savePlaceList.length > 0 ? (
          savePlaceList.map((place, index) => (
          <div key={place.id} ref={index === savePlaceList.length - 1 ? setTarget : null}>
            <LikeItem place={place}/> 
          </div>
          ))
        ) : (
          <div>작성된 리뷰가 없어요ㅠ</div>
        )}
      </div>
      {loading && <div>북마크를 불러오는 중 ..</div>}

    </div>
    )
}