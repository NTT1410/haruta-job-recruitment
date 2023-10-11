const Company = require("../models/Company");
const dotenv = require("dotenv");
const Job = require("../models/Job");
const Employer = require("../models/Employer");
// Secret
dotenv.config();

const pageSize = Number(process.env.PAGE_SIZE);

class CompanyController {
	// [GET] /api/companies
	async show(req, res, next) {
		try {
			var page = req.query.page;
			if (page) {
				page = parseInt(page);
				if (page < 1) {
					page = 1;
				}
				var skip = (page - 1) * pageSize;
				const companies = await Company.find()
					.skip(skip)
					.limit(pageSize)
					.lean();
				let total = await Company.countDocuments();
				let totalPage = Math.ceil(total / 8);
				res.status(200).json({
					total: total,
					totalPage: totalPage,
					data: companies,
				});
			} else {
				const companies = await Company.find().lean();
				res.status(200).json({ data: companies });
			}
		} catch (error) {
			console.log(error);
			res.status(404).json("Not Found");
		}
	}

	// [GET] /api/companies/:companyId
	async detail(req, res, next) {
		console.log(res.locals.companiesIdName);
		try {
			const companyId = req.params.companyId;
			const company = await Company.findById(companyId).lean();
			res.status(200).json(company);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async count(req, res, next) {
		try {
			const count = await Company.countDocuments().lean();
			res.status(200).json(count);
		} catch (error) {
			console.log(error);
			res.status(500).json("Server error");
		}
	}

	// [DELETE] /companies/:companyId
	async deleteById(req, res, next) {
		try {
			const companyId = req.params.companyId;
			await Company.deleteOne({ _id: companyId });
			res.status(200).json("Delete successful");
		} catch (error) {
			console.log(error);
			res.status(500).json("Delete failed");
		}
	}

	async updateById(req, res, next) {
		try {
			const companyId = req.params.companyId;
			const data = req.body;
			await Company.updateOne({ _id: companyId }, data);
			res.status(200).json("Update successful");
		} catch (error) {
			console.log(error);
			res.status(500).json("Update failed");
		}
	}

	async companiesNameAndId(req, res, next) {
		try {
			// const companiesID = await Company.find().distinct("_id").lean();
			// const companiesName = await Company.find().distinct("name").lean();
			// console.log(companiesID);
			// var companies = [];
			// for (let i = 0; i < companiesID.length; i++) {
			// 	companies.push({
			// 		_id: companiesID[i],
			// 		name: companiesName[i],
			// 	});
			// }
			const companies = await Company.find().select({ _id: 1, name: 1 }).lean();
			res.locals.companiesIdName = companies;
			next();
		} catch (error) {
			console.log(error);
			res.status(500).json("Server error");
		}
	}

	async jobPostOfCompany(req, res, next) {
		try {
			const companyId = req.params.companyId;
			console.log(companyId);
			const company = await Company.findById(companyId);
			const jobPostOfCompany = await Job.find({
				company_id: company._id,
			}).lean();
			res.status(200).json(jobPostOfCompany);
		} catch (error) {
			console.log(error);
			res.status(500).json("Server error");
		}
	}

	async top9(req, res, next) {
		try {
			const countEmplOfCpn = [];
			const companyId = await Company.find().distinct("_id");
			companyId.forEach(async (companyId) => {
				const empl = await Employer.find({
					company_id: companyId,
				}).countDocuments();
				console.log({ companyId, empl });
				countEmplOfCpn.push({ company_id: "companyId", employerCount: "empl" });
			});
			res.status(200).json(countEmplOfCpn);
		} catch (error) {
			console.log(error);
			res.status(500).json("Server error");
		}
	}
}

module.exports = new CompanyController();
