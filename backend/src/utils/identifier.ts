import { customAlphabet } from "nanoid";

export const getId = (type: string = "order"): string => {
	const nanoId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
	return type === "voucher" ? `ARCTIX-${nanoId(5)}` : `${nanoId(10)}`;
};
