export interface ListingType{
  location: Location;
  numBeds: string;
  numBaths: string;
  price: string;
  title: string;
  key:string;
  imageUrl: string;
}

export interface Coordinate{
  latitude: number;
  longitude: number;
}

export interface Location{
  street: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
  coordinates: Coordinate;
}

export const testListing:ListingType = {
  numBeds: "2",
  numBaths: "1",
  price: "$2000",
  title: "Beautiful home in the heart of Toronto",
  key:"1",
  imageUrl:"https://images.adsttc.com/media/images/5e1d/02c3/3312/fd58/9c00/06e9/large_jpg/NewHouse_SA_Photo_01.jpg?1578959519",
  location: {
    street:"312 Yonge Street",
    city:"Toronto",
    postalCode:"M5B 1R4",
    province:"Ontario",
    country:"Canada",
    coordinates: {
      latitude: 43.651070,
      longitude:	-79.347015
    }
  }
}