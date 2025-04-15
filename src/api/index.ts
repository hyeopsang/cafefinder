import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDocs,
  addDoc,
  deleteDoc,
  collection,
  doc,
  collectionGroup,
  query,
  where,
  updateDoc,
  orderBy,
  startAfter,
  limit,
  getDoc,
  setDoc,
  QuerySnapshot
} from "firebase/firestore"; 
import { db } from "../firebase-config";
import { ReviewContent, Review, Place } from "../types";
import { initializeApp, getApp, getApps } from "firebase/app";
import { storage } from "../firebase-config";
import { app } from "../firebase-config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
interface SavePlace {
  placeUrl: string;
  placeName: string;
  placeAddress: string;
  placePhone: string;
}
interface AddReviewParams {
  placeId: string;
  content: ReviewContent;
  userId: string;
  images?: File[]; // 이미지 파일 배열 (선택 사항)
}


// 리뷰 불러오기
export const getReview = async (placeId: string): Promise<Review[]> => {
  const querySnapshot = await getDocs(
    collection(db, "reviews", placeId, "userReviews")
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    placeId,
    content: doc.data().content,
    createdAt: doc.data().createdAt.toDate(), // Firestore Timestamp → JS Date 변환
    userId: doc.data().userId,
    updatedAt: doc.data().updatedAt ? doc.data().updatedAt.toDate() : undefined,

  }));
};
// 리뷰 최신화
export const useReviews = (placeId: string) => {
  return useQuery({
    queryKey: ["reviews", placeId, 'review-tab'],
    queryFn: () => getReview(placeId),
    enabled: !!placeId,
  });
};
export const addReview = async ({
  placeId,
  content,
  userId,
  images = [],
}: AddReviewParams) => {
  const reviewRef = doc(collection(db, "reviews", placeId, "userReviews"));
  const imageUrls: string[] = [];

  for (let i = 0; i < images.length && i < 3; i++) {
    const image = images[i];
    const storageRef = ref(storage, `reviews/${userId}/${reviewRef.id}/image${i + 1}`);
    await uploadBytes(storageRef, image);
    const downloadUrl = await getDownloadURL(storageRef);
    imageUrls.push(downloadUrl);
  }

  await setDoc(reviewRef, {
    content: { ...content, imageUrls },
    createdAt: new Date(),
    userId,
  });
};

// 카페 저장 불러오기
export const getSavedPlaces = async (userId: string, lastVisibleDoc?: any) => {
  try {
    if (!userId) {
      console.error("🚨 No userId provided");
      return { savedPlaces: [], nextQuery: null };
    }

    let savedQuery = query(
      collection(db, `users/${userId}/savedPlaces`),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    if (lastVisibleDoc) {
      savedQuery = query(savedQuery, startAfter(lastVisibleDoc));
    }

    const querySnapshot = await getDocs(savedQuery);
    
    const savedPlaces = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      placeId: doc.data().placeId,
      content: doc.data().content,
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { savedPlaces, nextQuery: lastVisible || null };
  }
  catch (error) {
    console.error("🚨 Error fetching saved places: ", error);
    return { savedPlaces: [], nextQuery: null };
  }
};

export const useUserSavedPlace = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["savedPlaces", userId], 
    queryFn: () => userId ? getSavedPlaces(userId) : Promise.resolve({ savedPlaces: [], nextQuery: null }),
    enabled: !!userId, 
  });
};

// 카페 저장
export const savePlace = async ({
  placeId,
  userId,
  content,
}: {
  placeId: string;
  userId: number;
  content: Place;
}) => {
  await setDoc(doc(db, "users", userId.toString(), "savedPlaces", placeId), {
    placeId,
    content,
    createdAt: new Date(),
  });
};
// 카페 저장 삭제
export const deleteSavedPlace = async ({
  placeId,
  userId,
}: {
  placeId: string;
  userId: number;
}) => {
  try {
    const docRef = doc(db, "users", userId.toString(), "savedPlaces", placeId);

    // 🔍 문서 존재 여부 확인
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return alert("북마크에 해당 카페가 저장되어 있지 않습니다ㅜㅜ");
    }

    // ✅ Firestore에서 문서 삭제
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Firestore에서 장소 삭제 중 오류 발생:", error);
    alert("북마크 취소를 실패 했어요ㅜㅜ")
  }
};


// 리뷰 삭제
export const deleteReview = async ({
  placeId,
  id,
}: {
  placeId: string;
  id: string;
}) => {
  await deleteDoc(doc(db, "reviews", placeId, "userReviews", id));
};

// 리뷰 수정 (repostReview → updateReview)
export const updateReview = async ({
  placeId,
  id,
  content,
  userId,
  images = [],
}: {
  placeId: string;
  id: string;
  content: ReviewContent;
  userId: string;
  images?: File[];
}) => {
  const imageUrls: string[] = [];

  // 이미지 업로드 최대 3개
  for (let i = 0; i < images.length && i < 3; i++) {
    const image = images[i];
    const storageRef = ref(storage, `reviews/${userId}/${id}/image${i + 1}`);
    await uploadBytes(storageRef, image);
    const downloadUrl = await getDownloadURL(storageRef);
    imageUrls.push(downloadUrl);
  }

  // Firestore 문서 업데이트
  await updateDoc(doc(db, "reviews", placeId, "userReviews", id), {
    content: {
      ...content,
      imageUrls,
    },
    updatedAt: new Date(),
  });
};
export const getReviewPhoto = async (placeId: string, lastVisibleDoc?: any) => {
  try {
    // 🔍 reviews/{placeId}/userReviews 컬렉션 쿼리
    let reviewsQuery = query(
      collection(db, "reviews", placeId, "userReviews"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    if (lastVisibleDoc) {
      reviewsQuery = query(reviewsQuery, startAfter(lastVisibleDoc));
    }

    const querySnapshot = await getDocs(reviewsQuery);

    // 🔄 모든 리뷰에서 imageUrls를 꺼내서 하나의 배열로 병합
    const photos: string[] = querySnapshot.docs.flatMap((doc) => {
      const imageUrls = doc.data().content?.imageUrls;

      if (Array.isArray(imageUrls)) {
        return imageUrls.filter((url) => typeof url === "string" && url.trim() !== "");
      } else if (typeof imageUrls === "string" && imageUrls.trim() !== "") {
        return [imageUrls];
      }

      return [];
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { photos, nextQuery: lastVisible || null };
  } catch (error) {
    console.error("🚨 Error fetching review Photo: ", error);
    return { photos: [], nextQuery: null };
  }
};

export const useReviewPhoto = (placeId: string) => {
  return useQuery({
    queryKey: ["photos", placeId, 'photo-tab'],
    queryFn: () => getReviewPhoto(placeId),
    enabled: !!placeId,
  });
};
// 사용자 리뷰 불러오기
export const getUserReviews = async (userId: string, lastVisibleDoc?: any) => {
  try {
    if (!userId) {
      console.error("🚨 No userId provided");
      return { reviews: [], nextQuery: null };
    }

    let reviewsQuery = query(
      collectionGroup(db, "userReviews"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    if (lastVisibleDoc) {
      reviewsQuery = query(reviewsQuery, startAfter(lastVisibleDoc));
    }

    const querySnapshot = await getDocs(reviewsQuery);

    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      placeId: doc.ref.parent?.parent?.id,
      content: doc.data().content,
      createdAt: doc.data().createdAt,
      userId: doc.data().userId,
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { reviews, nextQuery: lastVisible || null };
  } catch (error) {
    console.error("🚨 Error fetching user reviews: ", error);
    return { reviews: [], nextQuery: null };
  }
};

// 유저 리뷰 최신화 GET
export const useUserReviews = (userId: string) => {
  return useQuery({
    queryKey: ["userReviews", userId],
    queryFn: () => getUserReviews(userId),
    enabled: !!userId,
  });
};
// 리뷰 최신화 POST
export const useMutationAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId, content, userId }:{placeId: string, content: ReviewContent, userId: string}) =>
      addReview({ placeId, content, userId }),
    onSuccess: (data, variables: Review) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.placeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userReviews", variables.userId],
      });
    },
    onError: (error) => {
      console.error(`Add Review Error: ${error}`);
    },
  });
};
// 리뷰 최신화 DELETE
export const useMutationDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId, id, userId }: { placeId: string, id: string, userId: string }) => deleteReview({ placeId, id }),
    onSuccess: (data, variables: Review) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.placeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userReviews", variables.userId],
      });
    },
    onError: (error) => {
      console.error(`Delete Review Error: ${error}`);
    },
  });
};

export const App = !getApps().length ? app : getApp();
