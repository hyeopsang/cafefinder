export interface Place {
    address_name: string;
    category_group_code?: `${kakao.maps.CategoryCode}` | `${Exclude<kakao.maps.CategoryCode, "">}`[];
    category_group_name: string;
    category_name: string;
    distance: number;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
    placeIndex?: number;
  }
  
