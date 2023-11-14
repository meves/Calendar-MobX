import { StatusCodes } from "../rest-api/status-codes"
import { BAD_REQUEST_400, NOT_AUTHORIZED_401, NOT_FOUND_404, SERVER_ERROR_500, FORBIDDEN_403 } from "./constants"

export const getErrorMessage = (code: StatusCodes) => {
    switch (code) {
        case StatusCodes.BAD_REQUEST_400:
            return BAD_REQUEST_400
        case StatusCodes.UNAUTHORIZED_401:
            return NOT_AUTHORIZED_401
        case StatusCodes.FORBIDDEN_403:
            return FORBIDDEN_403
        case StatusCodes.NOT_FOUND_404:
            return NOT_FOUND_404
        default:
            return SERVER_ERROR_500
    }
}