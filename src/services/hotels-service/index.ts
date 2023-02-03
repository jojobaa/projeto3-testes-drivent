import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-hotels-error";

async function getHotels(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment){
        throw notFoundError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
        throw cannotListHotelsError();
    }

    const hotels = await hotelRepository.findHotels();
    return hotels;
}

async function getHotelsRooms(userId: number, hotelId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment){
        throw notFoundError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
        throw cannotListHotelsError();
    }

    const hotels = await hotelRepository.findRoomsById(hotelId);
    return hotels;
}

const hotelService = {
    getHotels,
    getHotelsRooms
};

export default hotelService;
