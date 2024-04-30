export interface RoleDTO {
    id: number;
    title: string;
    description: string;
}

export interface EmployeeDTO {
    id: number;
    name: string;
    gender: string;
    dateOfBirth: string;
    taxIdNumber: string;
    TAJ: string;
    phoneNo: string;
    email: string;
    salary: number;
    hotel: null | HotelDTO;
    role: null | RoleDTO;
}

export interface HotelDTO {
    id: number;
    hotelName: string;
    address: string;
    postcode: number;
    city: string;
    country: string;
    numRooms: number;
    phoneNo: number;
}

export interface ServiceDTO {
    id: number;
    serviceName: string;
    price: number;
    hotel: null | HotelDTO;
}

export interface RoomDTO {
    id: number;
    type: string;
    numBeds: number;
    price: number;
    hotel: null | HotelDTO;
}

export interface BookingDTO {
    id: number;
    bookingDate: string;
    checkInDate: string;
    checkOutDate: string;
    numAdults: number;
    numChildren: number;
    user: null | UserDTO;
    room: null | RoomDTO;
}

export interface UserDTO {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    isActive: boolean;
    isAdmin: boolean;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
    isAdmin: boolean;
}
