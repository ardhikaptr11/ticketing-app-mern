import mongoose from "mongoose";

const VillageSchema = new mongoose.Schema({
	id: { type: Number, index: true },
	name: String
}).index({ name: "text" });

const DistrictSchema = new mongoose.Schema({
	id: { type: Number, index: true },
	name: String,
	villages: [VillageSchema]
}).index({ name: "text" });

const RegencySchema = new mongoose.Schema({
	id: { type: Number, index: true },
	name: String,
	districts: [DistrictSchema]
}).index({ name: "text" });

const ProvinceSchema = new mongoose.Schema(
	{
		id: { type: Number, index: true },
		name: String,
		regencies: [RegencySchema]
	},
	{
		statics: {
			findByCity(name: string) {
				return this.aggregate([
					{
						$unwind: "$regencies"
					},
					{
						$match: {
							$or: [
								{
									"regencies.name": { $regex: name, $options: "i" }
								}
							]
						}
					},
					{
						$project: {
							id: "$regencies.id",
							name: "$regencies.name"
						}
					},
					{
						$replaceRoot: {
							newRoot: {
								name: "$name",
								id: "$id",
								province: "$province",
								regency: "$regency",
								district: "$district"
							}
						}
					}
				]);
			},
			getAllProvinces() {
				return this.find({}).select("name id -_id");
			},
			getProvince(id: number) {
				return this.aggregate([
					{
						$match: { id }
					},
					{
						$project: {
							name: "$name",
							id: "$id",
							regencies: {
								$map: {
									input: "$regencies",
									as: "regencies",
									in: {
										id: "$$regencies.id",
										name: "$$regencies.name"
									}
								}
							}
						}
					},
					{
						$replaceRoot: {
							newRoot: {
								name: "$name",
								id: "$id",
								regencies: "$regencies"
							}
						}
					}
				]);
			},
			getRegency(id: number) {
				return this.aggregate([
					{
						$unwind: "$regencies"
					},
					{
						$match: {
							"regencies.id": id
						}
					},
					{
						$project: {
							name: "$regencies.name",
							id: "$regencies.id",
							province: {
								id: "$id",
								name: "$name"
							},
							districts: {
								$map: {
									input: "$regencies.districts",
									as: "districts",
									in: {
										id: "$$districts.id",
										name: "$$districts.name"
									}
								}
							}
						}
					},
					{
						$replaceRoot: {
							newRoot: {
								name: "$name",
								id: "$id",
								province: "$province",
								districts: "$districts"
							}
						}
					}
				]);
			}, // Kota/Kabupaten
			getDistrict(id: number) {
				return this.aggregate([
					{
						$unwind: "$regencies"
					},
					{
						$unwind: "$regencies.districts"
					},
					{
						$match: {
							"regencies.districts.id": id
						}
					},
					{
						$project: {
							name: "$regencies.districts.name",
							id: "$regencies.districts.id",
							province: {
								id: "$id",
								name: "$name"
							},
							regency: {
								id: "$regencies.id",
								name: "$regencies.name"
							},
							villages: {
								$map: {
									input: "$regencies.districts.villages",
									as: "villages",
									in: {
										id: "$$villages.id",
										name: "$$villages.name"
									}
								}
							}
						}
					},
					{
						$replaceRoot: {
							newRoot: {
								name: "$name",
								id: "$id",
								province: "$province",
								regency: "$regency",
								villages: "$villages"
							}
						}
					}
				]);
			}, // Kecamatan
			getVillage(id: number) {
				return this.aggregate([
					{
						$unwind: "$regencies"
					},
					{
						$unwind: "$regencies.districts"
					},
					{
						$unwind: "$regencies.districts.villages"
					},
					{
						$match: {
							"regencies.districts.villages.id": id
						}
					},
					{
						$project: {
							name: "$regencies.districts.villages.name",
							id: "$regencies.districts.villages.id",
							district: {
								id: "$regencies.districts.id",
								name: "$regencies.districts.name"
							},
							regency: {
								id: "$regencies.id",
								name: "$regencies.name"
							},
							province: {
								id: "$id",
								name: "$name"
							}
						}
					},
					{
						$replaceRoot: {
							newRoot: {
								name: "$name",
								id: "$id",
								province: "$province",
								regency: "$regency",
								district: "$district"
							}
						}
					}
				]);
			} // Kelurahan
		}
	}
).index({ name: "text" });

export const RegionModel = mongoose.model("Region", ProvinceSchema);
