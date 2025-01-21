import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseApiUrl} from "./apiConfig.js";
import Cookies from "js-cookie";

export const customBaseQuery = fetchBaseQuery({
        baseUrl: baseApiUrl,
        prepareHeaders: (headers, {getState}) => {
            const authToken = Cookies.get('jwtToken');
            if (authToken) {
                headers.set('Authorization', `Bearer ${authToken}`);
            }
            return headers;
        }
    }
);
