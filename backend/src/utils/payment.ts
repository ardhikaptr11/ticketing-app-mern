import { MIDTRANS_SERVER_KEY, MIDTRANS_TRANSACTION_URL } from "../utils/env";
import axios from "axios";
import { IPayment } from "./interface";

export type TResponseMidtrans = {
	token: string;
	redirect_url: string;
};

export default {
	createLink: async (payload: IPayment): Promise<TResponseMidtrans> => {
		const result = await axios.post<TResponseMidtrans>(`${MIDTRANS_TRANSACTION_URL}`, payload, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Basic ${Buffer.from(`${MIDTRANS_SERVER_KEY}`).toString("base64")}`
			}
		});

		if (result.status !== 201) {
			throw new Error("Payment failed");
		}

		return result?.data;
	}
};
