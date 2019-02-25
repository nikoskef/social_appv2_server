const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const profileController = require("../controllers/profile");
const validate = require("../middleware/validate");
const { validateProfile } = require("../validation/profile");
const { validateExperience } = require("../validation/experience");
const { validateEducation } = require("../validation/education");

router.get("/test", profileController.getProfileTest);

router.get("/", auth, profileController.getProfile);

router.post("/", auth, validate(validateProfile), profileController.createProfile);

router.get("/handle/:handle", profileController.getProfileByHandle);

router.get("/user/:user_id", profileController.getProfileById);

router.get("/all", profileController.getAllProfiles);

router.post("/experience", auth, validate(validateExperience), profileController.postExperience);

router.post("/education", auth, validate(validateEducation), profileController.postEducation);

module.exports = router;
