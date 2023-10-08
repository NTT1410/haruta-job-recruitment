const Company = require("../models/Company");

class CompanyController {
	// [GET] /api/companies
	show(req, res, next) {
		Company.find()
			.then((ur) => {
				res.json(ur);
			})
			.catch(next);
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
}

module.exports = new CompanyController();
