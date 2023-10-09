const Company = require("../models/Company");
const dotenv = require("dotenv");
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
}

module.exports = new CompanyController();