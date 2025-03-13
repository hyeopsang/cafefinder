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
} from "firebase/firestore"; 
import { db } from "../firebase-config";
import { ReviewContent, Review } from "../types/Review";

// 리뷰 최신화
export const useReviews = (placeId: string) => {
  return useQuery({
    queryKey: ["reviews", placeId],
    queryFn: () => getReview(placeId),
    enabled: !!placeId,
  });
};
// 리뷰 불러오기
export const getReview = async (placeId: string): Promise<Review[]> => {
  const querySnapshot = await getDocs(
    collection(db, "reviews", placeId, "userReviews"),
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    placeId,
    content: doc.data().content,
    createdAt: doc.data().createdAt,
    userId: doc.data().userId,
  }));
};
// 리뷰 추가
export const addReview = async ({ placeId, content, userId }:{placeId: string, content: ReviewContent, userId: string}) => {
  await addDoc(collection(db, "reviews", placeId, "userReviews"), {
    content,
    createdAt: new Date(),
    userId,
  });
};
// 리뷰 삭제
export const deleteReview = async ({ placeId, id }:{ placeId: string, id:string }) => {
  await deleteDoc(doc(db, "reviews", placeId, "userReviews", id));
};
// 사용자 리뷰 불러오기
export const getUserReviews = async (userId : string) => {
  try {
    if (!userId) {
      console.error("No userId provided");
      return [];
    }

    const reviewsQuery = query(
      collectionGroup(db, "userReviews"),
      where("userId", "==", userId),
    );

    const querySnapshot = await getDocs(reviewsQuery);

    const reviews: Review[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      placeId: doc.ref.parent?.parent?.id || '',
      content: doc.data().content,
      createdAt: doc.data().createdAt,
      userId: doc.data().userId,
    }));

    return reviews; 
  } catch (error) {
    console.error("Error fetching user reviews: ", error);
    throw error;
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
