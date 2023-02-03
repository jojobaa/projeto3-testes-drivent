import hotelService from "@/services/hotels-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const {userId} = req;

  try {
    const hotels = await hotelService.getHotels(Number(userId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if(error.name === "NotFound"){
      return res.sendStatus(httpStatus.NOT_FOUND)
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED)
  }
}

export async function getHotelsId(req: AuthenticatedRequest, res: Response) {
  const {userId} = req;
  const {hotelId} = req.params;

  try {
    const hotels = await hotelService.getHotelsRooms(Number(userId), Number(hotelId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if(error.name === "NotFound"){
      return res.sendStatus(httpStatus.NOT_FOUND)
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED)
  }
}
