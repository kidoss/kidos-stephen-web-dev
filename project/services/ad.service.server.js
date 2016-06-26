module.exports = function(app, models) {

    var adModel = models.adModel;
    var multer = require('multer');
    var upload = multer({ dest: __dirname + '/../../public/uploads'});

    app.post("/api/campaign/:campaignId/ad", createAd);
    app.get("/api/campaign/:campaignId/ad", findAllAdsForCampaign);
    app.get("/api/ad/:adId", findAdById);
    app.put("/api/ad/:adId", updateAd);
    app.delete("/api/ad/:adId", deleteAd);
    app.post("/api/upload", upload.single('upload'), uploadImage);

    function createAd(req, res) {
        var id = req.params.campaignId;
        var ad = req.body;

        adModel
            .createAd(id, ad)
            .then(function(ad) {
                res.json(ad);
            })
    }

    function findAllAdsForCampaign(req, res) {
        var id = req.params.campaignId;

        adModel
            .findAllAdsForCampaign(id)
            .then(function(ads) {
                res.json(ads);
            })
    }

    function findAdById(req, res) {
        var id = req.params.adId;

        adModel
            .findAdById(id)
            .then(function(ad) {
                res.json(ad);
            })
    }

    function updateAd(req, res) {
        var id = req.params.adId;
        var ad = req.body;

        adModel
            .updateAd(id, ad)
            .then(function(ad) {
                res.json(ad);
            })
    }

    function deleteAd(req, res) {
        var id = req.params.adId;

        adModel
            .deleteAd(id)
            .then(function(ad) {
                res.json(ad);
            })
    }

    function uploadImage(req, res) {
        var file = req.file;

        var ad = {
            name: req.body.name,
            description: req.body.description,
            ageMin: req.body.ageMin,
            ageMax: req.body.ageMax,
            gender: req.body.gender,
            area: req.body.area,
            url: req.body.url
        }

        if(file) {
            ad.url = '/uploads/' + file.filename;
        }

        console.log(req.body);

        adModel
            .createAd(req.body.campaignId, ad)
            .then(function(ad) {
                if(req.body.managerId) {
                    res.redirect("/project/#/manager/" + req.body.managerId + "/campaign/" + req.body.campaignId + "/ad");
                } else {
                    res.redirect("/project/#/user/" + req.body.userId + "/campaign/" + req.body.campaignId + "/ad");
                }
            })
    }
}