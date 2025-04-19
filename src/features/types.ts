// Define a type for each ticket
export interface Ticket {
  seatNumber: number;
  ticketType: string;
  price: number;
  ticketId?: string; // Optional because it's added after backend creation
}
