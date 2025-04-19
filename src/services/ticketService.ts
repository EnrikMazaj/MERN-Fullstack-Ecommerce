import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface TicketData {
    title: string;
    description: string;
    price: number;
}

export const ticketService = {
    // Get all tickets
    getAllTickets: async () => {
        const response = await axios.get(`${API_URL}/ticket`);
        return response.data;
    },

    // Get ticket by ID
    getTicketById: async (id: string) => {
        const response = await axios.get(`${API_URL}/ticket/${id}`);
        return response.data;
    },

    // Create a new ticket
    createTicket: async (ticketData: TicketData) => {
        const response = await axios.post(`${API_URL}/ticket`, ticketData);
        return response.data;
    },

    // Update a ticket
    updateTicket: async (id: string, ticketData: TicketData) => {
        const response = await axios.put(`${API_URL}/ticket/${id}`, ticketData);
        return response.data;
    },

    // Delete a ticket
    deleteTicket: async (id: string) => {
        const response = await axios.post(`${API_URL}/ticket/${id}/delete`);
        return response.data;
    }
}; 