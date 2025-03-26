import { Star } from 'lucide-react';
import { getSavedPlaces, savePlace } from '../api';
import { Place } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

interface PlaceInfoProps {
  place: Place;
}

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

interface SavedPlace {
  placeId: string;
  userId: string;
  content: Place;
}

export default function PlaceSave({ place }: PlaceInfoProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false); // 상태값으로 저장 여부를 관리
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user
  const dispatch = useDispatch();
    console.log(userInfo)
  // 저장된 장소 여부 확인
  const checkSavedPlace = () => {
    if (userInfo) {
      const savedPlaces = getSavedPlaces(userInfo.id);
    }
  };
  console.log(place)
  // 저장/삭제 처리
  const onClickSave = async () => {
    if (userInfo) {
      if (isSaved) {
        // 저장된 장소가 이미 있다면 삭제
        // 삭제 API를 호출하는 로직을 여기에 추가해야 합니다
        // 예: await deleteSavedPlace({ placeId: place.id, userId: userInfo.id });
        setIsSaved(false); // 삭제 후 상태 업데이트
      } else {
        await savePlace({ placeId: place.id, userId: userInfo.id, content: place });
        setIsSaved(true); // 저장 후 상태 업데이트
      }
    }
  };

  useEffect(() => {
      checkSavedPlace(); // 사용자 정보가 있을 때 저장된 장소 확인
  }, []);

  return (
    <Star
      className={`w-6 h-6 mx-auto ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-900'}`}
      onClick={onClickSave}
    />
  );
}
